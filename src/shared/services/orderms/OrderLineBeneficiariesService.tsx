import BaseEntityService from '../baseEntityService';
import { IOrderLineBeneficiary } from '@/shared/models/orderms/OrderLineBeneficiaryModel'
export default class  OrderLineBeneficiariesService extends BaseEntityService<IOrderLineBeneficiary> {
    private static instance: OrderLineBeneficiariesService;

    private constructor() {
        super('api/orderms/api/order-line-beneficiaries')
    }

    public static getInstance(): OrderLineBeneficiariesService {
        if (!OrderLineBeneficiariesService.instance) {
            return new OrderLineBeneficiariesService()
        }
        return OrderLineBeneficiariesService.instance
    }
}
