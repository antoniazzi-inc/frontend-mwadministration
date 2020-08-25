import BaseEntityService from '@/shared/services/baseEntityService'
import { ICustomField } from '@/shared/models/relationms/custom-field.model'

export default class FreeFieldService extends BaseEntityService<ICustomField> {
  private static instance: FreeFieldService;

  private constructor () {
    super('api/relationms/api/custom-fields')
  }

  public static getInstance (): FreeFieldService {
    if (!FreeFieldService.instance) {
      return new FreeFieldService()
    }
    return FreeFieldService.instance
  }
}
