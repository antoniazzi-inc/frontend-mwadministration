import BaseEntityService from '../baseEntityService';
import { ICartOrder } from '@/shared/models/orderms/CartOrderModel'
export default class  CartOrdersService extends BaseEntityService<ICartOrder> {
    private static instance: CartOrdersService;

    private constructor() {
        super('api/orderms/api/cart-orders')
    }

    public static getInstance(): CartOrdersService {
        if (!CartOrdersService.instance) {
            return new CartOrdersService()
        }
        return CartOrdersService.instance
    }

    public updateCart(cartOrder:ICartOrder) {
      return this.postRequest(`api/cart-wizard-2-prices`, cartOrder)

    }
}
