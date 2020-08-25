import BaseEntityService from './baseEntityService';
import {ITypeAffiliateBased} from "@/shared/models/productms/TypeAffiliateBasedModel";

export default class  typeaffiliatebasedsService extends BaseEntityService<ITypeAffiliateBased> {
    private static instance: typeaffiliatebasedsService;

    private constructor() {
        super('/api/productms/api/type-affiliate-baseds')
    }

    public static getInstance(): typeaffiliatebasedsService {
        if (!typeaffiliatebasedsService.instance) {
            return new typeaffiliatebasedsService()
        }
        return typeaffiliatebasedsService.instance
    }
}
