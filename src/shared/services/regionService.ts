import BaseEntityService from '@/shared/services/baseEntityService'
import { IRegion } from '@/shared/models/administrationms/region.model'

export default class RegionService extends BaseEntityService<IRegion> {
  private static instance: RegionService;

  private constructor () {
    super('api/administrationms/api/regions')
  }

  public static getInstance (): RegionService {
    if (!RegionService.instance) {
      return new RegionService()
    }
    return RegionService.instance
  }
}
