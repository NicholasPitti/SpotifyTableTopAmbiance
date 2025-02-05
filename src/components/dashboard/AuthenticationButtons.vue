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
import { useClientStore } from '../../stores/clientId'
//object that has state and action
const clientId=useClientStore()

//you wont need this function once pinia stores
//
function removeAccessToken(){
    localStorage.removeItem('access_token')
}

function reAuthenticateToken(){
    redirectToAuthCodeFlow(clientId.storedClientId)
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
