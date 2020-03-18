import { IBaseEntity } from '@/shared/models/baseModel'
import { Moment } from 'moment'
import { IRelationProfile } from '@/shared/models/relation-profile.model'
import { IBeneficiary } from '@/shared/models/beneficiary.model'
import { IRelationEvent } from '@/shared/models/relation-event.model'
import { IContactHistory } from '@/shared/models/contact-history.model'
import { IRelationPhone } from '@/shared/models/relation-phone.model'
import { IRelationCustomField } from '@/shared/models/relation-custom-field.model'
import { ITagEntity } from '@/shared/models/tagModel'
import { IRole } from '@/shared/models/role.model'
import { ICompany } from '@/shared/models/company.model'
import { IRelationGroup } from '@/shared/models/relation-group.model'
import { ICustomer } from '@/shared/models/customer.model'
import { IRelationAddress } from '@/shared/models/relation-address.model'
import { IRelationPaymentMethod } from '@/shared/models/relation-payment-method.model'
import { IRelationDeliveryMethod } from '@/shared/models/relation-delivery-method.model'

export interface IRelationEntity extends IBaseEntity{
  accessCode?: string;
  login?: string;
  password?: string;
  email?: string;
  languageKey?: string;
  activated?: boolean;
  activationKey?: string;
  resetKey?: string;
  resetDate?: Moment;
  tfaEnabled?: boolean;
  tfaId?: string;
  affiliateId?: number;
  relationProfile?: IRelationProfile;
  customer?: ICustomer;
  beneficiary?: IBeneficiary;
  relationEvents?: IRelationEvent[];
  relationEventRecords?: IRelationEvent[];
  contactHistories?: IContactHistory[];
  contactHistoryRecords?: IContactHistory[];
  relationPhones?: IRelationPhone[];
  relationAddresses?: IRelationAddress[];
  relationCustomFields?: IRelationCustomField[];
  relationTags?: ITagEntity[];
  relationPaymentMethods?: IRelationPaymentMethod[];
  relationDeliveryMethods?: IRelationDeliveryMethod[];
  roles?: IRole[];
  companies?: ICompany[];
  relationGroups?: IRelationGroup[];
}

export class RelationEntity implements IRelationEntity {
  constructor (
    public id?: number,
    public administrationId?: number,
   public accessCode?: string,
  public login?: string,
  public password?: string,
  public email?: string,
  public languageKey?: string,
  public activated?: boolean,
  public activationKey?: string,
  public resetKey?: string,
  public resetDate?: Moment,
  public tfaEnabled?: boolean,
  public tfaId?: string,
  public affiliateId?: number,
  public relationProfile?: IRelationProfile,
  public customer?: ICustomer,
  public beneficiary?: IBeneficiary,
  public relationEvents?: IRelationEvent[],
  public relationEventRecords?: IRelationEvent[],
  public contactHistories?: IContactHistory[],
  public contactHistoryRecords?: IContactHistory[],
  public relationPhones?: IRelationPhone[],
  public relationAddresses?: IRelationAddress[],
  public relationCustomFields?: IRelationCustomField[],
  public relationTags?: ITagEntity[],
  public relationPaymentMethods?: IRelationPaymentMethod[],
  public relationDeliveryMethods?: IRelationDeliveryMethod[],
  public roles?: IRole[],
  public companies?: ICompany[],
  public relationGroups?: IRelationGroup[],
   public version?: number,
   public createdOn?: Moment,
   public updatedOn?: Moment
  ) {
  }
};
