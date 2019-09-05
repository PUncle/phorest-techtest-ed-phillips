import { shallowMount } from '@vue/test-utils'
import ClientSearch from '@/pages/client-search.vue'

const $route = {
  query: {
    term: ''
  }
}

const factory = propsData => {
  return shallowMount(ClientSearch, {
    propsData: {
      ...propsData
    },
    mocks: {
      $route
    }
  })
}

describe('ClientSearch detail page', () => {
  it('is a Vue instance', () => {
    const wrapper = factory(ClientSearch, {
      something: 'whatever'
    })
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
