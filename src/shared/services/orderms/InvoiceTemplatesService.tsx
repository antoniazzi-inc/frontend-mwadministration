import BaseEntityService from '../baseEntityService';
import { IInvoiceTemplate } from '@/shared/models/orderms/InvoiceTemplateModel'
export default class  InvoiceTemplatesService extends BaseEntityService<IInvoiceTemplate> {
    private static instance: InvoiceTemplatesService;

    private constructor() {
        super('api/orderms/api/invoice-templates')
    }

    public static getInstance(): InvoiceTemplatesService {
        if (!InvoiceTemplatesService.instance) {
            return new InvoiceTemplatesService()
        }
        return InvoiceTemplatesService.instance
    }
}
