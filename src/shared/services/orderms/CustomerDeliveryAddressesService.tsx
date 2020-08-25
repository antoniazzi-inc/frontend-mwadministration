import BaseEntityService from '../baseEntityService';
import { ICustomerDeliveryAddress } from '@/shared/models/orderms/CustomerDeliveryAddressModel'
export default class  CustomerDeliveryAddressesService extends BaseEntityService<ICustomerDeliveryAddress> {
    private static instance: CustomerDeliveryAddressesService;

    private constructor() {
        super('api/orderms/api/customer-delivery-addresses')
    }

    public static getInstance(): CustomerDeliveryAddressesService {
        if (!CustomerDeliveryAddressesService.instance) {
            return new CustomerDeliveryAddressesService()
        }
        return CustomerDeliveryAddressesService.instance
    }
}
