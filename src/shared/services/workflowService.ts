import BaseEntityService from '@/shared/services/baseEntityService'
import { IWorkflow } from '@/shared/models/workflowms/workflow.model'

export default class WorkflowService extends BaseEntityService<IWorkflow> {
  private static instance: WorkflowService;

  private constructor () {
    super('api/workflowms/api/workflows')
  }

  public static getInstance (): WorkflowService {
    if (!WorkflowService.instance) {
      return new WorkflowService()
    }
    return WorkflowService.instance
  }
}
