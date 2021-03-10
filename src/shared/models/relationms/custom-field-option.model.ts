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

import { ICustomField } from './custom-field.model'
import { IBaseEntity } from '@/shared/models/baseModel'
import { ILanguage } from '@/shared/models/language.model'
import { ICompany } from '@/shared/models/relationms/company.model'
import { Moment } from 'moment'
export interface ICustomFieldOption extends IBaseEntity{
    customFieldIndex?: number;
    value?: string;
    code?: string;
    maxOccurrences?: number;
    customFieldOptionLanguages?: ILanguage[];
    customField?: ICustomField;
}

export class CustomFieldOption implements ICustomFieldOption {
  constructor (
      public id?: number,
      public administrationId?: number,
        public customFieldIndex?: number,
        public value?: string,
        public code?: string,
        public maxOccurrences?: number,
        public customFieldOptionLanguages?: ILanguage[],
        public customField?: ICustomField,
        public version?: number,
        public createdOn?: Moment,
        public updatedOn?: Moment
  ) {}
}
