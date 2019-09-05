// See default config https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
module.exports = {
  theme: {
    extend: {},
    container: {
      center: false
    },
    fontFamily: {
      title: ['Josefin Sans', 'sans-serif'],
      body: ['Open Sans', 'sans-serif']
    }
  },
  variants: {},
  plugins: [require('tailwindcss-animatecss')(['responsive'])]
}
