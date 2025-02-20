<script setup lang="ts">
import { SearchOutlined } from "@ant-design/icons-vue";
//import { searchTrack, type SearchedTracks, type TrackItems } from '../spotifyMethods/searchMethods'
import { searchTrack, type SearchedTracks } from '../spotifyMethods/searchMethods'
import { useAccessTokenStore } from '@/stores/accessToken';
import { ref } from 'vue';

//required so that search results can utilize accessToken
import App from '../../App.vue'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
const pinia = createPinia()
const app = createApp(App)
app.use(pinia)

const show = ref(false);
//const searchResults = ref<SearchedTracks|TrackItems|null>(null);
const searchResults = ref<SearchedTracks|null>(null);



const accesstokenStore=useAccessTokenStore();
const accessToken=accesstokenStore.storedToken;
//console.log(accessToken)

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
        <button @click="searchTracks"><SearchOutlined /></button>
        <button @click="toggleShow">Toggle Search</button>
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
