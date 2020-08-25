import BaseEntityService from '@/shared/services/baseEntityService'
import { ITagEntity } from '@/shared/models/administrationms/tagModel'
import { ITimeZone } from '@/shared/models/administrationms/time-zone.model'
import { ICountry } from '@/shared/models/administrationms/country.model'

export default class CountryService extends BaseEntityService<ICountry> {
  private static instance: CountryService;

  private constructor () {
    super('api/administrationms/api/countries')
  }

  public static getInstance (): CountryService {
    if (!CountryService.instance) {
      return new CountryService()
    }
    return CountryService.instance
  }
}
