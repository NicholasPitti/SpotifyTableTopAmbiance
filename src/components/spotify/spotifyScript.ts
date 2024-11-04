
import { redirectToAuthCodeFlow } from './authorizationMethods'
//import { getPlaylists, getPlaylistItems, duplicatePlaylist } from './playlistMethods'
import { getPlaylistItems } from './playlistMethods'
import {type Playlist,type PlaylistTracks} from './playlistMethods'
import {startPlayback} from './playbackMethods'
import { searchTrack, type SearchedTracks, type TrackItems } from './searchMethods'
import { onMounted } from 'vue'

export async function processSpotifyRequests(navOption:string){

  const clientId = "client-id"
  const playlistId = '3UKLPrFVAO1hsUVeWrYCfK'
/*
  if (!code) {
    localStorage.removeItem('access_token') //clear local storage if 1hr has passed
    redirectToAuthCodeFlow(clientId)
  }
*/

  onMounted(async () => {
    const accessToken = localStorage.getItem('access_token')
    if (!accessToken) {
      redirectToAuthCodeFlow(clientId)
    } else {
   
    const profile = await getProfile(accessToken)
    const playlistItems = await getPlaylistItems(accessToken, playlistId)
    const likes=await getProfileLikes(accessToken,0) // gets first 50 items because the offset is 0
    switch(navOption){
      case "/":
        console.log("home")
        populateWithPlaylist(accessToken, profile, playlistItems,true)
      break
      case "/duplicate":
        console.log("dupe")
        /*
         const newPlaylist=await duplicatePlaylist(accessToken,"newPlaylistTest",playlistItems.items)
         const newplaylistItems = await getPlaylistItems(accessToken, newPlaylist.id)
         populateWithPlaylist(accessToken, profile, newplaylistItems)
         */
      break
      case "/allplaylist":
        console.log("get pl")
        /*
        const playlists=await getPlaylists(playlistId)
        populateWithPlaylist(accessToken, profile, playlists)
        console.log(" all playlists ")
        */
      break
      case "/likes":
         console.log("likes")
         //explicit false not neccesary?
         populateWithPlaylist(accessToken, profile, likes,false)
      break
      case "/search":
         console.log("search")
         const track=await searchTrack(accessToken,"3's & 7's","Queens of the Stone Age")
         //console.log(track)
         populateWithQueryResponse(accessToken, track)         
      break
      default: console.log("default")
    }    
  }
})
}

function populateWithPlaylist(accessToken:string|null, profile:UserProfile, playlist:Playlist,dropdown:boolean=false) {
  
  //remove all buttons
  const allButtons = document.querySelectorAll('button')
  allButtons.forEach(button=>{
    if(button.textContent?.trim().toLowerCase()==='play'){
      button.remove()
    }
  })

  if (profile.images[0]) {
    const profileImage = new Image(200, 200)
    profileImage.src = profile.images[0].url
    document.getElementById("avatar")?.appendChild(profileImage)
  }
  
  let trackId:string
  let button
    playlist.items.forEach((tracks:PlaylistTracks, index:number) => {
      trackId = tracks.track.id
      const listElement = document.createElement("li")
      const playbackElement = document.createElement("button")
      listElement.setAttribute('id', trackId)
      playbackElement.setAttribute('id', 'button' + trackId)
      playbackElement.textContent = 'play'
      const artistNames = tracks.track.artists.map(artist => artist.name).join(", ")
      listElement.textContent = tracks.track.name + " - " + artistNames
      document.getElementById("pl")?.appendChild(listElement)
      document.getElementById(trackId)?.appendChild(playbackElement)

      //if dropdown then organize playlist
      //dropdown false means we are using the Get All Likes
      if(dropdown){
        const dropDownElement = document.createElement("span")
        dropDownElement.setAttribute('id', 'select' + index)
        dropDownElement.innerHTML = `
            <label for="tabletop">Select playlist:</label>
            <select name="intensity" id=${'dropdown'+index}>
                <optgroup label="Music Intensity">
                    <option value="Light">1-Light</option>
                    <option value="Adventure">2-Adventure</option>
                    <option value="Sneak">3-Sneaky</option>
                    <option value="Unknown">4-Unknown</option>
                    <option value="Unrest">5-Unrest</option>
                    <option value="Combat">6-Combat</option>
                    <option value="Epic">7-Epic</option>
                    <option selected value="None">None</option>
                </optgroup>
            </select>
        `

        const selectedElement = document.createElement("b")
        selectedElement.setAttribute('id', "sel-id")
        selectedElement.textContent='None'
        selectedElement.style.paddingLeft='1rem'          
        selectedElement.style.paddingRight='1rem'
        document.getElementById(trackId)?.appendChild(selectedElement)
        document.getElementById(trackId)?.appendChild(dropDownElement)
        
        dropDownElement.children[1].addEventListener('change', (event:Event) => {
          const select = event.target as HTMLSelectElement
          selectedElement.textContent=select.value          
          console.log(select.value) ///
        })

        /*
        console.log(playlist.href)
        const playlistIdElement = document.createElement("i")
        playlistIdElement.setAttribute('id', "pl-id")
        //playlistIdElement.style.display='none'
        document.getElementById(trackId)?.appendChild(playlistIdElement)
        */
      }


      function getPlaylistId(url:string) {
        const regex = /\/playlists\/([^/?]+)/
        const match = url.match(regex)
        return match ? match[1] : null
      }
      
      const url = playlist.href
      const extractedPlaylistId = getPlaylistId(url)
      //console.log("btn"+trackId)
      //track ids are definately diff
      button = document.getElementById('button' + trackId)
      const buttonTrack=trackId

      if (button) {
        button.onclick = function () {
          if(dropdown){
            console.log("////////////////")
            console.log("dropdown play: "+buttonTrack+" from "+extractedPlaylistId)
            startPlayback(accessToken,extractedPlaylistId, index,false,buttonTrack)
          }else{
            //console.log(tracks.track.id)
            startPlayback(accessToken, '1rjqDQFGg6K6K...',index,true,tracks.track.id)
          }
        }
      }   
    }) 
}

function populateWithQueryResponse(accessToken:string|null, playlist:SearchedTracks) {  
  let trackId:string
  ///console.log(playlist)
  playlist.tracks.items.forEach((tracks:TrackItems) => {
    trackId = tracks.id
    const listElement = document.createElement("li")
    listElement.setAttribute('id', trackId)
    listElement.textContent = tracks.name
    document.getElementById("pl")?.appendChild(listElement)
    })
}

async function getProfile(token: string|null): Promise<UserProfile> {
  const result = await fetch("https://api.spotify.com/v1/me", {
      method: "GET", headers: { Authorization: `Bearer ${token}` }
  })
  return await result.json()
}

async function getProfileLikes(accessToken:string, offset:number) {
  const result = await fetch(`https://api.spotify.com/v1/me/tracks?limit=50&offset=${offset}`, {
    method: "GET", headers: { Authorization: `Bearer ${accessToken}` }
  })

  return await result.json()
}


interface UserProfile {
  country: string
  display_name: string
  email: string
  explicit_content: {
      filter_enabled: boolean,
      filter_locked: boolean
  },
  external_urls: { spotify: string }
  followers: { href: string; total: number; }
  href: string
  id: string
  images: Image[]
  product: string
  type: string
  uri: string
}

interface Image {
  url: string
  height: number
  width: number
}