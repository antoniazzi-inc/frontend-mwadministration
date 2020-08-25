import { Moment } from 'moment';
import { IBaseEntity } from '../baseModel';
import { IPromotionItemsWrapper } from '@/shared/models/productms/PromotionItemsWrapperModel'

export interface IDiscount extends IBaseEntity {
    createdOn?: Moment;
    updatedOn?: Moment;
    id?: number;
    version?: number;
    administrationId?: number;
    percentage?: number;
    fixed?: number;
    noShipping?: boolean;
    freeItemsJson?: IPromotionItemsWrapper;
    entireOrder?: boolean;
}

export class Discount implements IDiscount {
constructor(
    public createdOn?: Moment,
    public updatedOn?: Moment,
    public id?: number,
    public version?: number,
    public administrationId?: number,
    public percentage?: number,
    public fixed?: number,
    public noShipping?: boolean,
    public freeItemsJson?: IPromotionItemsWrapper,
    public entireOrder?: boolean,
  ){
  }
};
