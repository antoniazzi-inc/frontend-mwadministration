import BaseEntityService from './baseEntityService';
import {IAffiliateAgreement} from "@/shared/models/AffiliateAgreementModel";

export default class  affiliateagreementsService extends BaseEntityService<IAffiliateAgreement> {
    private static instance: affiliateagreementsService;

    private constructor() {
        super('api/productms/api/affiliate-agreements')
    }

    public static getInstance(): affiliateagreementsService {
        if (!affiliateagreementsService.instance) {
            return new affiliateagreementsService()
        }
        return affiliateagreementsService.instance
    }
}
