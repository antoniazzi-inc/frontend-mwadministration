import { Moment } from 'moment';
import { BaseEntity } from '../baseModel';
import { IInvoice } from './InvoiceModel'
import { IOrderLine } from './OrderLineModel'

export interface IOrderLinePaymentSchedule extends BaseEntity {
    version?: number;
    administrationId?: number;
    relationId?: number;
    reminderDate?: Moment;
    paymentDate?: Moment;
    quantity?: number;
    nettoAmount?: number;
    discountAmount?: number;
    shippingCostAmount?: number;
    taxPercentage?: number;
    invoice?: IInvoice;
    orderLine?: IOrderLine;
}

export default class OrderLinePaymentSchedule implements IOrderLinePaymentSchedule {
constructor(
    public createdOn?: Moment,
    public updatedOn?: Moment,
    public id?: number,
    public version?: number,
    public administrationId?: number,
    public relationId?: number,
    public reminderDate?: Moment,
    public paymentDate?: Moment,
    public quantity?: number,
    public nettoAmount?: number,
    public discountAmount?: number,
    public shippingCostAmount?: number,
    public taxPercentage?: number,
    public invoice?: IInvoice,
    public orderLine?: IOrderLine,
  ){
  }
};
