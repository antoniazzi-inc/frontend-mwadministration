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
import { Moment } from 'moment'
import { ICategoryEntity } from '@/shared/models/administrationms/categoryModel'
import { ITagEntity } from '@/shared/models/administrationms/tagModel'
import {
  IAdministrationSettings
} from '@/shared/models/administrationms/administrationSettingsModel'
import { ICountry } from '@/shared/models/administrationms/country.model'
import { IExternalSystem } from '@/shared/models/externalSystem.model'
import { IAdministrationBusiness } from '@/shared/models/administrationms/administration-business.model'
export interface IAdministration extends IBaseEntity{
  name?: string;
  accessCode?: string;
  locked?: boolean;
  useShop?: boolean;
  useAutomation?: boolean;
  trial?: boolean;
  relationsLimit?: number;
  uid?: string;
  validFrom?: Moment;
  validTo?: Moment;
  country?: ICountry;
  administrationSettings?: IAdministrationSettings;
  categories?: ICategoryEntity[];
  tags?: ITagEntity[];
  externalSystems?: IExternalSystem[];
  administrationBusiness?: IAdministrationBusiness;
  langKey?: string;
}

export class AdministrationEntity implements IAdministration {
  constructor (
    public id?: number,
    public administrationId?: number,
    public name?: string,
  public accessCode?: string,
  public locked?: boolean,
  public useShop?: boolean,
  public useAutomation?: boolean,
  public trial?: boolean,
  public relationsLimit?: number,
  public uid?: string,
  public validFrom?: Moment,
  public validTo?: Moment,
  public country?: ICountry,
  public administrationSettings?: IAdministrationSettings,
  public categories?: ICategoryEntity[],
  public tags?: ITagEntity[],
  public externalSystems?: IExternalSystem[],
    public administrationBusiness?: IAdministrationBusiness,
  public langKey?: string
  ) {
    this.locked = this.locked || false
    this.useShop = this.useShop || false
    this.useAutomation = this.useAutomation || false
    this.trial = this.trial || false
    this.relationsLimit = this.relationsLimit || 100000
  }
};
