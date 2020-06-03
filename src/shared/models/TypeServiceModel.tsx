import { Moment } from 'moment';
import { IBaseEntity } from './baseModel';

export interface ITypeService extends IBaseEntity {
    createdOn?: Moment;
    updatedOn?: Moment;
    id?: number;
    version?: number;
    administrationId?: number;
    priceType?: string;
}

export class TypeService implements ITypeService {
constructor(
    public createdOn?: Moment,
    public updatedOn?: Moment,
    public id?: number,
    public version?: number,
    public administrationId?: number,
    public priceType?: string,
  ){
  }
};
