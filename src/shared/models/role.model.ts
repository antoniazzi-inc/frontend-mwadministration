import { IPermission } from './permission.model'
import { Moment } from 'moment'
import { IRelationEntity } from '@/shared/models/relationModel'
export interface IRole {
    id?: number;
    administrationId?: number;
    name?: string;
    code?: string;
    description?: string;
    createdOn?: Moment;
    updatedOn?: Moment;
    version?: number;
    permissions?: IPermission[];
    relations?: IRelationEntity[];
}

export class Role implements IRole {
  constructor (
        public id?: number,
        public administrationId?: number,
        public name?: string,
        public code?: string,
        public description?: string,
        public createdOn?: Moment,
        public updatedOn?: Moment,
        public version?: number,
        public permissions?: IPermission[],
        public relations?: IRelationEntity[]
  ) {}
}
