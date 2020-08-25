import BaseEntityService from '@/shared/services/baseEntityService'
import { IRelationPhone } from '@/shared/models/relationms/relation-phone.model'
import { IRelationGroup } from '@/shared/models/relationms/relation-group.model'

export default class RelationGroupService extends BaseEntityService<IRelationGroup> {
  private static instance: RelationGroupService;

  private constructor () {
    super('api/relationms/api/relation-groups')
  }

  public static getInstance (): RelationGroupService {
    if (!RelationGroupService.instance) {
      return new RelationGroupService()
    }
    return RelationGroupService.instance
  }
}
