import BaseEntityService from '@/shared/services/baseEntityService'
import { ITagEntity } from '@/shared/models/administrationms/tagModel'
import { ITimeZone } from '@/shared/models/administrationms/time-zone.model'

export default class TimeZoneService extends BaseEntityService<ITimeZone> {
  private static instance: TimeZoneService;

  private constructor () {
    super('api/administrationms/api/time-zones')
  }

  public static getInstance (): TimeZoneService {
    if (!TimeZoneService.instance) {
      return new TimeZoneService()
    }
    return TimeZoneService.instance
  }
}
