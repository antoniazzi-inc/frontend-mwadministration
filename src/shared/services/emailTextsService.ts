import BaseEntityService from '@/shared/services/baseEntityService'
import { IBusiness } from '@/shared/models/administrationms/business.model'

export default class EmailTextsService extends BaseEntityService<IBusiness> {
  private static instance: EmailTextsService;

  private constructor () {
    super('api/relationms/api/businesses')
  }

  public static getInstance (): EmailTextsService {
    if (!EmailTextsService.instance) {
      return new EmailTextsService()
    }
    return EmailTextsService.instance
  }
}
