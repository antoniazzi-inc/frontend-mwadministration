import { IBaseEntity } from '@/shared/models/baseModel'
import { IHelpCategory } from '@/shared/models/administrationms/help-category.model'
import { ICompany } from '@/shared/models/relationms/company.model'
import { Moment } from 'moment'

export interface ILanguage extends IBaseEntity{
  langKey?: string;
  title?: string;
  name?: string;
  intro?: string;
  helpCategory?: IHelpCategory;
}

export class Language implements ILanguage {
  constructor (
      public id?: number,
      public administrationId?: number,
      public langKey?: string,
      public title?: string,
      public name?: string,
      public description?: string,
      public intro?: string,
      public helpCategory?: IHelpCategory,
      public version?: number,
      public createdOn?: Moment,
      public updatedOn?: Moment
  ) {}
}
