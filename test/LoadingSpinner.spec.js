import { shallowMount } from '@vue/test-utils'
import LoadingSpinner from '~/components/LoadingSpinner.vue'

const factory = propsData => {
  return shallowMount(LoadingSpinner, {
    propsData: {
      ...propsData
    }
  })
}

describe('LoadingSpinner', () => {
  test('is a Vue instance', () => {
    const wrapper = factory()
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
