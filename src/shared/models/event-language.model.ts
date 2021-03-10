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

import { IBaseEntity } from '@/shared/models/baseModel'
import { IHelpCategory } from '@/shared/models/administrationms/help-category.model'
import { ICompany } from '@/shared/models/relationms/company.model'
import { Moment } from 'moment'

export interface IEventLanguage extends IBaseEntity{
  langKey?: string;
  title?: string;
  name?: string;
  description?: string;
}

export class EventLanguageModel implements IEventLanguage {
  constructor (
      public id?: number,
      public administrationId?: number,
      public langKey?: string,
      public title?: string,
      public name?: string,
      public description?: string,
      public version?: number,
      public createdOn?: Moment,
      public updatedOn?: Moment
  ) {}
}
