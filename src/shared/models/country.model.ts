import { Moment } from 'moment'
import { ITimeZone } from './time-zone.model'
import { IBaseEntity } from '@/shared/models/baseModel'
import { ICompany } from '@/shared/models/company.model'

export interface ICountry extends IBaseEntity{
    iso?: string;
    iso3?: string;
    numCode?: string;
    phoneCode?: string;
    nlName?: string;
    enName?: string;
    timeZones?: ITimeZone[];
}

export class Country implements ICountry {
  constructor (
      public id?: number,
      public administrationId?: number,
        public iso?: string,
        public iso3?: string,
        public numCode?: string,
        public phoneCode?: string,
        public nlName?: string,
        public enName?: string,
        public timeZones?: ITimeZone[],
        public version?: number,
        public createdOn?: Moment,
        public updatedOn?: Moment
  ) {}
}
