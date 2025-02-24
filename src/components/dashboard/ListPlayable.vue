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

const showActionFormat = ref(true);
const showQueueFormat = ref(false);
const showNameFormat = ref(false);

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

    showActionFormat.value=true
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
//this works without async and await keywords
async function sortToPlaylist(){
console.log("add")

const dropdowns = document.querySelectorAll<HTMLSelectElement>('[id^="dropdown"]');
  dropdowns.forEach(async (select) => {
    const selectedValue = select.value;
    if (selectedValue !== 'None') {
      console.log("added " + selectedValue);
      if (selectedValue && select) {
        await addToPlaylist(accessToken, playlistNameIdDict[selectedValue], getDropdownId(select.id));
      }
    }
  });

}



const playlistTracks = ref<PlaylistTracks[]|undefined>(playlist.value?.items);

import { duplicatePlaylist } from '../spotifyMethods/playlistMethods';


async function dupePlaylist(){
  ///duplicate"  =   ///get all playlists
      //do i need to use await here?
          //const playlistTracks = playlist.value?.items as PlaylistTracks[];
      //playlist object and type should have a name atribute but dont so newPlaylist will be the placeholder name
      
      if(playlistTracks.value)
      await duplicatePlaylist(accessToken,"newPlaylist",playlistTracks.value);
}


function toggleQueueFormat(){
    showQueueFormat.value=!showQueueFormat.value
}

function toggleActionFormat(){
    showActionFormat.value=!showActionFormat.value
}

function toggleNameFormat(){
  showNameFormat.value=!showNameFormat.value
}

function getDropdownId(url:string) {
        const regex = /dropdown([^/?]+)/
        const match = url?.match(regex)
        return match ? match[1] : ''
 }


</script>

<template>

  <SyncOutlined @click="refreshTracks" class="reload-btn"/>
  <button @click="toggleActionFormat">Action Format</button>
  <button @click="toggleQueueFormat">Queue Format</button>
  <button @click="toggleNameFormat">Name Format</button>
      <div class="my-1" v-if="showActionFormat">
          <div  v-for="(items,index) in playlist?.items" :key="index">
              <button class="mr-1" @click=(trackStore.addTrack(items.track.name,items.track.id))>+</button>
              <span>
                  {{items.track.name}}-{{  }}
              </span> 
              <TrackPlayButton :playId="items.track.id"></TrackPlayButton>
              <PlaylistSortDropdown :dropDownId="items.track.id"></PlaylistSortDropdown>
          </div>
      </div>
 
    <div class="my-1" v-if="showQueueFormat">
        <div  v-for="(items,index) in playlist?.items" :key="index">
            <span>
               {{ `{ "trackName": "${items.track.name}" , "trackId": "${items.track.id}" }, ` }}  
              </span> 
        </div>
    </div>

    <div class="my-1" v-if="showNameFormat">
        <div  v-for="(items,index) in playlist?.items" :key="index">
            <span>
               {{items.track.name}} - {{ items.track.artists[0].name }} 
              </span> 
        </div>
    </div>


    <div></div>
    <button @click="sortToPlaylist">Add to playlists</button>
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
