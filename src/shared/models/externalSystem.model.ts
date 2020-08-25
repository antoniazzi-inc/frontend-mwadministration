import { ICompanyPhone } from './relationms/company-phone.model'
import { ICompanyAddress } from './relationms/company-address.model'
import { IBusiness } from './administrationms/business.model'
import { IRelationEntity } from './relationms/relationModel'
import { IBaseEntity } from '@/shared/models/baseModel'
import { Moment } from 'moment'
export interface IExternalSystem extends IBaseEntity{
  settingKey?: string;
  status?: ExternalSystemType;
  settingValueJson?: string;
}
export const enum ExternalSystemType {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  TEST = 'TEST',
}
export class ExternalSystem implements IExternalSystem {
  constructor (
      public id?: number,
      public administrationId?: number,
        public settingKey?: string,
        public status?: ExternalSystemType,
        public settingValueJson?: string,
        public version?: number,
        public createdOn?: Moment,
        public updatedOn?: Moment
  ) {}
}
