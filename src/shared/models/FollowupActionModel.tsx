import { Moment } from 'moment';
import { IBaseEntity } from './baseModel';
import { IExternalSystemConfig } from './ExternalSystemConfigModel'
import { IFollowupEmail } from './FollowupEmailModel'

export interface IFollowupAction extends IBaseEntity {
    createdOn?: Moment;
    updatedOn?: Moment;
    id?: number;
    version?: number;
    administrationId?: number;
    points?: number;
    executeDirectly?: boolean;
    externalSystemConfigsJson?: IExternalSystemConfig[];
    customerEmailsJson?: IFollowupEmail[];
    beneficiaryEmailsJson?: IFollowupEmail[];
}

export class FollowupAction implements IFollowupAction {
constructor(
    public createdOn?: Moment,
    public updatedOn?: Moment,
    public id?: number,
    public version?: number,
    public administrationId?: number,
    public points?: number,
    public executeDirectly?: boolean,
    public externalSystemConfigsJson?: IExternalSystemConfig[],
    public customerEmailsJson?: IFollowupEmail[],
    public beneficiaryEmailsJson?: IFollowupEmail[],
  ){
  }
};
