<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
//on mounted has infinite loop
/*  
  if (!accessTokenStore.storedToken) {
    redirectToAuthCodeFlow(clientStore.storedClientId)
  }
*/

</script>

<template>
  <header>

    <div style="display:flex; flex-direction:column">
      <RouterLink to="/">
        Home
      </RouterLink>
      

      <div class="wrapper">
        
        <nav>
          <RouterLink to="/spotify-tool">Spotify Tool</RouterLink>
          <RouterLink to="/compendium">Compendium</RouterLink>
        <!-- 
          <RouterLink to="/duplicate">Duplicate Playlist</RouterLink>
        -->
        </nav>

      </div>
    </div>
  </header>
  <section class="content">
    <RouterView />
  </section>
  
</template>

<style scoped>
.content{
  min-width:50vw;
}
header {
  line-height: 1.5;
  max-height: 100vh;
  max-width:30vw;
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
