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
import TaxRuleService from '@/shared/services/taxRuleService'
import { AxiosResponse } from 'axios'
import { mixins } from 'vue-class-component'
import CommonHelpers from '@/shared/commonHelpers'
@Component({
  components: {
    'simple-search': SimpleSearchComponent,
    PaginationTableComponent
  }
})
export default class TaxRuleComponent extends mixins(Vue, CommonHelpers) {
  $refs!: {
    paginationTable: PaginationTableComponent;
  }
  public active:boolean
  public taxRuleService: any
  constructor () {
    super()
    this.active = false
    this.taxRuleService = TaxRuleService.getInstance()
  }

  public mounted () {
    this.active = true
  }
  public searchTaxRule (q: any) {}
  public editTaxRule (tax: any) {
    this.$router.push({ name: 'EditTaxRule', params: { id: tax.id } })
  }

  public removeTaxRule (tax: any) {
    this.taxRuleService.delete(tax.id).then((resp: AxiosResponse) => {
      if (resp) {
        this.setAlert('taxRuleRemoved', 'success')
      } else {
        this.setAlert('taxRuleError', 'error')
      }
    })
  }
}
