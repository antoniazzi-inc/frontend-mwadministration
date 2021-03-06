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
import PaginationTableComponent from '@/components/paginationTable/paginationTable.vue'
import SearchableSelectComponent from '@/components/searchableSelect/searchableSelect.vue'
import RelationFreeFieldService from '@/shared/services/relationFreeFieldService'
import { AxiosResponse } from 'axios'
import { mixins } from 'vue-class-component'
import CommonHelpers from '@/shared/commonHelpers'
import SimpleSearchComponent from '@/components/simpleSearch/simpleSearch.vue'
import freeFieldService from '@/shared/services/freeFieldService'

@Component({
  components: {
    PaginationTableComponent,
    SearchableSelectComponent,
    SimpleSearch: SimpleSearchComponent
  }
})
export default class RelationFreeFieldsComponent extends mixins(CommonHelpers, Vue) {
  public relationFreeFieldService: any
  public active:boolean
  constructor () {
    super()
    this.active = false
    this.relationFreeFieldService = freeFieldService.getInstance()
  }
  public mounted(){
    this.active = true
  }

  public searchFreeField (query: any) {
    const fields: string[] = ['code']
    const q: string = this.makeSimpleSearchQuery(fields, query)
    // @ts-ignore
    this.$refs.paginationTable.retrieveData('api/relationms/api/custom-fields', undefined, q)
  }

  public editFreeField (field: any) {
    this.$router.push('/relations-free-fields/new/' + field.id)
  }

  public deleteFreeField (field: any) {
    if (field && field.id) {
      this.relationFreeFieldService.delete(field.id).then((resp: AxiosResponse) => {
        if (resp) {
          this.setAlert('freeFieldRemoved', 'success')
        } else {
          this.setAlert('freeFieldRemoveError', 'error')
        }
        // @ts-ignore
        this.$refs.paginationTable.retrieveData('api/relationms/api/custom-fields', undefined, undefined)
      })
    }
  }
}
