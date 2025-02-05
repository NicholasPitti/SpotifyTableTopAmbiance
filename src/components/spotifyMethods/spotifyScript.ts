
//import { redirectToAuthCodeFlow } from './authorizationMethods'
import { getPlaylistCollection, getPlaylistItems, duplicatePlaylist } from './playlistMethods'
import {type Playlist,type PlaylistTracks,type PlaylistCollection} from './playlistMethods'
import {addToQueue, startPlayback} from './playbackMethods'
import { searchTrack, type SearchedTracks, type TrackItems } from './searchMethods'
import { onMounted, render } from 'vue'
import { h } from 'vue'
import { CaretRightFilled } from "@ant-design/icons-vue"
import queueTracksData from '../../../public/queue-tracks.json' assert { type: 'json' }

interface QueueTracksData {
  queues: {
    [key: string]: string[];
  };
}
const typedQueueTracksData= queueTracksData.queues as unknown  as QueueTracksData;

//processSporify request is at the top of all Views and lets the code know to populate anything spotify promise related when navigating
//should i store processed requests?
//would this be a model or controller?

//Problem. this file is responsible for both logic and visual populating of view
//There should be a way to separate that

export async function processSpotifyRequests(navOption:string){

  //const clientId = ""
  //const playlistId = '3UKLPrFVAO1hsUVeWrYCfK'   //Hard coded playlist id for testing purtposes
  const playlistId = '3UKLPrFVAO1hsUVeWrYCfK' 

//temporaary vriable so that duplicate doesnt fire off when i navigate to it
const apiDisabled=true

  onMounted(async () => {

    //const accessToken = localStorage.getItem('access_token')
    
    const accessToken = localStorage.getItem('access_token')
    if (!accessToken) {
      //redirectToAuthCodeFlow(clientId)
    } else {
    
    //gives tracks objects, not jsut their ids
    const playlistItems = await getPlaylistItems(accessToken, playlistId)
    
    
    const likes=await getProfileLikes(accessToken,0) // gets first 50 items because the offset is 0
    switch(navOption){
      case "/":
        console.log("home")
        if(apiDisabled)
        populateWithQueueOptions(accessToken)
        
      break
      case "/sort":
        console.log("sort")
        if(apiDisabled)
        populateWithPlaylist(accessToken, playlistItems,true)
      break
      case "/duplicate":
        console.log("dupe")
        if(!apiDisabled){
          const newPlaylist=await duplicatePlaylist(accessToken,"newPlaylistTest",playlistItems.items)
          const newplaylistItems = await getPlaylistItems(accessToken, newPlaylist.id)
          populateWithPlaylist(accessToken, newplaylistItems)
        }
      break
      case "/allplaylist":
        console.log("all pls")
        if(apiDisabled){
        const playlists=await getPlaylistCollection(accessToken)
        console.log("@@@@ before populate playlists :"+playlists)
        populateWithPlaylistCollection(accessToken, playlists)
        }
      break
      case "/likes":
         console.log("likes")
         //explicit false not neccesary?
         populateWithPlaylist(accessToken, likes,false)
         //need a button to confirm adding a liked track to a queue
         //queue doesnt exist then create it
         //list existing
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

//vuedraggable lets you drag from one list to another
//allow for drag and drop searched track and reordering queue before issueing queue

function populateWithQueueOptions(accessToken:string){
  const queueData=typedQueueTracksData.queues
  const queueKeys:string[] = Object.keys(queueData);
  const allQueues=queueKeys.map(key => queueData[key])
  allQueues.forEach(queue => {
    const qContainer = document.createElement("div")
    qContainer.setAttribute('id',`qContainer-${queue}`)
    qContainer.style.paddingBottom='1rem'
    document.getElementById("pl")?.appendChild(qContainer)
    queue.forEach(trackID => {
    //queueTrackDraggable compent so li becomes draggable
    //might need to use h & render again
    const listElement = document.createElement("li")
    document.getElementById(`qContainer-${queue}`)?.appendChild(listElement)
    listElement.textContent = trackID
    //document.getElementById("qContainer")?.appendChild(listElement)
    ///addToQueue(accessToken,trackID)  //l33t
    });
  });


}


function populateWithPlaylistCollection(accessToken:string|null, playlist:PlaylistCollection) {
  //console.log("type of playlist"+typeof(playlist))

    playlist.items.forEach((playlists:Playlist) => {
      const listElement = document.createElement("li")
      listElement.textContent = playlists.name+playlists.href
      document.getElementById("pl")?.appendChild(listElement)
        const playlistIdElement = document.createElement("i")
        playlistIdElement.setAttribute('id', "pl-id")
    }) 
}

function populateWithPlaylist(accessToken:string|null, playlist:Playlist,dropdown:boolean=false) {
  
  //why remove all buttons?
  const allButtons = document.querySelectorAll('button')
  allButtons.forEach(button=>{
    if(button.textContent?.trim().toLowerCase()==='play'){
      button.remove()
    }
  })
  
  let trackId:string
  let button
    playlist.items.forEach((tracks:PlaylistTracks, index:number) => {
      trackId = tracks.track.id
      const listElement = document.createElement("li")
      const playbackElement = document.createElement("button")
      const trackElement=document.createElement("span")
      trackElement.textContent = trackId
      listElement.setAttribute('id', trackId)
      playbackElement.setAttribute('id', 'playbutton' + trackId)
      playbackElement.style.borderRadius='1rem'
      playbackElement.style.marginLeft='1rem'
      const iconComponent =  h(CaretRightFilled, {
        style: { fontSize: '16px' } // Adjust size as needed
      })
      const container = document.createElement('div')
      render(iconComponent, container)
      playbackElement.appendChild(container.firstElementChild!)
      const artistNames = tracks.track.artists.map(artist => artist.name).join(", ")
      listElement.textContent = tracks.track.name + " - " + artistNames
      document.getElementById("pl")?.appendChild(listElement)
      document.getElementById("pl")?.appendChild(trackElement)
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
        /*
        const selectedElement = document.createElement("b")
        selectedElement.setAttribute('id', "sel-id")
        selectedElement.textContent='None'
        selectedElement.style.paddingLeft='1rem'          
        selectedElement.style.paddingRight='1rem'
        document.getElementById(trackId)?.appendChild(selectedElement)
        */
        document.getElementById(trackId)?.appendChild(dropDownElement)
        //this can be acomplished w v-bind.. or a ref
        /*
        dropDownElement.children[1].addEventListener('change', (event:Event) => {
          const select = event.target as HTMLSelectElement
          selectedElement.textContent=select.value          
          //console.log(select.value)
        })
        */
        /////Why do i need the sel-id


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
      button = document.getElementById('playbutton' + trackId) ///
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

async function getProfileLikes(accessToken:string, offset:number) {
  const result = await fetch(`https://api.spotify.com/v1/me/tracks?limit=50&offset=${offset}`, {
    method: "GET", headers: { Authorization: `Bearer ${accessToken}` }
  })

  return await result.json()
}

/*
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
  */