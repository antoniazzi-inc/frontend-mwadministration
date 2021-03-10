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

import {mixins} from "vue-class-component";
import CommonHelpers from "@/shared/commonHelpers";
import {Component, Vue, Watch} from "vue-property-decorator";
import SearchableSelectComponent from "@/components/searchableSelect/searchableSelect.vue";
import {ISearchableSelectConfig, SearchableSelectConfig} from "@/shared/models/SearchableSelectConfig";
import {orderOperators} from "@/shared/complexSearchOperators";
import flatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'
import moment from "moment";
import {DATE_FORMAT, INSTANT_FORMAT} from "@/shared/filters";
@Component({
  components:{
    SearchableSelectComponent,
    flatPickr
  }, props: {
    query: [Object,Array,String]
  }
})
export default class OrderComplexSearchComponent extends mixins(CommonHelpers, Vue) {
  public initialValue: number|null
  public selectedOperator: any
  public operatorsSingleSelectConfig: ISearchableSelectConfig
  public productSingleSelectConfig: ISearchableSelectConfig
  public productAttributeSingleSelectConfig: ISearchableSelectConfig
  public allOperators: any
  public allProductAttributes: any
  public selectedProduct: any
  public selectedProductAttribute: any
  public dateConfig: any
  public dateValue: any
  public searchQuery: any
  public dateValueForQuery: any
  public subSearchQuery: any
  public dateSearchQuery: any
  public msName: any
  public appliedQuery: any
  constructor() {
    super();
    this.initialValue = null
    this.dateValue = null
    this.selectedOperator = null
    this.selectedProduct = null
    this.selectedProductAttribute = null
    this.allOperators = orderOperators
    this.allProductAttributes = []
    this.operatorsSingleSelectConfig = new SearchableSelectConfig('label',
      'labels.selectOperator', '', false,
      false, false, false, false, false, true)
    this.productAttributeSingleSelectConfig = new SearchableSelectConfig('label',
      'labels.selectProductAttribute', '', false,
      false, true, false, false, false, true)
    this.productSingleSelectConfig = new SearchableSelectConfig('label',
      'labels.selectProduct', '', false,
      false, true, false, false, false, true)
    this.dateConfig = {
      wrap: false,
      altInput: false,
      dateFormat: 'd-m-Y'
    }
    this.searchQuery = 'cartOrders.orderLines.orderProduct.productId=={productId}'
    this.subSearchQuery = 'cartOrders.orderLines.orderProduct.orderProductAttributeValues.attributeValueId=in={attributeValueId}'
    this.dateSearchQuery = 'cartOrders.createdOn'
    this.appliedQuery = ''
    this.dateValueForQuery = ''
    this.msName = 'ORDERMS'
  }
  public mounted(){
    if(this.$props.query){
      const preFillData = this.checkIfRuleExists('orders', this.$props.query)
      if(preFillData && preFillData.value) {
        this.selectedOperator = preFillData.value.operator
        this.selectedProduct = preFillData.value.attribute
        this.selectedProductAttribute = preFillData.value.subAttribute
        if(!this.selectedProductAttribute){
          this.allProductAttributes = []
        }
        this.dateValue = preFillData.value.value
      }
    }
  }
  @Watch('value', {immediate: true, deep: true})
  public updateVal(newVal:any){
    this.dateValue = newVal
  }
  @Watch('dateValue', {immediate: true, deep: true})
  public updateInitialValue(newVal:any){
    if(newVal) {
      if (this.selectedOperator && (this.selectedOperator.labelValue.match('before') || this.selectedOperator.labelValue.match('after'))) {
        this.dateValueForQuery = moment(this.dateValue, 'DD-MM-YYYY').format(INSTANT_FORMAT)
      }
    }
      this.updateQuery()
      this.$emit('input', {attribute: this.selectedProduct, subAttribute: this.selectedProductAttribute, operator: this.selectedOperator, value: newVal, msName: this.msName, searchQuery:this.appliedQuery})
  }
  public addOperator(e:any){
    this.selectedOperator = e
    this.updateQuery()
    this.$emit('input', {attribute: this.selectedProduct, subAttribute: this.selectedProductAttribute, operator: this.selectedOperator, value: this.dateValue, msName: this.msName, searchQuery:this.appliedQuery})
  }
  public removeOperator(e:any){
    this.selectedOperator = null
    this.updateQuery()
    this.$emit('input', {attribute: this.selectedProduct, subAttribute: this.selectedProductAttribute, operator: this.selectedOperator, value: this.dateValue, msName: this.msName, searchQuery:this.appliedQuery})
  }
  public addProduct(e:any){
    const ind = this.$store.state.lookups.products.findIndex((prod:any) => prod.value.id === e.value.id)
    if(ind > -1 && this.$store.state.lookups.products[ind].value.attributes && this.$store.state.lookups.products[ind].value.attributes.length) {
      let allAttrs:any = []
      this.$store.state.lookups.products[ind].value.attributes.forEach((attr:any) => {
        attr.attributeValues.forEach((attrVal:any)=>{
          allAttrs.push({
            label: `${this.getMultiLangName(attr.attributeLanguages).name} -> ${this.getMultiLangName(attrVal.attributeValueLanguages).name} (+${attrVal.price}${this.$store.state.currency})`,
            value: attrVal
          })
        })
      })
      this.$set(this, 'allProductAttributes', allAttrs)
    } else {
      this.$set(this, 'allProductAttributes', [])
      this.selectedProductAttribute = null
    }
    this.selectedProduct = e
    this.updateQuery()
    this.$emit('input', {attribute: this.selectedProduct, subAttribute: this.selectedProductAttribute, operator: this.selectedOperator, value: this.dateValue, msName: this.msName, searchQuery:this.appliedQuery})
  }
  public removeProduct(e:any){
    this.selectedProduct = null
    this.updateQuery()
    this.$emit('input', {attribute: this.selectedProduct, subAttribute: this.selectedProductAttribute, operator: this.selectedOperator, value: this.dateValue, msName: this.msName, searchQuery:this.appliedQuery})
  }
  public addProductAttribute(e:any){
    this.selectedProductAttribute = e
    this.updateQuery()
    this.$emit('input', {attribute: this.selectedProduct, subAttribute: this.selectedProductAttribute, operator: this.selectedOperator, value: this.dateValue, msName: this.msName, searchQuery:this.appliedQuery})
  }
  public removeProductAttribute(e:any){
    this.selectedProductAttribute = null
    this.updateQuery()
    this.$emit('input', {attribute: this.selectedProduct, subAttribute: this.selectedProductAttribute, operator: this.selectedOperator, value: this.dateValue, msName: this.msName, searchQuery:this.appliedQuery})
  }

  public updateQuery(){
    let operator = this.selectedOperator ? this.selectedOperator.id : null
    let productId = this.selectedProduct && this.selectedProduct.value ? this.selectedProduct.value.id : null
    let productAttrId = this.selectedProductAttribute && this.selectedProductAttribute.value ? this.selectedProductAttribute.value.id : null
    let query = ''
    if(productAttrId) {
      query = this.subSearchQuery.replace('{attributeValueId}', '(' + productAttrId + ')')
    } else {
      query = this.searchQuery.replace('{productId}', productId)
    }
    let value = this.dateValueForQuery ? this.dateValueForQuery : null
    if (operator && (this.selectedOperator.labelValue.match('before') || this.selectedOperator.labelValue.match('after')) && query && value) {
      this.appliedQuery = query + ' and cartOrders.createdOn' + operator.replace('{k}', value)
    } else {
      if(operator) {
        if(this.selectedOperator.labelValue.match('ordered')){
          this.appliedQuery = query
        } else {
          this.appliedQuery = query + ' and cartOrders.createdOn' + operator
        }
      }else
      this.appliedQuery = ''
    }
  }
}
