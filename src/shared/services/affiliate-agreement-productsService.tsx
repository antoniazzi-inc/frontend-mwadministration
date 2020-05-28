import BaseEntityService from './baseEntityService';
import {IAffiliateAgreementProduct} from "@/shared/models/AffiliateAgreementProductModel";

export default class  affiliateagreementproductsService extends BaseEntityService<IAffiliateAgreementProduct> {
    private static instance: affiliateagreementproductsService;

    private constructor() {
        super('api/productms/api/affiliate-agreement-products')
    }

    public static getInstance(): affiliateagreementproductsService {
        if (!affiliateagreementproductsService.instance) {
            return new affiliateagreementproductsService()
        }
        return affiliateagreementproductsService.instance
    }
}
