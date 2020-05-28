import { Moment } from 'moment';
import { IBaseEntity } from './baseModel';
import { IProduct } from './ProductModel'

export interface IProductPaymentMethod extends IBaseEntity {
    createdOn?: Moment;
    updatedOn?: Moment;
    id?: number;
    version?: number;
    administrationId?: number;
    paymentMethodId?: number;
    product?: IProduct;
}

export class ProductPaymentMethod implements IProductPaymentMethod {
constructor(
    public createdOn?: Moment,
    public updatedOn?: Moment,
    public id?: number,
    public version?: number,
    public administrationId?: number,
    public paymentMethodId?: number,
    public product?: IProduct,
  ){
  }
};
