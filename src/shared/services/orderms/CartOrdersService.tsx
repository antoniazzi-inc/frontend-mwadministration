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

import BaseEntityService from '../baseEntityService';
import { ICartOrder } from '@/shared/models/orderms/CartOrderModel'
export default class  CartOrdersService extends BaseEntityService<ICartOrder> {
    private static instance: CartOrdersService;

    private constructor() {
        super('api/orderms/api/cart-orders')
    }

    public static getInstance(): CartOrdersService {
        if (!CartOrdersService.instance) {
            return new CartOrdersService()
        }
        return CartOrdersService.instance
    }

    public updateCart(cartOrder:ICartOrder) {
      return this.postRequest(`api/cart-wizard-2-prices`, cartOrder)

    }
    public createCart(cartOrder:ICartOrder) {
      return this.postRequest(`api/cart-orders`, cartOrder)

    }
}
