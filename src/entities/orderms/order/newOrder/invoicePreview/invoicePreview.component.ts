import {Component, Vue, Watch} from 'vue-property-decorator'

import PaginationTableComponent from '@/components/paginationTable/paginationTable.vue'
import {AxiosResponse} from 'axios'
import {mixins} from 'vue-class-component'
import CommonHelpers from '@/shared/commonHelpers'
import SimpleSearchComponent from '@/components/simpleSearch/simpleSearch.vue'
import {ISearchableSelectConfig, SearchableSelectConfig} from '@/shared/models/SearchableSelectConfig'
import SearchableSelectComponent from '@/components/searchableSelect/searchableSelect.vue'
import complexSearchComponent from '@/entities/relationms/relation/complexSearch/complexSearch.vue'
import {productType} from "@/shared/models/productms/ProductModel";
import CartOrdersService from "@/shared/services/orderms/CartOrdersService";
import CartOrder, {ICartOrder} from "@/shared/models/orderms/CartOrderModel";
import {RelationAddress} from "@/shared/models/relationms/relation-address.model";
import OrderCustomer from "@/shared/models/orderms/OrderCustomerModel";
import {order} from "@/shared/tabelsDefinitions";

@Component({
  components: {},
  props: {
    cartOrder: Object
  }
})
export default class InvoicePreviewComponent extends mixins(CommonHelpers, Vue) {
  public cartOrderCopy: ICartOrder
  public customerCountry: any
  public allTaxes: any[]

  constructor() {
    super()
    this.cartOrderCopy = new CartOrder(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined,
      undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, new RelationAddress(), new RelationAddress(), undefined, new OrderCustomer())
    this.customerCountry = ''
    this.allTaxes = []
  }

  @Watch('cartOrder', {immediate: true, deep: true})
  public cartOrderUpdate(newVal: any) {
    if (!newVal) return false
    this.cartOrderCopy = newVal
  }

  public mounted() {
  }
  public getCustomerRelationAddress() {
    if(this.cartOrderCopy.customerBillingAddress) {
      let addr = this.cartOrderCopy.customerBillingAddress
      if(addr.countryId)
      this.customerCountry = this.getCountryById(addr.countryId).enName
      return `${addr.street ? addr.street : ''} ${addr.houseNumber ? addr.houseNumber : ''} ${addr.city ? addr.city : ''}
      ${addr.postalCode ? addr.postalCode : ''} ${addr.countryId ? this.getCountryById(addr.countryId).enName : ''}`
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
    /*for (var property in this.invoicePreview.totalTaxesMap) {
      if (this.invoicePreview.totalTaxesMap.hasOwnProperty(property)) {
        this.allTaxes.push({
          taxName: property,
          value: this.invoicePreview.totalTaxesMap[property],
          currency: this.invoicePreview.currency
        })
      }
    }*/
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
