import BaseEntityService from '@/shared/services/baseEntityService'
import { ICustomFieldOption } from '@/shared/models/custom-field-option.model'

export default class RelationFreeFieldOption extends BaseEntityService<ICustomFieldOption> {
  private static instance: RelationFreeFieldOption;

  private constructor () {
    super('api/relationms/api/relation-custom-field-options')
  }

  public static getInstance (): RelationFreeFieldOption {
    if (!RelationFreeFieldOption.instance) {
      return new RelationFreeFieldOption()
    }
    return RelationFreeFieldOption.instance
  }
}
