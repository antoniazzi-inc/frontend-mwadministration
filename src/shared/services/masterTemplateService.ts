import BaseEntityService from '@/shared/services/baseEntityService'
import { IMasterTemplate } from '@/shared/models/orderms/MasterTemplateModel'

export default class MasterTemplateService extends BaseEntityService<IMasterTemplate> {
  private static instance: MasterTemplateService;

  private constructor () {
    super('api/orderms/api/master-templates')
  }

  public static getInstance (): MasterTemplateService {
    if (!MasterTemplateService.instance) {
      return new MasterTemplateService()
    }
    return MasterTemplateService.instance
  }
}
