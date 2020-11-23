import { Moment } from 'moment';
import { IBaseEntity } from '../baseModel';
import { IPromotion } from './PromotionModel'

export interface IPromotionProductCategory extends IBaseEntity {
    createdOn?: Moment;
    updatedOn?: Moment;
    id?: number;
    version?: number;
    administrationId?: number;
    categoryId?: number;
    promotion?: IPromotion;
}

export class PromotionProductCategory implements IPromotionProductCategory {
constructor(
    public createdOn?: Moment,
    public updatedOn?: Moment,
    public id?: number,
    public version?: number,
    public administrationId?: number,
    public ategoryId?: number,
    public promotion?: IPromotion,
  ){
  }
};
