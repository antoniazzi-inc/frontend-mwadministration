import { mixins } from 'vue-class-component'
import CommonHelpers from '@/shared/commonHelpers'
import { Component, Vue } from 'vue-property-decorator'
import { IWorkflow, Workflow } from '@/shared/models/workflowms/workflow.model'
import FlowEditorComponent from '@/components/flowEditor/flowEditor.vue'

@Component({
  components: {
    'flow-editor': FlowEditorComponent
  },
  beforeRouteEnter (to, from, next) {
    next((vm: any) => {
      if (to.params.id) {
        vm.retrieveItem(to.params.id)
      }
    })
  }
})

export default class EditWorkflowComponent extends mixins(Vue, CommonHelpers) {
  public workflow: any;

  constructor () {
    super()
    this.workflow = new Workflow()
  }

  public retrieveItem (id: number) {
    // this.relationService.get(id).then((resp: AxiosResponse) => {
    //   this.relation = resp.data
    // })
    this.workflow = new Workflow()
    this.workflow.name = 'My Test Workflow'
  }

}
