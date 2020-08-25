import { Moment } from 'moment';
import { IBaseEntity } from '../baseModel';
import { IDiscount } from './DiscountModel'

export interface ITypeTimeBased extends IBaseEntity {
    createdOn?: Moment;
    updatedOn?: Moment;
    id?: number;
    version?: number;
    administrationId?: number;
    discount?: IDiscount;
}

export class TypeTimeBased implements ITypeTimeBased {
constructor(
    public createdOn?: Moment,
    public updatedOn?: Moment,
    public id?: number,
    public version?: number,
    public administrationId?: number,
    public discount?: IDiscount,
  ){
  }
};
