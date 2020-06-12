import BaseEntityService from './baseEntityService';
import {ITypePersonalCouponBased} from "@/shared/models/TypePersonalCouponBasedModel";

export default class  typepersonalcouponbasedsService extends BaseEntityService<ITypePersonalCouponBased> {
    private static instance: typepersonalcouponbasedsService;

    private constructor() {
        super('/api/productms/api/type-personal-coupon-baseds')
    }

    public static getInstance(): typepersonalcouponbasedsService {
        if (!typepersonalcouponbasedsService.instance) {
            return new typepersonalcouponbasedsService()
        }
        return typepersonalcouponbasedsService.instance
    }
}
