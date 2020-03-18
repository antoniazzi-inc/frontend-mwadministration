import BaseEntityService from '@/shared/services/baseEntityService'
import { ITaxRule } from '@/shared/models/tax-rule.model'

export default class TaxRuleService extends BaseEntityService<ITaxRule> {
  private static instance: TaxRuleService;

  private constructor () {
    super('api/administrationms/api/tax-rules')
  }

  public static getInstance (): TaxRuleService {
    if (!TaxRuleService.instance) {
      return new TaxRuleService()
    }
    return TaxRuleService.instance
  }
}
