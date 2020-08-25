import BaseEntityService from '../baseEntityService';
import { IAffiliateReward } from '@/shared/models/orderms/AffiliateRewardModel'
export default class  AffiliateRewardsService extends BaseEntityService<IAffiliateReward> {
    private static instance: AffiliateRewardsService;

    private constructor() {
        super('api/orderms/api/affiliate-rewards')
    }

    public static getInstance(): AffiliateRewardsService {
        if (!AffiliateRewardsService.instance) {
            return new AffiliateRewardsService()
        }
        return AffiliateRewardsService.instance
    }
}
