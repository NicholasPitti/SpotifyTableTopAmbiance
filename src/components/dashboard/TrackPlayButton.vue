<script setup lang="ts">
import { CaretRightFilled } from "@ant-design/icons-vue"; //https://2x.antdv.com/components/icon
import { startPlayback} from '../spotifyMethods/playbackMethods';
const accessToken=localStorage.getItem('access_token')


const props = defineProps<{
  //queues: {[key: string]: string[]}
playId:string

}>()

function play(){
//startPlayback(accessToken,extractedPlaylistId, index,false,buttonTrack)
//startPlayback(accessToken, '1rjqDQFGg6K6K...',index,true,tracks.track.id)
//console.log("play"+props.playId)

//2nd and 3rd arguments arent being used because we have the track id=props.playId
startPlayback(accessToken, '',0,true,props.playId)
}

</script>

<template>

<button class="playButton" @click="play"><CaretRightFilled/></button>

</template>

<style scoped>
.view-container{
    border:solid;
    border-width: 0.1rem;
    border-color:#fff;
    background-color:#1e1e1e;
    color:#706752;
    padding:0.5rem;
}
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
