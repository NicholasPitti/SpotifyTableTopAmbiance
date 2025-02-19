<script setup lang="ts">
import {ref,toRef} from 'vue'
//import { useAccessTokenStore } from '@/stores/accessToken';
import JsonEditorVue from 'json-editor-vue'
import 'vanilla-jsoneditor/themes/jse-theme-dark.css'
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
const selectedQueueKey=ref(0)
//(queuesRef.${selectedQueue})
selectedQueueKey.value=1

//track
//id
console.log("boi")
//console.log(queuesRef.value['q1'])
//[queueKeys[selectedQueueKey.value]
console.log(queuesRef.value['q1'][1].trackName);
</script>

<template>

  <JsonEditorVue
  class="json-editor-custom jse-theme-dark"
    v-model="queuesRef"
    v-bind="{/* local props & attrs */}"
  />

  <div v-for="(items,index) in queuesRef[queueKeys[selectedQueueKey]]" :key="index">
        {{ items }}
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
.json-editor-custom{
    /*border: none;
       background-color: hsla(0 0 0 / 0%);*/
    border:solid;
    border-width: 0.1rem;
    background-color:#fff;
    color:white;
}
</style>
