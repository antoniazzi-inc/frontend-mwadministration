import { Moment } from 'moment'
import { IDeliveryMethodLanguage } from './delivery-method-language.model'
import { IBaseEntity } from '@/shared/models/baseModel'

export const enum DeliveryMethodType {
    DIGITAL = 'DIGITAL',
    OTHER_PARTY = 'OTHER_PARTY',
    INHOUSE = 'INHOUSE'
}

export interface IDeliveryMethod extends IBaseEntity{
    deliveryMethodType?: DeliveryMethodType;
    configJson?: string;
    deliveryMethodLanguages?: IDeliveryMethodLanguage[];
    orderLineDeliveryMethodId?: number;
}

export class DeliveryMethod implements IDeliveryMethod {
  constructor (
        public id?: number,
        public administrationId?: number,
        public deliveryMethodType?: DeliveryMethodType,
        public configJson?: string,
        public createdOn?: Moment,
        public updatedOn?: Moment,
        public version?: number,
        public deliveryMethodLanguages?: IDeliveryMethodLanguage[],
        public orderLineDeliveryMethodId?: number
  ) {
    this.deliveryMethodType = deliveryMethodType || DeliveryMethodType.INHOUSE
  }
}
