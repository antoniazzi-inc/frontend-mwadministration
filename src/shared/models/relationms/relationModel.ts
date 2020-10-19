import { Moment } from 'moment'
import { BaseEntity } from '../baseModel'
import { IAffiliate } from '../AffiliateModel'
import { IBeneficiary } from '../beneficiary.model'
import { IRelationProfile } from './relation-profile.model'
import { IBankDetails } from '../BankDetailsModel'
import { IContactHistory } from './contact-history.model'
import { IRelationAddress } from './relation-address.model'
import { IRelationPhone } from './relation-phone.model'
import { IRelationDeliveryMethod } from './relation-delivery-method.model'
import { IRelationPaymentMethod } from './relation-payment-method.model'
import { IRelationCustomField } from './relation-custom-field.model'
import { IRole } from '../administrationms/role.model'
import { IRelationGroup } from './relation-group.model'
import { IGrantedAuthority } from './GrantedAuthorityModel'
import { ITagEntity } from '@/shared/models/administrationms/tagModel'
import { ICompany } from '@/shared/models/relationms/company.model'
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


export const enum Activity_type {
  FOLLOW = 'FOLLOW',
  PLAYMATE = 'PLAYMATE',
  CHALLENGED = 'CHALLENGED',
  CHALLENGE_RESULT = 'CHALLENGE_RESULT',
  ALL_TIME_HIGH = 'ALL_TIME_HIGH',
  CLUB_MEMBER = 'CLUB_MEMBER'
}
export const enum Subject_Type {
  TEAM_PLAYMATE = 'TEAM_PLAYMATE',
  OPPONENT = 'OPPONENT',
  CLUB = 'CLUB'
}
export const enum Media_type {
  USER_AVATAR = 'USER_AVATAR',
  VIDEO = 'VIDEO',
  IMAGE = 'IMAGE'
  /*additional media types when needed*/
}
export interface IUser  {
  first_name: string;
  last_name: string;
  avatar: string;
  id: number;
}
export interface ISubject  {
  subject_type: Subject_Type,
  user: IUser // Check if Club is user
}
export interface IMedia  {
 url: string;
 type: Media_type
}
export interface IOption  {
  media: IMedia;
  title: string;
  votes: IUser[]; // Check if Club is user
}
export interface IPoll  {
  title: string;
  options: IOption[],

}

export interface IGame_info  {
  sets: number;
  results: string[] //1/4, 2/6, 6/4…
  game_type: string // single, double, mini, no_serve
  winner_user_id: number
}

export class IUserActivity {
  constructor(
    public user: IUser,
    public subjects: ISubject[],
    public applause: IUser[], // Check if Club is user
    public activityType: Activity_type,
    public poll: IPoll,
    public game_info: IGame_info
  ) {
  }
}



