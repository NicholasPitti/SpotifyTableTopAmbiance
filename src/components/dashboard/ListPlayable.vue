<script setup lang="ts">
import PlaylistSortDropdown from './PlaylistSortDropdown.vue';
import { CaretRightFilled } from "@ant-design/icons-vue"
//https://2x.antdv.com/components/icon

//trackElement span has trackID <playbackElement,dropdownElement
//listElememnt li has track names
//li must contain span?

const testArray:string[]=['actual track','seriously use actual track data']

</script>

<template>
   
    <div v-for="(items,index) in testArray" :key="index">
        <span>{{items}}</span>   <button class="playButton"><CaretRightFilled/></button>
        <PlaylistSortDropdown msg="hello"></PlaylistSortDropdown>
    </div>
    
    <div>listElement vs trackElement? we dont really need list with v-for</div>
    


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
