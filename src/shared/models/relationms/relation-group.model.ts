import { IBaseEntity } from '@/shared/models/baseModel'
import { IRelationEntity } from '@/shared/models/relationms/relationModel'
import { Moment } from 'moment'
export interface IRelationGroup extends IBaseEntity{
    name?: string;
    label?: string;
    categoryId?: number;
    relations?: IRelationEntity[];
}

export class RelationGroup implements IRelationGroup {
  constructor (
      public id?: number,
      public administrationId?: number,
        public name?: string,
        public label?: string,
        public categoryId?: number,
        public relations?: IRelationEntity[],
        public version?: number,
        public createdOn?: Moment,
        public updatedOn?: Moment
  ) {}
}
