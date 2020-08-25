import BaseEntityService from '../baseEntityService';
import { IOrderPromotion } from '@/shared/models/orderms/OrderPromotionModel'
export default class  OrderPromotionsService extends BaseEntityService<IOrderPromotion> {
    private static instance: OrderPromotionsService;

    private constructor() {
        super('api/orderms/api/order-promotions')
    }

    public static getInstance(): OrderPromotionsService {
        if (!OrderPromotionsService.instance) {
            return new OrderPromotionsService()
        }
        return OrderPromotionsService.instance
    }
}
