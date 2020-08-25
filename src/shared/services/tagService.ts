import BaseEntityService from '@/shared/services/baseEntityService'
import { ITagEntity } from '@/shared/models/administrationms/tagModel'

export default class TagService extends BaseEntityService<ITagEntity> {
  private static instance: TagService;

  private constructor () {
    super('api/administrationms/api/tags')
  }

  public static getInstance (): TagService {
    if (!TagService.instance) {
      return new TagService()
    }
    return TagService.instance
  }
}
