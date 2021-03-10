/*
 *
 *  * Copyright 2018-2021 Antoniazzi Holding BV
 *  *
 *  * This program is free software: you can redistribute it and/or modify it
 *  * under the terms of the GNU General Public License as published by
 *  * the Free Software Foundation, either version 3 of the License,
 *  * or (at your option) any later version.
 *  *
 *  * This program is distributed in the hope that it will be useful,
 *  * but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 *  * GNU General Public License for more details.
 *  *
 *  * You should have received a copy of the GNU General Public License
 *  * along with this program. If not, see <https://www.gnu.org/licenses/>.
 *
 */

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
