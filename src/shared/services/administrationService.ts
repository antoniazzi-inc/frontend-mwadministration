import BaseEntityService from '@/shared/services/baseEntityService'
import { IAdministration } from '@/shared/models/administrationms/administrationModel'

export default class AdministrationService extends BaseEntityService<IAdministration> {
  private static instance: AdministrationService;

  private constructor () {
    super('api/administrationms/api/administrations')
  }

  public static getInstance (): AdministrationService {
    if (!AdministrationService.instance) {
      return new AdministrationService()
    }
    return AdministrationService.instance
  }

  public async createAdministration (entity: any) {
    return this.postRequest('api/administrations', entity)
  }
}
