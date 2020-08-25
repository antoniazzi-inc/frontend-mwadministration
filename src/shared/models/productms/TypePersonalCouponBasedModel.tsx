import { Moment } from 'moment';
import { IBaseEntity } from '../baseModel';
import { IDiscount } from './DiscountModel'
import { ICoupon } from './CouponModel'

export interface ITypePersonalCouponBased extends IBaseEntity {
    createdOn?: Moment;
    updatedOn?: Moment;
    id?: number;
    version?: number;
    administrationId?: number;
    maxCouponsUsed?: number;
    period?: string;
    macroName?: string;
    discount?: IDiscount;
    coupons?: ICoupon[];
}

export class TypePersonalCouponBased implements ITypePersonalCouponBased {
constructor(
    public createdOn?: Moment,
    public updatedOn?: Moment,
    public id?: number,
    public version?: number,
    public administrationId?: number,
    public maxCouponsUsed?: number,
    public period?: string,
    public macroName?: string,
    public discount?: IDiscount,
    public coupons?: ICoupon[],
  ){
  }
};
