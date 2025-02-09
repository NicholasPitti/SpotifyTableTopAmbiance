<script setup lang="ts">
import { SearchOutlined } from "@ant-design/icons-vue";
//import { searchTrack, type SearchedTracks, type TrackItems } from '../spotifyMethods/searchMethods'
import { searchTrack, type SearchedTracks } from '../spotifyMethods/searchMethods'
import { useAccessTokenStore } from '@/stores/accessToken';
import { ref } from 'vue';
const show = ref(false);
//const searchResults = ref<SearchedTracks|TrackItems|null>(null);
const searchResults = ref<SearchedTracks|null>(null);
const accesstokenStore=useAccessTokenStore();
const accessToken=accesstokenStore.storedToken;

function toggleShow(){
    show.value=!show.value
}

async function searchTracks(){
    searchResults.value= await searchTrack(accessToken,"Freedom Club","",1);
    show.value=true
}

</script>

<template>

    <div class="bg-dark">
        <h4>Search Form with placeholder</h4>   <button @click="searchTracks"><SearchOutlined /></button>
        <button @click="toggleShow">Toggle Search Results</button>
        <Transition name="bounce">
        <div v-if="show" style="text-align: center;">
            <div v-for="(tracks,index) in searchResults?.tracks.items" :key="index">
           {{tracks.name}}
            </div>
        </div>
        </Transition>
    </div>



</template>

<style scoped>
.bg-dark{
    background-color: black;
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
