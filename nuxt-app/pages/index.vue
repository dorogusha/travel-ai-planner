<template>
  <main class="landing-screen min-h-[calc(100vh-6rem)] relative overflow-hidden">
    <div class="absolute inset-0 landing-grid"></div>
    <div class="absolute -top-40 -left-20 orb orb-a"></div>
    <div class="absolute top-1/3 -right-20 orb orb-b"></div>
    <div class="absolute -bottom-44 left-1/4 orb orb-c"></div>

    <section class="relative z-10 h-full flex items-center justify-center px-6 py-16">
      <div class="text-center max-w-4xl">
        <p class="uppercase tracking-[0.4em] text-cyan-300 text-sm mb-6">Launch Ready</p>
        <h1 class="text-5xl md:text-7xl font-extrabold text-white leading-tight">
          Agentic IDE is awesome
        </h1>
        <p class="text-lg md:text-xl text-cyan-100 mt-8">
          Build faster with autonomous workflows, live feedback, and creative momentum.
        </p>

        <div class="mt-12 flex items-center justify-center gap-5">
          <div class="pulse-ring"></div>
          <div class="pulse-ring pulse-delay"></div>
          <div class="core-dot"></div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'home'
})
</script>

<style scoped>
.landing-screen {
  background: radial-gradient(circle at 20% 20%, #1e3a8a 0%, #0f172a 40%, #020617 100%);
}

.landing-grid {
  background-image:
    linear-gradient(rgba(14, 165, 233, 0.15) 1px, transparent 1px),
    linear-gradient(90deg, rgba(14, 165, 233, 0.15) 1px, transparent 1px);
  background-size: 48px 48px;
  mask-image: radial-gradient(circle at center, black 10%, transparent 80%);
}

.orb {
  width: 26rem;
  height: 26rem;
  border-radius: 9999px;
  filter: blur(50px);
  opacity: 0.42;
  animation: drift 14s ease-in-out infinite;
}

.orb-a {
  background: #22d3ee;
}

.orb-b {
  background: #6366f1;
  animation-delay: 2s;
}

.orb-c {
  background: #f472b6;
  animation-delay: 4s;
}

.core-dot {
  width: 1.1rem;
  height: 1.1rem;
  border-radius: 9999px;
  background: #67e8f9;
  box-shadow: 0 0 0.8rem #67e8f9;
}

.pulse-ring {
  width: 1.1rem;
  height: 1.1rem;
  border: 2px solid rgba(103, 232, 249, 0.7);
  border-radius: 9999px;
  position: absolute;
  animation: pulse 2.6s ease-out infinite;
}

.pulse-delay {
  animation-delay: 1.3s;
}

@keyframes drift {
  0%, 100% {
    transform: translate3d(0, 0, 0) scale(1);
  }
  50% {
    transform: translate3d(20px, -24px, 0) scale(1.08);
  }
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 0.8;
  }
  100% {
    transform: scale(7.5);
    opacity: 0;
  }
}
</style>
