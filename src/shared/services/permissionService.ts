import BaseEntityService from '@/shared/services/baseEntityService'
import { IRole } from '@/shared/models/role.model'

export default class PermissionsService extends BaseEntityService<IRole> {
  private static instance: PermissionsService;

  private constructor () {
    super('api/relationms/api/permissions')
  }

  public static getInstance (): PermissionsService {
    if (!PermissionsService.instance) {
      return new PermissionsService()
    }
    return PermissionsService.instance
  }
}
