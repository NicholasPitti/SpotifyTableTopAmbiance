<script setup lang="ts">
import { SearchOutlined } from "@ant-design/icons-vue";
//import { searchTrack, type SearchedTracks, type TrackItems } from './searchMethods'
import { searchTrack } from '../spotifyMethods/searchMethods'
import { useAccessTokenStore } from '@/stores/accessToken';
import { ref } from 'vue';
const show = ref(false);
const searchResults = ref('');
const accesstokenStore=useAccessTokenStore();
const accessToken=accesstokenStore.storedToken;

function toggleShow(){
    show.value=!show.value
}

function searchTracks(){
    searchResults.value="searched"
    console.log(searchTrack(accessToken,"Freedom Club","",1));
    show.value=true
}

</script>

<template>

    <div class="bg-dark">
        <h4>Search Form with placeholder</h4>   <button @click="searchTracks"><SearchOutlined /></button>
        <button @click="toggleShow">Toggle Search Results</button>
        <Transition name="bounce">
        <p v-if="show" style="text-align: center;">
           {{searchResults}}
        </p>
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
