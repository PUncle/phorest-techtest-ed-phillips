<template>
  <article class="voucher">
    <div class="flex flex-row bg-gray-200 rounded p-4">
      <div>
        <h2 class="text-4xl uppercase font-title leading-tight m-0">Voucher</h2>
        <ul class="text-lg">
          <li>
            <span class="label">Expires:</span> {{ parseDate(expiryDate) }}
          </li>
          <li>
            <span class="label">Balance:</span> &pound;{{ remainingBalance }}
          </li>
        </ul>
      </div>

      <ul class="text-sm leading-snug ml-6">
        <li>
          <span class="label">Issue date:</span> {{ parseDate(issueDate) }}
        </li>
        <li>
          <span class="label">Original balance:</span> &pound;{{
            originalBalance
          }}
        </li>
        <li class="serial">
          <span class="label">Serial #:</span> {{ serialNumber }}
        </li>
        <li><span class="label">Voucher ID:</span> {{ voucherId }}</li>
        <li><span class="label">Branch ID:</span> {{ creatingBranchId }}</li>
        <li><span class="label">Client ID:</span> {{ clientId }}</li>
      </ul>
    </div>
  </article>
</template>

<script>
export default {
  name: 'CustomerVoucher',
  props: {
    expiryDate: {
      type: String,
      required: true
    },
    remainingBalance: {
      type: Number,
      required: true
    },
    originalBalance: {
      type: Number,
      required: true
    },
    creatingBranchId: {
      type: String,
      required: true
    },
    issueDate: {
      type: String,
      required: true
    },
    serialNumber: {
      type: String,
      required: true
    },
    voucherId: {
      type: String,
      required: true
    },
    clientId: {
      type: String,
      required: true
    }
  },
  methods: {
    parseDate(date) {
      const dateObj = new Date(date)
      return dateObj.toLocaleDateString()
    }
  }
}
</script>

<style scoped>
span.label {
  @apply font-bold;
  @apply text-gray-900;
}
</style>
