<template>
  <div class="flex flex-col content-start justify-start min-h-screen font-body">
    <Navbar class="w-full bg-gray-900 p-4" />
    <div class="container">
      <nuxt />
    </div>
  </div>
</template>
<script>
import Navbar from '~/components/Navbar.vue'

export default {
  components: {
    Navbar
  }
}
</script>
<style>
html {
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

body {
  @apply text-gray-800;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  @apply font-title;
}

.container {
  @apply flex;
  @apply justify-center;
  @apply mx-auto;
  @apply mt-10;
}

article {
  @apply w-full;
  @apply mb-4;
  @apply border-gray-400;
  @apply bg-white;
  @apply rounded-b-lg;
}

article .client-status {
  @apply text-white;
  @apply text-xs;
  @apply font-bold;
  @apply py-1;
  @apply px-4;
  @apply uppercase;
}

@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.fade-in {
  animation: fade-in 400ms ease-in-out;
}
</style>
