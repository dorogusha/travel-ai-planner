<template>
  <div class="layout-wrapper">
    <main class="layout-main">
      <slot />
    </main>
  </div>
</template>

<style scoped>
.layout-wrapper,
.layout-main {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
</style>
