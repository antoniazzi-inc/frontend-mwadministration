import { Moment } from 'moment';
import { IBaseEntity } from './baseModel';

export interface IMedia extends IBaseEntity {
    createdOn?: Moment;
    updatedOn?: Moment;
    id?: number;
    version?: number;
    administrationId?: number;
    url?: string;
    name?: string;
    mimeType?: string;
    detailsJson?: string;
    bodyContentType?: string;
}

export class Media implements IMedia {
constructor(
    public createdOn?: Moment,
    public updatedOn?: Moment,
    public id?: number,
    public version?: number,
    public administrationId?: number,
    public url?: string,
    public name?: string,
    public mimeType?: string,
    public detailsJson?: string,
    public bodyContentType?: string,
  ){
  }
};
