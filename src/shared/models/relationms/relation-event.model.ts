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

import { IRelationCustomField } from './relation-custom-field.model'
import { Moment } from 'moment'
import { IBaseEntity } from '@/shared/models/baseModel'
import { IRelationEntity } from '@/shared/models/relationms/relationModel'
export interface IRelationEvent extends IBaseEntity{
    relationEventType?: string;
    field?: string;
    oldValue?: any;
    newValue?: any;
    ip?: string;
    relationCustomField?: IRelationCustomField;
    relation?: IRelationEntity;
    owner?: IRelationEntity;
}

export class RelationEvent implements IRelationEvent {
  constructor (
      public id?: number,
      public administrationId?: number,
        public relationEventType?: string,
        public field?: string,
        public oldValue?: any,
        public newValue?: any,
        public ip?: string,
        public relationCustomField?: IRelationCustomField,
        public relation?: IRelationEntity,
        public owner?: IRelationEntity,
        public version?: number,
        public createdOn?: Moment,
        public updatedOn?: Moment
  ) {}
}
