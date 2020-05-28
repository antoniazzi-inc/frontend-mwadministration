import BaseEntityService from './baseEntityService';
import {IPaymentSchedule} from "@/shared/models/PaymentScheduleModel";

export default class  paymentschedulesService extends BaseEntityService<IPaymentSchedule> {
    private static instance: paymentschedulesService;

    private constructor() {
        super('/api/payment-schedules')
    }

    public static getInstance(): paymentschedulesService {
        if (!paymentschedulesService.instance) {
            return new paymentschedulesService()
        }
        return paymentschedulesService.instance
    }
}
