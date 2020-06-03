import { Moment } from 'moment';
import { IBaseEntity } from './baseModel';
import { IDiscount } from './DiscountModel'
import { IPromotion } from './PromotionModel'

export interface ITypeQuantityBased extends IBaseEntity {
    createdOn?: Moment;
    updatedOn?: Moment;
    id?: number;
    version?: number;
    administrationId?: number;
    quantity?: number;
    discount?: IDiscount;
    promotion?: IPromotion;
}

export class TypeQuantityBased implements ITypeQuantityBased {
constructor(
    public createdOn?: Moment,
    public updatedOn?: Moment,
    public id?: number,
    public version?: number,
    public administrationId?: number,
    public quantity?: number,
    public discount?: IDiscount,
    public promotion?: IPromotion,
  ){
  }
};
