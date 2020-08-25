import { Moment } from 'moment'
import { ICountry } from './country.model'
import { IBaseEntity } from '@/shared/models/baseModel'

export const enum CustomerType {
    ALL = 'ALL',
    COMPANY = 'COMPANY',
    PRIVATE = 'PRIVATE'
}

export const enum CustomerRegion {
    ALL = 'ALL',
    SAME_COUNTRY = 'SAME_COUNTRY',
    OTHER_COUNTRY_EU = 'OTHER_COUNTRY_EU',
    OTHER_COUNTRY_WORLD = 'OTHER_COUNTRY_WORLD'
}

export interface ITaxRule extends IBaseEntity{
    customerType?: CustomerType;
    customerRegion?: CustomerRegion;
    ruleType?: string;
    ruleJson?: string;
    country?: ICountry;
}

export class TaxRule implements ITaxRule {
  constructor (
        public id?: number,
        public customerType?: CustomerType,
        public customerRegion?: CustomerRegion,
        public ruleType?: string,
        public ruleJson?: string,
        public createdOn?: Moment,
        public updatedOn?: Moment,
        public version?: number,
        public country?: ICountry
  ) {}
}
