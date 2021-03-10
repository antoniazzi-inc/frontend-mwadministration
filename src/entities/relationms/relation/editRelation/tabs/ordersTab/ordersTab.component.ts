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

import {mixins} from 'vue-class-component'
import CommonHelpers from '@/shared/commonHelpers'
import {Component, Vue, Watch} from 'vue-property-decorator'
import CartOrdersService from "@/shared/services/orderms/CartOrdersService";
import PaginationTableComponent from "@/components/paginationTable/paginationTable.vue";
import {RelationEntity} from "@/shared/models/relationms/relationModel";
import {ISearchableSelectConfig, SearchableSelectConfig} from "@/shared/models/SearchableSelectConfig";

@Component({
  components: {
    PaginationTableComponent
  },
  props: {
    relation: Object,
    active: Boolean
  }
})
export default class OrdersTabComponent extends mixins(Vue, CommonHelpers) {
  public allOrders: any[]
  public cartOrderService: any
  public query: any
  public relationCopy: any
  public selectedPaymentMethod: any
  public searchableConfig: ISearchableSelectConfig

  constructor() {
    super()
    this.allOrders = []
    this.cartOrderService = CartOrdersService.getInstance()
    this.query = ''
    this.selectedPaymentMethod = null
    this.relationCopy = new RelationEntity()
    this.searchableConfig = new SearchableSelectConfig('label',
      'labels.selectPaymentMethod', '', true,
      false, false, false, false)
  }

  @Watch('relation', {immediate: true, deep: true})
  public populateOrders(newVal: any) {
    if (newVal && newVal.id) {
      this.relationCopy = newVal
      this.query = `orderCustomer.relationId==${newVal.id}`
    }
  }

  public paymentMethodChanged(method: any) {
    this.selectedPaymentMethod = method
  }
  public paymentMethodRemoved(method: any) {
    this.selectedPaymentMethod = null
  }
  public editOrder(order: any) {
    if (order && order.id)
      this.$router.push(`/orders/edit/${order.id}`)
  }

  public save(){
    //TODO Save Customer
  }
}
