import BaseEntityService from './baseEntityService';
import {IPromotion} from "@/shared/models/PromotionModel";

export default class  promotionsService extends BaseEntityService<IPromotion> {
    private static instance: promotionsService;

    private constructor() {
        super('api/productms/api/promotions')
    }

    public static getInstance(): promotionsService {
        if (!promotionsService.instance) {
            return new promotionsService()
        }
        return promotionsService.instance
    }
}
