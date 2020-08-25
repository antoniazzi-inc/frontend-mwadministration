import BaseEntityService from '../baseEntityService';
import { IPaymentEvent } from '@/shared/models/orderms/PaymentEventModel'
export default class  PaymentEventsService extends BaseEntityService<IPaymentEvent> {
    private static instance: PaymentEventsService;

    private constructor() {
        super('api/orderms/api/payment-events')
    }

    public static getInstance(): PaymentEventsService {
        if (!PaymentEventsService.instance) {
            return new PaymentEventsService()
        }
        return PaymentEventsService.instance
    }
}
