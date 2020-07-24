import BaseEntityService from './baseEntityService';
import {ICourse} from "@/shared/models/CourseModel";

export default class  eventReservationService extends BaseEntityService<ICourse> {
    private static instance: eventReservationService;

    private constructor() {
        super('api/productms/api/event-reservations')
    }

    public static getInstance(): eventReservationService {
        if (!eventReservationService.instance) {
            return new eventReservationService()
        }
        return eventReservationService.instance
    }
}
