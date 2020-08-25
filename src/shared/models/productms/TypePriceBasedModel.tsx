import { Moment } from 'moment';
import { IBaseEntity } from '../baseModel';
import { IDiscount } from './DiscountModel'
import { IPromotion } from './PromotionModel'

export interface ITypePriceBased extends IBaseEntity {
    createdOn?: Moment;
    updatedOn?: Moment;
    id?: number;
    version?: number;
    administrationId?: number;
    price?: number;
    discount?: IDiscount;
    promotion?: IPromotion;
}

export class TypePriceBased implements ITypePriceBased {
constructor(
    public createdOn?: Moment,
    public updatedOn?: Moment,
    public id?: number,
    public version?: number,
    public administrationId?: number,
    public price?: number,
    public discount?: IDiscount,
    public promotion?: IPromotion,
  ){
  }
};
