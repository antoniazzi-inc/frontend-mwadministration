import BaseEntityService from '@/shared/services/baseEntityService'
import { IPaymentMethod } from '@/shared/models/payment-method.model'

export default class PaymentMethodService extends BaseEntityService<IPaymentMethod> {
  private static instance: PaymentMethodService;

  private constructor () {
    super('api/administrationms/api/payment-methods')
  }

  public static getInstance (): PaymentMethodService {
    if (!PaymentMethodService.instance) {
      return new PaymentMethodService()
    }
    return PaymentMethodService.instance
  }
}
