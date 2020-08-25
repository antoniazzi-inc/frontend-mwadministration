import { Moment } from 'moment';
import { IBaseEntity } from '../baseModel';
import { IProduct } from './ProductModel'

export interface IProductDeliveryMethod extends IBaseEntity {
    createdOn?: Moment;
    updatedOn?: Moment;
    id?: number;
    version?: number;
    administrationId?: number;
    deliveryMethodId?: number;
    regionId?: number;
    basePrice?: number;
    itemPrice?: number;
    minimumPrice?: number;
    downloadEmailJson?: string;
    downloadSubject?: string;
    product?: IProduct;
}

export class ProductDeliveryMethod implements IProductDeliveryMethod {
constructor(
    public createdOn?: Moment,
    public updatedOn?: Moment,
    public id?: number,
    public version?: number,
    public administrationId?: number,
    public deliveryMethodId?: number,
    public regionId?: number,
    public basePrice?: number,
    public itemPrice?: number,
    public minimumPrice?: number,
    public downloadEmailJson?: string,
    public downloadSubject?: string,
    public product?: IProduct,
  ){
  }
};
