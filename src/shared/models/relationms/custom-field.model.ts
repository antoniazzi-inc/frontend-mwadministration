
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

import { ICustomFieldOption } from './custom-field-option.model'
import { IRelationCustomField } from './relation-custom-field.model'

import { IBaseEntity } from '@/shared/models/baseModel'
import { ILanguage } from '@/shared/models/language.model'
import { ICompany } from '@/shared/models/relationms/company.model'
import { Moment } from 'moment'
export const enum CustomFieldType {
    TEXT = 'TEXT',
    BOOLEAN = 'BOOLEAN',
    OPTION_LIST = 'OPTION_LIST'
}

export interface ICustomField extends IBaseEntity{
    code?: string;
    userVisible?: boolean;
    userEditable?: boolean;
    gdprSpecialField?: boolean;
    customFieldType?: CustomFieldType;
    categoryId?: number;
    customFieldLanguages?: ILanguage[];
    customFieldOptions?: ICustomFieldOption[];
    relationCustomFields?: IRelationCustomField[];
}

export class CustomField implements ICustomField {
  constructor (
      public id?: number,
      public administrationId?: number,
        public code?: string,
        public userVisible?: boolean,
        public userEditable?: boolean,
        public gdprSpecialField?: boolean,
        public customFieldType?: CustomFieldType,
        public categoryId?: number,
        public customFieldLanguages?: ILanguage[],
        public customFieldOptions?: ICustomFieldOption[],
        public relationCustomFields?: IRelationCustomField[],
        public version?: number,
        public createdOn?: Moment,
        public updatedOn?: Moment
  ) {
    this.userVisible = this.userVisible || true
    this.userEditable = this.userEditable || true
    this.gdprSpecialField = this.gdprSpecialField || false
  }
}
