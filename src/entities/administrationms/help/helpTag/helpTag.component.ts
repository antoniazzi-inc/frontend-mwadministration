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
import HelpTagService from '@/shared/services/helpTagService'
import { mixins } from 'vue-class-component'
import CommonHelpers from '@/shared/commonHelpers'
@Component({
  components: {
    'simple-search': SimpleSearchComponent,
    PaginationTableComponent
  }
})
export default class HelpTagComponent extends mixins(Vue, CommonHelpers) {
  $refs!: {
    paginationTable: PaginationTableComponent;
  }
  public active:boolean
  public helpTagService: any
  constructor () {
    super()
    this.active=false
    this.helpTagService = HelpTagService.getInstance()
  }
  public mounted(){
    this.active = true
  }
  public searchHelpTag (query: string) {
    const fields: string[] = ['helpTagLanguages.name']
    const q: string = this.makeSimpleSearchQuery(fields, query)
    // @ts-ignore
    this.$refs.paginationTable.retrieveData('api/administrationms/api/help-tags', undefined, q)
  }

  public editHelpTag (tag: any) {
    this.$router.push({ name: 'EditHelpTag', params: { id: tag.id } })
  }

  public copyHelpTag (tag: any) {
    tag.id = undefined
    tag.helpTagLanguages.forEach((lang: any, ind: number) => {
      tag.helpTagLanguages[ind].id = undefined
      tag.helpTagLanguages[ind].name = tag.helpTagLanguages[ind].name + ' ' + this.$t('labels.copy')
      tag.helpTagLanguages[ind].intro = tag.helpTagLanguages[ind].intro + ' ' + this.$t('labels.copy')
    })
    this.helpTagService.post(tag).then((resp: AxiosResponse) => {
      if (resp) {
        this.setAlert('helpTagCreated', 'success')
      } else {
        this.setAlert('helpTagError', 'error')
      }
    })
  }

  public deleteHelpTag (tag: any) {
    this.helpTagService.delete(tag.id).then((resp: AxiosResponse) => {
      if (resp) {
        this.setAlert('helpTagRemoved', 'success')
      } else {
        this.setAlert('helpTagError', 'error')
      }
    })
  }
}
