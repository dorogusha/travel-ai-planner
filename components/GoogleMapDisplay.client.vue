<template>
  <div ref="mapContainer" class="google-map-display" />
</template>

<script setup lang="ts">
type LatLng = { lat: number; lng: number }

type GoogleMapInstance = { setCenter: (center: LatLng) => void }

const WARSAW: LatLng = { lat: 52.2297, lng: 21.0122 }

const mapContainer = ref<HTMLElement | null>('mapContainer')
const config = useRuntimeConfig()

function loadGoogleMaps(apiKey: string): Promise<void> {

  if (import.meta.server) {
    console.error('[GoogleMapDisplay] ❌ Attempted to load on server')
    return Promise.reject(new Error('Maps run on client only'))
  }

  const w = window as Window & {
    google?: { maps?: { Map: new (el: HTMLElement, opts: { center: LatLng; zoom: number }) => GoogleMapInstance } }
  }

  if (w.google?.maps?.Map) {
    return Promise.resolve()
  }

  return new Promise((resolve, reject) => {
    const cbName = `__gmapInit_${Date.now()}`

    const win = window as unknown as Record<string, unknown>
    win[cbName] = () => {
      console.log('[GoogleMapDisplay] ✅ Google Maps callback fired')
      delete win[cbName]
      resolve()
    }

    const script = document.createElement('script')
    script.async = true
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(apiKey)}&loading=async&callback=${cbName}`
    console.log('[GoogleMapDisplay] 🌐 Loading script:', script.src)

    script.onerror = (error) => {
      console.error('[GoogleMapDisplay] ❌ Script failed to load:', error)
      delete win[cbName]
      reject(new Error('Google Maps script failed'))
    }

    document.head.appendChild(script)
    console.log('[GoogleMapDisplay] 📝 Script tag added to head')
  })
}

onMounted(async () => {
  const apiKey = String(config.public.googleMapsApiKey ?? '').trim()

  if (!apiKey) {
    console.error(
      '[GoogleMapDisplay] ❌ No API key. Set NUXT_PUBLIC_GOOGLE_MAPS_API_KEY in .env and restart `nuxt dev`.'
    )
    return
  }

  try {
    await loadGoogleMaps(apiKey)

    const w = window as unknown as {
      google: { maps: { Map: new (el: HTMLElement, opts: { center: LatLng; zoom: number }) => GoogleMapInstance } }
    }

    if (!w.google?.maps?.Map) {
      return
    }

    console.log('[GoogleMapDisplay] 🗺️ Creating map instance...')
    const MapCtor = w.google.maps.Map
    const map = new MapCtor(mapContainer.value, {
      center: WARSAW,
      zoom: 12
    })

    navigator.geolocation.getCurrentPosition(
      (position) => {
        map.setCenter({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        })
      },
      (error) => {
        console.warn('[GoogleMapDisplay] ⚠️ Geolocation denied or failed:', error)
      }
    )
  } catch (err) {
    console.error('[GoogleMapDisplay] ❌ Map failed to load:', err)
  }
})
</script>

<style scoped>
.google-map-display {
  width: 100%;
  height: 100%;
  min-height: 400px;
}
</style>
