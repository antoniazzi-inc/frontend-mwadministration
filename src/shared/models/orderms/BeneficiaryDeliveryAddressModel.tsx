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

import { Moment } from 'moment';
import { BaseEntity } from '../baseModel';

export interface IBeneficiaryDeliveryAddress extends BaseEntity {
    version?: number;
    administrationId?: number;
    relationId?: number;
    beneficiaryRelationId?: number;
    beneficiaryRelationAddressId?: number;
    street?: string;
    houseNumber?: string;
    city?: string;
    countryId?: number;
    entranceNumber?: string;
    countryName?: string;
    appartmentNumber?: string;
    postalCode?: string;
    addressType?: string;
    phoneNumber?: string;
    description?: string;
    phoneType?: string;
}

export default class BeneficiaryDeliveryAddress implements IBeneficiaryDeliveryAddress {
constructor(
    public createdOn?: Moment,
    public updatedOn?: Moment,
    public id?: number,
    public version?: number,
    public administrationId?: number,
    public relationId?: number,
    public beneficiaryRelationId?: number,
    public beneficiaryRelationAddressId?: number,
    public street?: string,
    public houseNumber?: string,
    public countryName?: string,
    public city?: string,
    public countryId?: number,
    public entranceNumber?: string,
    public appartmentNumber?: string,
    public postalCode?: string,
    public addressType?: string,
    public phoneNumber?: string,
    public description?: string,
    public phoneType?: string,
  ){
  }
};
