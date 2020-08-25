import BaseEntityService from '../baseEntityService';
import { IOrderCustomer } from '@/shared/models/orderms/OrderCustomerModel'
export default class  OrderCustomersService extends BaseEntityService<IOrderCustomer> {
    private static instance: OrderCustomersService;

    private constructor() {
        super('api/orderms/api/order-customers')
    }

    public static getInstance(): OrderCustomersService {
        if (!OrderCustomersService.instance) {
            return new OrderCustomersService()
        }
        return OrderCustomersService.instance
    }
}
