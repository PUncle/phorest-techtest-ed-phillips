<template>
  <main class="w-full">
    <LoadingSpinner v-if="apiLoading" />
    <div v-else>
      <div class="flex flex-wrap">
        <ClientResultCard
          v-if="userData"
          class="fade-in border-transparent lg:w-1/2"
          :client-id="userData.clientId"
          :first-name="userData.firstName"
          :last-name="userData.lastName"
          :gender="userData.gender"
          :address="userData.address"
          :archived="userData.archived"
          :banned="userData.banned"
          :email="userData.email"
          :mobile="userData.mobile"
          :landline="userData.landline"
          :notes="userData.notes"
        />

        <CreateVoucherForm
          class="fade-in lg:w-1/2"
          :voucher-post-success="voucherPostSuccess"
          :voucher-error="voucherError"
          @handle-add-voucher="handleAddVoucher"
        />
      </div>

      <section class="flex flex-wrap -mx-2">
        <LoadingSpinner v-if="voucherLoading" />
        <CustomerVoucher
          v-for="voucher in voucherData"
          v-else
          :key="voucher.voucherId"
          class="w-full lg:w-1/2 px-2 fade-in"
          :expiry-date="voucher.expiryDate"
          :remaining-balance="voucher.remainingBalance"
          :original-balance="voucher.originalBalance"
          :creating-branch-id="voucher.creatingBranchId"
          :issue-date="voucher.issueDate"
          :serial-number="voucher.serialNumber"
          :voucher-id="voucher.voucherId"
          :client-id="voucher.clientId"
        />
      </section>
    </div>

    <section v-if="apiErrorMessage" class="error">
      {{ apiErrorMessage }}
    </section>
  </main>
</template>

<script>
import ClientResultCard from '~/components/ClientResultCard.vue'
import LoadingSpinner from '~/components/LoadingSpinner.vue'
import CustomerVoucher from '~/components/CustomerVoucher.vue'
import CreateVoucherForm from '~/components/CreateVoucherForm.vue'
import { whitelistChars } from '~/components/mixins/helpers'
import { axiosGetData, axiosPostData } from '~/plugins/axios'

export default {
  head: {
    title: 'Client detail'
  },

  components: {
    ClientResultCard,
    CustomerVoucher,
    CreateVoucherForm,
    LoadingSpinner
  },

  data() {
    return {
      apiLoading: true,
      apiErrorMessage: null,
      userData: null,
      voucherLoading: null,
      voucherData: null,
      voucherPostSuccess: false,
      voucherError: null
    }
  },

  async mounted() {
    if (this.$route.params.id) {
      this.apiLoading = true
      const cleanRouteParam = whitelistChars(this.$route.params.id)
      this.userData = await this.getSingleUser(cleanRouteParam)
      this.voucherData = await this.getUserVouchers(cleanRouteParam)
      this.apiLoading = false
    }
  },

  methods: {
    async getSingleUser(clientId) {
      try {
        this.apiLoading = true

        const userData = await axiosGetData.get(
          `/business/${process.env.NUXT_ENV_BUSINESS_ID}/client/${clientId}`
        )

        this.apiLoading = false
        return userData.data
      } catch (error) {
        if (error.response.status === 404) {
          this.apiErrorMessage =
            'This user does not appear to exist. The server responded with a 404 error.'
        }
        this.apiLoading = false
        return false
      }
    },

    async getUserVouchers(clientId) {
      try {
        const voucherData = await axiosGetData.get(
          `/business/${process.env.NUXT_ENV_BUSINESS_ID}/voucher/?clientId=${clientId}`
        )
        return voucherData.data.page.totalElements
          ? voucherData.data._embedded.vouchers
          : []
      } catch (error) {
        return false
      }
    },

    async handleAddVoucher() {
      try {
        this.voucherLoading = true
        this.voucherError = null

        const valueField = document.querySelector('input.voucher-value')

        if (!valueField.value || +valueField.value < 0.01) {
          throw new Error('Please enter a value for the voucher')
        }

        this.voucherData = null

        const postVoucher = await axiosPostData.post(
          `/business/${process.env.NUXT_ENV_BUSINESS_ID}/voucher`,
          {
            clientId: this.userData.clientId,
            creatingBranchId: process.env.NUXT_ENV_BRANCH_ID,
            issueDate: new Date().toISOString(),
            expiryDate: '2099-09-04T12:48:55.084Z',
            originalBalance: valueField.value
          }
        )

        valueField.value = ''

        if (postVoucher.status === 201) {
          this.voucherPostSuccess = true
        }

        this.voucherData = await this.getUserVouchers(this.userData.clientId)

        this.voucherLoading = false

        return postVoucher.data.serialNumber
      } catch (error) {
        this.voucherPostSuccess = false
        this.voucherLoading = false

        this.voucherError = error.toString()
      }
    }
  }
}
</script>
