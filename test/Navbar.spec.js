import { shallowMount, RouterLinkStub } from '@vue/test-utils'
import Navbar from '~/components/Navbar.vue'

const factory = propsData => {
  return shallowMount(Navbar, {
    propsData: {
      ...propsData
    },
    stubs: {
      NuxtLink: RouterLinkStub
    }
  })
}

describe('Navbar', () => {
  test('is a Vue instance', () => {
    const wrapper = factory()
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
