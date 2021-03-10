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
import BaseService from '@/shared/services/baseService'

export default abstract class BaseEntityService<T> extends BaseService {
  protected constructor (url: string) {
    super(url)
  }

  public async get (id: number): Promise<AxiosResponse> {
    return super.getRequest(`${this.url}/${id}`)
  }

  public async getAll (pagination: any, q: any): Promise<AxiosResponse> {
    pagination = await this.createPaginationQuery(pagination)
    if (q) {
      return super.getRequest(`${this.url}?q=${q}${pagination}`)
    } else {
      return super.getRequest(`${this.url}?${pagination}`)
    }
  }

  public async post (entity: T, onUploadProgress?:any): Promise<AxiosResponse> {
    return super.postRequest(this.url, entity, onUploadProgress)
  }

  public async patch (entity: T): Promise<AxiosResponse> {
    return super.patchRequest(this.url, entity)
  }

  public async put (entity: T): Promise<AxiosResponse> {
    return super.putRequest(`${this.url}`, entity)
  }

  public async delete (id: number, entity?: T): Promise<AxiosResponse> {
    return super.deleteRequest(this.url + '/' + id, entity)
  }

  public async createPaginationQuery (pagination: any) {
    return `&page=${pagination.page}&size=${pagination.size}&sort=${pagination.sort}`
  }
}
