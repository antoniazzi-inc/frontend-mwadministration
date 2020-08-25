import { Moment } from 'moment';
import { IBaseEntity } from '../baseModel';
import { IPromotionItemsWrapper } from './PromotionItemsWrapperModel'
import { IDiscount } from './DiscountModel'
import { IPromotion } from './PromotionModel'

export interface ITypeBundleBased extends IBaseEntity {
    createdOn?: Moment;
    updatedOn?: Moment;
    id?: number;
    version?: number;
    administrationId?: number;
    itemsJson?: IPromotionItemsWrapper;
    discount?: IDiscount;
    promotion?: IPromotion;
}

export class TypeBundleBased implements ITypeBundleBased {
constructor(
    public createdOn?: Moment,
    public updatedOn?: Moment,
    public id?: number,
    public version?: number,
    public administrationId?: number,
    public itemsJson?: IPromotionItemsWrapper,
    public discount?: IDiscount,
    public promotion?: IPromotion,
  ){
  }
};
