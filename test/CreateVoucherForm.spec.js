import { shallowMount } from '@vue/test-utils'
import CreateVoucherForm from '~/components/CreateVoucherForm.vue'

const factory = propsData => {
  return shallowMount(CreateVoucherForm, {
    propsData: {
      ...propsData
    }
  })
}

describe('CreateVoucherForm', () => {
  it('emits when button is clicked', () => {
    const wrapper = factory({
      voucherPostSuccess: true,
      voucherError: ''
    })

    wrapper.find('button.create-voucher').trigger('click')
    expect(wrapper.emitted('handle-add-voucher')).toHaveLength(1)
  })

  it('renders UI error on voucher post failure', () => {
    const wrapper = factory({
      voucherPostSuccess: false,
      voucherError: 'Oh nuts'
    })

    expect(wrapper.find('.voucher-error').text()).toEqual('Oh nuts')
    expect(wrapper.find('h2').text()).toEqual('Create a voucher')
  })

  it('renders UI voucher post success', () => {
    const wrapper = factory({
      voucherPostSuccess: true,
      voucherError: ''
    })

    expect(wrapper.find('h2').text()).toEqual('Voucher created')
  })
})
