<script setup lang="ts">
import {ref,toRef} from 'vue'
import PlaylistSortDropdown from './PlaylistSortDropdown.vue';
import { CaretRightFilled } from "@ant-design/icons-vue" //https://2x.antdv.com/components/icon
import { useAccessTokenStore } from '@/stores/accessToken';
import { getPlaylistItems } from '../spotifyMethods/playlistMethods';
//import { getPlaylistCollection } from '../spotifyMethods/playlistMethods';
import { type Playlist } from '../spotifyMethods/playlistMethods';
//import { type PlaylistTracks } from '../spotifyMethods/playlistMethods';

const props = defineProps<{
  id: string
}>()

const playlistIdRef = toRef(props,'id');
//use client id  or just access token to assign a Interface to a ref
const playlist = ref<Playlist|null>(null);
const accesstokenStore=useAccessTokenStore();
const accessToken=await accesstokenStore.storedToken;
playlist.value=await getPlaylistItems(accessToken,playlistIdRef.value)

//THIS WASNT WORKING UNTIL I CONSOLE>LOGGED **=>only worked when logging token???
//console.log(accessToken)
//console.log(playlist.value)

//const playlist =await getPlaylistCollection(accessToken)

</script>

<template>
    <div v-for="(items,index) in playlist?.items" :key="index">
        <span>{{items.track.name}}</span> 
        <button class="playButton"><CaretRightFilled/></button>
        <PlaylistSortDropdown msg="hello"></PlaylistSortDropdown>
    </div>
</template>

<style scoped>
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
