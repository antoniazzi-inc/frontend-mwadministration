import { Moment } from 'moment';
import { IBaseEntity } from './baseModel';
import { IPromotion } from './PromotionModel'

export interface IPromotionLanguage extends IBaseEntity {
    createdOn?: Moment;
    updatedOn?: Moment;
    id?: number;
    version?: number;
    langKey?: string;
    name?: string;
    description?: string;
    administrationId?: number;
    promotion?: IPromotion;
}

export class PromotionLanguage implements IPromotionLanguage {
constructor(
    public createdOn?: Moment,
    public updatedOn?: Moment,
    public id?: number,
    public version?: number,
    public langKey?: string,
    public name?: string,
    public description?: string,
    public administrationId?: number,
    public promotion?: IPromotion,
  ){
  }
};
