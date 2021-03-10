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
import { ICustomerBillingAddress } from './CustomerBillingAddressModel'
import { ICustomerDeliveryAddress } from './CustomerDeliveryAddressModel'
import { IOrderPaymentMethod } from './OrderPaymentMethodModel'
import OrderCustomer, { IOrderCustomer } from './OrderCustomerModel'
import { IOrderLine } from './OrderLineModel'
import { IOrderDiscountLine } from './OrderDiscountLineModel'

export interface ICartOrder extends BaseEntity {
    version?: number;
    administrationId?: number;
    relationId?: number;
    nettoAmount?: number;
    discountAmount?: number;
    taxAmount?: number;
    paymentMethodCostAmount?: number;
    shippingCostAmount?: number;
    totalAmount?: number;
    currency?: string;
    euroConversionRate?: number;
    relationRequirementJson?: string;
    languageCode?: string;
    finishedOn?: Moment;
    invoice?: IInvoice;
    customerBillingAddress?: ICustomerBillingAddress;
    customerDeliveryAddress?: ICustomerDeliveryAddress;
    orderPaymentMethod?: IOrderPaymentMethod;
    orderCustomer?: IOrderCustomer;
    orderLines?: IOrderLine[];
    orderDiscountLines?: IOrderDiscountLine[];
}

export default class CartOrder implements ICartOrder {
constructor(
    public createdOn?: Moment,
    public updatedOn?: Moment,
    public id?: number,
    public version?: number,
    public administrationId?: number,
    public relationId?: number,
    public nettoAmount?: number,
    public discountAmount?: number,
    public taxAmount?: number,
    public paymentMethodCostAmount?: number,
    public shippingCostAmount?: number,
    public totalAmount?: number,
    public currency?: string,
    public euroConversionRate?: number,
    public relationRequirementJson?: string,
    public languageCode?: string,
    public finishedOn?: Moment,
    public invoice?: IInvoice,
    public customerBillingAddress?: ICustomerBillingAddress,
    public customerDeliveryAddress?: ICustomerDeliveryAddress,
    public orderPaymentMethod?: IOrderPaymentMethod,
    public orderCustomer?: IOrderCustomer,
    public orderLines?: IOrderLine[],
    public orderDiscountLines?: IOrderDiscountLine[],
  ){
  this.orderCustomer = this.orderCustomer ? this.orderCustomer : new OrderCustomer()
  }
};
