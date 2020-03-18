import { ICompanyPhone } from './company-phone.model'
import { ICompanyAddress } from './company-address.model'
import { IBusiness } from './business.model'
import { IRelationEntity } from './relationModel'
import { IBaseEntity } from '@/shared/models/baseModel'
import { Moment } from 'moment'
export interface IExternalSystem extends IBaseEntity{
  settingKey?: string;
  settingValueJson?: string;
}

export class ExternalSystem implements IExternalSystem {
  constructor (
      public id?: number,
      public administrationId?: number,
        public settingKey?: string,
        public settingValueJson?: string,
        public version?: number,
        public createdOn?: Moment,
        public updatedOn?: Moment
  ) {}
}
