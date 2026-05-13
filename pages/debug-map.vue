<template>
  <div class="map-test-page">
    <h1>Google Maps Diagnostic Page</h1>
    
    <div class="status-panel">
      <div class="status-item">
        <strong>Status:</strong> {{ status }}
      </div>
      <div class="status-item">
        <strong>API Key:</strong> {{ apiKeyStatus }}
      </div>
      <div class="status-item">
        <strong>Container:</strong> {{ containerStatus }}
      </div>
    </div>

    <div class="map-wrapper">
      <GoogleMapDisplay />
    </div>

    <div class="instructions">
      <h2>📋 Check Console (F12) for detailed logs</h2>
      <p>You should see logs starting with [GoogleMapDisplay]</p>
      <p>Also check Network tab for requests to maps.googleapis.com</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig()
const status = ref('Initializing...')
const apiKeyStatus = ref('Checking...')
const containerStatus = ref('Checking...')

onMounted(() => {
  const apiKey = String(config.public.googleMapsApiKey ?? '').trim()
  
  if (!apiKey) {
    apiKeyStatus.value = '❌ NOT SET'
    status.value = 'Error: No API Key'
  } else {
    apiKeyStatus.value = `✅ Set (${apiKey.substring(0, 10)}...)`
    status.value = 'Loading...'
  }
  
  setTimeout(() => {
    const container = document.querySelector('.google-map-display')
    if (container) {
      const rect = container.getBoundingClientRect()
      containerStatus.value = `✅ Found (${rect.width}x${rect.height}px)`
    } else {
      containerStatus.value = '❌ Not found'
    }
  }, 1000)
})
</script>

<style scoped>
.map-test-page {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  padding: 20px;
  background: #f5f5f5;
}

h1 {
  color: #333;
  margin-bottom: 20px;
}

.status-panel {
  background: white;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.status-item {
  margin-bottom: 10px;
  font-family: monospace;
}

.map-wrapper {
  flex: 1;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  margin-bottom: 20px;
  min-height: 400px;
}

.instructions {
  background: #fff3cd;
  border-radius: 8px;
  padding: 15px;
  border-left: 4px solid #ffc107;
}

.instructions h2 {
  margin-top: 0;
  font-size: 16px;
  color: #856404;
}

.instructions p {
  margin: 5px 0;
  color: #856404;
}
</style>
