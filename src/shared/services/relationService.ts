import { AxiosResponse } from 'axios'
import BaseEntityService from '@/shared/services/baseEntityService'
import { IRelationEntity } from '@/shared/models/relationModel'

export default class RelationService extends BaseEntityService<IRelationEntity> {
  private static instance: RelationService;

  private constructor () {
    super('api/relationms/api/relations')
  }

  public static getInstance (): RelationService {
    if (!RelationService.instance) {
      return new RelationService()
    }
    return RelationService.instance
  }

  public async retrieveAccount () {
    return this.getRequest(`${this.url}/me`)
  }

  public async createMultiple (entity: any) {
    return this.postRequest(`${this.url}/create-multiple`, entity)
  }

  public async import (entity: any) {
    return this.postRequest(`${this.url}/import`, entity)
  }

  public async search (entity: any, onDownloadProgress?:any ) {
    return this.postRequest(`${this.url}/searchNoPage`, entity, function (progress:any) {

      }, function (progress:any) {
      if (onDownloadProgress) onDownloadProgress(progress)
    })
  }
}
