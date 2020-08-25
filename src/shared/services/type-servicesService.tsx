import BaseEntityService from './baseEntityService';
import {ITypeService} from "@/shared/models/productms/TypeServiceModel";

export default class  typeservicesService extends BaseEntityService<ITypeService> {
    private static instance: typeservicesService;

    private constructor() {
        super('/api/productms/api/type-services')
    }

    public static getInstance(): typeservicesService {
        if (!typeservicesService.instance) {
            return new typeservicesService()
        }
        return typeservicesService.instance
    }
}
