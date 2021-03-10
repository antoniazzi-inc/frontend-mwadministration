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

import { IBaseEntity } from '@/shared/models/baseModel'
import { IRelationEntity } from '@/shared/models/relationms/relationModel'
import { Moment } from 'moment'
export const enum PhoneType {
    WORK = 'WORK',
    HOME = 'HOME',
    MOBILE = 'MOBILE'
}

export interface IRelationPhone extends IBaseEntity{
    number?: string;
    description?: string;
    phoneType?: PhoneType;
    relation?: IRelationEntity;
}

export class RelationPhone implements IRelationPhone {
  constructor (
      public id?: number,
      public administrationId?: number,
        public number?: string,
        public description?: string,
        public phoneType?: PhoneType,
        public relation?: IRelationEntity,
        public version?: number,
        public createdOn?: Moment,
        public updatedOn?: Moment
  ) {}
}
