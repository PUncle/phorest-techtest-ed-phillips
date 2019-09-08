import { shallowMount } from '@vue/test-utils'
import ClientResultCard from '~/components/ClientResultCard.vue'

const factory = propsData => {
  return shallowMount(ClientResultCard, {
    propsData: {
      ...propsData
    }
  })
}

describe('ClientResultCard', () => {
  it('renders correctly from props', () => {
    const wrapper = factory({
      clientId: '4n2kzAtC31Lf12wWoT8sIg',
      firstName: 'Asdf',
      lastName: 'ad',
      email: 'asfasdf@adsf.com'
    })

    expect(wrapper.find('.bam').text()).toEqual('Member')
    expect(wrapper.find('.name').text()).toEqual('Asdf ad')
    expect(wrapper.find('.email').text()).toEqual('asfasdf@adsf.com')
  })

  it('emits an event', () => {
    const wrapper = factory({ clientId: '4n2kzAtC31Lf12wWoT8sIg' })
    wrapper.vm.$emit('user-click', '4n2kzAtC31Lf12wWoT8sIg')

    expect(wrapper.emitted('user-click')).toBeTruthy()
    expect(wrapper.emitted('user-click').length).toBe(1)
    expect(wrapper.emitted('user-click')[0]).toEqual(['4n2kzAtC31Lf12wWoT8sIg'])
  })
})
