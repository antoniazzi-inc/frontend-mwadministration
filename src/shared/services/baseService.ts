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

export default abstract class BaseService {
  protected url: string;

  protected constructor (url: string) {
    this.url = url
  }

  public async getRequest (url: string): Promise<AxiosResponse> {
    return new Promise<AxiosResponse>((resolve, reject) => {
      axios.get(url).then(resp => {
        resolve(resp)
      }).catch(err=>{
        reject(err)
      })
    })
  }

  public async postRequest (url: string, obj: any, uploadProgress?: any, downloadProgress?: any): Promise<AxiosResponse> {
    return new Promise<AxiosResponse>((resolve, reject) => {
      axios.post(url, obj, {
        onUploadProgress: function(progressEvent) {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          console.log(percentCompleted + '%')
          if(uploadProgress) {
            uploadProgress(percentCompleted)
          }
        },
        onDownloadProgress: function(progressEvent) {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          if(downloadProgress) {
            downloadProgress(percentCompleted)
          }
        }
      }).then(resp => {
        resolve(resp)
      }).catch(err=>{
        reject(err)
      })
    })
  }

  public async patchRequest (url: string, obj: any): Promise<AxiosResponse> {
    return new Promise<AxiosResponse>((resolve, reject) => {
      axios.patch(url, obj).then(resp => {
        resolve(resp)
      }).catch(err=>{
        reject(err)
      })
    })
  }

  public async putRequest (url: string, obj: any): Promise<AxiosResponse> {
    return new Promise<AxiosResponse>((resolve, reject) => {
      axios.put(url, obj).then(resp => {
        resolve(resp)
      }).catch(err=>{
        reject(err)
      })
    })
  }

  public async deleteRequest (url: string, obj?: any): Promise<AxiosResponse> {
    return new Promise<AxiosResponse>((resolve, reject) => {
      axios.delete(url).then(resp => {
        resolve(resp)
      }).catch(err=>{
        reject(err)
      })
    })
  }
}
