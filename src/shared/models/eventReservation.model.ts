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
