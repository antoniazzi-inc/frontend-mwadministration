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
