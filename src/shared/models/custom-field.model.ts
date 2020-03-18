
import { ICustomFieldOption } from './custom-field-option.model'
import { IRelationCustomField } from './relation-custom-field.model'

import { IBaseEntity } from '@/shared/models/baseModel'
import { ILanguage } from '@/shared/models/language.model'
import { ICompany } from '@/shared/models/company.model'
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
