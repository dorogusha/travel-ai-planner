<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
    <header class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg"></div>
            <h1 class="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              My Nuxt App
            </h1>
          </div>
          <nav class="flex gap-2">
            <UButton to="/" color="primary" variant="soft">Home</UButton>
            <UButton to="/about" variant="ghost">About</UButton>
          </nav>
        </div>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <slot />
    </main>

    <footer class="mt-16 py-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <p class="text-gray-600 dark:text-gray-400">
            Built with Nuxt 3, Pinia & Nuxt UI
          </p>
          <p class="text-sm text-gray-500 dark:text-gray-500 mt-2">
            © 2026 My Nuxt App
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>
