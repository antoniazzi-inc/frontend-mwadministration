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

import {Moment} from 'moment';
import {BaseEntity} from '../baseModel';
import {IOrderProductAttributeValue} from './OrderProductAttributeValueModel'
import {IOrderProductPurchasedVoucher} from "@/shared/models/orderms/OrderProductPurchasedVoucher";
import {IOrderProductEvent} from "@/shared/models/orderms/OrderProductEvent";
import {ServicePriceType} from "@/shared/models/productms/TypeServiceModel";

export interface IOrderProduct extends BaseEntity {
  version?: number;
  administrationId?: number;
  relationId?: number;
  productId?: number;
  sku?: string;
  productName?: string;
  productDescription?: string;
  productPrice?: number;
  taxPercentage?: number;
  taxLevel?: number;
  termsAndConditionsJson?: string;
  points?: number;
  downloadUrl?: string;
  productType?: string;
  productTypeDetailsJson?: string;
  orderProductAttributeValues?: IOrderProductAttributeValue[];
  orderProductPurchasedVoucher?: IOrderProductPurchasedVoucher;
  orderProductEvent?: IOrderProductEvent;
  paymentScheduleId?: number;
  priceType?: ServicePriceType;
}

export default class OrderProduct implements IOrderProduct {
  constructor(
    public createdOn?: Moment,
    public updatedOn?: Moment,
    public id?: number,
    public version?: number,
    public administrationId?: number,
    public relationId?: number,
    public productId?: number,
    public sku?: string,
    public productName?: string,
    public productDescription?: string,
    public productPrice?: number,
    public taxPercentage?: number,
    public taxLevel?: number,
    public termsAndConditionsJson?: string,
    public points?: number,
    public downloadUrl?: string,
    public productType?: string,
    public productTypeDetailsJson?: string,
    public orderProductAttributeValues?: IOrderProductAttributeValue[],
    public orderProductPurchasedVoucher?: IOrderProductPurchasedVoucher,
    public orderProductEvent?: IOrderProductEvent,
    public paymentScheduleId?: number,
    public priceType?: ServicePriceType
  ) {
  }
};
