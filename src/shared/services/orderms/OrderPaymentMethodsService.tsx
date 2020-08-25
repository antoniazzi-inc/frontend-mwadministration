import BaseEntityService from '../baseEntityService';
import { IOrderPaymentMethod } from '@/shared/models/orderms/OrderPaymentMethodModel'
export default class  OrderPaymentMethodsService extends BaseEntityService<IOrderPaymentMethod> {
    private static instance: OrderPaymentMethodsService;

    private constructor() {
        super('api/orderms/api/order-payment-methods')
    }

    public static getInstance(): OrderPaymentMethodsService {
        if (!OrderPaymentMethodsService.instance) {
            return new OrderPaymentMethodsService()
        }
        return OrderPaymentMethodsService.instance
    }
}
