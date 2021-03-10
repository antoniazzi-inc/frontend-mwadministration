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

import {Component, Vue, Watch} from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import CommonHelpers from '@/shared/commonHelpers'
import {ISearchableSelectConfig, SearchableSelectConfig} from "@/shared/models/SearchableSelectConfig";
import CartOrder from "@/shared/models/orderms/CartOrderModel";
import SearchableSelectComponent from "@/components/searchableSelect/searchableSelect.vue";
import InvoicePreviewComponent from "@/entities/orderms/order/newOrder/invoicePreview/invoicePreview.vue";
import OrderPaymentMethod from "@/shared/models/orderms/OrderPaymentMethodModel";

@Component({
  components: {
    SearchableSelectComponent,
    InvoicePreviewComponent
  },
  props: {
    cartOrder: Object,
    active: Boolean
  }
})
export default class Step3Component extends mixins(CommonHelpers, Vue) {
  public singleSelectConfigDeliveryMethod: ISearchableSelectConfig
  public selectedPaymentMethod: any
  public cartOrderCopy: any
  constructor () {
    super()
    this.singleSelectConfigDeliveryMethod = new SearchableSelectConfig('label',
      'labels.choosePaymentMethod', '', false,
      false, true, false, false, false, true)
    this.selectedPaymentMethod = null
    this.cartOrderCopy = new CartOrder()
  }
  @Watch('cartOrder', {immediate: true, deep: true})
  public cartOrderUpdate (newVal:any) {
    if(!newVal) return false
    this.cartOrderCopy = newVal
  }

  public mounted () {}

  public changePaymentMethod(method:any){
    if(!method) return false
    this.selectedPaymentMethod = method
    let payload = new OrderPaymentMethod(undefined, undefined, undefined, undefined, undefined, this.cartOrderCopy.orderCustomer?.relationId,
      this.selectedPaymentMethod.value.id, this.selectedPaymentMethod.value.administrativeCostsPercentage, this.selectedPaymentMethod.value.administrativeCostsFixed,
      this.selectedPaymentMethod.label, this.selectedPaymentMethod.value.detailsJson)
    this.$emit('onUpdate', {field: 'orderPaymentMethod', payload: payload})
  }
  public removePaymentMethod(method:any){
    this.selectedPaymentMethod = null
    this.$emit('onUpdate', {field: 'orderPaymentMethod', payload: undefined})
  }
  public validateStep(){
    return new Promise(resolve => {
      if(this.selectedPaymentMethod !== null) {
        resolve({status: true, msg: ''})
      } else {
        resolve({status: false, msg: this.$t('labels.pleaseSelectPaymentMethod')})
      }
    })
  }
}
