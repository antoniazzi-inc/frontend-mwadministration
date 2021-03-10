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
import { IHelpContent } from '@/shared/models/administrationms/help-content.model'
import { IHelpCategoryLanguage } from '@/shared/models/administrationms/HelpCategorylanguage.model'
import { ICompany } from '@/shared/models/relationms/company.model'
import { Moment } from 'moment'

export interface IHelpCategory extends IBaseEntity{
    color?: string;
    helpCategoryLanguages?: IHelpCategoryLanguage[];
    children?: IHelpCategory[];
    parent?: IHelpCategory;
    contents?: IHelpContent[];
}

export class HelpCategory implements IHelpCategory {
  constructor (
      public id?: number,
      public administrationId?: number,
        public color?: string,
        public helpCategoryLanguages?: IHelpCategoryLanguage[],
        public children?: IHelpCategory[],
        public parent?: IHelpCategory,
        public contents?: IHelpContent[],
        public version?: number,
        public createdOn?: Moment,
        public updatedOn?: Moment
  ) {
    this.color = this.color ? this.color : '#cccccc'
  }
}
