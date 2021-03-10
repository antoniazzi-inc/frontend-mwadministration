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

import { IPermission } from './permission.model'
import { Moment } from 'moment'
import { IRelationEntity } from '@/shared/models/relationms/relationModel'
export interface IRole {
    id?: number;
    administrationId?: number;
    name?: string;
    code?: string;
    description?: string;
    createdOn?: Moment;
    updatedOn?: Moment;
    version?: number;
    permissions?: IPermission[];
    relations?: IRelationEntity[];
}

export class Role implements IRole {
  constructor (
        public id?: number,
        public administrationId?: number,
        public name?: string,
        public code?: string,
        public description?: string,
        public createdOn?: Moment,
        public updatedOn?: Moment,
        public version?: number,
        public permissions?: IPermission[],
        public relations?: IRelationEntity[]
  ) {}
}
