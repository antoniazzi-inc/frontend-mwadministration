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

import {PhoneType} from './company-phone.model'
import {AddressType} from './company-address.model'
import {IBusiness} from '../administrationms/business.model'
import {IRelationEntity} from './relationModel'
import {IBaseEntity} from '@/shared/models/baseModel'
import {Moment} from 'moment'

export interface ICompany extends IBaseEntity{
  name?: string;
  description?: string;
  website?: string;
  alias?: string;
  vatNumber?: string;
  addressStreet?: string;
  addressHouseNumber?: string;
  city?: string;
  countryId?: number;
  entranceNumber?: string;
  appartmentNumber?: string;
  postalCode?: string;
  addressDescription?: string;
  addressType?: AddressType;
  phoneNumber?: string;
  phoneDescription?: string;
  phoneType?: PhoneType;
  business?: IBusiness;
  relations?: IRelationEntity[];
}

export class Company implements ICompany {
  constructor (
        public id?: number,
        public administrationId?: number,
        public version?: number,
        public createdOn?: Moment,
        public updatedOn?: Moment,
        public name?: string,
        public description?: string,
        public website?: string,
        public alias?: string,
        public vatNumber?: string,
        public addressStreet?: string,
        public addressHouseNumber?: string,
        public city?: string,
        public countryId?: number,
        public entranceNumber?: string,
        public appartmentNumber?: string,
        public postalCode?: string,
        public addressDescription?: string,
        public addressType?: AddressType,
        public phoneNumber?: string,
        public phoneDescription?: string,
        public phoneType?: PhoneType,
        public business?: IBusiness,
        public relations?: IRelationEntity[]
  ) {
    this.phoneType = PhoneType.OTHER
  }
}
