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
