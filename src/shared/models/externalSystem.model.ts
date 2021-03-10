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

import { ICompanyPhone } from './relationms/company-phone.model'
import { ICompanyAddress } from './relationms/company-address.model'
import { IBusiness } from './administrationms/business.model'
import { IRelationEntity } from './relationms/relationModel'
import { IBaseEntity } from '@/shared/models/baseModel'
import { Moment } from 'moment'
export interface IExternalSystem extends IBaseEntity{
  settingKey?: string;
  status?: ExternalSystemType;
  settingValueJson?: string;
}
export const enum ExternalSystemType {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  TEST = 'TEST',
}
export class ExternalSystem implements IExternalSystem {
  constructor (
      public id?: number,
      public administrationId?: number,
        public settingKey?: string,
        public status?: ExternalSystemType,
        public settingValueJson?: string,
        public version?: number,
        public createdOn?: Moment,
        public updatedOn?: Moment
  ) {}
}
