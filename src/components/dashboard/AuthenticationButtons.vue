<script setup lang="ts">

  //localStorage.removeItem('access_token') //clear local storage if 1hr has passed
  //redirectToAuthCodeFlow(clientId)
/*
  if (!code) {
    localStorage.removeItem('access_token') //clear local storage if 1hr has passed
    redirectToAuthCodeFlow(clientId)
  }
*/
import { redirectToAuthCodeFlow } from '../spotifyMethods/authorizationMethods'
const clientId="e5ef250c75b540dd9184a714c22fe195"

function removeAccessToken(){
    localStorage.removeItem('access_token')
}

function reAuthenticateToken(){
    redirectToAuthCodeFlow(clientId)
}

</script>

<template>
  <div class="greetings">
    <button @click="removeAccessToken">Remove Current AccessToken</button>
    <button @click="reAuthenticateToken">ReAuthenticate</button>
  </div>
</template>

<style scoped>

</style>
