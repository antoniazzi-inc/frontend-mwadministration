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
import { ICustomField } from '@/shared/models/relationms/custom-field.model'

export default class FreeFieldService extends BaseEntityService<ICustomField> {
  private static instance: FreeFieldService;

  private constructor () {
    super('api/relationms/api/custom-fields')
  }

  public static getInstance (): FreeFieldService {
    if (!FreeFieldService.instance) {
      return new FreeFieldService()
    }
    return FreeFieldService.instance
  }
  public deleteFreeField(id: number) {
    return this.deleteRequest(`api/custom-fields/`+id)
  }
}
