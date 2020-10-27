import { Moment } from 'moment';
import { BaseEntity } from '../baseModel';
import { IInvoice } from './InvoiceModel'

export interface IInvoiceTemplate extends BaseEntity {
    version?: number;
    administrationId?: number;
    name?: string;
    description?: string;
    isDefault?: boolean;
    logoUrl?: string;
    templateDataJson?: any;
    invoices?: IInvoice[];
}

export default class InvoiceTemplate implements IInvoiceTemplate {
constructor(
    public createdOn?: Moment,
    public updatedOn?: Moment,
    public id?: number,
    public version?: number,
    public administrationId?: number,
    public name?: string,
    public description?: string,
    public isDefault?: boolean,
    public logoUrl?: string,
    public templateDataJson?: any,
    public invoices?: IInvoice[],
  ){
  this.isDefault = isDefault ? true : false
  }
};
