import { Moment } from 'moment'
import { ICountry } from './country.model'
import { IBaseEntity } from '@/shared/models/baseModel'
import { IRelationEntity } from '@/shared/models/relationms/relationModel'

export interface ITimeZone extends IBaseEntity{
    code?: string;
    country?: ICountry;
}

export class TimeZone implements ITimeZone {
  constructor (
      public id?: number,
      public administrationId?: number,
        public code?: string,
        public country?: ICountry,
        public version?: number,
        public createdOn?: Moment,
        public updatedOn?: Moment
  ) {}
}
