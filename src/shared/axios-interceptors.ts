/*
 *
 *  * Copyright 2018-2021 Antoniazzi Holding BV
 *  *
 *  * This program is free software: you can redistribute it and/or modify it
 *  * under the terms of the GNU General Public License as published by
 *  * the Free Software Foundation, either version 3 of the License,
 *  * or (at your option) any later version.
 *  *
 *  * This program is distributed in the hope that it will be useful,
 *  * but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 *  * GNU General Public License for more details.
 *  *
 *  * You should have received a copy of the GNU General Public License
 *  * along with this program. If not, see <https://www.gnu.org/licenses/>.
 *
 */

import axios, { AxiosResponse } from 'axios'
import {EventBus} from "@/shared/eventBus";
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
    handleError(err)
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
const handleError = (err:any) => {
  EventBus.$emit('showServerError', err)
}
export default setupAxiosInterceptors
