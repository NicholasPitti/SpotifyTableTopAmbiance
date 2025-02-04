<script setup lang="ts">
import {processSpotifyRequests} from '../components/spotifyMethods/spotifyScript'
processSpotifyRequests("/search")
//Using this module too many times in quick sucession will cause results to be slow for a moment.
//this module should be a component that is used in all other modules, as a supplementary tool
//also under the navbar should be a list of existing playlists with their title & cover images

</script>

<template>
  <div class="search">
    <section id="profile">
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
