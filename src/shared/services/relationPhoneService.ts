import BaseEntityService from '@/shared/services/baseEntityService'
import { IRelationPhone } from '@/shared/models/relation-phone.model'

export default class RelationPhoneService extends BaseEntityService<IRelationPhone> {
  private static instance: RelationPhoneService;

  private constructor () {
    super('api/relationms/api/relation-phones')
  }

  public static getInstance (): RelationPhoneService {
    if (!RelationPhoneService.instance) {
      return new RelationPhoneService()
    }
    return RelationPhoneService.instance
  }
}
