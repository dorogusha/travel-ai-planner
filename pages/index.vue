<template>
  <ClientOnly>
    <LocationSidePanel>
      <GoogleMapDisplay />
    </LocationSidePanel>
  </ClientOnly>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'home'
})
</script>

<style scoped></style>
