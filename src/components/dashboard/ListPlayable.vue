<script setup lang="ts">
import {ref,toRef} from 'vue';
import PlaylistSortDropdown from './PlaylistSortDropdown.vue';
import { getPlaylistItems } from '../spotifyMethods/playlistMethods';
//import { getPlaylistCollection } from '../spotifyMethods/playlistMethods';
import { type Playlist } from '../spotifyMethods/playlistMethods';
//import { type PlaylistTracks } from '../spotifyMethods/playlistMethods';
import TrackPlayButton from './TrackPlayButton.vue';
import { useTrackStore } from '../../stores/clickedTrack'
const store = useTrackStore()


const props = defineProps<{
  id: string
}>()

const playlistIdRef = toRef(props,'id');
const playlist = ref<Playlist|null>(null);

const accessToken=localStorage.getItem('access_token')
playlist.value = await getPlaylistItems(accessToken, playlistIdRef.value);

//const playlist =await getPlaylistCollection(accessToken)

</script>

<template>

    <div class="my-1">
        <div  v-for="(items,index) in playlist?.items" :key="index">
            <button class="mr-1" @click=(store.addTrack(items.track.name,items.track.id))>+</button>
            <span>
                {{items.track.name}}
            </span> 
            <TrackPlayButton :playId="items.track.id"></TrackPlayButton>
            <PlaylistSortDropdown></PlaylistSortDropdown>
        </div>
    </div>
    <div>-</div>
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
