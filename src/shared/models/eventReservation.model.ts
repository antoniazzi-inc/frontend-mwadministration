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
import { IEventLanguage } from './event-language.model';
import { ICourse } from './productms/CourseModel';
import {IBaseEntity} from "@/shared/models/baseModel";
import {IEvent} from "@/shared/models/event.model";
export const enum ReservationStatus {
  PENDING = 'PENDING',
  OCCUPIED = 'OCCUPIED'
}
export interface IEventReservation extends IBaseEntity{
  isPaid?: boolean,
  relationId?: number,
  reservationStatus?: ReservationStatus,
  event?: IEvent
}

export class EventReservation implements IEventReservation {
    constructor(
      public id?: number,
      public administrationId?: number,
      public version?: number,
      public createdOn?: Moment,
      public updatedOn?: Moment,
     public isPaid?: boolean,
     public relationId?: number,
     public reservationStatus?: ReservationStatus,
     public event?: IEvent
    ) {

    }
}
