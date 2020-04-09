import BaseEntityService from '@/shared/services/baseEntityService'
import {IRelationCustomField} from "@/shared/models/relation-custom-field.model";

export default class RelationFreeFieldService extends BaseEntityService<IRelationCustomField> {
  private static instance: RelationFreeFieldService;

  private constructor () {
    super('api/relationms/api/relation-custom-fields')
  }

  public static getInstance (): RelationFreeFieldService {
    if (!RelationFreeFieldService.instance) {
      return new RelationFreeFieldService()
    }
    return RelationFreeFieldService.instance
  }
}
