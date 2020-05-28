import { Moment } from 'moment';
import { IBaseEntity } from './baseModel';
import { ILocalTime } from './LocalTimeModel'

export interface IFollowupEmail extends IBaseEntity {
    sendDirect?: boolean;
    sendOnWeekDay?: number;
    fixedDate?: Moment;
    sendAfterDays?: number;
    sendTime?: ILocalTime;
}

export class FollowupEmail implements IFollowupEmail {
constructor(
    public sendDirect?: boolean,
    public sendOnWeekDay?: number,
    public fixedDate?: Moment,
    public sendAfterDays?: number,
    public sendTime?: ILocalTime,
  ){
  }
};
