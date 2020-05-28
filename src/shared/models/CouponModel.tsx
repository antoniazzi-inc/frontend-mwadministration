import { Moment } from 'moment';
import { IBaseEntity } from './baseModel';
import { ITypePersonalCouponBased } from './TypePersonalCouponBasedModel'

export interface ICoupon extends IBaseEntity {
    createdOn?: Moment;
    updatedOn?: Moment;
    id?: number;
    version?: number;
    administrationId?: number;
    code?: string;
    maxTimesUsed?: number;
    timesUsed?: number;
    availableTo?: Moment;
    typePersonalCouponBased?: ITypePersonalCouponBased;
}

export class Coupon implements ICoupon {
constructor(
    public createdOn?: Moment,
    public updatedOn?: Moment,
    public id?: number,
    public version?: number,
    public administrationId?: number,
    public code?: string,
    public maxTimesUsed?: number,
    public timesUsed?: number,
    public availableTo?: Moment,
    public typePersonalCouponBased?: ITypePersonalCouponBased,
  ){
  }
};
