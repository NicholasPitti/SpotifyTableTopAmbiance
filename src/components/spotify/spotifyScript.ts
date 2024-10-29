
import { redirectToAuthCodeFlow } from './authorizationMethods';
import { getPlaylists, getPlaylistItems, duplicatePlaylist } from './playlistMethods';
import {type Playlist,type PlaylistTracks} from './playlistMethods';
import {startPlayback} from './playbackMethods';
import { searchTrack, type SearchedTracks, type TrackItems } from './searchMethods';

//import { startPlayback } from './playbackMethods';
//refreshAccessToken part of redidrect??
//import {comboBox} from './components/comboBox.js';

//@@@ the playbuttons on getall likes are using the old ids from playlist id

import { onMounted } from 'vue'

export async function processSpotifyRequests(navOption:string){

  const clientId = "client-id";
//  const params = new URLSearchParams(window.location.search);
  //const code = params.get("code");

  //DMOneshot-Des 0diCYGRlMqoOsdixO7wdo7
  //pull up DMOneshot-Fro 3UKLPrFVAO1hsUVeWrYCfK
  //select combo
  //add to intensity playlist

  const playlistId = '3UKLPrFVAO1hsUVeWrYCfK';
/*
  if (!code) {
    localStorage.removeItem('access_token'); //clear local storage if 1hr has passed
    redirectToAuthCodeFlow(clientId);
    */

  //


  //[]Im geting 401 errors. make use of refresh finally?
  //Its not redirecting when its supposed to
  //Its not mounting when its supposed to




  //@@@FIX THIS 

  //localStorage.removeItem('access_token');
  //redirectToAuthCodeFlow(clientId);


  onMounted(async () => {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      //doesnt go here for some reason
      //localStorage.removeItem('access_token');
      redirectToAuthCodeFlow(clientId);
  } else {

    //const accessToken = await getOrRetrieveAccessToken(clientId, code);
    //const accessToken = localStorage.getItem("access_token")

    //const playlist = await getPlaylists(accessToken); Not loking for this anymore
    /*
    const randomNumber = Math.floor(Math.random() * playlist.items.length);
    const randomPlaylistId = playlist.items[randomNumber].id;

    const playlistItems = await getPlaylistItems(accessToken, randomPlaylistId);
    */

    
    const profile = await getProfile(accessToken);
    const playlistItems = await getPlaylistItems(accessToken, playlistId);
    const likes=await getProfileLikes(accessToken,0);// gets first 50 items because the offset is 0
    switch(navOption){
      case "/":
        console.log("home");
        //const playlistItems = await getPlaylistItems(accessToken, playlistId);
        populateWithPlaylist(accessToken, profile, playlistItems,true);
      break;
      case "/duplicate":
         console.log("dupe");
         //const playlistItems = await getPlaylistItems(accessToken, playlistId);
         //await? @@@@
         
         const newPlaylist=await duplicatePlaylist(accessToken,"newPlaylistTest",playlistItems.items);
         const newplaylistItems = await getPlaylistItems(accessToken, newPlaylist.id);
         populateWithPlaylist(accessToken, profile, newplaylistItems);
         
      break;
      case "/allplaylist":
         console.log("get pl");
         
         const playlists=await getPlaylists(playlistId);
         populateWithPlaylist(accessToken, profile, playlists);

         //I dont want to create a button here. I want to refernce existing button
         /**
          Type Asserion
          This approach works because you're explicitly telling TypeScript to treat the result of getElementById as an HTMLElement. By doing this, you're overriding TypeScript's type checking and asserting that the element definitely exists. This removes the possibility of null, allowing you to assign to the onclick property without TypeScript complaining.
          */
          const finalizeButton = document.getElementById("finalize") as HTMLElement;
          finalizeButton.onclick = () => {
            console.log("aaaaaaaaaaa")
            //console.log(finalizeButton.innerHTML)
            //await addAllSelected(accessToken,"","");
          };
        
      break;
      case "/likes":
         console.log("likes");
         //[]Why do I have to define this outside of the switch?
         //const likes=await getProfileLikes(accessToken,0);// gets first 50 items because the offset is 0

         //###old syntax which didnt work for likes
         //startPlayback(accessToken, '1rjqDQFGg6K6K...', 0,true);
         populateWithPlaylist(accessToken, profile, likes);
      break;
      case "/search":
         console.log("search");
         
         const track=await searchTrack(accessToken,"3's & 7's","Queens of the Stone Age");
         console.log(track)
         populateWithQueryResponse(accessToken, track);
         //startPlayback(accessToken, track.track.id, 0);
         
      break;
      default: console.log("default");
    }



//
    
  }
})
}

