import BaseEntityService from './baseEntityService';
import {ICourse} from "@/shared/models/CourseModel";

export default class  coursesService extends BaseEntityService<ICourse> {
    private static instance: coursesService;

    private constructor() {
        super('api/productms/api/courses')
    }

    public static getInstance(): coursesService {
        if (!coursesService.instance) {
            return new coursesService()
        }
        return coursesService.instance
    }
}
