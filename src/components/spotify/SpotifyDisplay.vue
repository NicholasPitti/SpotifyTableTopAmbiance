<script setup lang="ts">
//import {processSpotifyRequests} from './spotifyScript'
//processSpotifyRequests('/')
//!! this isnt being used
</script>

<template>
      <section id="profile">
      <h2>Logged in as <span id="displayName"></span></h2>
      <span id="avatar"></span>
      <ul>

        <ul id="pl">
          <li style="list-style-type:none;"><b> PLAYLIST:</b>   </li>
        </ul>
      </ul>
    </section>
</template>

<style scoped>
button {
  font-weight: bold;
  border-radius: 0.5rem;
}

select {
  border-radius: 0.5rem;
}

</style>
