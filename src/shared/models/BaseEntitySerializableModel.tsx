import { Moment } from 'moment';
import { IBaseEntity } from './baseModel';

export interface IBaseEntitySerializable extends IBaseEntity {
    createdOn?: Moment;
    updatedOn?: Moment;
}

export class BaseEntitySerializable implements IBaseEntitySerializable {
constructor(
    public createdOn?: Moment,
    public updatedOn?: Moment,
  ){
  }
};
