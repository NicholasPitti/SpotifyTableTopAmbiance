<script setup lang="ts">
import {processSpotifyRequests} from '../components/spotify/spotifyScript'
import { addToPlaylist } from '@/components/spotify/playlistMethods';
//import $ from "jquery";
//import {ref} from 'vue'
//isnt this more like populate X-Views?
processSpotifyRequests("/");

const accessToken = localStorage.getItem('access_token');
console.log(accessToken);

//const alertMsg = ref('Items added to playlists')

type StringDictionary = { [key: string]: string };

const playlistNameIdDict:StringDictionary={
  Light: "4g60dLDke6ZgoGJTR15b7E",
Adventure:"5nY0BsxAZC2NA8pNTk6oT5",
Sneaky:"2monNZRe6ZpMSVbNk8Yjr8",
Unknown:"10dsLCsG0WyW2CH3QXNMnz",
Unrest:"5sARTZvcPl114hXuI8ephI",
Combat:"3MmUB7ybRte6AT2ytYRr16",
Epic:"4EgbdcV25NI4Qz17X4qTo5"
};

function addToPlaylistAlert() {
  //alert(`Alert: ${alertMsg.value}!`)
  // `event` is the native DOM event
  /*
  //requires event param
  if (event) {
    alert(event.target.textContent)
  }
  */
  //addToPlaylist(accessToken,"","");
  //Get button || li ids and put them in an array
  //pass that array as the uri []
  console.log("current test");
  //const allDropdowns=document.querySelectorAll('[id*="dropdown"]');
  const selectedOption=document.querySelectorAll('[id*="sel-id"]');
  //const allSelected=document.querySelectorAll('[selected]');
  //console.log(allDropdowns[0].children[0].ELEMENT_NODE);
  
  //why is this undefined?
  let trackIdFromList:string|null|undefined
  selectedOption.forEach((item)=>{
    if(!item.textContent?.includes('None')){
      const selectedText:string|null=item.textContent
      console.log("add"+selectedText)
      //const child=item
      trackIdFromList=item.closest('li')?.getAttribute('id');
      console.log(trackIdFromList)
      if(selectedText&&trackIdFromList)
        addToPlaylist(accessToken,playlistNameIdDict[selectedText],trackIdFromList)
      //console.log(playlistNameIdDict[selectedText]+"/"+trackIdFromList)
      
    }
  })
  //console.log(selectedOption[0].textContent);
}

const temp=false
if(temp){
  addToPlaylist(accessToken,"","");
}


//event handling
//And also grab all the buttons, and lis
//get the track id
//get the playlist id from

</script>

<template>
      <section id="profile">
      <h2>Logged in as <span id="displayName"></span></h2>
      <span id="avatar"></span>
      <button @click="addToPlaylistAlert">FinalizeAlert</button>

      <button id="finalize">
            Finalize
      </button>
      <ul>
        <ul id="pl">
          <li style="list-style-type:none;"><b> PLAYLIST: </b><i id="pl-id">id</i>   </li>
        </ul>
      </ul>
    </section>
</template>

<style scoped>
button {
  font-weight: bold;
  border-radius: 0.5rem;
}

select {
  border-radius: 0.5rem;
}

</style>
