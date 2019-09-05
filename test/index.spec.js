import { shallowMount, RouterLinkStub } from '@vue/test-utils'
import index from '@/pages/index.vue'

const factory = (values = {}) => {
  return shallowMount(index, {
    data() {
      return {
        ...values
      }
    },
    stubs: {
      NuxtLink: RouterLinkStub
    }
  })
}

describe('The index page', () => {
  const wrapper = factory()
  it('is a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
  it('renders a welcome message', () => {
    expect(wrapper.find('h1').text()).toEqual('Phorest tech test')
  })
})
