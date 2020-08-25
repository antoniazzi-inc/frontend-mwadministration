import BaseEntityService from '@/shared/services/baseEntityService'
import { IHelpContent } from '@/shared/models/administrationms/help-content.model'

export default class HelpMaterialService extends BaseEntityService<IHelpContent> {
  private static instance: HelpMaterialService;

  private constructor () {
    super('api/administrationms/api/help-contents')
  }

  public static getInstance (): HelpMaterialService {
    if (!HelpMaterialService.instance) {
      return new HelpMaterialService()
    }
    return HelpMaterialService.instance
  }
}
