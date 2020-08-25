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
