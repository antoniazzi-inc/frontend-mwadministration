import BaseEntityService from '@/shared/services/baseEntityService'
import { ITaxRate } from '@/shared/models/tax-rate.model'

export default class TaxRateService extends BaseEntityService<ITaxRate> {
  private static instance: TaxRateService;

  private constructor () {
    super('api/administrationms/api/tax-rates')
  }

  public static getInstance (): TaxRateService {
    if (!TaxRateService.instance) {
      return new TaxRateService()
    }
    return TaxRateService.instance
  }
}
