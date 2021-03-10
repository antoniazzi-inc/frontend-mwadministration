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
export interface IOrderProductEvent extends BaseEntity {
  relationId?: number;
  eventId?: number;
  courseId?: number;
  eventStart?: Moment;
  eventEnd?: Moment;
  price?: number;
  seats?: number;
}

export default class OrderProductEvent implements IOrderProductEvent {
  constructor(
    public createdOn?: Moment,
    public updatedOn?: Moment,
    public id?: number,
    public version?: number,
    public administrationId?: number,
    public relationId?: number,
    public eventId?: number,
    public courseId?: number,
    public eventStart?: Moment,
    public eventEnd?: Moment,
    public price?: number,
    public seats?: number,
    public voucherValue?: number
  ) {
  }
};
