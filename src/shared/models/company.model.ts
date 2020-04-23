import {ICompanyPhone, PhoneType} from './company-phone.model'
import {AddressType, ICompanyAddress} from './company-address.model'
import { IBusiness } from './business.model'
import { IRelationEntity } from './relationModel'
import { IBaseEntity } from '@/shared/models/baseModel'
import { Moment } from 'moment'
export interface ICompany extends IBaseEntity{
  name?: string
  description?: string
  website?: string
  alias?: string
  vatNumber?: string
  addressStreet?: string
  addressHouseNumber?: string
  city?: string
  countryId?: number
  entranceNumber?: string
  appartmentNumber?: string
  postalCode?: string
  addressDescription?: string
  addressType?: AddressType
  phoneNumber?: string
  phoneDescription?: string
  phoneType?: PhoneType
  business?: IBusiness
  relations?: IRelationEntity[]
}

export class Company implements ICompany {
  constructor (
        public id?: number,
        public administrationId?: number,
        public version?: number,
        public createdOn?: Moment,
        public updatedOn?: Moment,
        public name?: string,
        public description?: string,
        public website?: string,
        public alias?: string,
        public vatNumber?: string,
        public addressStreet?: string,
        public addressHouseNumber?: string,
        public city?: string,
        public countryId?: number,
        public entranceNumber?: string,
        public appartmentNumber?: string,
        public postalCode?: string,
        public addressDescription?: string,
        public addressType?: AddressType,
        public phoneNumber?: string,
        public phoneDescription?: string,
        public phoneType?: PhoneType,
        public business?: IBusiness,
        public relations?: IRelationEntity[]
  ) {}
}
