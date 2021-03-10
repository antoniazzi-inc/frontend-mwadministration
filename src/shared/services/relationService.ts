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

import { AxiosResponse } from 'axios'
import BaseEntityService from '@/shared/services/baseEntityService'
import { IRelationEntity } from '@/shared/models/relationms/relationModel'

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
      if (onDownloadProgress) onDownloadProgress(progress)
      }, function (progress:any) {
    })
  }
}
