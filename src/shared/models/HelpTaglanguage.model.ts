import { IBaseEntity } from '@/shared/models/baseModel'
import { IHelpCategory } from '@/shared/models/help-category.model'
import { Moment } from 'moment'

export interface IHelpTagLanguage extends IBaseEntity{
  langKey?: string;
  name?: string;
  intro?: string;
  helpCategory?: IHelpCategory;
}

export class HelpTagLanguage implements IHelpTagLanguage {
  constructor (
      public id?: number,
      public administrationId?: number,
      public version?: number,
      public createdOn?: Moment,
      public updatedOn?: Moment,
      public langKey?: string,
      public name?: string,
      public intro?: string,
      public helpCategory?: IHelpCategory
  ) {
  }
}
