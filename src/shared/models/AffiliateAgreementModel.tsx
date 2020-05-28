import { Moment } from 'moment';
import { IBaseEntity } from './baseModel';
import { IAffiliateAgreementProduct } from './AffiliateAgreementProductModel'

export interface IAffiliateAgreement extends IBaseEntity {
    createdOn?: Moment;
    updatedOn?: Moment;
    id?: number;
    version?: number;
    administrationId?: number;
    affiliateId?: number;
    flatCommision?: number;
    percentageCommission?: number;
    validFrom?: Moment;
    validTo?: Moment;
    affiliateAgreementProducts?: IAffiliateAgreementProduct[];
}

export class AffiliateAgreement implements IAffiliateAgreement {
constructor(
    public createdOn?: Moment,
    public updatedOn?: Moment,
    public id?: number,
    public version?: number,
    public administrationId?: number,
    public affiliateId?: number,
    public flatCommision?: number,
    public percentageCommission?: number,
    public validFrom?: Moment,
    public validTo?: Moment,
    public affiliateAgreementProducts?: IAffiliateAgreementProduct[],
  ){
  }
};
