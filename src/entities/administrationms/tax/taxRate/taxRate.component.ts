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
import TaxRateService from '@/shared/services/taxRateService'
import { AxiosResponse } from 'axios'
import SimpleSearchComponent from '@/components/simpleSearch/simpleSearch.vue'
import { mixins } from 'vue-class-component'
import CommonHelpers from '@/shared/commonHelpers'
@Component({
  components: {
    'simple-search': SimpleSearchComponent,
    PaginationTableComponent
  }
})
export default class TaxRateComponent extends mixins(Vue, CommonHelpers) {
  $refs!: {
    paginationTable: PaginationTableComponent;
  }
  public active:boolean
  public taxRateService: any
  constructor () {
    super()
    this.active=false
    this.taxRateService = TaxRateService.getInstance()
  }

  public mounted () {
    this.active =true
  }
  public searchTaxRate (query: any) {
    const fields:any [] = [{
      mainOperator: 'and',
      children: [{
        key: 'country.enName',
        value: query,
        inBetweenOperator: '==',
        afterOperator: 'or',
        exactSearch: false
      }]
    }]
    if(parseInt(query) >= 0){
      fields[0].children.push({
          key: 'level',
          value: query,
          inBetweenOperator: '==',
          afterOperator: 'or',
          exactSearch: true
        },
        {
          key: 'rate',
          value: query,
          inBetweenOperator: '==',
          afterOperator: '',
          exactSearch: true
        })
    }
    const q: string = this.queryBuilder(fields)
    // @ts-ignore
    this.$refs.paginationTable.retrieveData('api/administrationms/api/tax-rates', undefined, q)
  }
  public editTaxRate (tax: any) {
    this.$router.push({ name: 'EditTaxRate', params: { id: tax.id } })
  }

  public removeTaxRate (tax: any) {
    this.taxRateService.delete(tax.id).then((resp: AxiosResponse) => {
      if (resp) {
        this.setAlert('taxRateRemoved', 'success')
      } else {
        this.setAlert('taxRateError', 'error')
      }
    })
  }
}
