import BaseEntityService from '@/shared/services/baseEntityService'
import {IRelationPhone} from "@/shared/models/relation-phone.model";

export default class relationPhoneService extends BaseEntityService<IRelationPhone> {
  private static instance: relationPhoneService;

  private constructor () {
    super('api/relationms/api/relation-phones')
  }

  public static getInstance (): relationPhoneService {
    if (!relationPhoneService.instance) {
      return new relationPhoneService()
    }
    return relationPhoneService.instance
  }
}
