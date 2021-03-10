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

import BaseEntityService from '@/shared/services/baseEntityService'
import { IAdministration } from '@/shared/models/administrationms/administrationModel'

export default class AdministrationService extends BaseEntityService<IAdministration> {
  private static instance: AdministrationService;

  private constructor () {
    super('api/administrationms/api/administrations')
  }

  public static getInstance (): AdministrationService {
    if (!AdministrationService.instance) {
      return new AdministrationService()
    }
    return AdministrationService.instance
  }

  public async createAdministration (entity: any) {
    return this.postRequest('api/administrations', entity)
  }
}
