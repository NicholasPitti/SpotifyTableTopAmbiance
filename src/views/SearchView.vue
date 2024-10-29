<script setup lang="ts">
import {processSpotifyRequests} from '../components/spotify/spotifyScript'
processSpotifyRequests("/search");
</script>

<template>
  <div class="search">
    <section id="profile">
  <h2>Using this module too many times in quick sucession will cause results to be slow for a moment. <span id="displayName"></span></h2>
  <span id="avatar"></span>
  <ul>

    <ul id="pl">
      <li style="list-style-type:none;"><b> Search Results:</b>   </li>
    </ul>
  </ul>
</section>
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
