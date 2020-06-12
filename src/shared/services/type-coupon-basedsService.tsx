import BaseEntityService from './baseEntityService';
import {ITypeCouponBased} from "@/shared/models/TypeCouponBasedModel";

export default class  typecouponbasedsService extends BaseEntityService<ITypeCouponBased> {
    private static instance: typecouponbasedsService;

    private constructor() {
        super('/api/productms/api/type-coupon-baseds')
    }

    public static getInstance(): typecouponbasedsService {
        if (!typecouponbasedsService.instance) {
            return new typecouponbasedsService()
        }
        return typecouponbasedsService.instance
    }
}
