import BaseEntityService from './baseEntityService';
import {ITypeDigital} from "@/shared/models/TypeDigitalModel";

export default class  typedigitalsService extends BaseEntityService<ITypeDigital> {
    private static instance: typedigitalsService;

    private constructor() {
        super('/api/productms/api/type-digitals')
    }

    public static getInstance(): typedigitalsService {
        if (!typedigitalsService.instance) {
            return new typedigitalsService()
        }
        return typedigitalsService.instance
    }
}
