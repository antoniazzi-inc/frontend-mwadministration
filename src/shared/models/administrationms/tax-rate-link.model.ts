import { Moment } from 'moment'
import { ITaxRate } from './tax-rate.model'
import { IBaseEntity } from '@/shared/models/baseModel'

export interface ITaxRateLink extends IBaseEntity {
    validFrom?: Moment;
    validTo?: Moment;
    fromTaxRate?: ITaxRate;
    toTaxRate?: ITaxRate;
}

export class TaxRateLink implements ITaxRateLink {
  constructor (
        public id?: number,
        public validFrom?: Moment,
        public validTo?: Moment,
        public createdOn?: Moment,
        public updatedOn?: Moment,
        public version?: number,
        public fromTaxRate?: ITaxRate,
        public toTaxRate?: ITaxRate
  ) {}
}
