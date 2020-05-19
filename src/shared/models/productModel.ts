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

export interface IProduct extends BaseEntity {

}

export class ProductModel implements IProduct {
  constructor (
    public id?: number,
    public createdOn?: Moment,
    public updatedOn?: Moment,
    public version?: number,
    public administrationId?: number,
  ) {
  }
};
