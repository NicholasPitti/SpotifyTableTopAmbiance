<template>
  <div>Processing Spotify authentication...</div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getAccessToken } from '@/components/spotifyMethods/authorizationMethods'

import { useClientStore } from '../stores/clientId'
const clientId=useClientStore()

const router = useRouter()
//import { redirectToAuthCodeFlow } from '@/components/spotifyMethods/authorizationMethods'

onMounted(async () => {

  const params = new URLSearchParams(window.location.search)
  const code = params.get("code")

  if (code) {
    try {
      await getAccessToken(clientId.storedClientId, code)
      router.push('/') // Redirect to home after successful authentication
    } catch (error) {
      console.error("Authentication error:", error) // Handle error (e.g., show error message to user)
    }
  } else {
    console.error("No code provided in callback")
    router.push('/') // Redirect to home if no code (you might want to handle this differently)
  }
})
</script>