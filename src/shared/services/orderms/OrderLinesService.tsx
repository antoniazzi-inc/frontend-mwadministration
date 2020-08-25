import BaseEntityService from '../baseEntityService';
import { IOrderLine } from '@/shared/models/orderms/OrderLineModel'
export default class  OrderLinesService extends BaseEntityService<IOrderLine> {
    private static instance: OrderLinesService;

    private constructor() {
        super('api/orderms/api/order-lines')
    }

    public static getInstance(): OrderLinesService {
        if (!OrderLinesService.instance) {
            return new OrderLinesService()
        }
        return OrderLinesService.instance
    }
}
