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
        <section class="text-red-800 mt-4">
          <p class="mb-2">
            It appears that you do not have a .env file in root, which means
            that none of this will work.
          </p>
          <p>
            You'll probably want to
            <a
              class="text-green-800"
              href="https://github.com/PUncle/phorest-techtest-ed-phillips"
              >fix that</a
            >.
          </p>
        </section>
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
