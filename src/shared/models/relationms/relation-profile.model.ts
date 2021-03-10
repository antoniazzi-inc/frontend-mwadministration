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
import { Moment } from 'moment'
import { IBaseEntity } from '@/shared/models/baseModel'
export interface  IRelationProfile extends IBaseEntity{
    firstName?: string;
    lastName?: string;
    middleName?: string;
    initials?: string;
    description?: string;
    title?: string;
    website?: string;
    companyName?: string;
    points?: number;
    birthDate?: Moment|Date|string;
    gender?: string;
    blackListed?: boolean;
    categoryId?: number;
    timeZoneId?: number;
    relation?: IRelationEntity;
}

export class RelationProfile implements IRelationProfile {
  constructor (
      public id?: number,
      public administrationId?: number,
        public firstName?: string,
        public lastName?: string,
        public middleName?: string,
        public initials?: string,
        public description?: string,
        public title?: string,
        public website?: string,
        public companyName?: string,
        public points?: number,
        public birthDate?: Moment|Date|string,
        public gender?: string,
        public blackListed?: boolean,
        public categoryId?: number,
        public timeZoneId?: number,
        public relation?: IRelationEntity,
        public version?: number,
        public createdOn?: Moment,
        public updatedOn?: Moment
  ) {
    this.blackListed = this.blackListed || false
  }
}
