<script setup lang="ts">
import {ref,toRef} from 'vue';
import PlaylistSortDropdown from './PlaylistSortDropdown.vue';
import { getPlaylistItems } from '../spotifyMethods/playlistMethods';
//import { getPlaylistCollection } from '../spotifyMethods/playlistMethods';
import { type Playlist } from '../spotifyMethods/playlistMethods';
//import { type PlaylistTracks } from '../spotifyMethods/playlistMethods';
import TrackPlayButton from './TrackPlayButton.vue';
import { addToPlaylist } from '@/components/spotifyMethods/playlistMethods'
import { useTrackStore } from '../../stores/clickedTrack'
const store = useTrackStore()


const props = defineProps<{
  id: string
}>()

const playlistIdRef = toRef(props,'id');
const playlist = ref<Playlist|null>(null);

const accessToken=localStorage.getItem('access_token')
playlist.value = await getPlaylistItems(accessToken, playlistIdRef.value);

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
function addToPlaylistAlert(){
console.log("add")

const dropdowns = document.querySelectorAll<HTMLSelectElement>('[id^="dropdown"]');
  let trackIdFromList: string | null | undefined;
  dropdowns.forEach((select) => {
    const selectedValue = select.value;
    if (selectedValue !== 'None') {
      console.log("added " + selectedValue);
      trackIdFromList = select.closest('li')?.getAttribute('id'); //
      console.log(trackIdFromList);
      if (selectedValue && trackIdFromList) {
        //addToPlaylist(accessToken, playlistNameIdDict[selectedValue], trackIdFromList);
        console.log(trackIdFromList)
      }
    }
  });

}

</script>

<template>

    <div class="my-1">
        <div  v-for="(items,index) in playlist?.items" :key="index">
            <button class="mr-1" @click=(store.addTrack(items.track.name,items.track.id))>+</button>
            <span>
                {{items.track.name}}
            </span> 
            <TrackPlayButton :playId="items.track.id"></TrackPlayButton>
            <PlaylistSortDropdown :dropDownId="items.track.id"></PlaylistSortDropdown>
        </div>
    </div>
    <button @click="addToPlaylistAlert">Add to playlists</button>
</template>



<style scoped>
.mt-1{
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
