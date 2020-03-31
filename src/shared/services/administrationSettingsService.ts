import BaseEntityService from '@/shared/services/baseEntityService'
import {IAdministrationSettings} from "@/shared/models/administrationSettingsModel";

export default class AdministrationSettingsService extends BaseEntityService<IAdministrationSettings> {
  private static instance: AdministrationSettingsService;

  private constructor () {
    super('api/administrationms/api/administration-settingss')
  }

  public static getInstance (): AdministrationSettingsService {
    if (!AdministrationSettingsService.instance) {
      return new AdministrationSettingsService()
    }
    return AdministrationSettingsService.instance
  }
}
