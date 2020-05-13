import { Moment } from 'moment'
import { BaseEntity } from './baseModel'
import { IAffiliate } from './AffiliateModel'
import { IBeneficiary } from './beneficiary.model'
import { IRelationProfile } from './relation-profile.model'
import { IBankDetails } from './BankDetailsModel'
import { IContactHistory } from './contact-history.model'
import { IRelationAddress } from './relation-address.model'
import { IRelationPhone } from './relation-phone.model'
import { IRelationDeliveryMethod } from './relation-delivery-method.model'
import { IRelationPaymentMethod } from './relation-payment-method.model'
import { IRelationCustomField } from './relation-custom-field.model'
import { IRole } from './role.model'
import { IRelationGroup } from './relation-group.model'
import { IGrantedAuthority } from './GrantedAuthorityModel'
import { ITagEntity } from '@/shared/models/tagModel'
import { ICompany } from '@/shared/models/company.model'
import { ICustomer } from '@/shared/models/customer.model'

export interface IRelationEntity extends BaseEntity {
  version?: number;
  administrationId?: number;
  uid?: string;
  username?: string;
  password?: string;
  email?: string;
  enabled?: boolean;
  languageKey?: string;
  tfaEnabled?: boolean;
  tfaId?: string;
  customer?: ICustomer;
  affiliate?: IAffiliate;
  beneficiary?: IBeneficiary;
  relationProfile?: IRelationProfile;
  bankDetails?: IBankDetails[];
  contactHistories?: IContactHistory[];
  contactHistoryRecords?: IContactHistory[];
  relationAddresses?: IRelationAddress[];
  relationPhones?: IRelationPhone[];
  relationTags?: ITagEntity[];
  companies?: ICompany[];
  relationDeliveryMethods?: IRelationDeliveryMethod[];
  relationPaymentMethods?: IRelationPaymentMethod[];
  relationCustomFields?: IRelationCustomField[];
  roles?: IRole[];
  relationGroups?: IRelationGroup[];
  authorities?: IGrantedAuthority[];
}

export class RelationEntity implements IRelationEntity {
  constructor (
    public createdOn?: Moment,
    public updatedOn?: Moment,
    public id?: number,
    public version?: number,
    public administrationId?: number,
    public uid?: string,
    public username?: string,
    public password?: string,
    public email?: string,
    public enabled?: boolean,
    public languageKey?: string,
    public tfaEnabled?: boolean,
    public tfaId?: string,
    public customer?: ICustomer,
    public affiliate?: IAffiliate,
    public beneficiary?: IBeneficiary,
    public relationProfile?: IRelationProfile,
    public bankDetails?: IBankDetails[],
    public contactHistories?: IContactHistory[],
    public contactHistoryRecords?: IContactHistory[],
    public relationAddresses?: IRelationAddress[],
    public relationPhones?: IRelationPhone[],
    public relationTags?: ITagEntity[],
    public companies?: ICompany[],
    public relationDeliveryMethods?: IRelationDeliveryMethod[],
    public relationPaymentMethods?: IRelationPaymentMethod[],
    public relationCustomFields?: IRelationCustomField[],
    public roles?: IRole[],
    public relationGroups?: IRelationGroup[],
    public authorities?: IGrantedAuthority[]
  ) {
  }
};
