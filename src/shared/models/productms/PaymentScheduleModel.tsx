import { Moment } from 'moment';
import { IBaseEntity } from '../baseModel';
import { IAnnouncement } from './AnnouncementModel'
import { IProduct } from './ProductModel'
import { IPaymentScheduleOption } from './PaymentScheduleOptionModel'

export interface IPaymentSchedule extends IBaseEntity {
    createdOn?: Moment;
    updatedOn?: Moment;
    id?: number;
    version?: number;
    administrationId?: number;
    name?: string;
    period?: string;
    announcementJson?: IAnnouncement;
    availableForCustomers?: boolean;
    product?: IProduct;
    paymentScheduleOptions?: IPaymentScheduleOption[];
}

export class PaymentSchedule implements IPaymentSchedule {
constructor(
    public createdOn?: Moment,
    public updatedOn?: Moment,
    public id?: number,
    public version?: number,
    public administrationId?: number,
    public name?: string,
    public period?: string,
    public announcementJson?: IAnnouncement,
    public availableForCustomers?: boolean,
    public product?: IProduct,
    public paymentScheduleOptions?: IPaymentScheduleOption[],
  ){
  }
};
