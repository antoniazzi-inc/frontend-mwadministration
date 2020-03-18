import { Moment } from 'moment'
import { IPaymentMethod } from './payment-method.model'
import { IBaseEntity } from '@/shared/models/baseModel'

export interface IPaymentMethodLanguage extends IBaseEntity{
    langKey?: string;
    name?: string;
    description?: string;
    paymentMethod?: IPaymentMethod;
}

export class PaymentMethodLanguage implements IPaymentMethodLanguage {
  constructor (
        public id?: number,
        public administrationId?: number,
        public langKey?: string,
        public name?: string,
        public description?: string,
        public createdOn?: Moment,
        public updatedOn?: Moment,
        public version?: number,
        public paymentMethod?: IPaymentMethod
  ) {}
}
