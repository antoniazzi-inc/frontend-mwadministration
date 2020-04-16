import BaseEntityService from '@/shared/services/baseEntityService'
import {ICustomFieldOption} from "@/shared/models/custom-field-option.model";

export default class relationFreeFieldOption extends BaseEntityService<ICustomFieldOption> {
  private static instance: relationFreeFieldOption;

  private constructor () {
    super('api/relationms/api/relation-custom-field-options')
  }

  public static getInstance (): relationFreeFieldOption {
    if (!relationFreeFieldOption.instance) {
      return new relationFreeFieldOption()
    }
    return relationFreeFieldOption.instance
  }
}
