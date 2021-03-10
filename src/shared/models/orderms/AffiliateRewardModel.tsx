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
import { ICreditInvoice } from './CreditInvoiceModel'
import { IAffiliateCommision } from './AffiliateCommisionModel'

export interface IAffiliateReward extends BaseEntity {
    version?: number;
    administrationId?: number;
    affiliateRelationId?: number;
    paymentDate?: Moment;
    nettoAmount?: number;
    taxAmount?: number;
    totalAmount?: number;
    creditInvoice?: ICreditInvoice;
    affiliateCommisions?: IAffiliateCommision[];
}

export default class AffiliateReward implements IAffiliateReward {
constructor(
    public createdOn?: Moment,
    public updatedOn?: Moment,
    public id?: number,
    public version?: number,
    public administrationId?: number,
    public affiliateRelationId?: number,
    public paymentDate?: Moment,
    public nettoAmount?: number,
    public taxAmount?: number,
    public totalAmount?: number,
    public creditInvoice?: ICreditInvoice,
    public affiliateCommisions?: IAffiliateCommision[],
  ){
  }
};
