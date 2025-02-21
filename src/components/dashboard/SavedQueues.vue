<script setup lang="ts">
import {ref,toRef} from 'vue'
import JsonEditorVue from 'json-editor-vue'
import 'vanilla-jsoneditor/themes/jse-theme-dark.css'
import SavedQueuesDropdown from './SavedQueuesDropdown.vue';
import { addToQueue } from '../spotifyMethods/playbackMethods';

 const props = defineProps<{
  //queues: {[key: string]: string[]}
  queues: {
    [key: string]: {trackName:string,trackId:string }[]
  };

}>()

const queuesRef = toRef(props,'queues');
//console.log(queuesRef)

//donto forget to use value
const queueKeys=(Object.keys(queuesRef.value))
const selectedQueueKey=ref('0')
//(queuesRef.${selectedQueue})
selectedQueueKey.value='1'
const handleQueueChange = (newValue:string) => {
  console.log('Selected queue changed:', newValue);
  // You can perform any additional actions here when the queue changes
};

//track
//id
//console.log(queueKeys[selectedQueueKey.value])
//console.log(queuesRef.value['q1'])
//[queueKeys[selectedQueueKey.value]
//console.log(queuesRef.value['q1'][1].trackName);

const show = ref(false);
/*
function toggleShow(){
    show.value=!show.value
}
<button @click="toggleShow" class="">Toggle Json</button>
 */

 
const accessToken=localStorage.getItem('access_token')

//This functions queues tracks from a Queue that already exists in the json file
function queueTracks(tracks:{trackName:string,trackId:string}[]){
  //tracks to queue need to be emitted by the queuelist dropdown selection
  //console.log(tracks.trackId)
  //tracks.forEach((item)=>{ console.log(item.trackId)})
  
  //const tracksToQueue=["16obHUJN0KaqVyCaV3GwFX","16obHUJN0KaqVyCaV3GwFX"]
  if(accessToken){
    tracks.forEach((item)=>{ 
      addToQueue(accessToken,item.trackId) 
      console.log(item.trackId)
    })

  }


}


</script>

<template>

<div>
  <div v-if="show">
    <JsonEditorVue
    class="jse-theme-dark"
      v-model="queuesRef"
      v-bind="{/* local props & attrs */}"
    />
  </div>
  <SavedQueuesDropdown :existing-queues="queueKeys" v-model="selectedQueueKey"  @change="handleQueueChange"></SavedQueuesDropdown>

  <div class="" v-for="(items,index) in queuesRef[queueKeys[Number(selectedQueueKey)]]" :key="index">
        {{ items.trackName }}
    </div>
   <button @click="queueTracks(queuesRef[queueKeys[Number(selectedQueueKey)]])" class="queue-btn">Queue Tracks</button>
</div>

</template>

<style scoped>
.view-container{
    border:solid;
    border-width: 0.1rem;
    border-color:#fff;
    background-color:#1e1e1e;
    color:white;
    padding:0.5rem;
}
.ml-1{
  margin-left: 1rem;
}
.queue-btn{
  border:solid;
    border-width: 0.2rem;
    border-color:#fff;
    border-radius:1rem;
    color:#00983a;
    margin-bottom: 1rem;
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
.json-editor-custom{
    /*border: none;
       background-color: hsla(0 0 0 / 0%);*/
    border:solid;
    border-width: 0.1rem;
    background-color:#fff;
    color:white;
}
</style>
