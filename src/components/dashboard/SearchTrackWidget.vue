<script setup lang="ts">
import { SearchOutlined } from "@ant-design/icons-vue"
</script>

<template>

    <div class="bg-dark">
        <h1>Search Form with placeholder</h1>   <button class="playButton"><SearchOutlined /></button>
    </div>



</template>

<style scoped>
.bg-dark{
    background-color: black;
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
