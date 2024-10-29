<script setup lang="ts">
import {processSpotifyRequests} from '../components/spotify/spotifyScript'
processSpotifyRequests("/likes");
</script>

<template>
  <div class="likes">
    <section id="profile">
  <h2>Logged in as <span id="displayName"></span></h2>
  <span id="avatar"></span>
  <ul>

    <ul id="pl">
      <li style="list-style-type:none;"><b> PLAYLIST:</b>   </li>
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
