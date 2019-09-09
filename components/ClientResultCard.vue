<template>
  <article class="client-result" :data-client-id="clientId">
    <div class="flex flex-wrap justify-between items-center">
      <div class="flex flex-row justify-start leading-normal">
        <div class="w-auto h-auto flex-none text-center pt-4 pl-4">
          <GenderIcon :gender="gender" class="m-auto inline-block" />
          <div
            class="bam block rounded-full text-xs uppercase text-white font-bold px-2 mb-2"
            :class="banned || archived ? 'bg-red-500' : 'bg-green-500'"
          >
            <div v-if="banned || archived">
              <span v-if="banned">
                Banned
              </span>
              <span v-else-if="archived">
                Archived
              </span>
            </div>
            <span v-else>
              Member
            </span>
          </div>
        </div>
        <div class="p-4">
          <div class="text-md text-gray-600 flex items-center mb-2">
            <div>
              <h1
                class="name text-gray-900 text-2xl font-bold text-xl leading-none"
              >
                {{ firstName }} {{ lastName }}
              </h1>
              <ul class="text-gray-800 text-sm leading-snug">
                <li v-if="email" class="email">{{ email }}</li>
                <li v-if="mobile">Mobile: {{ mobile }}</li>
                <li v-if="landline">Landline: {{ landline }}</li>
              </ul>

              <ul class="text-xs text-gray-900 leading-tight mt-2">
                <li v-if="address.streetAddress1">
                  {{ address.streetAddress1 }}
                </li>
                <li v-if="address.streetAddress2">
                  {{ address.streetAddress2 }}
                </li>
                <li v-if="address.city">{{ address.city }}</li>
                <li v-if="address.state">{{ address.state }}</li>
                <li v-if="address.postalCode">{{ address.postalCode }}</li>
                <li v-if="address.country">{{ address.country }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div
        v-if="buttonText && (!banned && !archived)"
        class="w-full md:w-auto h-auto mx-4 mb-4 uppercase text-white text-center"
      >
        <button
          class="select w-full hover:bg-blue-700"
          @click="$emit('user-click', $el.dataset.clientId)"
        >
          {{ buttonText }}
        </button>
      </div>
    </div>
  </article>
</template>

<script>
import GenderIcon from './GenderIcon.vue'

export default {
  name: 'ClientResultCard',
  components: {
    GenderIcon
  },
  props: {
    clientId: {
      type: String,
      required: false,
      default: ''
    },
    firstName: {
      type: String,
      required: false,
      default: ''
    },
    lastName: {
      type: String,
      required: false,
      default: ''
    },
    gender: {
      type: String,
      required: false,
      default: ''
    },
    address: {
      type: Object,
      required: false,
      default: () => {
        return {}
      }
    },
    archived: {
      type: Boolean,
      required: false,
      default: false
    },
    banned: {
      type: Boolean,
      required: false,
      default: false
    },
    email: {
      type: String,
      required: false,
      default: ''
    },
    mobile: {
      type: String,
      required: false,
      default: ''
    },
    landline: {
      type: String,
      required: false,
      default: ''
    },
    notes: {
      type: String,
      required: false,
      default: ''
    },
    buttonText: {
      type: String,
      required: false,
      default: ''
    }
  }
}
</script>

<style>
button.select {
  @apply bg-blue-500;
  @apply text-white;
  @apply font-bold;
  @apply py-2;
  @apply px-4;
  @apply rounded-full;
  @apply uppercase;
  @apply text-sm;
}
</style>
