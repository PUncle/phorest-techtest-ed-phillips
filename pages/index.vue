<template>
  <section class="w-full">
    <div class="container">
      <div class="max-w-md m-auto text-center">
        <h1 class="text-4xl">{{ message }}</h1>
        <p>Ed Phillips</p>
        <nuxt-link
          class="bg-blue-500 block text-white font-bold py-2 px-4 mt-6 uppercase"
          to="/client-search"
        >
          Start
        </nuxt-link>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  head: {
    title: 'Home page'
  },
  data() {
    return {
      message: 'Phorest tech test'
    }
  }
}
</script>

<style></style>
