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
import { IOrderPromotion } from './OrderPromotionModel'
import { ICartOrder } from './CartOrderModel'

export interface IOrderDiscountLine extends BaseEntity {
    version?: number;
    administrationId?: number;
    relationId?: number;
    discountId?: number;
    percentage?: number;
    fixed?: number;
    noShipping?: boolean;
    freeItemsJson?: string;
    entireOrder?: boolean;
    orderPromotion?: IOrderPromotion;
    cartOrder?: ICartOrder;
}

export default class OrderDiscountLine implements IOrderDiscountLine {
constructor(
    public createdOn?: Moment,
    public updatedOn?: Moment,
    public id?: number,
    public version?: number,
    public administrationId?: number,
    public relationId?: number,
    public discountId?: number,
    public percentage?: number,
    public fixed?: number,
    public noShipping?: boolean,
    public freeItemsJson?: string,
    public entireOrder?: boolean,
    public orderPromotion?: IOrderPromotion,
    public cartOrder?: ICartOrder,
  ){
  }
};
