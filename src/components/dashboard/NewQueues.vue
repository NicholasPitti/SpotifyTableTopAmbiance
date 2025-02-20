<script setup lang="ts">
import { useTrackStore } from '../../stores/clickedTrack'
const store = useTrackStore()

function removeTodo(item:{trackName: string, trackId: string,  }) {
    store.removeTrack(item)
}

</script>

<template>

    <ul>
      <li v-for="(item,index) in store.tracks" :key="index">
        <span>{{item}}</span>
        <button @click="removeTodo(item)" class="ml-1"> <span >X</span> </button>
      </li>
    </ul>
  </template>

 <style scoped >
  .ml-1{
    margin-left:1rem;
  }
</style>