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

import BaseEntityService from '@/shared/services/baseEntityService'
import { IProduct } from '@/shared/models/productms/ProductModel'
import axios from 'axios'
export default class ProductService extends BaseEntityService<IProduct> {
  private static instance: ProductService;

  private constructor () {
    super('/api/productms/api/products')
  }

  public static getInstance (): ProductService {
    if (!ProductService.instance) {
      return new ProductService()
    }
    return ProductService.instance
  }

  public createOnBucket (entity: any) {
    return new Promise(resolve => {
      axios.post('api/productms/api/products/'+entity.id+'/media', entity.params).then(function(res) {
        resolve(res.data);
      });
    })
  }

  public updateOnBucket (obj: any) {
    return new Promise(resolve => {
      resolve(true)
    })
  }

  public deleteFromBucket (obj: any) {
    return new Promise(resolve => {
      resolve(true)
    })
  }

  public searchMedia (pagination: any, q: any) {
    return new Promise(resolve => {
      resolve(true)
    })
  }

  public loadAllMedia (pagination: any) {
    return new Promise(resolve => {
      resolve(true)
    })
  }

  public updateTermsAndConditions (entity: any) {
    return new Promise(resolve => {
      resolve(true)
    })
  }

  public updatePayButton (entity: any) {
    return new Promise(resolve => {
      axios.put('api/productms/api/products/' + entity.id + '/pay-button', entity.payButton).then(function (res) {
        resolve(res.data)
      })
    })
  }
}
