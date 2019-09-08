import { shallowMount } from '@vue/test-utils'
import ClientSearch from '@/pages/client-search.vue'

let wrapper
afterEach(() => {
  wrapper.destroy()
})

describe('ClientSearch detail page', () => {
  it('is a Vue instance', () => {
    wrapper = shallowMount(ClientSearch, {
      mocks: { $nuxt: { $route: { query: { term: '' } } } }
    })

    expect(wrapper.isVueInstance).toBeTruthy()
  })

  it('has 2 form errors', () => {
    wrapper = shallowMount(ClientSearch, {
      mocks: { $nuxt: { $route: { query: { term: '' } } } },
      data() {
        return {
          formErrors: ['Error 1', 'Error 2']
        }
      }
    })

    expect(wrapper.findAll('.form-errors li')).toHaveLength(2)
  })

  it('when input is < 3 chars after trim push error to formErrors array', () => {
    wrapper = shallowMount(ClientSearch, {
      mocks: { $nuxt: { $route: { query: { term: '' } } } }
    })

    wrapper.vm.validateUserInput('Sm')
    expect(wrapper.vm.formErrors.length).toBe(1)
  })

  it('validateUserInput method returns a single word, stripped of unwanted chars', () => {
    wrapper = shallowMount(ClientSearch, {
      mocks: { $nuxt: { $route: { query: { term: '' } } } }
    })
    wrapper.vm.validateUserInput('A*l&i%ce S$$m!it@h.com')
    expect(wrapper.vm.validatedSearchTerm).toBe('Smit@h.com')

    wrapper.vm.validateUserInput('jess_likes_hair@domain-name.net')
    expect(wrapper.vm.validatedSearchTerm).toBe(
      'jess_likes_hair@domain-name.net'
    )
  })

  it('validateUserInput method returns false when formErrors.length is > 0', () => {
    wrapper = shallowMount(ClientSearch, {
      mocks: { $nuxt: { $route: { query: { term: '' } } } }
    })
    expect(wrapper.vm.validateUserInput('')).toBe(false)
  })

  it('pluralises given word depending on number', () => {
    wrapper = shallowMount(ClientSearch, {
      mocks: { $nuxt: { $route: { query: { term: '' } } } }
    })

    expect(wrapper.vm.pluraliseWord(3, 'cabbage')).toBe('cabbages')
    expect(wrapper.vm.pluraliseWord(1, 'parsnip')).toBe('parsnip')
  })

  it('removes duplicate clients from returned object', () => {
    wrapper = shallowMount(ClientSearch, {
      mocks: { $nuxt: { $route: { query: { term: '' } } } }
    })

    const apiResponse = [
      {
        data: {
          _embedded: { clients: [{ clientId: '6euUCE3oFP3V6_guMBbFIA' }] },
          page: { size: 1 }
        }
      },
      {
        data: {
          _embedded: { clients: [{ clientId: 'uIdTetEMkRK2k0HesKl-Ww' }] },
          page: { size: 1 }
        }
      },
      {
        data: {
          _embedded: { clients: [{ clientId: 'uIdTetEMkRK2k0HesKl-Ww' }] },
          page: { size: 1 }
        }
      },
      {
        data: { page: { size: 0 } }
      }
    ]

    const deduplicated = wrapper.vm.removeDuplicateResults(apiResponse)
    expect(deduplicated.results).toBe(2)

    const keys = Object.keys(deduplicated.list)
    expect(keys.length).toBe(2)
    expect(keys).toStrictEqual([
      '6euUCE3oFP3V6_guMBbFIA',
      'uIdTetEMkRK2k0HesKl-Ww'
    ])
  })

  // it('pushes the router path to the client ID', () => {
  //   wrapper = shallowMount(ClientSearch, {
  //     mocks: {
  //       $nuxt: {
  //         $route: {
  //           query: { term: '' },
  //           params: { id: '123' }
  //         }
  //       },
  //       $router: []
  //     }
  //   })

  //   expect(wrapper.vm.handleSelectClient('123')).toBe('123')
  //   expect(wrapper.vm.$router.length).toBe(1)
  // })
})
