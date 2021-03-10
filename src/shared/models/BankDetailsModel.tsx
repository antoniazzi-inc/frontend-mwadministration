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
import { BaseEntity } from './baseModel';
import { IRelationEntity } from './relationms/relationModel'

export interface IBankDetails extends BaseEntity {
    version?: number;
    administrationId?: number;
    primaryCustomer?: boolean;
    primaryAffiliate?: boolean;
    bankAccountName?: string;
    bankAccountIbannumber?: string;
    bankAccountBicnumber?: string;
    bankAccountAdditionalDetails?: string;
    additionalPaymentDetailsJson?: string;
    withdrawAllowedDate?: Moment;
    withdrawAllowedDateIp?: string;
    relation?: IRelationEntity;
}

export default class BankDetails implements IBankDetails {
constructor(
    public createdOn?: Moment,
    public updatedOn?: Moment,
    public id?: number,
    public version?: number,
    public administrationId?: number,
    public primaryCustomer?: boolean,
    public primaryAffiliate?: boolean,
    public bankAccountName?: string,
    public bankAccountIbannumber?: string,
    public bankAccountBicnumber?: string,
    public bankAccountAdditionalDetails?: string,
    public additionalPaymentDetailsJson?: string,
    public withdrawAllowedDate?: Moment,
    public withdrawAllowedDateIp?: string,
    public relation?: IRelationEntity,
  ){
  }
};
