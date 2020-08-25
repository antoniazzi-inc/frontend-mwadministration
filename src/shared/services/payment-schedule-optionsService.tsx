import BaseEntityService from './baseEntityService';
import {IPaymentScheduleOption} from "@/shared/models/productms/PaymentScheduleOptionModel";

export default class  paymentscheduleoptionsService extends BaseEntityService <IPaymentScheduleOption>{
    private static instance: paymentscheduleoptionsService;

    private constructor() {
        super('api/productms/api/payment-schedule-options')
    }

    public static getInstance(): paymentscheduleoptionsService {
        if (!paymentscheduleoptionsService.instance) {
            return new paymentscheduleoptionsService()
        }
        return paymentscheduleoptionsService.instance
    }
}
