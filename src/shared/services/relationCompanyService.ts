import BaseEntityService from '@/shared/services/baseEntityService'
import { ICompany } from '@/shared/models/relationms/company.model'

export default class RelationCompanyService extends BaseEntityService<ICompany> {
  private static instance: RelationCompanyService;

  private constructor () {
    super('api/relationms/api/relation-company')
  }

  public static getInstance (): RelationCompanyService {
    if (!RelationCompanyService.instance) {
      return new RelationCompanyService()
    }
    return RelationCompanyService.instance
  }
}
