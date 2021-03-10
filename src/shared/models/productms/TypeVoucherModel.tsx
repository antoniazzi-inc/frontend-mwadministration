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
import { IBaseEntity } from '../baseModel';
import { IDiscount } from './DiscountModel'
import {VoucherType} from "@/shared/models/orderms/OrderProductPurchasedVoucher";
import {IProduct} from "@/shared/models/productms/ProductModel";

export interface ITypeVoucher extends IBaseEntity {
    daysValid?: number
    voucherType?: VoucherType
    value?: any
    product?: IProduct
}

export class TypeVoucherBased implements ITypeVoucher {
constructor(
    public createdOn?: Moment,
    public updatedOn?: Moment,
    public id?: number,
    public version?: number,
    public administrationId?: number,
    public daysValid?: number,
    public voucherType?: VoucherType,
    public value?: any,
    public product?: IProduct
  ){
  }
};
