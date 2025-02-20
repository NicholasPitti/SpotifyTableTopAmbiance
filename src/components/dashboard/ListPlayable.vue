<script setup lang="ts">
import {ref,toRef} from 'vue';
import { useAccessTokenStore} from '@/stores/accessToken';
import PlaylistSortDropdown from './PlaylistSortDropdown.vue';
import { CaretRightFilled } from "@ant-design/icons-vue"; //https://2x.antdv.com/components/icon
import { getPlaylistItems } from '../spotifyMethods/playlistMethods';
//import { getPlaylistCollection } from '../spotifyMethods/playlistMethods';
import { type Playlist } from '../spotifyMethods/playlistMethods';
//import { type PlaylistTracks } from '../spotifyMethods/playlistMethods';
import { storeToRefs } from 'pinia'
//This resolves the issue where the store was only showing the initialized value
import App from '../../App.vue'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
const pinia = createPinia()
const app = createApp(App)
app.use(pinia)
//
import { computed } from 'vue'


//any change made to this component will trigger the store to be updated

import { useTrackStore } from '../../stores/clickedTrack'
const store = useTrackStore()
// Now you can use store.count, store.doubleCount, and store.increment()


const props = defineProps<{
  id: string
}>()

const playlistIdRef = toRef(props,'id');
//use client id  or just access token to assign a Interface to a ref
const playlist = ref<Playlist|null>(null);


//const accesstokenStore=useAccessTokenStore();


//const accessToken=accesstokenStore.storedToken;
//console.log(accessToken)

const {storedToken}=storeToRefs(useAccessTokenStore());
console.log(storedToken.value)
/*
playlist.value=await getPlaylistItems(storedToken.value,playlistIdRef.value)
*/



/*
const accessTokenStore = useAccessTokenStore();
const computedToken=computed(() => accessTokenStore.storedToken);
const accessToken:string=computedToken.value
*/
const accessToken=localStorage.getItem('access_token')

//const accessToken:string = accessTokenStore.storedToken;

//////

console.log(accessToken)
////console.log(accessTokenStore.storedToken)
//console.log(storedToken.value)

//if (accessToken !== undefined) {

playlist.value = await getPlaylistItems(accessToken, playlistIdRef.value);
//playlist.value=await getPlaylistItems(storedToken.value,playlistIdRef.value)

//I had to make the api call or it wouldnt let me load this


//playlist.value = await getPlaylistItems(accessToken, playlistIdRef.value);


//4 turn out i need to log it before calling any funcs that use the accessToken
//3 turns out i do need to log the accesstoken
//2OK i thought it was becosue of the await, but the store is just not getting accesseed unless i log it...
//1THIS WASNT WORKING UNTIL I CONSOLE>LOGGED **=>only worked when logging token???



//console.log(playlist.value)

//const playlist =await getPlaylistCollection(accessToken)
const show = ref(false);
function toggleShow(){
    show.value=!show.value
}

</script>

<template>
    <button @click="toggleShow">Toggle Playlist</button>
    <div v-if="show">
        <div  v-for="(items,index) in playlist?.items" :key="index">
            <span  @click=(store.setTrack(items.track.name))>
                {{items.track.name}}
            </span> 
            <button class="playButton"><CaretRightFilled/></button>
            <PlaylistSortDropdown></PlaylistSortDropdown>
        </div>
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
