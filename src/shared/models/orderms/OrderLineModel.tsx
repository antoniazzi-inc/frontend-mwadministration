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
import { IOrderSubscription } from './OrderSubscriptionModel'
import { IOrderProduct } from './OrderProductModel'
import { IBeneficiaryDeliveryAddress } from './BeneficiaryDeliveryAddressModel'
import { IOrderLineBeneficiary } from './OrderLineBeneficiaryModel'
import { IOrderLineDeliveryMethod } from './OrderLineDeliveryMethodModel'
import { IOrderLinePaymentSchedule } from './OrderLinePaymentScheduleModel'
import { IAffiliateCommision } from './AffiliateCommisionModel'
import { ICartOrder } from './CartOrderModel'
export const enum orderDeliveryStatus {
    PENDING = 'PENDING',
    READY_TO_SHIP = 'READY_TO_SHIP',
    SENT = 'SENT',
    DELIVERED = 'DELIVERED',
    LOST = 'LOST',
}

export interface IOrderLine extends BaseEntity {
    version?: number;
    administrationId?: number;
    relationId?: number;
    quantity?: number;
    nettoAmount?: number;
    discountAmount?: number;
    shippingCostAmount?: number;
    additionalInfo?: string;
    orderSubscription?: IOrderSubscription;
    orderProduct?: IOrderProduct;
    beneficiaryDeliveryAddress?: IBeneficiaryDeliveryAddress;
    orderLineBeneficiary?: IOrderLineBeneficiary;
    orderLineDeliveryMethod?: IOrderLineDeliveryMethod;
    orderLinePaymentSchedules?: IOrderLinePaymentSchedule[];
    affiliateCommisions?: IAffiliateCommision[];
    cartOrder?: ICartOrder;
    payWithVoucher?: boolean;
}

export default class OrderLine implements IOrderLine {
constructor(
    public createdOn?: Moment,
    public updatedOn?: Moment,
    public id?: number,
    public version?: number,
    public administrationId?: number,
    public relationId?: number,
    public orderDeliveryStatus?: orderDeliveryStatus,
    public quantity?: number,
    public nettoAmount?: number,
    public discountAmount?: number,
    public shippingCostAmount?: number,
    public additionalInfo?: string,
    public orderSubscription?: IOrderSubscription,
    public orderProduct?: IOrderProduct,
    public beneficiaryDeliveryAddress?: IBeneficiaryDeliveryAddress,
    public orderLineBeneficiary?: IOrderLineBeneficiary,
    public orderLineDeliveryMethod?: IOrderLineDeliveryMethod,
    public orderLinePaymentSchedules?: IOrderLinePaymentSchedule[],
    public affiliateCommisions?: IAffiliateCommision[],
    public cartOrder?: ICartOrder,
    public payWithVoucher?: boolean,
  ){
  this.quantity = this.quantity ? this.quantity : 1
  this.payWithVoucher = this.payWithVoucher ? true : false
  }
};
