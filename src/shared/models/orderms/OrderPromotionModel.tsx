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
import {IProduct} from "@/shared/models/productms/ProductModel";
import {IAttributeValue} from "@/shared/models/productms/AttributeValueModel";

export interface IOrderPromotion extends BaseEntity {
    version?: number;
    administrationId?: number;
    relationId?: number;
    promotionId?: number;
    promotionType?: string;
    name?: string;
    description?: string;
    availableFrom?: Moment;
    availableTo?: Moment;
    recurrent?: boolean;
    promotionTypeDetailsJson?: string;
    products?: IProduct[];
    attributeValues?: IAttributeValue[];
}

export default class OrderPromotion implements IOrderPromotion {
constructor(
    public createdOn?: Moment,
    public updatedOn?: Moment,
    public id?: number,
    public version?: number,
    public administrationId?: number,
    public relationId?: number,
    public promotionId?: number,
    public promotionType?: string,
    public name?: string,
    public description?: string,
    public availableFrom?: Moment,
    public availableTo?: Moment,
    public recurrent?: boolean,
    public promotionTypeDetailsJson?: string,
    public products?: IProduct[],
    public attributeValues?: IAttributeValue[],
  ){
  }
};
