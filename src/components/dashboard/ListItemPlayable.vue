<script setup lang="ts">
import PlaylistSortDropdown from './PlaylistSortDropdown.vue';

//trackElement span has trackID <playbackElement,dropdownElement
//listElememnt li has track names
//li must contain span?

const testArray:string[]=['a','b']

</script>

<template>

    <div>listElement vs trackElement? we dont really need list with v-for</div>
    <PlaylistSortDropdown msg="hello"></PlaylistSortDropdown>
    
    <div v-for="(items,index) in testArray" :key="index">
        <span>{{items}}</span>   <button>Play Icon</button>
    </div>
    



</template>

<style scoped>

</style>
