import axios from 'axios'

export const axiosGetData = axios.create({
  method: 'get',
  baseURL: process.env.NUXT_ENV_API_BASE,
  auth: {
    username: process.env.NUXT_ENV_BASIC_AUTH_USER,
    password: process.env.NUXT_ENV_BASIC_AUTH_PASS
  }
})

export const axiosPostData = axios.create({
  method: 'post',
  baseURL: process.env.NUXT_ENV_API_BASE,
  auth: {
    username: process.env.NUXT_ENV_BASIC_AUTH_USER,
    password: process.env.NUXT_ENV_BASIC_AUTH_PASS
  }
})
