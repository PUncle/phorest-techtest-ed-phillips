import { shallowMount } from '@vue/test-utils'
import CustomerVoucher from '~/components/CustomerVoucher.vue'

const factory = propsData => {
  return shallowMount(CustomerVoucher, {
    propsData: {
      ...propsData
    }
  })
}

describe('CustomerVoucher', () => {
  it('renders correctly from props', () => {
    const wrapper = factory({
      voucherId: 'l4HM6hsFC1bHbzPMj5uwDQ',
      serialNumber: '11451',
      issueDate: '2019-04-13T12:08:41.000Z',
      expiryDate: '2019-10-13T12:08:41.000Z',
      clientId: 'moEqVtXjwfjclcOMwkptRg',
      creatingBranchId: 'SE-J0emUgQnya14mOGdQSw',
      originalBalance: 50,
      remainingBalance: 50
    })

    expect(wrapper.find('.voucher .serial').text()).toEqual('Serial #: 11451')
  })
})
