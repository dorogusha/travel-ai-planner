<template>
  <div class="comparison-page">
    <h1>Google Maps - Comparison Test</h1>
    
    <div class="maps-grid">
      <div class="map-section">
        <h2>Method 1: Complex (with Promise & Callback)</h2>
        <div class="map-wrapper">
          <GoogleMapDisplay />
        </div>
        <p class="hint">Check console for [GoogleMapDisplay] logs</p>
      </div>

      <div class="map-section">
        <h2>Method 2: Simple (direct load)</h2>
        <div class="map-wrapper">
          <GoogleMapSimple />
        </div>
        <p class="hint">Check console for [SimpleMap] logs</p>
      </div>
    </div>

    <div class="instructions">
      <h3>📋 Instructions:</h3>
      <ol>
        <li>Open browser console (F12)</li>
        <li>Look for logs with 🔵, ✅, or ❌ emojis</li>
        <li>Check if one or both maps load</li>
        <li>Check Network tab for googleapis.com requests</li>
      </ol>
    </div>
  </div>
</template>

<style scoped>
.comparison-page {
  padding: 20px;
  max-width: 1400px;
  margin: 0 auto;
}

h1 {
  color: #333;
  margin-bottom: 30px;
  text-align: center;
}

.maps-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 30px;
}

.map-section {
  background: white;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.map-section h2 {
  font-size: 16px;
  margin-bottom: 15px;
  color: #555;
}

.map-wrapper {
  height: 400px;
  border: 2px solid #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
}

.hint {
  margin-top: 10px;
  font-size: 12px;
  color: #888;
  font-style: italic;
}

.instructions {
  background: #f0f8ff;
  border-radius: 8px;
  padding: 20px;
  border-left: 4px solid #2196f3;
}

.instructions h3 {
  margin-top: 0;
  color: #1976d2;
}

.instructions ol {
  margin: 10px 0 0 20px;
  color: #555;
}

.instructions li {
  margin-bottom: 8px;
}

@media (max-width: 900px) {
  .maps-grid {
    grid-template-columns: 1fr;
  }
}
</style>