/*
async function addAllSelected(accessToken:string,playlistId:string,trackId:string){
  console.log(accessToken)
  const temp=false
  if(temp){
    addToPlaylist(accessToken,playlistId,trackId)
  }
}
*/
function populateWithPlaylist(accessToken:string|null, profile:UserProfile, playlist:Playlist,dropdown:boolean=false) {

  //Probably unnedded
  
  const allButtons = document.querySelectorAll('button');
  allButtons.forEach(button=>{
    if(button.textContent?.trim().toLowerCase()==='play'){
      button.remove();
    }
  })




  if (profile.images[0]) {
    const profileImage = new Image(200, 200);
    profileImage.src = profile.images[0].url;
    document.getElementById("avatar")?.appendChild(profileImage); //fixes the object possibly null error coallescence operator?
  }
  //console.log(playlist.items);
  
  let trackId:string
  let button
    playlist.items.forEach((tracks:PlaylistTracks, index:number) => {
      //this gets reassigned, and theres no way to assi
      trackId = tracks.track.id
      //console.log(trackId)
      //[]***This works here but gets set to the very last track by the time it comes around to start pressing buttons
      //startplayback funciton gets bound to the very last value of trackId instead of mapped to each tracks.track.id

      const listElement = document.createElement("li");
      //const comboElement = <comboBox></comboBox>
      listElement.setAttribute('id', trackId)


      const playbackElement = document.createElement("button");
      playbackElement.setAttribute('id', 'button' + trackId)
      playbackElement.textContent = 'play';
      const artistNames = tracks.track.artists.map(artist => artist.name).join(", ");
      listElement.textContent = tracks.track.name + " - " + artistNames;
      //listElement.textContent = playlist.id + " name: " + playlist.name;
      document.getElementById("pl")?.appendChild(listElement);
      //console.log(tracks.id); //doesnt print if theres wrong code above
      //document.getElementById(playlist.id).appendChild(comboElement);
      document.getElementById(trackId)?.appendChild(playbackElement);

      if(dropdown){
        const dropDownElement = document.createElement("span");
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
                    <option value="None">None</option>
                </optgroup>
            </select>
        `
/*
                <optgroup label="Deselect">
                    <option value="none">None</option>
                </optgroup>
*/

        
        const selectedElement = document.createElement("b");
        selectedElement.setAttribute('id', "sel-id")
        selectedElement.textContent='None'
        selectedElement.style.paddingLeft='1rem';          
         selectedElement.style.paddingRight='1rem';
        document.getElementById(trackId)?.appendChild(selectedElement);
        document.getElementById(trackId)?.appendChild(dropDownElement);
        
        dropDownElement.children[1].addEventListener('change', (event:Event) => {
          const select = event.target as HTMLSelectElement;
          //select.setAttribute('selected','true')
          selectedElement.textContent=select.value;          
          console.log(select.value);
        });

        //###Multiple elements with the same id
        const playlistIdElement = document.createElement("i");
        playlistIdElement.setAttribute('id', "pl-id")
        playlistIdElement.textContent=playlist.href
        
        document.getElementById(trackId)?.appendChild(playlistIdElement);


      }


      function getPlaylistId(url:string) {
        const regex = /\/playlists\/([^/?]+)/;
        const match = url.match(regex);
        return match ? match[1] : null;
      }
      
      //[] %%% why does it reandomly ask me if string|null
      const url = playlist.href;
      const extractedPlaylistId = getPlaylistId(url);

      button = document.getElementById('button' + trackId);

      if (button) {
        button.onclick = function () {

          //[]ideally i should create a variable for when likes module is being used instead of use dropdown
          //if dropdown is false
          if(dropdown){
            //***this works */
            startPlayback(accessToken,extractedPlaylistId, index,false,trackId);
          }else{
            //startplackback using uri instead of contextUri
            //**this cant use trackId */
            startPlayback(accessToken, '1rjqDQFGg6K6K...',index,true,tracks.track.id);
          }
          

          //startPlayback(accessToken, extractedPlaylistId, index);
        };
      }

      
    }) 

}

//%%% learnt if i set param playlist to type PlaylistTrack it will expose properties
//that I HAVE defined. not the correct ones
//search query returns type QueryTracks

//Can I use all the properties of SearchedTracks without exposing children props? yes
function populateWithQueryResponse(accessToken:string|null, playlist:SearchedTracks) {  
  let trackId:string
  console.log(playlist);
  playlist.tracks.items.forEach((tracks:TrackItems) => {
    //this gets reassigned, and theres no way to assi
    trackId = tracks.id
    //console.log(trackId)
    //[]***This works here but gets set to the very last track by the time it comes around to start pressing buttons
    //startplayback funciton gets bound to the very last value of trackId instead of mapped to each tracks.track.id

    const listElement = document.createElement("li");
    //const comboElement = <comboBox></comboBox>
    listElement.setAttribute('id', trackId)
    //console.log(playlist.items);
    listElement.textContent = tracks.name;
    //listElement.setAttribute('id', playlist.track.id)
    //listElement.textContent = playlist.track.artists + " name: " + playlist.track.name;
    document.getElementById("pl")?.appendChild(listElement);
    })
}


async function getProfile(token: string|null): Promise<UserProfile> {
  const result = await fetch("https://api.spotify.com/v1/me", {
      method: "GET", headers: { Authorization: `Bearer ${token}` }
  });

  return await result.json();
}

async function getProfileLikes(accessToken:string, offset:number) {
  //GET `https://api.spotify.com/v1/me/tracks?limit=50&offset=${}`
  const result = await fetch(`https://api.spotify.com/v1/me/tracks?limit=50&offset=${offset}`, {
    method: "GET", headers: { Authorization: `Bearer ${accessToken}` }
  });

  return await result.json();
}



//you cannot use an if with typeof on interfaces
interface UserProfile {
  country: string;
  display_name: string;
  email: string;
  explicit_content: {
      filter_enabled: boolean,
      filter_locked: boolean
  },
  external_urls: { spotify: string; };
  followers: { href: string; total: number; };
  href: string;
  id: string;
  images: Image[];
  product: string;
  type: string;
  uri: string;
}

interface Image {
  url: string;
  height: number;
  width: number;
}