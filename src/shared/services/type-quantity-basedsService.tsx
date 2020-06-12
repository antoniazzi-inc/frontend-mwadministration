import BaseEntityService from './baseEntityService';
import {ITypeQuantityBased} from "@/shared/models/TypeQuantityBasedModel";

export default class  typequantitybasedsService extends BaseEntityService<ITypeQuantityBased> {
    private static instance: typequantitybasedsService;

    private constructor() {
        super('/api/productms/api/type-quantity-baseds')
    }

    public static getInstance(): typequantitybasedsService {
        if (!typequantitybasedsService.instance) {
            return new typequantitybasedsService()
        }
        return typequantitybasedsService.instance
    }
}
