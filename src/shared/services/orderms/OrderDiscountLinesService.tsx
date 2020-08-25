import BaseEntityService from '../baseEntityService';
import { IOrderDiscountLine } from '@/shared/models/orderms/OrderDiscountLineModel'
export default class  OrderDiscountLinesService extends BaseEntityService<IOrderDiscountLine> {
    private static instance: OrderDiscountLinesService;

    private constructor() {
        super('api/orderms/api/order-discount-lines')
    }

    public static getInstance(): OrderDiscountLinesService {
        if (!OrderDiscountLinesService.instance) {
            return new OrderDiscountLinesService()
        }
        return OrderDiscountLinesService.instance
    }
}
