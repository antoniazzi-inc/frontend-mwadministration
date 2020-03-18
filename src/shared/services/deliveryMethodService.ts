import BaseEntityService from '@/shared/services/baseEntityService'
import {IDeliveryMethod} from "@/shared/models/delivery-method.model";

export default class DeliveryMethodService extends BaseEntityService<IDeliveryMethod> {
  private static instance: DeliveryMethodService;

  private constructor () {
    super('api/administrationms/api/delivery-methods')
  }

  public static getInstance (): DeliveryMethodService {
    if (!DeliveryMethodService.instance) {
      return new DeliveryMethodService()
    }
    return DeliveryMethodService.instance
  }
}
