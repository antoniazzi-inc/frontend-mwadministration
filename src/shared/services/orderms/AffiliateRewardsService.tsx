/*
 *
 *  * Copyright 2018-2021 Antoniazzi Holding BV
 *  *
 *  * This program is free software: you can redistribute it and/or modify it
 *  * under the terms of the GNU General Public License as published by
 *  * the Free Software Foundation, either version 3 of the License,
 *  * or (at your option) any later version.
 *  *
 *  * This program is distributed in the hope that it will be useful,
 *  * but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 *  * GNU General Public License for more details.
 *  *
 *  * You should have received a copy of the GNU General Public License
 *  * along with this program. If not, see <https://www.gnu.org/licenses/>.
 *
 */

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
