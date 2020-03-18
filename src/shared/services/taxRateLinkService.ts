import BaseEntityService from '@/shared/services/baseEntityService'
import { ITaxRateLink } from '@/shared/models/tax-rate-link.model'

export default class TaxRateLinkService extends BaseEntityService<ITaxRateLink> {
  private static instance: TaxRateLinkService;

  private constructor () {
    super('api/administrationms/api/tax-rate-links')
  }

  public static getInstance (): TaxRateLinkService {
    if (!TaxRateLinkService.instance) {
      return new TaxRateLinkService()
    }
    return TaxRateLinkService.instance
  }
}
