import BaseEntityService from '../baseEntityService';
import { IOrderProduct } from '@/shared/models/orderms/OrderProductModel'
export default class  OrderProductsService extends BaseEntityService<IOrderProduct> {
    private static instance: OrderProductsService;

    private constructor() {
        super('api/orderms/api/order-products')
    }

    public static getInstance(): OrderProductsService {
        if (!OrderProductsService.instance) {
            return new OrderProductsService()
        }
        return OrderProductsService.instance
    }
}
