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
import { ITaxRateLink } from './tax-rate-link.model'
import { ICountry } from './country.model'
import { IBaseEntity } from '@/shared/models/baseModel'

export interface ITaxRate extends IBaseEntity {
    level?: number;
    validFrom?: Moment;
    validTo?: Moment;
    rate?: number;
    fromTaxRateLinks?: ITaxRateLink[];
    toTaxRateLinks?: ITaxRateLink[];
    country?: ICountry;
}

export class TaxRate implements ITaxRate {
  constructor (
        public id?: number,
        public level?: number,
        public validFrom?: Moment,
        public validTo?: Moment,
        public rate?: number,
        public createdOn?: Moment,
        public updatedOn?: Moment,
        public version?: number,
        public fromTaxRateLinks?: ITaxRateLink[],
        public toTaxRateLinks?: ITaxRateLink[],
        public country?: ICountry
  ) {}
}
