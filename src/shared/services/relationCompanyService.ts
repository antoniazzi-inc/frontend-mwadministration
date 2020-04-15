import BaseEntityService from '@/shared/services/baseEntityService'
import {ICompany} from "@/shared/models/company.model";

export default class relationCompanyService extends BaseEntityService<ICompany> {
  private static instance: relationCompanyService;

  private constructor () {
    super('api/relationms/api/relation-company')
  }

  public static getInstance (): relationCompanyService {
    if (!relationCompanyService.instance) {
      return new relationCompanyService()
    }
    return relationCompanyService.instance
  }
}
