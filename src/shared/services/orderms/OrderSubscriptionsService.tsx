import BaseEntityService from '../baseEntityService';
import { IOrderSubscription } from '@/shared/models/orderms/OrderSubscriptionModel'
export default class  OrderSubscriptionsService extends BaseEntityService<IOrderSubscription> {
    private static instance: OrderSubscriptionsService;

    private constructor() {
        super('api/orderms/api/order-subscriptions')
    }

    public static getInstance(): OrderSubscriptionsService {
        if (!OrderSubscriptionsService.instance) {
            return new OrderSubscriptionsService()
        }
        return OrderSubscriptionsService.instance
    }
}
