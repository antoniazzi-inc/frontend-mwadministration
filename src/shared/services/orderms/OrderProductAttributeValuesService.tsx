import BaseEntityService from '../baseEntityService';
import { IOrderProductAttributeValue } from '@/shared/models/orderms/OrderProductAttributeValueModel'
export default class  OrderProductAttributeValuesService extends BaseEntityService<IOrderProductAttributeValue> {
    private static instance: OrderProductAttributeValuesService;

    private constructor() {
        super('api/orderms/api/order-product-attribute-values')
    }

    public static getInstance(): OrderProductAttributeValuesService {
        if (!OrderProductAttributeValuesService.instance) {
            return new OrderProductAttributeValuesService()
        }
        return OrderProductAttributeValuesService.instance
    }
}
