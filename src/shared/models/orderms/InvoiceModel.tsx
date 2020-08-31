import { Moment } from 'moment';
import { BaseEntity } from '../baseModel';
import { IPaymentEvent } from './PaymentEventModel'
import { ICreditInvoice } from './CreditInvoiceModel'
import { IInvoiceTemplate } from './InvoiceTemplateModel'
import { IOrderSubscription } from './OrderSubscriptionModel'
export const enum invoiceType {
    ORDER = 'ORDER',
    SUBSCRIPTION = 'SUBSCRIPTION',
    PAYMENT_SCHEDULE = 'PAYMENT_SCHEDULE',
}

export interface IInvoice extends BaseEntity {
    version?: number;
    administrationId?: number;
    relationId?: number;
    fullName?: string;
    email?: string;
    invoiceNumber?: string;
    paid?: boolean;
    nettoAmount?: number;
    discountAmount?: number;
    taxAmount?: number;
    paymentMethodCostAmount?: number;
    shippingCostAmount?: number;
    totalAmount?: number;
    taxDisabled?: boolean;
    taxReverseCharge?: boolean;
    additionalDetailsJson?: string;
    scheduledOn?: Moment;
    sentOn?: Moment;
    dueDays?: number;
    paymentEvents?: IPaymentEvent[];
    creditInvoices?: ICreditInvoice[];
    invoiceTemplate?: IInvoiceTemplate;
    orderSubscription?: IOrderSubscription;
}

export default class Invoice implements IInvoice {
constructor(
    public createdOn?: Moment,
    public updatedOn?: Moment,
    public id?: number,
    public version?: number,
    public administrationId?: number,
    public relationId?: number,
    public invoiceType?: invoiceType,
    public fullName?: string,
    public email?: string,
    public invoiceNumber?: string,
    public paid?: boolean,
    public nettoAmount?: number,
    public discountAmount?: number,
    public taxAmount?: number,
    public paymentMethodCostAmount?: number,
    public shippingCostAmount?: number,
    public totalAmount?: number,
    public taxDisabled?: boolean,
    public taxReverseCharge?: boolean,
    public additionalDetailsJson?: string,
    public scheduledOn?: Moment,
    public sentOn?: Moment,
    public dueDays?: number,
    public paymentEvents?: IPaymentEvent[],
    public creditInvoices?: ICreditInvoice[],
    public invoiceTemplate?: IInvoiceTemplate,
    public orderSubscription?: IOrderSubscription,
  ){
  this.paid = this.paid ? this.paid : false
  }
};
