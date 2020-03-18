import BaseEntityService from '@/shared/services/baseEntityService'
import { IHelpTag } from '@/shared/models/help-tag.model'

export default class HelpTagService extends BaseEntityService<IHelpTag> {
  private static instance: HelpTagService;

  private constructor () {
    super('api/administrationms/api/help-tags')
  }

  public static getInstance (): HelpTagService {
    if (!HelpTagService.instance) {
      return new HelpTagService()
    }
    return HelpTagService.instance
  }
}
