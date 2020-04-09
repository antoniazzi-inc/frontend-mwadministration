import { ICompany } from './company.model'
import { IBaseEntity } from '@/shared/models/baseModel'
import { Moment } from 'moment'
export const enum PhoneType {
    WORK = 'WORK',
    HOME = 'HOME',
    MOBILE = 'MOBILE',
    OTHER = 'OTHER',
}

export interface ICompanyPhone extends IBaseEntity{
    number?: string;
    description?: string;
    phoneType?: PhoneType;
    company?: ICompany;
}

export class CompanyPhone implements ICompanyPhone {
  constructor (
        public id?: number,
        public administrationId?: number,
        public number?: string,
        public description?: string,
        public phoneType?: PhoneType,
        public company?: ICompany,
        public version?: number,
        public createdOn?: Moment,
        public updatedOn?: Moment
  ) {}
}
