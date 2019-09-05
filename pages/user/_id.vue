<template>
  <main class="w-full">
    <div class="flex flex-row">
      <ClientResultCard
        v-if="userData"
        class="animated fadeIn border-transparent w-full"
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
        class="animated fadeIn"
        :voucher-post-success="voucherPostSuccess"
        :voucher-error="voucherError"
        @handle-add-voucher="handleAddVoucher"
      />
    </div>

    <section class="flex flex-wrap -mx-2">
      <CustomerVoucher
        v-for="voucher in voucherData"
        :key="voucher.voucherId"
        class="w-full lg:w-1/2 px-2 animated fadeIn"
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
    <LoadingSpinner v-if="apiLoading" />
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
    title: 'Client'
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
      voucherData: null,
      voucherPostSuccess: false,
      voucherError: null
    }
  },

  async mounted() {
    if (this.$route.params.id) {
      const cleanRouteParam = whitelistChars(this.$route.params.id)
      this.userData = await this.getSingleUser(cleanRouteParam)
      this.voucherData = await this.getUserVouchers(cleanRouteParam)
    }
  },

  methods: {
    async getSingleUser(clientId) {
      try {
        this.apiLoading = true

        const userData = await axiosGetData.get(
          `/business/${process.env.BUSINESS_ID}/client/${clientId}`
        )

        this.apiLoading = false
        return userData.data
      } catch (error) {
        if (error.response.status === 404) {
          this.apiLoading = false
          this.apiErrorMessage =
            'This user does not appear to exist. The server responded with a 404 error.'
        }
      }
    },

    async getUserVouchers(clientId) {
      try {
        this.apiLoading = true

        const voucherData = await axiosGetData.get(
          `/business/${process.env.BUSINESS_ID}/voucher/?clientId=${clientId}`
        )

        this.apiLoading = false

        return voucherData.data.page.totalElements
          ? voucherData.data._embedded.vouchers
          : []
      } catch (error) {
        if (error.response.status === 404) {
          this.apiLoading = false
        }
      }
    },

    async handleAddVoucher() {
      try {
        this.voucherError = null
        const valueField = document.querySelector('input.voucher-value')

        if (+valueField < 0.01) {
          throw new Error('Please enter a value for the voucher')
        }

        const postVoucher = await axiosPostData.post(
          `/business/${process.env.BUSINESS_ID}/voucher`,
          {
            clientId: this.userData.clientId,
            creatingBranchId: process.env.BRANCH_ID,
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

        return postVoucher.data.serialNumber
      } catch (error) {
        this.voucherPostSuccess = false
        this.voucherError = error
      }
    }
  }
}
</script>
