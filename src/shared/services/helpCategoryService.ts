import BaseEntityService from '@/shared/services/baseEntityService'
import { IHelpCategory } from '@/shared/models/help-category.model'

export default class HelpCategoryService extends BaseEntityService<IHelpCategory> {
  private static instance: HelpCategoryService;

  private constructor () {
    super('api/administrationms/api/help-categories')
  }

  public static getInstance (): HelpCategoryService {
    if (!HelpCategoryService.instance) {
      return new HelpCategoryService()
    }
    return HelpCategoryService.instance
  }
}
