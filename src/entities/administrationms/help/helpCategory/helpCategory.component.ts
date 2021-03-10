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
import HelpCategoryService from '@/shared/services/helpCategoryService'
import { mixins } from 'vue-class-component'
import CommonHelpers from '@/shared/commonHelpers'
@Component({
  components: {
    'simple-search': SimpleSearchComponent,
    PaginationTableComponent
  }
})
export default class HelpCategoryComponent extends mixins(Vue, CommonHelpers) {
  $refs!: {
    paginationTable: PaginationTableComponent;
  }
  public active:boolean
  public helpCategoryService = HelpCategoryService.getInstance()
  constructor () {
    super()
    this.active = false
  }

  public mounted () {
    this.retrieveData()
    this.active = true
  }

  public retrieveData () {

  }

  public resetHelpCategory () {}
  public searchHelpCategory (query: string) {
    const fields: string[] = ['helpCategoryLanguages.name']
    const q: string = this.makeSimpleSearchQuery(fields, query)
    // @ts-ignore
    this.$refs.paginationTable.retrieveData('api/administrationms/api/help-categories', undefined, q)
  }

  public editHelpCategory (cat: any) {
    this.$router.push({ name: 'EditHelpCategory', params: { id: cat.id } })
  }

  public deleteHelpCategory (cat: any) {
    this.helpCategoryService.delete(cat.id).then((resp: AxiosResponse) => {
      if (resp) {
        this.setAlert('helpCategoryRemoved', 'success')
      } else {
        this.setAlert('errorHelpCategory', 'error')
      }
    })
  }
}
