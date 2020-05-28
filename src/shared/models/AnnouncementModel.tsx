import { IBaseEntity } from './baseModel';
import { IBaseEmail } from './BaseEmailModel'

export interface IAnnouncement extends IBaseEntity {
    sendBeforeNew?: string;
    email?: IBaseEmail;
}

export class Announcement implements IAnnouncement {
constructor(
    public sendBeforeNew?: string,
    public email?: IBaseEmail,
  ){
  }
};
