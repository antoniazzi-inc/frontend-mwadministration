import { ILoginEntity } from '@/shared/models/loginModel'
import { AxiosResponse } from 'axios'
import BaseService from '@/shared/services/baseService'

export default class AuthService extends BaseService {
  private static instance: AuthService;

  private constructor () {
    super('/api/auth')
  }

  public static getInstance (): AuthService {
    if (!AuthService.instance) {
      return new AuthService()
    }
    return AuthService.instance
  }

  public async login (entity: ILoginEntity): Promise<AxiosResponse> {
    return new Promise<AxiosResponse>(resolve => {
      this.postRequest(`${this.url}/login`, entity).then((resp: AxiosResponse) => {
        resolve(resp)
      })
    })
  }

  public async logout (): Promise<AxiosResponse> {
    return new Promise<AxiosResponse>(resolve => {
      this.getRequest(`${this.url}/logout`).then((resp: AxiosResponse) => {
        resolve(resp)
      })
    })
  }
}
