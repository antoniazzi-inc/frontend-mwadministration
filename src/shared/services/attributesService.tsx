import BaseEntityService from './baseEntityService';
import {IAttributeValue} from "@/shared/models/AttributeValueModel";

export default class  attributesService extends BaseEntityService<IAttributeValue> {
  private static instance: attributesService;

  private constructor() {
    super('/api/productms/api/attributes')
  }

  public static getInstance(): attributesService {
    if (!attributesService.instance) {
      return new attributesService()
    }
    return attributesService.instance
  }
}
