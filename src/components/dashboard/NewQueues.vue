<script setup lang="ts">
import {ref} from 'vue'
import { useTrackStore } from '../../stores/clickedTrack'
const store = useTrackStore()

function removeTodo(item:{trackName: string, trackId: string,  }) {
    store.removeTrack(item)
}
const showRemoveButton = ref(true);

function toggleShowRemoveButtons(){
    showRemoveButton.value=!showRemoveButton.value
}

</script>

<template>
<button @click="toggleShowRemoveButtons">Toggle X buttons</button>
    <ul>
      <li v-for="(item,index) in store.tracks" :key="index">
        <button v-if="showRemoveButton" @click="removeTodo(item)" class="ml-1"> <span >X</span> </button>
        <span class="ml-1">{{item}},</span>
      </li>
    </ul>
  </template>

 <style scoped >
  .ml-1{
    margin-left:1rem;
  }
  ul{
    list-style-type: none !important ;
  }
</style>