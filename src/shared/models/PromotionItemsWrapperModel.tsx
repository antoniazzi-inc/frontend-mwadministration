import { IBaseEntity } from './baseModel';
import { IIdQty } from './IdQtyModel'

export interface IPromotionItemsWrapper extends IBaseEntity {
    products?: IIdQty[];
    attributeValues?: IIdQty[];
}

export class PromotionItemsWrapper implements IPromotionItemsWrapper {
constructor(
    public products?: IIdQty[],
    public attributeValues?: IIdQty[],
  ){
  }
};
