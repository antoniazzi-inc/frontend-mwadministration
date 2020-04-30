import BaseEntityService from '@/shared/services/baseEntityService'
import { IRelationAddress } from '@/shared/models/relation-address.model'

export default class RelationAddressService extends BaseEntityService<IRelationAddress> {
  private static instance: RelationAddressService;

  private constructor () {
    super('api/relationms/api/relation-addresses')
  }

  public static getInstance (): RelationAddressService {
    if (!RelationAddressService.instance) {
      return new RelationAddressService()
    }
    return RelationAddressService.instance
  }
}
