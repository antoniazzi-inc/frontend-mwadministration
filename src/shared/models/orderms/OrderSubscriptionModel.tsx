import { Moment } from 'moment';
import { BaseEntity } from '../baseModel';
import { IInvoice } from './InvoiceModel'

export interface IOrderSubscription extends BaseEntity {
    version?: number;
    administrationId?: number;
    relationId?: number;
    invoicePeriod?: string;
    validFrom?: string;
    validTo?: string;
    active?: boolean;
    maxTerms?: number;
    additionalDetailsJson?: string;
    invoices?: IInvoice[];
}

export default class OrderSubscription implements IOrderSubscription {
constructor(
    public createdOn?: Moment,
    public updatedOn?: Moment,
    public id?: number,
    public version?: number,
    public administrationId?: number,
    public relationId?: number,
    public maxTerms?: number,
    public invoicePeriod?: string,
    public validFrom?: string,
    public validTo?: string,
    public active?: boolean,
    public additionalDetailsJson?: string,
    public invoices?: IInvoice[],
  ){
  }
};
