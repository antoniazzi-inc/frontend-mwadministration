import BaseEntityService from './baseEntityService';
import {IPaymentMethod} from "@/shared/models/payment-method.model";

export default class  productpaymentmethodsService extends BaseEntityService<IPaymentMethod> {
    private static instance: productpaymentmethodsService;

    private constructor() {
        super('api/productms/api/product-payment-methods')
    }

    public static getInstance(): productpaymentmethodsService {
        if (!productpaymentmethodsService.instance) {
            return new productpaymentmethodsService()
        }
        return productpaymentmethodsService.instance
    }
}
