<template>
  <div ref="mapContainer" class="google-map-simple" />
</template>

<script setup lang="ts">
const mapContainer = ref<HTMLElement | null>(null)
const config = useRuntimeConfig()

onMounted(async () => {
  console.log('🔵 [SimpleMap] Starting...')
  
  if (!mapContainer.value) {
    console.error('❌ [SimpleMap] No container')
    return
  }

  const apiKey = String(config.public.googleMapsApiKey ?? '').trim()
  if (!apiKey) {
    console.error('❌ [SimpleMap] No API key')
    return
  }

  console.log('🔵 [SimpleMap] Container:', mapContainer.value.getBoundingClientRect())
  console.log('🔵 [SimpleMap] API Key:', apiKey.substring(0, 15) + '...')

  // Простейшая загрузка без промисов
  const script = document.createElement('script')
  script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`
  
  script.onload = () => {
    console.log('✅ [SimpleMap] Script loaded')
    
    // @ts-expect-error - google is loaded dynamically
    if (typeof google === 'undefined' || !google.maps) {
      console.error('❌ [SimpleMap] Google Maps not available')
      return
    }
    
    try {
      // @ts-expect-error - google is loaded dynamically
      const map = new google.maps.Map(mapContainer.value, {
        center: { lat: 52.2297, lng: 21.0122 },
        zoom: 12
      })
      console.log('✅ [SimpleMap] Map created!', map)
    } catch (err) {
      console.error('❌ [SimpleMap] Failed to create map:', err)
    }
  }
  
  script.onerror = (err) => {
    console.error('❌ [SimpleMap] Script error:', err)
  }
  
  document.head.appendChild(script)
  console.log('🔵 [SimpleMap] Script added to head')
})
</script>

<style scoped>
.google-map-simple {
  width: 100%;
  height: 100%;
  min-height: 400px;
  background: #e0e0e0;
}
</style>
