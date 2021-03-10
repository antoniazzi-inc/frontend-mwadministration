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
import AdministrationService from '@/shared/services/administrationService'
import SimpleSearchComponent from '@/components/simpleSearch/simpleSearch.vue'
import PaginationTableComponent from '@/components/paginationTable/paginationTable.vue'
import { AxiosResponse } from 'axios'
import { mixins } from 'vue-class-component'
import CommonHelpers from '@/shared/commonHelpers'
@Component({
  components: {
    'simple-search': SimpleSearchComponent,
    PaginationTableComponent
  }
})
export default class AdministrationsComponent extends mixins(Vue, CommonHelpers) {
  $refs!: {
    paginationTable: PaginationTableComponent;
  }

  public administrationService: any
  public active: boolean
  constructor () {
    super()
    this.active = false
    this.administrationService = AdministrationService.getInstance()
  }
  public mounted(){
    this.active = true
  }
  public searchAdministration (query: any) {
    let fields: any[] = []
    if(parseInt(query) >= 0){
     fields = [{
        mainOperator: 'or',
        children: [{
          key: 'id',
          value: query,
          inBetweenOperator: '==',
          afterOperator: 'or',
          exactSearch: true
        }]
      }]
    } else {
      fields = [{
        mainOperator: 'or',
        children: [{
          key: 'accessCode',
          value: query,
          inBetweenOperator: '==',
          afterOperator: '',
          exactSearch: false
        }]
      },{
        mainOperator: 'or',
        children: [{
          key: 'name',
          value: query,
          inBetweenOperator: '==',
          afterOperator: '',
          exactSearch: false
        }]
      }]
    }
    const q: string = this.queryBuilder(fields)
    // @ts-ignore
    this.$refs.paginationTable.retrieveData('api/administrationms/api/administrations', undefined, q)
  }
  public editAdministration (tax: any) {
    this.$router.push({ name: 'EditAdministration', params: { id: tax.id } })
  }

  public removeAdministration (administration: any) {
    this.administrationService.delete(administration.id).then((resp: AxiosResponse) => {
      if (resp) {
        this.setAlert('administrationRemoved', 'success')
      } else {
        this.setAlert('administrationError', 'error')
      }
    })
  }
}
