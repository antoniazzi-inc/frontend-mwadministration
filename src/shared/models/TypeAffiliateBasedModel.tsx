import { Moment } from 'moment';
import { IBaseEntity } from './baseModel';
import { IDiscount } from './DiscountModel'

export interface ITypeAffiliateBased extends IBaseEntity {
    createdOn?: Moment;
    updatedOn?: Moment;
    id?: number;
    version?: number;
    administrationId?: number;
    affiliateIdsJson?: string;
    discount?: IDiscount;
}

export class TypeAffiliateBased implements ITypeAffiliateBased {
constructor(
    public createdOn?: Moment,
    public updatedOn?: Moment,
    public id?: number,
    public version?: number,
    public administrationId?: number,
    public affiliateIdsJson?: string,
    public discount?: IDiscount,
  ){
  }
};
