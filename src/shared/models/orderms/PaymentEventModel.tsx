import { Moment } from 'moment';
import { BaseEntity } from '../baseModel';
import { IInvoice } from './InvoiceModel'
import { ICreditInvoice } from './CreditInvoiceModel'
export const enum paymentEventType {
    STARTED = 'STARTED',
    SUCCESS = 'SUCCESS',
    ERROR = 'ERROR',
    FAILED = 'FAILED',
    DENIED = 'DENIED',
    UNKNOWN = 'UNKNOWN',
    OPENED = 'OPENED',
    CANCELED = 'CANCELED',
    REMINDER = 'REMINDER',
}

export interface IPaymentEvent extends BaseEntity {
    version?: number;
    administrationId?: number;
    relationId?: number;
    amount?: number;
    transactionCode?: string;
    detailsJson?: string;
    batchId?: string;
    invoice?: IInvoice;
    creditInvoice?: ICreditInvoice;
}

export default class PaymentEvent implements IPaymentEvent {
constructor(
    public createdOn?: Moment,
    public updatedOn?: Moment,
    public id?: number,
    public version?: number,
    public administrationId?: number,
    public relationId?: number,
    public paymentEventType?: paymentEventType,
    public amount?: number,
    public transactionCode?: string,
    public detailsJson?: string,
    public batchId?: string,
    public invoice?: IInvoice,
    public creditInvoice?: ICreditInvoice,
  ){
  }
};
