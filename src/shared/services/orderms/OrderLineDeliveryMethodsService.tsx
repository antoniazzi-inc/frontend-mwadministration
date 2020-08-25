import BaseEntityService from '../baseEntityService';
import { IOrderLineDeliveryMethod } from '@/shared/models/orderms/OrderLineDeliveryMethodModel'
export default class  OrderLineDeliveryMethodsService extends BaseEntityService<IOrderLineDeliveryMethod> {
    private static instance: OrderLineDeliveryMethodsService;

    private constructor() {
        super('api/orderms/api/order-line-delivery-methods')
    }

    public static getInstance(): OrderLineDeliveryMethodsService {
        if (!OrderLineDeliveryMethodsService.instance) {
            return new OrderLineDeliveryMethodsService()
        }
        return OrderLineDeliveryMethodsService.instance
    }
}
