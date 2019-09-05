import { shallowMount } from '@vue/test-utils'
import GenderIcon from '~/components/GenderIcon.vue'

const factory = propsData => {
  return shallowMount(GenderIcon, {
    propsData: {
      ...propsData
    }
  })
}

describe('GenderIcon', () => {
  test('is a Vue instance', () => {
    const wrapper = factory()
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
