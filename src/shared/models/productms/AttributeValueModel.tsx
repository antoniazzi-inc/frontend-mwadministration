import { Moment } from 'moment';
import { IBaseEntity } from '../baseModel';
import { IAttribute } from './AttributeModel'
import { IAttributeValueLanguage } from './AttributeValueLanguageModel'
import { IPromotion } from './PromotionModel'

export interface IAttributeValue extends IBaseEntity {
    createdOn?: Moment;
    updatedOn?: Moment;
    id?: number;
    version?: number;
    administrationId?: number;
    orderIndex?: number;
    price?: number;
    stock?: number;
    value?: string;
    attribute?: IAttribute;
    attributeValueLanguages?: IAttributeValueLanguage[];
    promotions?: IPromotion[];
}

export class AttributeValue implements IAttributeValue {
constructor(
    public createdOn?: Moment,
    public updatedOn?: Moment,
    public id?: number,
    public version?: number,
    public administrationId?: number,
    public orderIndex?: number,
    public price?: number,
    public stock?: number,
    public value?: string,
    public attribute?: IAttribute,
    public attributeValueLanguages?: IAttributeValueLanguage[],
    public promotions?: IPromotion[],
  ){
  }
};
