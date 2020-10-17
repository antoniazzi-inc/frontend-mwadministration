import { IBaseEntity } from '@/shared/models/baseModel'
import { Moment } from 'moment'

export interface IWorkflow extends IBaseEntity{
    name?: string;
    description?: string;
    categoryId?: number;
    status?: string; //STATUS_EMPTY, STATUS_ACTIVE, STATUS_DISABLED, STATUS_MAINTENANCE
    definition?: any;
}

export class Workflow implements IWorkflow {
  constructor (
      public id?: number,
      public administrationId?: number,
        public name?: string,
        public description?: string,
        public categoryId?: number,
        public status?: string,
        public version?: number,
        public definition?: any,
        public createdOn?: Moment,
        public updatedOn?: Moment
  ) {}
}
