import BaseEntityService from '../baseEntityService';
import { ICreditInvoice } from '@/shared/models/orderms/CreditInvoiceModel'
export default class  CreditInvoicesService extends BaseEntityService<ICreditInvoice> {
    private static instance: CreditInvoicesService;

    private constructor() {
        super('api/orderms/api/credit-invoices')
    }

    public static getInstance(): CreditInvoicesService {
        if (!CreditInvoicesService.instance) {
            return new CreditInvoicesService()
        }
        return CreditInvoicesService.instance
    }
}
