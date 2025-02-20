<script setup lang="ts">
import {ref} from 'vue';
import { MenuOutlined } from "@ant-design/icons-vue";
const show = ref(false);

function toggleShow(){
    show.value=!show.value
}

defineProps<{
title:string;
}>();

</script>

<template>
    <div class="view-container">
        <MenuOutlined @click="toggleShow" />
        <h3>{{title}}</h3>
        <slot v-if="show"></slot>
    </div>
</template>



<style scoped>
.view-container{
    border:solid;
    border-width: 0.1rem;
    border-color:#fff;
    background-color:#1e1e1e;
    padding:0.5rem;
    margin-bottom:1rem;
}

</style>
