import BaseEntityService from './baseEntityService';
import typetimebasedsService from "@/shared/services/type-time-basedsService";

export default class  TypeVoucherBasedService extends BaseEntityService<any> {
    private static instance: TypeVoucherBasedService;

    private constructor() {
        super('/api/productms/api/type-vouchers')
    }

    public static getInstance(): typetimebasedsService {
        if (!TypeVoucherBasedService.instance) {
            return new TypeVoucherBasedService()
        }
        return TypeVoucherBasedService.instance
    }
}
