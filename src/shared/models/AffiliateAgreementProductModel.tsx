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
import { IBaseEntity } from './baseModel';
import { IAffiliateAgreement } from './AffiliateAgreementModel'
import { IProduct } from './productms/ProductModel'
import { IAttributeValue } from './productms/AttributeValueModel'

export interface IAffiliateAgreementProduct extends IBaseEntity {
    createdOn?: Moment;
    updatedOn?: Moment;
    id?: number;
    version?: number;
    administrationId?: number;
    affiliateId?: number;
    affiliateAgreement?: IAffiliateAgreement;
    products?: IProduct[];
    attributeValues?: IAttributeValue[];
}

export class AffiliateAgreementProduct implements IAffiliateAgreementProduct {
constructor(
    public createdOn?: Moment,
    public updatedOn?: Moment,
    public id?: number,
    public version?: number,
    public administrationId?: number,
    public affiliateId?: number,
    public affiliateAgreement?: IAffiliateAgreement,
    public products?: IProduct[],
    public attributeValues?: IAttributeValue[],
  ){
  }
};
