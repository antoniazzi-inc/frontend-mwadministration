import axios, { AxiosResponse } from 'axios'

export default abstract class BaseService {
  protected url: string;

  protected constructor (url: string) {
    this.url = url
  }

  public async getRequest (url: string): Promise<AxiosResponse> {
    return new Promise<AxiosResponse>(resolve => {
      axios.get(url).then(resp => {
        resolve(resp)
      })
    })
  }

  public async postRequest (url: string, obj: any, uploadProgress?: any): Promise<AxiosResponse> {
    return new Promise<AxiosResponse>(resolve => {
      axios.post(url, obj, {
        onUploadProgress: function(progressEvent) {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          console.log(percentCompleted + '%')
          if(uploadProgress) {
            uploadProgress(percentCompleted)
          }
        }
      }).then(resp => {
        resolve(resp)
      })
    })
  }

  public async patchRequest (url: string, obj: any): Promise<AxiosResponse> {
    return new Promise<AxiosResponse>(resolve => {
      axios.patch(url, obj).then(resp => {
        resolve(resp)
      })
    })
  }

  public async putRequest (url: string, obj: any): Promise<AxiosResponse> {
    return new Promise<AxiosResponse>(resolve => {
      axios.put(url, obj).then(resp => {
        resolve(resp)
      })
    })
  }

  public async deleteRequest (url: string, obj?: any): Promise<AxiosResponse> {
    return new Promise<AxiosResponse>(resolve => {
      axios.delete(url).then(resp => {
        resolve(resp)
      })
    })
  }
}
