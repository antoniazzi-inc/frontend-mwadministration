import BaseEntityService from './baseEntityService';
import {TypePriceBased} from "@/shared/models/productms/TypePriceBasedModel";

export default class  typepricebasedsService extends BaseEntityService<TypePriceBased> {
    private static instance: typepricebasedsService;

    private constructor() {
        super('/api/productms/api/type-price-baseds')
    }

    public static getInstance(): typepricebasedsService {
        if (!typepricebasedsService.instance) {
            return new typepricebasedsService()
        }
        return typepricebasedsService.instance
    }
}
