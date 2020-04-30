import BaseEntityService from '@/shared/services/baseEntityService'
import { IExternalSystem } from '@/shared/models/externalSystem.model'

export default class ExternalSystemsService extends BaseEntityService<IExternalSystem> {
  private static instance: ExternalSystemsService;

  private constructor () {
    super('api/administrationms/api/external-systems')
  }

  public static getInstance (): ExternalSystemsService {
    if (!ExternalSystemsService.instance) {
      return new ExternalSystemsService()
    }
    return ExternalSystemsService.instance
  }
}
