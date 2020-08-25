import BaseEntityService from './baseEntityService';
import {IProductSubscription} from "@/shared/models/productms/ProductSubscriptionModel";

export default class  productsubscriptionsService extends BaseEntityService<IProductSubscription> {
    private static instance: productsubscriptionsService;

    private constructor() {
        super('/api/productms/api/product-subscriptions')
    }

    public static getInstance(): productsubscriptionsService {
        if (!productsubscriptionsService.instance) {
            return new productsubscriptionsService()
        }
        return productsubscriptionsService.instance
    }
}
