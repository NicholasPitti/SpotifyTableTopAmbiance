<script setup lang="ts">
import {processSpotifyRequests} from '../components/spotifyMethods/spotifyScript'
processSpotifyRequests("/compendium")
</script>

<template>
  <div class="compendium">
    <div>page is in development</div>
</div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
