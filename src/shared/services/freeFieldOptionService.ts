import BaseEntityService from '@/shared/services/baseEntityService'
import { ICustomFieldOption } from '@/shared/models/custom-field-option.model'

export default class FreeFieldOptionService extends BaseEntityService<ICustomFieldOption> {
  private static instance: FreeFieldOptionService;

  private constructor () {
    super('api/relationms/api/custom-field-options')
  }

  public static getInstance (): FreeFieldOptionService {
    if (!FreeFieldOptionService.instance) {
      return new FreeFieldOptionService()
    }
    return FreeFieldOptionService.instance
  }
}
