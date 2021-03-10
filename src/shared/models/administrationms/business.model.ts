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

import { ICompany } from '../relationms/company.model'
import { Moment } from 'moment'
export interface IBusiness {
    id?: number;
    administrationId?: number;
    name?: string;
    description?: string;
    website?: string;
    createdOn?: Moment;
    updatedOn?: Moment;
    version?: number;
    companies?: ICompany[];
}

export class Business implements IBusiness {
  constructor (
        public id?: number,
        public administrationId?: number,
        public name?: string,
        public description?: string,
        public website?: string,
        public createdOn?: Moment,
        public updatedOn?: Moment,
        public version?: number,
        public companies?: ICompany[]
  ) {}
}
