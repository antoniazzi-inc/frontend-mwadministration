import BaseEntityService from './baseEntityService';
import {ITypeLoyaltyBased} from "@/shared/models/TypeLoyaltyBasedModel";

export default class  typeloyaltybasedsService extends BaseEntityService<ITypeLoyaltyBased> {
    private static instance: typeloyaltybasedsService;

    private constructor() {
        super('/api/productms/api/type-loyalty-baseds')
    }

    public static getInstance(): typeloyaltybasedsService {
        if (!typeloyaltybasedsService.instance) {
            return new typeloyaltybasedsService()
        }
        return typeloyaltybasedsService.instance
    }
}
