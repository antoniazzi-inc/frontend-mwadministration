import BaseEntityService from '@/shared/services/baseEntityService'
import { IRole } from '@/shared/models/administrationms/role.model'

export default class RoleService extends BaseEntityService<IRole> {
  private static instance: RoleService;

  private constructor () {
    super('api/relationms/api/roles')
  }

  public static getInstance (): RoleService {
    if (!RoleService.instance) {
      return new RoleService()
    }
    return RoleService.instance
  }
}
