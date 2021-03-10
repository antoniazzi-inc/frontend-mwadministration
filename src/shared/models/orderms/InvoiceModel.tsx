/*
 *
 *  * Copyright 2018-2021 Antoniazzi Holding BV
 *  *
 *  * This program is free software: you can redistribute it and/or modify it
 *  * under the terms of the GNU General Public License as published by
 *  * the Free Software Foundation, either version 3 of the License,
 *  * or (at your option) any later version.
 *  *
 *  * This program is distributed in the hope that it will be useful,
 *  * but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 *  * GNU General Public License for more details.
 *  *
 *  * You should have received a copy of the GNU General Public License
 *  * along with this program. If not, see <https://www.gnu.org/licenses/>.
 *
 */

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
