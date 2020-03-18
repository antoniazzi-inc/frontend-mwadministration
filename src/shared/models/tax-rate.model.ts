import { Moment } from 'moment'
import { ITaxRateLink } from './tax-rate-link.model'
import { ICountry } from './country.model'
import { IBaseEntity } from '@/shared/models/baseModel'

export interface ITaxRate extends IBaseEntity {
    level?: number;
    validFrom?: Moment;
    validTo?: Moment;
    rate?: number;
    fromTaxRateLinks?: ITaxRateLink[];
    toTaxRateLinks?: ITaxRateLink[];
    country?: ICountry;
}

export class TaxRate implements ITaxRate {
  constructor (
        public id?: number,
        public level?: number,
        public validFrom?: Moment,
        public validTo?: Moment,
        public rate?: number,
        public createdOn?: Moment,
        public updatedOn?: Moment,
        public version?: number,
        public fromTaxRateLinks?: ITaxRateLink[],
        public toTaxRateLinks?: ITaxRateLink[],
        public country?: ICountry
  ) {}
}
