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
import { IOrderLinePaymentSchedule } from '@/shared/models/orderms/OrderLinePaymentScheduleModel'
export default class  OrderLinePaymentSchedulesService extends BaseEntityService<IOrderLinePaymentSchedule> {
    private static instance: OrderLinePaymentSchedulesService;

    private constructor() {
        super('api/orderms/api/order-line-payment-schedules')
    }

    public static getInstance(): OrderLinePaymentSchedulesService {
        if (!OrderLinePaymentSchedulesService.instance) {
            return new OrderLinePaymentSchedulesService()
        }
        return OrderLinePaymentSchedulesService.instance
    }
}
