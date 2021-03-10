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

import BaseEntityService from './baseEntityService';
import {IPromotion} from "@/shared/models/productms/PromotionModel";
import axios, {AxiosResponse} from 'axios'

export default class promotionsService extends BaseEntityService<IPromotion> {
  private static instance: promotionsService;

  private constructor() {
    super('api/productms/api/promotions')
  }

  public static getInstance(): promotionsService {
    if (!promotionsService.instance) {
      return new promotionsService()
    }
    return promotionsService.instance
  }

  public assign(entity: any): Promise<AxiosResponse> {
    return new Promise<AxiosResponse>(resolve => {
      axios.post('productms/api/promotions/' + entity.promotionId + '/assign', entity.req).then(function (res:AxiosResponse) {
        resolve(res);
      });
    });
  }

  public removeProducts(entity: any): Promise<AxiosResponse> {
    return new Promise<AxiosResponse>(resolve => {
      axios.delete('productms/api/promotions/' + entity.promotionId + '/remove', {data: entity.req}).then(function (res:AxiosResponse) {
        resolve(res);
      });
    });
  }
}
