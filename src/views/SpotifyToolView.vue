<script setup lang="ts">
import AuthenticationButtons from '@/components/dashboard/AuthenticationButtons.vue'
import SpotifyDashboard from '@/components/dashboard/SpotifyDashboard.vue';
</script>

<template>
    <section id="spotify-tool">
      <AuthenticationButtons></AuthenticationButtons>
      <Suspense>
        <SpotifyDashboard></SpotifyDashboard>
      </Suspense>
    </section>
</template>

<style scoped>
ul{
  padding:0;
}
button {
  font-weight: bold;
  border-radius: 0.5rem;
}

select {
  border-radius: 0.5rem;
}

</style>
