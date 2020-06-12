import BaseEntityService from './baseEntityService';
import {ICourse} from "@/shared/models/CourseModel";

export default class  typecoursesService extends BaseEntityService<ICourse> {
    private static instance: typecoursesService;

    private constructor() {
        super('/api/productms/api/type-courses')
    }

    public static getInstance(): typecoursesService {
        if (!typecoursesService.instance) {
            return new typecoursesService()
        }
        return typecoursesService.instance
    }
}
