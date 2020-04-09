import BaseEntityService from '@/shared/services/baseEntityService'
import { IBusiness } from '@/shared/models/business.model'

export default class BusinessService extends BaseEntityService<IBusiness> {
  private static instance: BusinessService;

  private constructor () {
    super('api/relationms/api/businesses')
  }

  public static getInstance (): BusinessService {
    if (!BusinessService.instance) {
      return new BusinessService()
    }
    return BusinessService.instance
  }
}
