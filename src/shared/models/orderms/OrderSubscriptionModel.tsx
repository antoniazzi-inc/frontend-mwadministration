/*
 *
 *  * Copyright 2018-2021 Antoniazzi Holding BV
 *  *
 *  * This program is free software: you can redistribute it and/or modify it
 *  * under the terms of the GNU General Public License as published by
 *  * the Free Software Foundation, either version 3 of the License,
 *  * or (at your option) any later version.
 *  *
 *  * This program is distributed in the hope that it will be useful,
 *  * but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 *  * GNU General Public License for more details.
 *  *
 *  * You should have received a copy of the GNU General Public License
 *  * along with this program. If not, see <https://www.gnu.org/licenses/>.
 *
 */

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
