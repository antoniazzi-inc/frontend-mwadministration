import BaseEntityService from '@/shared/services/baseEntityService'
import { ITagEntity } from '@/shared/models/tagModel'

export default class RelationTagService extends BaseEntityService<ITagEntity> {
  private static instance: RelationTagService;

  private constructor () {
    super('api/relationms/api/relation-tags')
  }

  public static getInstance (): RelationTagService {
    if (!RelationTagService.instance) {
      return new RelationTagService()
    }
    return RelationTagService.instance
  }
}
