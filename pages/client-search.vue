<template>
  <article class="w-full border-none">
    <section class="flex justify-center items-center">
      <form class="bg-white max-w-xl rounded px-8 pt-6 pb-8 mb-4">
        <label
          class="block text-gray-700 text-sm text-center font-bold mb-4"
          for="client-search"
          >Search by First or last names, phone number or email address
        </label>
        <p class="flex flex-row mb-4">
          <input
            id="client-search"
            ref="clientSearch"
            v-model="rawUserSearchInput"
            class="appearance-none border rounded-l w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            name="client-search"
            placeholder="Client search"
            autofocus
          />
          <button
            class="search-users hover:bg-blue-700 focus:outline-none rounded-r"
            @click.prevent="handleSearchClients"
          >
            GO
          </button>
        </p>
        <div
          v-if="formErrors.length"
          class="mt-4 rounded text-center text-white bg-red-400 p-2"
          :class="formErrors.length && 'animated fadeIn'"
        >
          <p>Please correct the following error(s):</p>
          <ul>
            <li v-for="(formError, idx) in formErrors" :key="idx">
              {{ formError }}
            </li>
          </ul>
        </div>
      </form>
    </section>

    <section v-if="apiError && apiErrorMessage" class="text-center">
      <p>{{ apiErrorMessage }}</p>
    </section>

    <section class="results max-w-md m-auto">
      <LoadingSpinner v-if="apiLoading" />
      <div v-if="clients && clients.results">
        <p class="mb-2">
          {{ clients.results }}
          {{ `${pluraliseWord(clients.results, 'client')} found` }}
        </p>
        <ClientResultCard
          v-for="client in clients.list"
          :key="client.clientId"
          class="animated fadeIn border"
          :client-id="client.clientId"
          :first-name="client.firstName"
          :last-name="client.lastName"
          :gender="client.gender"
          :address="client.address"
          :archived="client.archived"
          :banned="client.banned"
          :email="client.email"
          :mobile="client.mobile"
          :landline="client.landline"
          :notes="client.notes"
          :button-text="'Select'"
          @user-click="handleSelectClient"
        />
      </div>
      <div v-if="clients && clients.results === 0" class="text-center">
        <p>
          No results found for '{{ validatedSearchTerm }}'. Please try again.
        </p>
      </div>
    </section>
  </article>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import axios from 'axios'
import ClientResultCard from '~/components/ClientResultCard.vue'
import LoadingSpinner from '~/components/LoadingSpinner.vue'
import { whitelistChars, getLastWord } from '~/components/mixins/helpers'
import { axiosGetData } from '~/plugins/axios'

export default {
  name: 'ClientSearch',
  head: {
    title: 'Client search'
  },
  components: {
    ClientResultCard,
    LoadingSpinner
  },

  data() {
    return {
      apiError: false,
      apiErrorMessage:
        'The was a problem reaching the server. Please contact support.',
      apiLoading: false,
      formErrors: [],
      rawUserSearchInput: '',
      validatedSearchTerm: '',
      clients: null
    }
  },

  watch: {
    $route(to) {
      this.rawUserSearchInput = to.query.term
      this.handleSearchClients()
    }
  },

  mounted() {
    // eslint-disable-next-line no-console
    // console.log(this.$route.query.term)

    if (this.$route.query.term) {
      this.rawUserSearchInput = this.$route.query.term
      this.handleSearchClients()
    }
  },

  methods: {
    removeDuplicateResults(clientArray) {
      const clientList = clientArray.reduce(
        (accumulator, searchTerm) => {
          if (!searchTerm.data.page.size) {
            return accumulator
          }
          searchTerm.data._embedded.clients.map(
            customer => (accumulator.list[customer.clientId] = customer)
          )
          return accumulator
        },
        { list: {} }
      )

      clientList.results = Object.keys(clientList.list).length

      return clientList
    },

    async handleSearchClients() {
      // Loading
      this.apiLoading = true
      this.clients = null

      const validatedSearchTerm = await this.validateUserInput(
        this.rawUserSearchInput
      )

      // Update the router with search terms
      this.$router.push({
        path: 'client-search',
        query: { term: this.validatedSearchTerm }
      })

      if (validatedSearchTerm) {
        try {
          const clientArray = await this.getFacetedSearch()
          const clientList = this.removeDuplicateResults(clientArray)
          // Set state
          this.clients = clientList
          this.apiLoading = false

          return clientList
        } catch (error) {
          this.apiError = true
          this.apiLoading = false
        }
      }

      this.apiLoading = false
      return false
    },

    getFacetedSearch() {
      const byEmail = axiosGetData.get(
        `/business/${process.env.BUSINESS_ID}/client?email=~${this.validatedSearchTerm}%`
      )
      const byFName = axiosGetData.get(
        `/business/${process.env.BUSINESS_ID}/client?firstName=~${this.validatedSearchTerm}%`
      )
      const byLName = axiosGetData.get(
        `/business/${process.env.BUSINESS_ID}/client?lastName=~${this.validatedSearchTerm}%`
      )
      const byPhone = axiosGetData.get(
        `/business/${process.env.BUSINESS_ID}/client?phone=~${this.validatedSearchTerm}%`
      )

      return Promise.all([byEmail, byFName, byLName, byPhone])
    },

    validateUserInput(inputString) {
      this.formErrors = []
      const trimmedInput = inputString.length ? inputString.trim() : inputString

      if (!trimmedInput) {
        this.formErrors.push('Please enter a search term')
      }

      if (trimmedInput && trimmedInput.length < 3) {
        this.formErrors.push('Please enter a longer search term')
      }

      if (this.formErrors.length) {
        // Throw user back into the input field
        this.$refs.clientSearch.focus()
      }

      if (trimmedInput) {
        // Remove banned chars
        const whitelistedSearch = whitelistChars(trimmedInput)

        // When multiple space separated words are entered,
        // return only the last one
        const validated = getLastWord(whitelistedSearch)

        this.validatedSearchTerm = validated

        return validated
      }

      return false
    },

    pluraliseWord(number, word) {
      if (number > 1) return `${word}s`
      return word
    },

    handleSelectClient(clientId) {
      this.$nuxt.$router.push({ path: `/user/${clientId}` })
    }
  }
}
</script>

<style scoped>
article >>> button {
  @apply bg-blue-500;
  @apply text-white;
  @apply font-bold;
  @apply py-2;
  @apply px-4;
}
</style>
