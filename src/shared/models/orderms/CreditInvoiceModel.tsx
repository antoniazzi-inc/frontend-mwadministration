import { Moment } from 'moment';
import { BaseEntity } from '../baseModel';
import { IPaymentEvent } from './PaymentEventModel'
import { IInvoice } from './InvoiceModel'
export const enum creditInvoiceType {
    ORDER_CANCELED = 'ORDER_CANCELED',
    AFFILIATE_PAYMENT = 'AFFILIATE_PAYMENT',
    OTHER = 'OTHER',
}

export interface ICreditInvoice extends BaseEntity {
    version?: number;
    administrationId?: number;
    relationId?: number;
    fullName?: string;
    email?: string;
    name?: string;
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
    sentOn?: Moment;
    paymentEvents?: IPaymentEvent[];
    invoice?: IInvoice;
}

export default class CreditInvoice implements ICreditInvoice {
constructor(
    public createdOn?: Moment,
    public updatedOn?: Moment,
    public id?: number,
    public version?: number,
    public administrationId?: number,
    public relationId?: number,
    public creditInvoiceType?: creditInvoiceType,
    public fullName?: string,
    public email?: string,
    public name?: string,
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
    public sentOn?: Moment,
    public paymentEvents?: IPaymentEvent[],
    public invoice?: IInvoice,
  ){
  }
};
