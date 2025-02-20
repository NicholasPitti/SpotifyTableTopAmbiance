<script setup lang="ts">
import {ref,toRef} from 'vue'
//import { useAccessTokenStore } from '@/stores/accessToken';
import JsonEditorVue from 'json-editor-vue'
import 'vanilla-jsoneditor/themes/jse-theme-dark.css'
import SavedQueuesDropdown from './SavedQueuesDropdown.vue';

//required so that accessToken store works
import App from '../../App.vue'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
const pinia = createPinia()
const app = createApp(App)
app.use(pinia)


//const accesstokenStore=useAccessTokenStore();
//const accessToken=accesstokenStore.storedToken;
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


</script>

<template>


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

</template>

<style scoped>
.ml-1{
  margin-left: 1rem;
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
