import { IRelationCustomField } from './relation-custom-field.model'
import { Moment } from 'moment'
import { IBaseEntity } from '@/shared/models/baseModel'
import { IRelationEntity } from '@/shared/models/relationModel'
export interface IRelationEvent extends IBaseEntity{
    relationEventType?: string;
    field?: string;
    oldValue?: any;
    newValue?: any;
    ip?: string;
    relationCustomField?: IRelationCustomField;
    relation?: IRelationEntity;
    owner?: IRelationEntity;
}

export class RelationEvent implements IRelationEvent {
  constructor (
      public id?: number,
      public administrationId?: number,
        public relationEventType?: string,
        public field?: string,
        public oldValue?: any,
        public newValue?: any,
        public ip?: string,
        public relationCustomField?: IRelationCustomField,
        public relation?: IRelationEntity,
        public owner?: IRelationEntity,
        public version?: number,
        public createdOn?: Moment,
        public updatedOn?: Moment
  ) {}
}
