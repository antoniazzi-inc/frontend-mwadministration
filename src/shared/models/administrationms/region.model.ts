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
import { IBaseEntity } from '@/shared/models/baseModel'

export interface IRegion extends IBaseEntity{
    name?: string;
    home?: boolean;
    abroad?: boolean;
    insideEu?: boolean;
    outsideEu?: boolean;
    countriesJson?: string;
}

export class Region implements IRegion {
  constructor (
        public id?: number,
        public administrationId?: number,
        public name?: string,
        public home?: boolean,
        public abroad?: boolean,
        public insideEu?: boolean,
        public outsideEu?: boolean,
        public countriesJson?: string,
        public createdOn?: Moment,
        public updatedOn?: Moment,
        public version?: number
  ) {
    this.home = this.home || false
    this.abroad = this.abroad || false
    this.insideEu = this.insideEu || false
    this.outsideEu = this.outsideEu || false
  }
}
