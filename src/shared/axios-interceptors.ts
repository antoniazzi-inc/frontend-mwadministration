import axios, { AxiosResponse } from 'axios'
// const SERVER_API_URL = process.env.SERVER_API_URL
const TIMEOUT = 10000000 // 10000
const setupAxiosInterceptors = (onUnauthenticated: any) => {
  const onRequestSuccess = (config: any) => {
    config.headers = {
      Accept: 'application/json'
    }
    config.timeout = TIMEOUT
    return config
  }
  const onResponseSuccess = (response: any) => {
    return response
  }
  const onResponseError = async (err: any) => {
    onUnauthenticated(err.response)
  }
  axios.defaults.withCredentials = true
  axios.defaults.headers.common = {
    'Content-Encoding': 'gzip'
  }
  if (axios.interceptors) {
    axios.interceptors.request.use(onRequestSuccess)
    axios.interceptors.response.use(onResponseSuccess, onResponseError)
  }
}
export default setupAxiosInterceptors
