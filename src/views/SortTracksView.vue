<script setup lang="ts">
import {processSpotifyRequests} from '../components/spotify/spotifyScript'
import { addToPlaylist } from '@/components/spotify/playlistMethods'
processSpotifyRequests("/sort")

const accessToken = localStorage.getItem('access_token')
console.log(accessToken)

type StringDictionary = { [key: string]: string }

const playlistNameIdDict:StringDictionary={
  Light: "4g60dLDke6ZgoGJTR15b7E",
  Adventure:"5nY0BsxAZC2NA8pNTk6oT5",
  Sneaky:"2monNZRe6ZpMSVbNk8Yjr8",
  Unknown:"10dsLCsG0WyW2CH3QXNMnz",
  Unrest:"5sARTZvcPl114hXuI8ephI",
  Combat:"3MmUB7ybRte6AT2ytYRr16",
  Epic:"4EgbdcV25NI4Qz17X4qTo5"
}

function addToPlaylistAlert() {
  const alertMsg="Finalized adding to playlists"
  alert(`Alert: ${alertMsg}!`)

  const dropdowns = document.querySelectorAll<HTMLSelectElement>('[id^="dropdown"]');
  let trackIdFromList: string | null | undefined;
  dropdowns.forEach((select) => {
    const selectedValue = select.value;
    if (selectedValue !== 'None') {
      console.log("added " + selectedValue);
      trackIdFromList = select.closest('li')?.getAttribute('id');
      console.log(trackIdFromList);
      if (selectedValue && trackIdFromList) {
        addToPlaylist(accessToken, playlistNameIdDict[selectedValue], trackIdFromList);
      }
    }
  });
  /*
  const dropdowns = document.querySelectorAll('[id^="dropdown"]');
  let trackIdFromList:string|null|undefined
  dropdowns.forEach((item)=>{
    if(!item.textContent?.includes('None')){
      const selectedText:string|null=item.textContent
      console.log("add"+selectedText)
      trackIdFromList=item.closest('li')?.getAttribute('id')
      console.log(trackIdFromList)
      if(selectedText&&trackIdFromList){
        addToPlaylist(accessToken,playlistNameIdDict[selectedText],trackIdFromList)
      }        
    }
  })
  */
}

</script>

<template>
      <section id="profile">
      <h2>Logged in</h2>
      <button @click="addToPlaylistAlert">Add to playlists</button>
      <ul>
        <ul id="pl">
          <li style="list-style-type:none;"><b> PLAYLIST: </b><i id="pl-id">id for currently displayed playlist pending from dashboard...</i>   </li>
        </ul>
      </ul>
    </section>
</template>

<style scoped>
ul{
  padding:0;
}
button {
  font-weight: bold;
  border-radius: 0.5rem;
}

select {
  border-radius: 0.5rem;
}

</style>
