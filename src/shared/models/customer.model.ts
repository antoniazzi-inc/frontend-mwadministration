import { IRelationEntity } from './relationModel'
import { Moment } from 'moment'
import { IBaseEntity } from '@/shared/models/baseModel'
import { ICompany } from '@/shared/models/company.model'
export interface ICustomer extends IBaseEntity{
    customerNumber?: string;
    vatNumber?: string;
    infoiceLetter?: boolean;
    onePageCheckout?: boolean;
    relation?: IRelationEntity;
}

export class Customer implements ICustomer {
  constructor (
      public id?: number,
      public administrationId?: number,
        public customerNumber?: string,
        public vatNumber?: string,
        public infoiceLetter?: boolean,
        public onePageCheckout?: boolean,
        public relation?: IRelationEntity,
        public version?: number,
        public createdOn?: Moment,
        public updatedOn?: Moment
  ) {
    this.infoiceLetter = this.infoiceLetter || false
    this.onePageCheckout = this.onePageCheckout || false
  }
}
