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

/*
function removeAccessToken(){
    localStorage.removeItem('access_token')
}
<button @click="removeAccessToken">Remove Current AccessToken</button>
*/
function reAuthenticateToken(){
    redirectToAuthCodeFlow(clientId.storedClientId)
}

</script>

<template>
  <div class="greetings">

    <button @click="reAuthenticateToken" class="reauth-btn">Authenticate</button>
  </div>
</template>

<style scoped>
.reauth-btn{
  border:solid;
    border-width: 0.2rem;
    border-color:#fff;
    border-radius:1rem;
    color:#00983a;
    font-size:1.5rem;
    margin-bottom: 1rem;
}
</style>
