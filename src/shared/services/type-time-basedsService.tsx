import BaseEntityService from './baseEntityService';
import {ITypeTimeBased} from "@/shared/models/productms/TypeTimeBasedModel";

export default class  typetimebasedsService extends BaseEntityService<ITypeTimeBased> {
    private static instance: typetimebasedsService;

    private constructor() {
        super('/api/productms/api/type-time-baseds')
    }

    public static getInstance(): typetimebasedsService {
        if (!typetimebasedsService.instance) {
            return new typetimebasedsService()
        }
        return typetimebasedsService.instance
    }
}
