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
      }).catch(e=>{
        reject(e)
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
      }).catch(e=>{
        reject(e)
      })
    })
  }

  public async patchRequest (url: string, obj: any): Promise<AxiosResponse> {
    return new Promise<AxiosResponse>((resolve, reject) => {
      axios.patch(url, obj).then(resp => {
        resolve(resp)
      }).catch(e=>{
        reject(e)
      })
    })
  }

  public async putRequest (url: string, obj: any): Promise<AxiosResponse> {
    return new Promise<AxiosResponse>((resolve, reject) => {
      axios.put(url, obj).then(resp => {

        resolve(resp)
      }).catch(e=>{

        reject(e)
      })
    })
  }

  public async deleteRequest (url: string, obj?: any): Promise<AxiosResponse> {
    return new Promise<AxiosResponse>((resolve, reject) => {
      axios.delete(url).then(resp => {
        resolve(resp)
      }).catch(e=>{
        reject(e)
      })
    })
  }
}
