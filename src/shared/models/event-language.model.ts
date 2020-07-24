import { IBaseEntity } from '@/shared/models/baseModel'
import { IHelpCategory } from '@/shared/models/help-category.model'
import { ICompany } from '@/shared/models/company.model'
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
