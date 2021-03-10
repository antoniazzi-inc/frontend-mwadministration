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

import { Component, Vue } from 'vue-property-decorator'
import SimpleSearchComponent from '@/components/simpleSearch/simpleSearch.vue'
import PaginationTableComponent from '@/components/paginationTable/paginationTable.vue'
import { AxiosResponse } from 'axios'
import MasterTemplateService from '@/shared/services/masterTemplateService'
import { mixins } from 'vue-class-component'
import CommonHelpers from '@/shared/commonHelpers'
import MasterTemplate, {IMasterTemplate} from "@/shared/models/orderms/MasterTemplateModel";
import HtmlEditorComponent from "@/components/htmlEditor/htmlEditor.vue";
@Component({
  components: {
    HtmlEditorComponent
  },
  beforeRouteEnter (to, from, next) {
    next((vm: any) => {
      if (to.params.id) {
        vm.retreiveItem(to.params.id)
      }
    })
  }
})
export default class NewMasterTemplateComponent extends mixins(Vue, CommonHelpers) {
  public masterTemplateService: any
  public masterTemplate: IMasterTemplate
  constructor () {
    super()
    this.masterTemplate= new MasterTemplate()
    this.masterTemplateService = MasterTemplateService.getInstance()
  }
  public mounted(){
  }
  public retreiveItem(id:any){
    if(!id) return
    this.masterTemplateService.get(id).then((resp:AxiosResponse) => {
      if(resp && resp.data) {
        this.masterTemplate = resp.data
      }
    })
  }

  public updateMasterTemplate(content:any){
    this.masterTemplate.html = content
  }

  public saveMasterTemplate(){
    if(this.masterTemplate.id) {
      this.masterTemplateService.put(this.masterTemplate).then((resp:AxiosResponse) =>{
        if(resp && resp.data) {
          this.setAlert('masterTemplateUpdated', 'success')
          this.masterTemplate = resp.data
        }
      })
    } else {
      this.masterTemplateService.post(this.masterTemplate).then((resp:AxiosResponse) =>{
        if(resp && resp.data) {
          this.setAlert('masterTemplateCreated', 'success')
          this.masterTemplate = resp.data
        }
      })
    }
  }
}
