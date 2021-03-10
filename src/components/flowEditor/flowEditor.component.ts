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

import {Component, Vue, Watch} from 'vue-property-decorator'
import {mixins} from 'vue-class-component'
import CommonHelpers from '@/shared/commonHelpers'
import SimpleFlowChart from '@/components/flowEditor/simpleFlowchart.vue'

@Component({
  components: {
    'simple-flowchart': SimpleFlowChart
  },
  props: {
    service: Object,
  }
})
export default class FlowEditorComponent extends mixins(Vue, CommonHelpers) {
  public scene: any;
  public isLoading: boolean;
  public adding: boolean;
  public addEvent: any;

  public starts: any;
  public actions: any;
  public conditions: any;

  protected props = {
    table: String,
    active: Boolean
  }

  constructor() {
    super()
    this.scene = {
        centerX: 1, //1024,
        centerY: 1, //140,
        scale: 1,
        nodes: this.generateNodes(),
        links: this.generateLinks()
    };
    this.adding = false;
    this.addEvent = {
      e: null,
      type: '',
      subtype: '',
      name: ''
    };
    this.starts = [
      { id: 'start_form', label: 'filled in form'},
      { id: 'start_purchase', label: 'purchased a product'}
    ];
    this.conditions = [
      { id: 'cond_group', label: 'member of group'},
      { id: 'cond_freefield', label: 'free field value'}
    ];
    this.actions = [
      { id: 'action_mail', label: 'send a mail'},
      { id: 'action_notify', label: 'notify me'}
    ];
    this.isLoading = true
  }

  public canvasClick(e: any) {
    //console.log('canvas Click, event:', e)
  }

  private generateLinks() {
    let links = [];
    let link = {
      id: 1,
      from: 6,
      to: 4,
      type: 'output'
    };
    links.push(link);
    link = {
      id: 2,
      from: 6,
      to: 7,
      type: 'output'
    };
    links.push(link);
    return links;
  }

  private generateNodes() {
    let nodes = [];
    let node = {
      id: 4,
      x: 100,
      y: 200,
      type: 'action',
      label: 'Geen idee hiero',
    };
    nodes.push(node);
    node = {
      id: 6,
      x: 100,
      y: 50,
      type: 'start',
      label: 'test1',
    };
    nodes.push(node);
    node = {
      id: 7,
      x: 400,
      y: 200,
      type: 'condition',
      label: 'What to do here? I dont know',
    };
    nodes.push(node);
    return nodes;
  }

  public startAddNode(e: any) {
    this.addEvent.e = e;
    this.adding = true;
    this.openAddModal();
  }

  public nodeClick(id: any) {
  }

  public nodeDelete(id: any) {
    console.log('node delete', id);
  }

  public nodeEdit(id: any) {
    // load & prepare data
    this.openEditModal();
  }

  public linkBreak(id: any) {
    console.log('link removed', id);
  }

  public linkAdded(link: any) {
    console.log('new link added:', link);
  }

  public closeAddModal() {
    // @ts-ignore
    $(this.$refs.addModal).modal('hide')
  }

  public openAddModal() {
    // @ts-ignore
    $(this.$refs.addModal).modal('show')
  }

  public closeEditModal() {
    // @ts-ignore
    $(this.$refs.editModal).modal('hide')
  }

  public openEditModal() {
    // @ts-ignore
    $(this.$refs.editModal).modal('show')
  }

  public saveExistingNode() {
    this.closeEditModal()
  }

  public saveNewNode() {

    if (this.adding) {

      console.log(this.addEvent.e);

      // triggered when canvas is double-clicked or output port is clicked
      let x = this.addEvent.e.clientX
      let y = this.addEvent.e.clientY

      //x = this.addEvent.e.screenX
      //y = this.addEvent.e.screenY

      let maxID = Math.max(0, ...this.scene.nodes.map((link: any) => {
        return link.id
      }))

      let adj_x = this.scene.centerX
      let adj_y = this.scene.centerY

      this.closeAddModal()

      this.scene.nodes.push({
        id: maxID + 1,
        x: x, // - 1080,
        y: y, // - 400,
        type: this.addEvent.type,
        label: this.addEvent.name // `test${maxID + 1}`,
      })
    }
  }

}
