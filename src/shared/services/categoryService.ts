import BaseEntityService from '@/shared/services/baseEntityService'
import { ICategoryEntity } from '@/shared/models/categoryModel'

export default class CategoryService extends BaseEntityService<ICategoryEntity> {
  private static instance: CategoryService;

  private constructor () {
    super('api/administrationms/api/categories')
  }

  public static getInstance (): CategoryService {
    if (!CategoryService.instance) {
      return new CategoryService()
    }
    return CategoryService.instance
  }
}
