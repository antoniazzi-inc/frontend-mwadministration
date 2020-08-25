import { Moment } from 'moment';
import { IBaseEntity } from '../baseModel';
import { IProduct } from './ProductModel'

export interface IProductCategory extends IBaseEntity {
    createdOn?: Moment;
    updatedOn?: Moment;
    id?: number;
    version?: number;
    administrationId?: number;
    categoryId?: number;
    product?: IProduct;
}

export class ProductCategory implements IProductCategory {
constructor(
    public createdOn?: Moment,
    public updatedOn?: Moment,
    public id?: number,
    public version?: number,
    public administrationId?: number,
    public categoryId?: number,
    public product?: IProduct,
  ){
  }
};
