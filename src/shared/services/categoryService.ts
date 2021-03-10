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
import { ICategoryEntity } from '@/shared/models/administrationms/categoryModel'

export default class CategoryService extends BaseEntityService<ICategoryEntity> {
  private static instance: CategoryService;

  private constructor () {
    super('api/administrationms/api/categories')
  }

  public static getInstance (): CategoryService {
    if (!CategoryService.instance) {
      return new CategoryService()
    }
    return CategoryService.instance
  }

  public deleteCategory(id: number) {
    return this.deleteRequest(`api/categories/`+id)
  }
}
