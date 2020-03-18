import { IBaseEntity } from '@/shared/models/baseModel'
import { Moment } from 'moment'

export interface IAdministrationSettings extends IBaseEntity{
  settingKey?: string;
  settingValueJson?: string;
}

export class AdministrationSettings implements IAdministrationSettings {
  constructor (
    public id?: number,
    public administrationId?: number,
    public settingKey?: string,
    public settingValueJson?: string,
    public version?: number,
    public createdOn?: Moment,
    public updatedOn?: Moment
  ) {}
}
