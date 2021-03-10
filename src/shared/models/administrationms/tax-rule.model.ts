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
import { ICountry } from './country.model'
import { IBaseEntity } from '@/shared/models/baseModel'

export const enum CustomerType {
    ALL = 'ALL',
    COMPANY = 'COMPANY',
    PRIVATE = 'PRIVATE'
}

export const enum CustomerRegion {
    ALL = 'ALL',
    SAME_COUNTRY = 'SAME_COUNTRY',
    OTHER_COUNTRY_EU = 'OTHER_COUNTRY_EU',
    OTHER_COUNTRY_WORLD = 'OTHER_COUNTRY_WORLD'
}

export interface ITaxRule extends IBaseEntity{
    customerType?: CustomerType;
    customerRegion?: CustomerRegion;
    ruleType?: string;
    ruleJson?: string;
    country?: ICountry;
}

export class TaxRule implements ITaxRule {
  constructor (
        public id?: number,
        public customerType?: CustomerType,
        public customerRegion?: CustomerRegion,
        public ruleType?: string,
        public ruleJson?: string,
        public createdOn?: Moment,
        public updatedOn?: Moment,
        public version?: number,
        public country?: ICountry
  ) {}
}
