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
