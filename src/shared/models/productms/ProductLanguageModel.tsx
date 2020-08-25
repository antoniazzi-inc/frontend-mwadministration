import { Moment } from 'moment';
import { IBaseEntity } from '../baseModel';
import { IProduct } from './ProductModel'

export interface IProductLanguage extends IBaseEntity {
    createdOn?: Moment;
    updatedOn?: Moment;
    id?: number;
    version?: number;
    langKey?: string;
    name?: string;
    maxExceededMessage?:string;
  notAvailableMessage?:string;
    description?: string;
    administrationId?: number;
    product?: IProduct;
}

export class ProductLanguage implements IProductLanguage {
constructor(
    public createdOn?: Moment,
    public updatedOn?: Moment,
    public id?: number,
    public version?: number,
    public langKey?: string,
    public name?: string,
    public maxExceededMessage?:string,
    public notAvailableMessage?:string,
    public description?: string,
    public administrationId?: number,
    public product?: IProduct,
  ){
  }
};
