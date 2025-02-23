<script setup lang="ts">
import {ref} from 'vue';
import PlaylistSortDropdown from './PlaylistSortDropdown.vue';
import { getPlaylistItems,addToPlaylist,getProfileLikes } from '../spotifyMethods/playlistMethods';
//import { getPlaylistCollection } from '../spotifyMethods/playlistMethods';
import { type Playlist,type PlaylistTracks } from '../spotifyMethods/playlistMethods';
//import { type PlaylistTracks } from '../spotifyMethods/playlistMethods';
import TrackPlayButton from './TrackPlayButton.vue';
import {SyncOutlined } from "@ant-design/icons-vue"; //https://2x.antdv.com/components/icon

import { useTrackStore } from '../../stores/clickedTrack'
import { usePlaylistStore } from '@/stores/clickedPlaylist';
const trackStore = useTrackStore()
const playlistStore=usePlaylistStore()

const hasNormalFormat = ref(true);


const props = defineProps<{
  likes: boolean
}>()

//const playlistIdRef = toRef(props,'id');


const playlist = ref<Playlist|null>(null);
const accessToken=localStorage.getItem('access_token')

// else if(accessToken && playlist){


async function refreshTracks(){
    //console.log(searchTrackName.value)
    if(accessToken){
      if(props.likes){
        playlist.value=await getProfileLikes(accessToken,0); 
      }
      else{
        playlist.value = await getPlaylistItems(accessToken, playlistStore.playlist);
      }
    }

    hasNormalFormat.value=true
}

type StringDictionary = { [key: string]: string }

const playlistNameIdDict:StringDictionary={
  Light: "4g60dLDke6ZgoGJTR15b7E",
  Adventure:"5nY0BsxAZC2NA8pNTk6oT5",
  Sneak:"2monNZRe6ZpMSVbNk8Yjr8",
  Unknown:"10dsLCsG0WyW2CH3QXNMnz",
  Combat:"5sARTZvcPl114hXuI8ephI",
  Epic:"3MmUB7ybRte6AT2ytYRr16",
  Misc:"4EgbdcV25NI4Qz17X4qTo5"
}

//const playlist =await getPlaylistCollection(accessToken)
async function addToPlaylistAlert(){
console.log("add")

const dropdowns = document.querySelectorAll<HTMLSelectElement>('[id^="dropdown"]');
  dropdowns.forEach((select) => {
    const selectedValue = select.value;
    if (selectedValue !== 'None') {
      console.log("added " + selectedValue);
      if (selectedValue && select) {
        addToPlaylist(accessToken, playlistNameIdDict[selectedValue], getDropdownId(select.id));
      }
    }
  });

}

function getDropdownId(url:string) {
        const regex = /dropdown([^/?]+)/
        const match = url?.match(regex)
        return match ? match[1] : ''
 }

const hasQueueFormat = ref(false);

function toggleQueueFormat(){
    hasQueueFormat.value=!hasQueueFormat.value
}

function toggleNormalFormat(){
    hasNormalFormat.value=!hasNormalFormat.value
}


import { duplicatePlaylist } from '../spotifyMethods/playlistMethods';
async function dupePlaylist(){
  ///duplicate"  =   ///get all playlists
      //Name form
      //const playlistTracks = playlist.value.items as PlaylistTracks[];
      //const newPlaylist=await duplicatePlaylist(accessToken,"newPlaylistTest",playlist.value?.items as PlaylistTracks)
      //console.log(newPlaylist)
    }


</script>

<template>

  <SyncOutlined @click="refreshTracks" class="reload-btn"/>
  <button @click="toggleNormalFormat">Normal Format</button>
  <button @click="toggleQueueFormat">Queue Format</button>
      <div class="my-1" v-if="hasNormalFormat">
          <div  v-for="(items,index) in playlist?.items" :key="index">
              <button class="mr-1" @click=(trackStore.addTrack(items.track.name,items.track.id))>+</button>
              <span>
                  {{items.track.name}}
              </span> 
              <TrackPlayButton :playId="items.track.id"></TrackPlayButton>
              <PlaylistSortDropdown :dropDownId="items.track.id"></PlaylistSortDropdown>
          </div>
      </div>
 
    <div class="my-1" v-if="hasQueueFormat">
        <div  v-for="(items,index) in playlist?.items" :key="index">
            <span>
               {{ `{ "trackName": "${items.track.name}" , "trackId": "${items.track.id}" }, ` }}  
              </span> 
        </div>
    </div>
    <div></div>
    <button @click="addToPlaylistAlert">Add to playlists</button>
    <button @click="dupePlaylist">Duplicate Playlist</button>
</template>



<style scoped>
.reload-btn{
    background-color: #fff;
    margin-right: 1rem;
    font-size: x-large;
    border-radius:0.2rem;
    padding:0.5rem;
}

.my-1{
    margin-top: 1rem;
    margin-bottom: 1rem;
}
.mr-1{
    margin-right:1rem;
}
.playButton{
    /*border: none;*/
    border:solid;
    border-width: 0.1rem;
    border-radius:1rem;
    margin-left:1rem;
    background-color: hsla(0 0 0 / 0%);
    color:#0a7a55;
}

</style>
