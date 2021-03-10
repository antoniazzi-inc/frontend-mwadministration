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
import {IPaymentMethod} from "@/shared/models/administrationms/payment-method.model";
import axios, {AxiosResponse} from 'axios'
export default class  productpaymentmethodsService extends BaseEntityService<IPaymentMethod> {
    private static instance: productpaymentmethodsService;

    private constructor() {
        super('api/productms/api/product-payment-methods')
    }

    public static getInstance(): productpaymentmethodsService {
        if (!productpaymentmethodsService.instance) {
            return new productpaymentmethodsService()
        }
        return productpaymentmethodsService.instance
    }

    public createMultiple(entity:any){
      return new Promise((resolve, reject) => {
        axios.post('api/productms/api/product-payment-methods/multiple', entity).then((resp:AxiosResponse) => {
          if(resp.data){
            resolve(resp)
          }
        }).catch(e=>{
          reject(e)
        })
      })
    }
}
