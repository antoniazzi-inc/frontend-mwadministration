import { Moment } from 'moment';
import { IBaseEntity } from './baseModel';
import { IAnnouncement } from './AnnouncementModel'
import {IProduct} from "@/shared/models/ProductModel";

export interface IProductSubscription extends IBaseEntity {
    createdOn?: Moment;
    updatedOn?: Moment;
    id?: number;
    version?: number;
    administrationId?: number;
    period?: string;
    maxTimes?: number;
    announcementJson?: IAnnouncement;
    startDate?: string;
  product?: IProduct;
}

export class ProductSubscription implements IProductSubscription {
constructor(
    public createdOn?: Moment,
    public updatedOn?: Moment,
    public id?: number,
    public version?: number,
    public administrationId?: number,
    public period?: string,
    public maxTimes?: number,
    public announcementJson?: IAnnouncement,
    public startDate?: string,
    public product?: IProduct,
  ){
  }
};
