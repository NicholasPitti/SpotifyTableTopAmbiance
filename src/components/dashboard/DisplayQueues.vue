<script setup lang="ts">
import {toRef} from 'vue'
import { useAccessTokenStore } from '@/stores/accessToken';
const accesstokenStore=useAccessTokenStore();
const accessToken=await accesstokenStore.storedToken;
console.log(accessToken)

 const props = defineProps<{
  queues: string[]
}>()

const queuesRef = toRef(props,'queues');


</script>

<template>
    <div v-for="(items,index) in queuesRef" :key="index">
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
</style>
