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
import { AxiosResponse } from 'axios'
import SimpleSearchComponent from '@/components/simpleSearch/simpleSearch.vue'
import RegionService from '@/shared/services/regionService'
import { mixins } from 'vue-class-component'
import CommonHelpers from '@/shared/commonHelpers'
@Component({
  components: {
    'simple-search': SimpleSearchComponent,
    PaginationTableComponent
  }
})
export default class RegionComponent extends mixins(Vue, CommonHelpers) {
  $refs!: {
    paginationTable: PaginationTableComponent;
  }
  public active:boolean
  public regionService: any
  constructor () {
    super()
    this.active = false
    this.regionService = RegionService.getInstance()
  }
public mounted(){
    this.active = true
}
  public searchRegion (q: any) {}
  public editRegion (tax: any) {
    this.$router.push({ name: 'EditRegion', params: { id: tax.id } })
  }

  public removeRegion (tax: any) {
    this.regionService.delete(tax.id).then((resp: AxiosResponse) => {
      if (resp) {
        this.setAlert('regionRemoved', 'success')
      } else {
        this.setAlert('regionError', 'error')
      }
    })
  }
}
