import BaseEntityService from '../baseEntityService';
import { ICustomerBillingAddress } from '@/shared/models/orderms/CustomerBillingAddressModel'
export default class  CustomerBillingAddressesService extends BaseEntityService<ICustomerBillingAddress> {
    private static instance: CustomerBillingAddressesService;

    private constructor() {
        super('api/orderms/api/customer-billing-addresses')
    }

    public static getInstance(): CustomerBillingAddressesService {
        if (!CustomerBillingAddressesService.instance) {
            return new CustomerBillingAddressesService()
        }
        return CustomerBillingAddressesService.instance
    }
}
