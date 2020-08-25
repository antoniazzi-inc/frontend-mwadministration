import { IRelationEntity } from './relationms/relationModel'
import { Moment } from 'moment'
import { IBaseEntity } from '@/shared/models/baseModel'
import { ICompany } from '@/shared/models/relationms/company.model'
export interface ICustomer extends IBaseEntity{
    customerNumber?: string;
    vatNumber?: string;
    vatDisabled?: boolean;
    invoiceLetter?: boolean;
    onePageCheckout?: boolean;
    asCompany?: boolean;
    defaultPaymentMethodId?: number;
    relation?: IRelationEntity;
}

export class Customer implements ICustomer {
  constructor (
      public id?: number,
      public administrationId?: number,
        public customerNumber?: string,
        public vatNumber?: string,
        public vatDisabled?: boolean,
        public invoiceLetter?: boolean,
        public onePageCheckout?: boolean,
        public asCompany?: boolean,
        public relation?: IRelationEntity,
        public defaultPaymentMethodId?: number,
        public version?: number,
        public createdOn?: Moment,
        public updatedOn?: Moment
  ) {
    this.invoiceLetter = this.invoiceLetter || false
    this.onePageCheckout = this.onePageCheckout || false
    this.vatDisabled = this.vatDisabled || false
    this.asCompany = this.asCompany || false
  }
}
