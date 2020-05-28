import { Moment } from 'moment';
import { IBaseEntity } from './baseModel';
import { IPaymentSchedule } from './PaymentScheduleModel'

export interface IPaymentScheduleOption extends IBaseEntity {
    createdOn?: Moment;
    updatedOn?: Moment;
    id?: number;
    version?: number;
    administrationId?: number;
    price?: number;
    name?: string;
    paymentSchedule?: IPaymentSchedule;
}

export class PaymentScheduleOption implements IPaymentScheduleOption {
constructor(
    public createdOn?: Moment,
    public updatedOn?: Moment,
    public id?: number,
    public version?: number,
    public administrationId?: number,
    public price?: number,
    public name?: string,
    public paymentSchedule?: IPaymentSchedule,
  ){
  }
};
