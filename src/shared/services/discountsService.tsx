import BaseEntityService from './baseEntityService';
import {IDiscount} from "@/shared/models/DiscountModel";

export default class  discountsService extends BaseEntityService<IDiscount> {
    private static instance: discountsService;

    private constructor() {
        super('api/productms/api/discounts')
    }

    public static getInstance(): discountsService {
        if (!discountsService.instance) {
            return new discountsService()
        }
        return discountsService.instance
    }
}
