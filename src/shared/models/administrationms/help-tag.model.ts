import { Moment } from 'moment'
import { IHelpContent } from './help-content.model'
import { ILanguage } from '@/shared/models/language.model'
import { IBaseEntity } from '@/shared/models/baseModel'
import { ICompany } from '@/shared/models/relationms/company.model'

export interface IHelpTag extends IBaseEntity{
    color?: string;
    helpTagLanguages?: ILanguage[];
    contents?: IHelpContent[];
}

export class HelpTag implements IHelpTag {
  constructor (
      public id?: number,
      public administrationId?: number,
        public color?: string,
        public helpTagLanguages?: ILanguage[],
        public contents?: IHelpContent[],
        public version?: number,
        public createdOn?: Moment,
        public updatedOn?: Moment
  ) {
    this.color = color || '#2d99f3'
  }
}
