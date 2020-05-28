import { Moment } from 'moment';
import { IBaseEntity } from './baseModel';

export interface IExternalSystemConfig extends IBaseEntity {
    name?: string;
    code?: string;
    validFrom?: Moment;
    validTo?: Moment;
    costs?: number;
}

export class ExternalSystemConfig implements IExternalSystemConfig {
constructor(
    public name?: string,
    public code?: string,
    public validFrom?: Moment,
    public validTo?: Moment,
    public costs?: number,
  ){
  }
};
