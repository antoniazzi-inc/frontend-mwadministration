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
import { IBaseEntity } from '../baseModel';
import { IAttribute } from './AttributeModel'
import { IAttributeValueLanguage } from './AttributeValueLanguageModel'
import { IPromotion } from './PromotionModel'

export interface IAttributeValue extends IBaseEntity {
    createdOn?: Moment;
    updatedOn?: Moment;
    id?: number;
    version?: number;
    administrationId?: number;
    orderIndex?: number;
    price?: number;
    stock?: number;
    value?: string;
    attribute?: IAttribute;
    attributeValueLanguages?: IAttributeValueLanguage[];
    promotions?: IPromotion[];
}

export class AttributeValue implements IAttributeValue {
constructor(
    public createdOn?: Moment,
    public updatedOn?: Moment,
    public id?: number,
    public version?: number,
    public administrationId?: number,
    public orderIndex?: number,
    public price?: number,
    public stock?: number,
    public value?: string,
    public attribute?: IAttribute,
    public attributeValueLanguages?: IAttributeValueLanguage[],
    public promotions?: IPromotion[],
  ){
  }
};
