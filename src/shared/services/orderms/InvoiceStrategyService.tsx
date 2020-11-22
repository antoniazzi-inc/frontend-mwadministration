import BaseEntityService from '../baseEntityService';
import { IOrderLine } from '@/shared/models/orderms/OrderLineModel'
export default class  InvoiceStrategyService extends BaseEntityService<IOrderLine> {
    private static instance: InvoiceStrategyService;

    private constructor() {
        super('api/orderms/api/invoice-strategies')
    }

    public static getInstance(): InvoiceStrategyService {
        if (!InvoiceStrategyService.instance) {
            return new InvoiceStrategyService()
        }
        return InvoiceStrategyService.instance
    }
}
