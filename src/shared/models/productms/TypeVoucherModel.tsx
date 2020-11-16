import { Moment } from 'moment';
import { IBaseEntity } from '../baseModel';
import { IDiscount } from './DiscountModel'
import {VoucherType} from "@/shared/models/orderms/OrderProductPurchasedVoucher";
import {IProduct} from "@/shared/models/productms/ProductModel";

export interface ITypeVoucher extends IBaseEntity {
    daysValid?: number
    voucherType?: VoucherType
    value?: any
    product?: IProduct
}

export class TypeVoucherBased implements ITypeVoucher {
constructor(
    public createdOn?: Moment,
    public updatedOn?: Moment,
    public id?: number,
    public version?: number,
    public administrationId?: number,
    public daysValid?: number,
    public voucherType?: VoucherType,
    public value?: any,
    public product?: IProduct
  ){
  }
};
