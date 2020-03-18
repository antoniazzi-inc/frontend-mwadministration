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

  public async post (entity: T): Promise<AxiosResponse> {
    return super.postRequest(this.url, entity)
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
