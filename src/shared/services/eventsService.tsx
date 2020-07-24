import BaseEntityService from './baseEntityService';
import {ICourse} from "@/shared/models/CourseModel";

export default class  eventsService extends BaseEntityService<ICourse> {
    private static instance: eventsService;

    private constructor() {
        super('api/productms/api/events')
    }

    public static getInstance(): eventsService {
        if (!eventsService.instance) {
            return new eventsService()
        }
        return eventsService.instance
    }
}
