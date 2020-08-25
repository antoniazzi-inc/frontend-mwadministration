
import { Moment } from 'moment'
import { IRelationEntity } from '@/shared/models/relationms/relationModel'
import { IBaseEntity } from '@/shared/models/baseModel'
import { ICompany } from '@/shared/models/relationms/company.model'
export interface IRelationDeliveryMethod extends IBaseEntity{
    deliveryMethodId?: number;
    regionId?: number;
    relation?: IRelationEntity;
}

export class RelationDeliveryMethod implements IRelationDeliveryMethod {
  constructor (
      public id?: number,
      public administrationId?: number,
        public deliveryMethodId?: number,
        public regionId?: number,
        public relation?: IRelationEntity,
        public version?: number,
        public createdOn?: Moment,
        public updatedOn?: Moment
  ) {}
}
