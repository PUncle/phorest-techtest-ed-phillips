import { shallowMount } from '@vue/test-utils'
import ClientSearch from '@/pages/client-search.vue'

let wrapper
afterEach(() => {
  wrapper.destroy()
})

describe('ClientSearch detail page', () => {
  it('is a Vue instance', () => {
    wrapper = shallowMount(ClientSearch, {
      propsData: {},
      mocks: { $route: { query: { term: '' } } },
      stubs: {},
      methods: {},
      data() {
        return {
          formErrors: ['Error 1', 'Error 2'],
          apiError: false,
          apiErrorMessage: 'Oops',
          apiLoading: false,
          clients: null,
          rawUserSearchInput: '',
          validatedSearchTerm: ''
        }
      }
    })
    expect(wrapper.isVueInstance).toBeTruthy()
  })

  it('has 2 form errors', () => {
    wrapper = shallowMount(ClientSearch, {
      mocks: { $route: { query: { term: '' } } },
      data() {
        return {
          formErrors: ['Error 1', 'Error 2']
        }
      }
    })

    expect(wrapper.findAll('.form-errors li')).toHaveLength(2)
  })
})
