<template>
  <div ref="mapContainer" class="google-map-display" />
</template>

<script setup lang="ts">
type LatLng = { lat: number; lng: number }

type GoogleMapInstance = { setCenter: (center: LatLng) => void }

const WARSAW: LatLng = { lat: 52.2297, lng: 21.0122 }

const mapContainer = ref<HTMLElement | null>()
const config = useRuntimeConfig()
const { openWithLocation } = useLocationSidePanel()

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

    map.addListener('click', (e: { latLng?: { lat: () => number; lng: () => number } | null }) => {
      if (!e.latLng) {
        return
      }
      const lat = e.latLng.lat()
      const lng = e.latLng.lng()
      openWithLocation({
        name: 'Selected map point',
        address: `${lat.toFixed(5)}, ${lng.toFixed(5)}`,
        status: 'Exploration — not verified against a curated dataset.',
        history:
          'Arbitrary coordinates do not carry built-in history in this demo. Connect a POI database or geocoder to enrich this section.',
        legends:
          'Local legends can be sourced from your content API or knowledge base once a place is identified.',
        architecture:
          'Architecture notes appear when a landmark or building is selected from your data layer.',
        notablePeople:
          'Link notable residents or visitors from your CMS when a named location is resolved.',
        interestingFacts:
          'Interesting facts can be generated or retrieved by AI once the backend knows which place the user selected.'
      })
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
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
}
</style>
