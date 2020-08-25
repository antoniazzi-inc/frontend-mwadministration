import { Moment } from 'moment';
import { IBaseEntity } from '../baseModel';
import { IDiscount } from './DiscountModel'

export interface ITypeLoyaltyBased extends IBaseEntity {
    createdOn?: Moment;
    updatedOn?: Moment;
    id?: number;
    version?: number;
    administrationId?: number;
    points?: number;
    totalPurchaseItems?: number;
    totalPurchaseAmount?: number;
    discount?: IDiscount;
}

export class TypeLoyaltyBased implements ITypeLoyaltyBased {
constructor(
    public createdOn?: Moment,
    public updatedOn?: Moment,
    public id?: number,
    public version?: number,
    public administrationId?: number,
    public points?: number,
    public totalPurchaseItems?: number,
    public totalPurchaseAmount?: number,
    public discount?: IDiscount,
  ){
  }
};
