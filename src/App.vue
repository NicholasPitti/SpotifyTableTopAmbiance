<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import SpotifyDashboard from './components/dashboard/SpotifyDashboard.vue'
import AuthenticationButtons from './components/dashboard/AuthenticationButtons.vue'

</script>

<template>
  <header>

    <div style="display:flex; flex-direction:column">
      <RouterLink to="/">
      </RouterLink>

      
      <AuthenticationButtons></AuthenticationButtons>

      <SpotifyDashboard></SpotifyDashboard>

      <div class="wrapper">
        
        <nav>
          <RouterLink to="/">Add Tracks To Queue</RouterLink>
          <RouterLink to="/likes">Likes</RouterLink>
          <RouterLink to="/allplaylist">Playlist Collection</RouterLink>
          <RouterLink to="/sort">Add Tracks To Playlist</RouterLink>
        <!-- disabeld for now to avoid crowding
          <RouterLink to="/duplicate">Duplicate Playlist</RouterLink>
        -->
          <RouterLink to="/search">Search</RouterLink>
        </nav>
        <h1>POPULATE WITH QUEUE ITEMS</h1>
        <div>Conditionally render queue view</div>
        <div>Create drag and drop dockable layouts</div>
        <div>would require an animation so user sees preview and knows they are dragging</div>

      </div>
    </div>
  </header>
  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}
/*
nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}
*/

nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;
    padding: 1rem 0;
    margin-top: 1rem;
  }

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    /*place-items: center;*/
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

}
</style>
