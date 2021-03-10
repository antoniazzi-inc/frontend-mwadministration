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
import {BaseEntity} from './baseModel';
import { IRelationEntity } from './relationms/relationModel'
export const enum affiliateStatus {
    ACTIVE = 'ACTIVE',
    PENDING = 'PENDING',
    FINISHED = 'FINISHED',
    NOT_ACTIVE = 'NOT_ACTIVE',
}

export interface IAffiliate extends BaseEntity {
    version?: number;
    administrationId?: number;
    affiliateCode?: string;
    vatnumber?: string;
    kvknumber?: string;
    notifyPurchase?: boolean;
    generalFlatCommission?: number;
    generalPercentageCommission?: number;
    relation?: IRelationEntity;
}

export default class Affiliate implements IAffiliate {
constructor(
    public createdOn?: Moment,
    public updatedOn?: Moment,
    public id?: number,
    public version?: number,
    public administrationId?: number,
    public affiliateCode?: string,
    public vatnumber?: string,
    public kvknumber?: string,
    public affiliateStatus?: affiliateStatus,
    public notifyPurchase?: boolean,
    public generalFlatCommission?: number,
    public generalPercentageCommission?: number,
    public relation?: IRelationEntity,
  ){
  }
};
