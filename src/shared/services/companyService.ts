import BaseEntityService from '@/shared/services/baseEntityService'
import { ICompany } from '@/shared/models/relationms/company.model'

export default class CompanyService extends BaseEntityService<ICompany> {
  private static instance: CompanyService;

  private constructor () {
    super('api/relationms/api/companies')
  }

  public static getInstance (): CompanyService {
    if (!CompanyService.instance) {
      return new CompanyService()
    }
    return CompanyService.instance
  }
}
