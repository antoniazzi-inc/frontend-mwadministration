import { Moment } from 'moment'
import { IDeliveryMethod } from './delivery-method.model'
import { IBaseEntity } from '@/shared/models/baseModel'

export interface IDeliveryMethodLanguage extends IBaseEntity{
    langKey?: string;
    name?: string;
    description?: string;
    deliveryMethod?: IDeliveryMethod;
}

export class DeliveryMethodLanguage implements IDeliveryMethodLanguage {
  constructor (
        public id?: number,
        public administrationId?: number,
        public langKey?: string,
        public name?: string,
        public description?: string,
        public createdOn?: Moment,
        public updatedOn?: Moment,
        public version?: number,
        public deliveryMethod?: IDeliveryMethod
  ) {}
}
