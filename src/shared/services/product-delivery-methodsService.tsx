import BaseEntityService from './baseEntityService';
import {IProductDeliveryMethod} from "@/shared/models/productms/ProductDeliveryMethodModel";

export default class  productdeliverymethodsService extends BaseEntityService<IProductDeliveryMethod> {
    private static instance: productdeliverymethodsService;

    private constructor() {
        super('api/productms/api/product-delivery-methods')
    }

    public static getInstance(): productdeliverymethodsService {
        if (!productdeliverymethodsService.instance) {
            return new productdeliverymethodsService()
        }
        return productdeliverymethodsService.instance
    }
}
