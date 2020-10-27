import { Moment } from 'moment';
import { BaseEntity } from '../baseModel';

export interface IOrderCustomer extends BaseEntity {
    version?: number;
    administrationId?: number;
    relationId?: number;
    email?: string;
    fullName?: string;
    title?: string;
    isCompany?: boolean;
    companyName?: string;
}

export default class OrderCustomer implements IOrderCustomer {
constructor(
    public createdOn?: Moment,
    public updatedOn?: Moment,
    public id?: number,
    public version?: number,
    public administrationId?: number,
    public relationId?: number,
    public email?: string,
    public fullName?: string,
    public title?: string,
    public isCompany?: boolean,
    public companyName?: string
  ){
    this.isCompany = this.isCompany || false
  }
};
