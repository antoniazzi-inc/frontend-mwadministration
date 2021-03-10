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
    'simple-search': SimpleSearchComponent,
    PaginationTableComponent,
    HtmlEditorComponent
  }
})
export default class MasterTemplateComponent extends mixins(Vue, CommonHelpers) {
  $refs!: {
    paginationTable: PaginationTableComponent;
    masterTemplateModal: HTMLElement;
  }
  public active:boolean
  public masterTemplateService: any
  public masterTemplate: IMasterTemplate
  constructor () {
    super()
    this.active=false
    this.masterTemplate= new MasterTemplate()
    this.masterTemplateService = MasterTemplateService.getInstance()
  }
  public mounted(){
    this.active = true
  }
  public searchMasterTemplate (query: string) {
    const fields: string[] = ['name']
    const q: string = this.makeSimpleSearchQuery(fields, query)
    // @ts-ignore
    this.$refs.paginationTable.retrieveData('api/orderms/api/master-templates', undefined, q)
  }

  public editMasterTemplate (masterTemplate: any) {
    this.$router.push({ name: 'NewMasterTemplates', params: { id: masterTemplate.id } })
  }

  public deleteMasterTemplate (masterTemplate: any) {
    this.masterTemplateService.delete(masterTemplate.id).then((resp: AxiosResponse) => {
      if (resp) {
        this.setAlert('masterTemplateRemoved', 'success')
      } else {
        this.setAlert('helpTagError', 'error')
      }
    })
  }
}
