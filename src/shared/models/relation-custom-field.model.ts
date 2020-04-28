import { IRelationEvent } from './relation-event.model'
import { IRelationEntity } from './relationModel'
import { ICustomField } from './custom-field.model'
import { IBaseEntity } from '@/shared/models/baseModel'
import { ICompany } from '@/shared/models/company.model'
import { Moment } from 'moment'
export interface IRelationCustomField extends IBaseEntity{
    value?: string;
    relation?: IRelationEntity;
    customField?: ICustomField;
}

export class RelationCustomField implements IRelationCustomField {
  constructor (
      public id?: number,
      public administrationId?: number,
        public value?: string,
        public relation?: IRelationEntity,
        public customField?: ICustomField,
        public version?: number,
        public createdOn?: Moment,
        public updatedOn?: Moment
  ) {}
}
