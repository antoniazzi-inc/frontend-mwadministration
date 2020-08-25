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
