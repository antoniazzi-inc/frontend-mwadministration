import BaseEntityService from './baseEntityService';
import {IPaymentScheduleOption} from "@/shared/models/PaymentScheduleOptionModel";

export default class  paymentscheduleoptionsService extends BaseEntityService <IPaymentScheduleOption>{
    private static instance: paymentscheduleoptionsService;

    private constructor() {
        super('/api/payment-schedule-options')
    }

    public static getInstance(): paymentscheduleoptionsService {
        if (!paymentscheduleoptionsService.instance) {
            return new paymentscheduleoptionsService()
        }
        return paymentscheduleoptionsService.instance
    }
}
