import { ICompanyPhone } from './company-phone.model'
import { ICompanyAddress } from './company-address.model'
import { IBusiness } from './business.model'
import { IRelationEntity } from './relationModel'
import { IBaseEntity } from '@/shared/models/baseModel'
import { Moment } from 'moment'
export interface ICompany extends IBaseEntity{
    name?: string;
    description?: string;
    website?: string;
    alias?: string;
    vatNumber?: string;
    companyPhones?: ICompanyPhone[];
    companyAddresses?: ICompanyAddress[];
    business?: IBusiness;
    relations?: IRelationEntity[];
}

export class Company implements ICompany {
  constructor (
      public id?: number,
      public administrationId?: number,
        public name?: string,
        public description?: string,
        public website?: string,
        public alias?: string,
        public vatNumber?: string,
        public companyPhones?: ICompanyPhone[],
        public companyAddresses?: ICompanyAddress[],
        public business?: IBusiness,
        public relations?: IRelationEntity[],
        public version?: number,
        public createdOn?: Moment,
        public updatedOn?: Moment
  ) {}
}
