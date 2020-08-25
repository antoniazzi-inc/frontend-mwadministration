import BaseEntityService from '../baseEntityService';
import { IBeneficiaryDeliveryAddress } from '@/shared/models/orderms/BeneficiaryDeliveryAddressModel'
export default class  BeneficiaryDeliveryAddressesService extends BaseEntityService<IBeneficiaryDeliveryAddress> {
    private static instance: BeneficiaryDeliveryAddressesService;

    private constructor() {
        super('api/orderms/api/beneficiary-delivery-addresses')
    }

    public static getInstance(): BeneficiaryDeliveryAddressesService {
        if (!BeneficiaryDeliveryAddressesService.instance) {
            return new BeneficiaryDeliveryAddressesService()
        }
        return BeneficiaryDeliveryAddressesService.instance
    }
}
