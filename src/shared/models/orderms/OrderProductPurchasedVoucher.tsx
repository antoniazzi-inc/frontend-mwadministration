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
import {IOrderLine} from './OrderLineModel'
import {IAffiliateReward} from './AffiliateRewardModel'
import {IOrderProduct} from "@/shared/models/orderms/OrderProductModel";
import PointsComplexSearchComponent
  from "@/components/complexSearchWidget/complexSearchComponents/PointsComplexSearchComponent/PointsComplexSearch.component";
export enum VoucherType {
  MINUTES = 'MINUTES',
  POINTS = 'POINTS',
  MONEY = 'MONEY'
}
export enum VoucherSupport {
  NONE='NONE', TIME='TIME', POINTS='POINTS', MONEY='MONEY'
}
export interface IOrderProductPurchasedVoucher extends BaseEntity {
  relationId?: number;
  typeVoucherId?: number;
  beneficiaryRelationId?: number;
  value?: number;
  voucherType?: VoucherType;
  availableFrom?: Moment;
  availableTo?: Moment;
  OrderProduct?: IOrderProduct;
  daysValid?: number;
}

export default class OrderProductPurchasedVoucher implements IOrderProductPurchasedVoucher {
  constructor(
    public createdOn?: Moment,
    public updatedOn?: Moment,
    public id?: number,
    public version?: number,
    public administrationId?: number,
    public relationId?: number,
    public typeVoucherId?: number,
    public beneficiaryRelationId?: number,
    public value?: number,
    public voucherType?: VoucherType,
    public availableFrom?: Moment,
    public availableTo?: Moment,
    public OrderProduct?: IOrderProduct,
    public daysValid?: number
  ) {
  }
};
