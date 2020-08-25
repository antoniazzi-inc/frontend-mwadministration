import BaseEntityService from '@/shared/services/baseEntityService'
import { IContactHistory } from '@/shared/models/relationms/contact-history.model'

export default class ContactHistoryService extends BaseEntityService<IContactHistory> {
  private static instance: ContactHistoryService;

  private constructor () {
    super('api/relationms/api/contact-histories')
  }

  public static getInstance (): ContactHistoryService {
    if (!ContactHistoryService.instance) {
      return new ContactHistoryService()
    }
    return ContactHistoryService.instance
  }
}
