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

import { Moment } from 'moment'
import { ITimeZone } from './time-zone.model'
import { IBaseEntity } from '@/shared/models/baseModel'
import { ICompany } from '@/shared/models/relationms/company.model'

export interface ICountry extends IBaseEntity{
    iso?: string;
    iso3?: string;
    numCode?: string;
    phoneCode?: string;
    nlName?: string;
    enName?: string;
    timeZones?: ITimeZone[];
}

export class Country implements ICountry {
  constructor (
      public id?: number,
      public administrationId?: number,
        public iso?: string,
        public iso3?: string,
        public numCode?: string,
        public phoneCode?: string,
        public nlName?: string,
        public enName?: string,
        public timeZones?: ITimeZone[],
        public version?: number,
        public createdOn?: Moment,
        public updatedOn?: Moment
  ) {}
}
