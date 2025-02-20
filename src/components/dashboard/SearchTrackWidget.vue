<script setup lang="ts">
import { SearchOutlined } from "@ant-design/icons-vue";
//import { searchTrack, type SearchedTracks, type TrackItems } from '../spotifyMethods/searchMethods'
import { searchTrack, type SearchedTracks } from '../spotifyMethods/searchMethods'
import { ref } from 'vue';
import TrackPlayButton from './TrackPlayButton.vue';
import { useTrackStore } from '../../stores/clickedTrack'
const store = useTrackStore()

const show = ref(false);
//const searchResults = ref<SearchedTracks|TrackItems|null>(null);
const searchResults = ref<SearchedTracks|null>(null);

const accessToken=localStorage.getItem('access_token')

const newSearch = ref('')
const searchTrackName = ref('')

async function searchTracks(){
    console.log(searchTrackName.value)
    searchTrackName.value=newSearch.value
    console.log(searchTrackName.value)
    if(accessToken){
        searchResults.value= await searchTrack(accessToken,searchTrackName.value,"",1);
    }
    show.value=true
    newSearch.value = ''
}

//Removed style from search results
// style="text-align: center;"
</script>

<template>

    <div>

        <form @submit.prevent="searchTracks">
            <input v-model="newSearch" required placeholder="Enter the name of a song">
            <button class="search-btn"><SearchOutlined /></button>
        </form>

        <Transition name="bounce">
        <div v-if="show">
            <div v-for="(tracks,index) in searchResults?.tracks.items" :key="index">
                <button class="mr-1" @click=(store.addTrack(tracks.name,tracks.id))>+</button>
                {{tracks.name}} - {{tracks.id}}
                <TrackPlayButton :playId="tracks.id"></TrackPlayButton>
            </div>
        </div>
        </Transition>
    </div>



</template>

<style scoped>

.search-btn{
  border:solid;
    border-width: 0.2rem;
    border-color:#fff;
    border-radius:1rem;
    color:#00983a;
    margin-bottom: 1rem;
}

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
