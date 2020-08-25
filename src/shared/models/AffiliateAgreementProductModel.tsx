import { Moment } from 'moment';
import { IBaseEntity } from './baseModel';
import { IAffiliateAgreement } from './AffiliateAgreementModel'
import { IProduct } from './productms/ProductModel'
import { IAttributeValue } from './productms/AttributeValueModel'

export interface IAffiliateAgreementProduct extends IBaseEntity {
    createdOn?: Moment;
    updatedOn?: Moment;
    id?: number;
    version?: number;
    administrationId?: number;
    affiliateId?: number;
    affiliateAgreement?: IAffiliateAgreement;
    products?: IProduct[];
    attributeValues?: IAttributeValue[];
}

export class AffiliateAgreementProduct implements IAffiliateAgreementProduct {
constructor(
    public createdOn?: Moment,
    public updatedOn?: Moment,
    public id?: number,
    public version?: number,
    public administrationId?: number,
    public affiliateId?: number,
    public affiliateAgreement?: IAffiliateAgreement,
    public products?: IProduct[],
    public attributeValues?: IAttributeValue[],
  ){
  }
};
