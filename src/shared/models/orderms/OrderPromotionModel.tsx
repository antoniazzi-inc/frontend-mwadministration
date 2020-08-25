import { Moment } from 'moment';
import { BaseEntity } from '../baseModel';
import {IProduct} from "@/shared/models/productms/ProductModel";
import {IAttributeValue} from "@/shared/models/productms/AttributeValueModel";

export interface IOrderPromotion extends BaseEntity {
    version?: number;
    administrationId?: number;
    relationId?: number;
    promotionId?: number;
    promotionType?: string;
    name?: string;
    description?: string;
    availableFrom?: Moment;
    availableTo?: Moment;
    recurrent?: boolean;
    promotionTypeDetailsJson?: string;
    products?: IProduct[];
    attributeValues?: IAttributeValue[];
}

export default class OrderPromotion implements IOrderPromotion {
constructor(
    public createdOn?: Moment,
    public updatedOn?: Moment,
    public id?: number,
    public version?: number,
    public administrationId?: number,
    public relationId?: number,
    public promotionId?: number,
    public promotionType?: string,
    public name?: string,
    public description?: string,
    public availableFrom?: Moment,
    public availableTo?: Moment,
    public recurrent?: boolean,
    public promotionTypeDetailsJson?: string,
    public products?: IProduct[],
    public attributeValues?: IAttributeValue[],
  ){
  }
};
