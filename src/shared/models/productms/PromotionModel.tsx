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
import { ITypeTimeBased } from './TypeTimeBasedModel'
import { ITypeCouponBased } from './TypeCouponBasedModel'
import { ITypePersonalCouponBased } from './TypePersonalCouponBasedModel'
import { ITypeAffiliateBased } from './TypeAffiliateBasedModel'
import { ITypeLoyaltyBased } from './TypeLoyaltyBasedModel'
import { IPromotionLanguage } from './PromotionLanguageModel'
import { IPromotionProductCategory } from './PromotionProductCategoryModel'
import { ITypeBundleBased } from './TypeBundleBasedModel'
import { ITypePriceBased } from './TypePriceBasedModel'
import { ITypeQuantityBased } from './TypeQuantityBasedModel'
import { IProduct } from './ProductModel'
import { IAttributeValue } from './AttributeValueModel'
export const enum promotionType {
    AFFILIATE = 'AFFILIATE',
    BUNDLE = 'BUNDLE',
    COUPON = 'COUPON',
    LOYALTY = 'LOYALTY',
    PERSONAL_COUPON = 'PERSONAL_COUPON',
    PRICE = 'PRICE',
    QUANTITY = 'QUANTITY',
    TEMPORARY_COUPON = 'TEMPORARY_COUPON',
    TIME = 'TIME',
}

export interface IPromotion extends IBaseEntity {
    createdOn?: Moment;
    updatedOn?: Moment;
    id?: number;
    version?: number;
    administrationId?: number;
    availableFrom?: Moment|any;
    availableTo?: Moment|any;
    recurrent?: boolean;
    typeTimeBased?: ITypeTimeBased;
    promotionType?: promotionType;
    typeCouponBased?: ITypeCouponBased;
    typePersonalCouponBased?: ITypePersonalCouponBased;
    typeAffiliateBased?: ITypeAffiliateBased;
    typeLoyaltyBased?: ITypeLoyaltyBased;
    promotionLanguages?: IPromotionLanguage[];
    promotionProductCategories?: IPromotionProductCategory[];
    typeBundleBaseds?: ITypeBundleBased[];
    typePriceBaseds?: ITypePriceBased[];
    typeQuantityBaseds?: ITypeQuantityBased[];
    products?: IProduct[];
    attributeValues?: IAttributeValue[];
}

export class Promotion implements IPromotion {
constructor(
    public createdOn?: Moment,
    public updatedOn?: Moment,
    public id?: number,
    public version?: number,
    public administrationId?: number,
    public promotionType?: promotionType,
    public availableFrom?: Moment,
    public availableTo?: Moment,
    public recurrent?: boolean,
    public typeTimeBased?: ITypeTimeBased,
    public typeCouponBased?: ITypeCouponBased,
    public typePersonalCouponBased?: ITypePersonalCouponBased,
    public typeAffiliateBased?: ITypeAffiliateBased,
    public typeLoyaltyBased?: ITypeLoyaltyBased,
    public promotionLanguages?: IPromotionLanguage[],
    public promotionProductCategories?: IPromotionProductCategory[],
    public typeBundleBaseds?: ITypeBundleBased[],
    public typePriceBaseds?: ITypePriceBased[],
    public typeQuantityBaseds?: ITypeQuantityBased[],
    public products?: IProduct[],
    public attributeValues?: IAttributeValue[],
  ){
    this.recurrent = recurrent ? recurrent : false
  }
};
