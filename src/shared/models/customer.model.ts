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

import { IRelationEntity } from './relationms/relationModel'
import { Moment } from 'moment'
import { IBaseEntity } from '@/shared/models/baseModel'
import { ICompany } from '@/shared/models/relationms/company.model'
export interface ICustomer extends IBaseEntity{
    customerNumber?: string;
    vatNumber?: string;
    vatDisabled?: boolean;
    invoiceLetter?: boolean;
    onePageCheckout?: boolean;
    asCompany?: boolean;
    defaultPaymentMethodId?: number;
    relation?: IRelationEntity;
    isCompany?: boolean;
    companyName?: string;
}

export class Customer implements ICustomer {
  constructor (
      public id?: number,
      public administrationId?: number,
        public customerNumber?: string,
        public vatNumber?: string,
        public vatDisabled?: boolean,
        public invoiceLetter?: boolean,
        public onePageCheckout?: boolean,
        public relation?: IRelationEntity,
        public defaultPaymentMethodId?: number,
        public version?: number,
        public createdOn?: Moment,
        public updatedOn?: Moment,
        public companyName?: string,
        public isCompany?: boolean
  ) {
    this.invoiceLetter = this.invoiceLetter || false
    this.onePageCheckout = this.onePageCheckout || false
    this.vatDisabled = this.vatDisabled || false
    this.isCompany = this.isCompany || false
  }
}
