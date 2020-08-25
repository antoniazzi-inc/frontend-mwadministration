import { Moment } from 'moment';
import { BaseEntity } from '../baseModel';
import { IOrderLine } from './OrderLineModel'
import { IAffiliateReward } from './AffiliateRewardModel'

export interface IAffiliateCommision extends BaseEntity {
    version?: number;
    administrationId?: number;
    relationId?: number;
    affiliateRelationId?: number;
    commission?: number;
    agreementDetailsJson?: string;
    orderLine?: IOrderLine;
    affiliateReward?: IAffiliateReward;
}

export default class AffiliateCommision implements IAffiliateCommision {
constructor(
    public createdOn?: Moment,
    public updatedOn?: Moment,
    public id?: number,
    public version?: number,
    public administrationId?: number,
    public relationId?: number,
    public affiliateRelationId?: number,
    public commission?: number,
    public agreementDetailsJson?: string,
    public orderLine?: IOrderLine,
    public affiliateReward?: IAffiliateReward,
  ){
  }
};
