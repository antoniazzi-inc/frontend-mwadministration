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
import {IEventReservation} from "@/shared/models/eventReservation.model";
import {IBaseEntity} from "@/shared/models/baseModel";

export interface IEvent extends IBaseEntity{
    latitude?: number;
    longitude?: number;
    seats?: number;
    eventStart?: any;
    eventEnd?: any;
    price?: number;
    eventLanguages?: IEventLanguage[];
    course?: ICourse;
    eventReservations?: IEventReservation[];
}

export class Event implements IEvent {
    constructor(
        public id?: number,
        public administrationId?: number,
        public latitude?: number,
        public longitude?: number,
        public seats?: number,
        public eventStart?: any,
        public eventEnd?: any,
        public price?: number,
        public createdOn?: Moment,
        public updatedOn?: Moment,
        public version?: number,
        public eventLanguages?: IEventLanguage[],
        public course?: ICourse,
        public eventReservations?: IEventReservation[]
    ) {
        this.seats = seats ? seats : 0;
        this.price = price ? price : 0;
    }
}
