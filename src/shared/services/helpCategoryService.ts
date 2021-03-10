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
import { IHelpCategory } from '@/shared/models/administrationms/help-category.model'

export default class HelpCategoryService extends BaseEntityService<IHelpCategory> {
  private static instance: HelpCategoryService;

  private constructor () {
    super('api/administrationms/api/help-categories')
  }

  public static getInstance (): HelpCategoryService {
    if (!HelpCategoryService.instance) {
      return new HelpCategoryService()
    }
    return HelpCategoryService.instance
  }
}
