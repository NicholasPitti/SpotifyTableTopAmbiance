<script setup lang="ts">
//import {ref,toRef} from 'vue'
import { useAccessTokenStore } from '@/stores/accessToken';
//import { addToQueue } from '../spotifyMethods/playbackMethods';
const accesstokenStore=useAccessTokenStore();
const accessToken=await accesstokenStore.storedToken;
console.log(accessToken)

/**
 const props = defineProps<{
  id: string
}>()

const playlistIdRef = toRef(props,'id');
//use client id  or just access token to assign a Interface to a ref
const playlist = ref<Playlist|null>(null);

playlist.value=await getPlaylistItems(accessToken,playlistIdRef.value)
 */

</script>

<template>
    <div>

       

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
