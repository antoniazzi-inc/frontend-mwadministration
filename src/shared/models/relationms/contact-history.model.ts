import { IRelationEntity } from './relationModel'
import { Moment } from 'moment'
export const enum ContactHistoryType {
    EMAIL = 'EMAIL',
    PHONE = 'PHONE',
    TWITTER = 'TWITTER',
    FACEBOOK = 'FACEBOOK',
    LINKEDIN = 'LINKEDIN',
    INSTAGRAM = 'INSTAGRAM',
    LETTER = 'LETTER',
    WEBSITE = 'WEBSITE',
    SOCIAL_MEDIA = 'SOCIAL_MEDIA',
    MEETING = 'MEETING',
    REAL_LIFE = 'REAL_LIFE',
    ADVERTISEMENT = 'ADVERTISEMENT',
    UNSPECIFIED = 'UNSPECIFIED',
    CRM_TASK = 'CRM_TASK',
    BLOG = 'BLOG'
}

export const enum ContactHistoryReferenceType {
    ORDER = 'ORDER',
    WORKFLOW = 'WORKFLOW',
    LIST_MANAGER = 'LIST_MANAGER',
    UNSPECIFIED = 'UNSPECIFIED'
}

export interface IContactHistory {
    id?: number;
    administrationId?: number;
    title?: string;
    info?: string;
    contactTime?: Moment;
    contactType?: ContactHistoryType;
    referenceType?: ContactHistoryReferenceType;
    referenceTe?: ContactHistoryReferenceType;
    createdOn?: Moment;
    updatedOn?: Moment;
    version?: number;
    relation?: IRelationEntity;
    owner?: IRelationEntity;
}

export class ContactHistory implements IContactHistory {
  constructor (
        public id?: number,
        public administrationId?: number,
        public title?: string,
        public info?: string,
        public contactTime?: Moment,
        public contactType?: ContactHistoryType,
        public referenceType?: ContactHistoryReferenceType,
        public referenceTe?: ContactHistoryReferenceType,
        public createdOn?: Moment,
        public updatedOn?: Moment,
        public version?: number,
        public relation?: IRelationEntity,
        public owner?: IRelationEntity
  ) {}
}
