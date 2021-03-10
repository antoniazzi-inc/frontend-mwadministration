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

import { IRelationEntity } from './relationModel'
import { IBaseEntity } from '@/shared/models/baseModel'
import { ICompany } from '@/shared/models/relationms/company.model'
import { Moment } from 'moment'
export const enum AddressType {
    WORK = 'WORK',
    HOME = 'HOME',
    POSTAL = 'POSTAL',
    OTHER = 'OTHER'
}

export interface IRelationAddress extends IBaseEntity{
    relationAddressId?: number;
    street?: string;
    houseNumber?: string;
    city?: string;
    countryId?: number;
    entranceNumber?: string;
    appartmentNumber?: string;
    postalCode?: string;
    description?: string;
    addressType?: AddressType;
    usedForBilling?: boolean;
    usedForDelivery?: boolean;
    primary?: boolean;
    relation?: IRelationEntity;
}

export class RelationAddress implements IRelationAddress {
  constructor (
      public id?: number,
      public administrationId?: number,
        public relationAddressId?: number,
        public street?: string,
        public houseNumber?: string,
        public city?: string,
        public countryId?: number,
        public entranceNumber?: string,
        public appartmentNumber?: string,
        public postalCode?: string,
        public description?: string,
        public addressType?: AddressType,
        public usedForBilling?: boolean,
        public usedForDelivery?: boolean,
        public primary?: boolean,
        public relation?: IRelationEntity,
        public version?: number,
        public createdOn?: Moment,
        public updatedOn?: Moment
  ) {
    this.usedForBilling = this.usedForBilling || false
    this.usedForDelivery = this.usedForDelivery || false
    this.primary = this.primary || false
  }
}
