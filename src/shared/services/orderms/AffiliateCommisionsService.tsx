import BaseEntityService from '../baseEntityService';
import { IAffiliateCommision } from '@/shared/models/orderms/AffiliateCommisionModel'
export default class  AffiliateCommisionsService extends BaseEntityService<IAffiliateCommision> {
    private static instance: AffiliateCommisionsService;

    private constructor() {
        super('api/orderms/api/affiliate-commisions')
    }

    public static getInstance(): AffiliateCommisionsService {
        if (!AffiliateCommisionsService.instance) {
            return new AffiliateCommisionsService()
        }
        return AffiliateCommisionsService.instance
    }
}
