# Phorest tech test - Ed Phillips

[https://phorest-techtest-ed-phillips.netlify.com/](https://phorest-techtest-ed-phillips.netlify.com/)

This is a Nuxt Vue.js SPA. The parts you will most likely be interested in are located in the `pages` and `components` directories. Nuxt automatically generates the router, so 'page' components which contain most of the functionality are inside `pages`.

> Show us examples of 2-3 patterns you feel important to building an application like this and we will use them to drive the discussion while reviewing the test with you.

For a simpler UI, I decided to create a multifaceted search which queries the client API endpoint by `email`, `phone`, `firstName` and `lastName` simultaneously, then reducing the results to remove duplicates.

```javascript
removeDuplicateResults(clientArray) {
  const clientList = clientArray.reduce(
    (accumulator, searchTerm) => {
      if (!searchTerm.data.page.size) {
        return accumulator
      }
      searchTerm.data._embedded.clients.map(
        customer => (accumulator.list[customer.clientId] = customer)
      )
      return accumulator
    },
    { list: {} }
  )

  clientList.results = Object.keys(clientList.list).length

  return clientList
}
```

Validating user input is another important part of this. I went with a whitelist function which only allows alphanumeric and common email characters. This goes for uri parameters too.

Finally, having the app watch the query parameters allows for deep linking, and for the back button to work well; which means that the user can choose a customer and then go back to the search results to select another result.

## Requirements

You'll need a `.env` file in the root of this project for it to work with the following variables:

```text
NUXT_ENV_BASIC_AUTH_USER=
NUXT_ENV_BASIC_AUTH_PASS=
NUXT_ENV_BUSINESS_ID=
NUXT_ENV_BRANCH_ID=
NUXT_ENV_API_BASE=https://api-gateway-dev.phorest.com/third-party-api-server/api
```

I used the details provided in the tech test description.

## Build Setup

``` bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# test
$ npm run test
```
