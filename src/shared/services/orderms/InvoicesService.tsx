import BaseEntityService from '../baseEntityService';
import { IInvoice } from '@/shared/models/orderms/InvoiceModel'
export default class  InvoicesService extends BaseEntityService<IInvoice> {
    private static instance: InvoicesService;

    private constructor() {
        super('api/orderms/api/invoices')
    }

    public static getInstance(): InvoicesService {
        if (!InvoicesService.instance) {
            return new InvoicesService()
        }
        return InvoicesService.instance
    }
}
