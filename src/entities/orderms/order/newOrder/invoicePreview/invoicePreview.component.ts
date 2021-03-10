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
import {AxiosResponse} from 'axios'
import {mixins} from 'vue-class-component'
import CommonHelpers from '@/shared/commonHelpers'
import CartOrdersService from "@/shared/services/orderms/CartOrdersService";
import CartOrder, {ICartOrder} from "@/shared/models/orderms/CartOrderModel";
import {RelationAddress} from "@/shared/models/relationms/relation-address.model";
import OrderCustomer from "@/shared/models/orderms/OrderCustomerModel";

@Component({
  components: {},
  props: {
    cartOrder: Object,
    active: Boolean
  }
})
export default class InvoicePreviewComponent extends mixins(CommonHelpers, Vue) {
  public cartOrderCopy: ICartOrder
  public customerCountry: any
  public cartOrderService: any
  public invoicePreview: any
  public allTaxes: any[]

  constructor() {
    super()
    this.cartOrderCopy = new CartOrder(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined,
      undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, new RelationAddress(), new RelationAddress(), undefined, new OrderCustomer())
    this.customerCountry = ''
    this.invoicePreview = {
      totalProducts: 0,
      totalProductsNetto: 0,
      totalDiscounts: 0,
      noShippingCost: false,
      totalProductsGross: 0,
      grandTotal: 0,
      totalMoneyVoucher: 0,
      totalPointsVoucher: 0,
      totalMinutesVoucher: 0,
      totalTaxesMap: {}
    }
    this.allTaxes = []
    this.cartOrderService = CartOrdersService.getInstance()
  }

  @Watch('cartOrder.orderLines', {immediate: false, deep: true})
  public cartOrderUpdate(newVal: any) {
    if(newVal && newVal.length && this.$props.active)
      this.updateCart(this.$props.cartOrder)
  }

  @Watch('cartOrder.orderDiscountLines', {immediate: false, deep: true})
  public cartOrderDiscounts(newVal: any) {
    if(newVal && newVal.length && this.$props.active)
      this.updateCart(this.$props.cartOrder)
  }
  @Watch('active', {immediate: false, deep: true})
  public updateActive(newVal: any) {
    if(newVal)
      this.updateCart(this.$props.cartOrder)
  }

  @Watch('cartOrder', {immediate: false, deep: true})
  public updateCartOrder(newVal: any) {
    if (!newVal) return false
    this.cartOrderCopy = newVal
  }

  public mounted() {
  }

  public getCustomerRelationAddress() {
    if (this.cartOrderCopy.customerBillingAddress) {
      let addr = this.cartOrderCopy.customerBillingAddress
      if(addr.countryId)
      this.customerCountry = this.getCountryById(addr.countryId).enName
      return `${addr.street ? addr.street : ''} ${addr.houseNumber ? addr.houseNumber : ''} ${addr.city ? addr.city : ''}
      ${addr.postalCode ? addr.postalCode : ''} ${addr.countryId ? this.getCountryById(addr.countryId).enName : ''}`
    }
  }

  public getCustomerRelationAddressPart1() {
    if (this.cartOrderCopy.customerBillingAddress) {
      let addr = this.cartOrderCopy.customerBillingAddress
      return `${addr.street ? addr.street : ''} ${addr.houseNumber ? addr.houseNumber : ''}`
    }
  }

  public getCustomerRelationAddressPart2() {
    if (this.cartOrderCopy.customerBillingAddress) {
      let addr = this.cartOrderCopy.customerBillingAddress
      return `${addr.postalCode ? addr.postalCode : ''} ${addr.city ? addr.city : ''}`
    }
  }

  public getAttributesNames(orderLine:any){
    let names = '';
    let self = this;
    if(orderLine.orderProduct && orderLine.orderProduct.orderProductAttributeValues && orderLine.orderProduct.orderProductAttributeValues.length){
      orderLine.orderProduct.orderProductAttributeValues.forEach((attrValue:any) => {
        let positiveNumber = attrValue.attributeValuePrice > 0 ? '+' : '';
        names += ' ' + attrValue.attributeName + ': ' + attrValue.attributeValueName + ' '  + (attrValue.attributeValuePrice > 0 ? '(' + positiveNumber + ' ' + attrValue.attributeValuePrice + ' ' + this.cartOrderCopy.currency +')' : '')
      });
    }
    return names;
  }

  public getDeliveryMethodName(orderLine:any){
    if(orderLine.orderLineDeliveryMethod) {
      return orderLine.orderLineDeliveryMethod.name
    }
    return ''
  }

  public getTaxes(){
    this.allTaxes = [];
    for (var property in this.invoicePreview.totalTaxesMap) {
      if (this.invoicePreview.totalTaxesMap.hasOwnProperty(property)) {
        this.allTaxes.push({
          taxName: property,
          value: this.invoicePreview.totalTaxesMap[property],
          currency: this.invoicePreview.currency
        })
      }
    }
  }

  public updateCart(cartOrder:any){
    this.cartOrderService.updateCart(cartOrder).then((resp:AxiosResponse) => {
      if(resp && resp.data) {
        this.invoicePreview = resp.data
        this.getTaxes()
        if(resp.data.cartOrder) this.cartOrderCopy = resp.data.cartOrder
      }
    })
  }

  public getPromotionDiscount(item:any) {
    if(item.percentage) {
      return '-' + item.percentage + '%'
    } else if(item.fixed) {
      return  '-' + item.fixed + this.cartOrderCopy.currency
    } else if(item.noShipping) {
      return this.$t('labels.noShipping')
    } else if(item.freeItemsJson) {
      return this.$t('labels.freeItems')
    }
  }

}
