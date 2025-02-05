<template>
  <div>Processing Spotify authentication...</div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getOrRetrieveAccessToken } from '../components/spotifyMethods/authorizationMethods' // Adjust the import path
import { useClientStore } from '../stores/clientId'
//object that has state and action
const clientId=useClientStore()
const router = useRouter()

//localStorage.removeItem('access_token')

onMounted(async () => {
  const params = new URLSearchParams(window.location.search)
  const code = params.get("code")

  if (code) {
    try {
      
      await getOrRetrieveAccessToken(clientId.storedClientId, code)
      router.push('/') // Redirect to home after successful authentication
    } catch (error) {
      console.error("Authentication error:", error)

      // Handle error (e.g., show error message to user)
    }
  } else {
    console.error("No code provided in callback")
    //localStorage.removeItem('access_token')
    router.push('/') // Redirect to home if no code (you might want to handle this differently)
  }
})
</script>