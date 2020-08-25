import { Moment } from 'moment';
import { IEventLanguage } from './event-language.model';
import { ICourse } from './productms/CourseModel';
import {IEventReservation} from "@/shared/models/eventReservation.model";
import {IBaseEntity} from "@/shared/models/baseModel";

export interface IEvent extends IBaseEntity{
    latitude?: number;
    longitude?: number;
    seats?: number;
    eventStart?: Moment;
    eventEnd?: Moment;
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
        public eventStart?: Moment,
        public eventEnd?: Moment,
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
