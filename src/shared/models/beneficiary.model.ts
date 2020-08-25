import { IRelationEntity } from './relationms/relationModel'
import { IBaseEntity } from '@/shared/models/baseModel'
import { Moment } from 'moment'
export interface IBeneficiary extends IBaseEntity{
    relation?: IRelationEntity;
}

export class Beneficiary implements IBeneficiary {
  constructor (
      public id?: number,
      public administrationId?: number,
        public relation?: IRelationEntity,
        public version?: number,
        public createdOn?: Moment,
        public updatedOn?: Moment
  ) {}
}
