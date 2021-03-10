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
import { numberOperators} from "@/shared/complexSearchOperators";
import {ISearchableSelectConfig, SearchableSelectConfig} from "@/shared/models/SearchableSelectConfig";
import SearchableSelectComponent from "@/components/searchableSelect/searchableSelect.vue";
@Component({
  components:{
    SearchableSelectComponent
  }, props: {
    query: [Object,Array,String]
  }
})
export default class OrderQuantityComplexSearchComponent extends mixins(CommonHelpers, Vue) {
  public initialValue: number|null
  public selectedOperator: any
  public operatorsSingleSelectConfig: ISearchableSelectConfig
  public allOperators: any
  public appliedQuery: any
  public msName: any
  constructor() {
    super();
    this.initialValue = null
    this.selectedOperator = null
    this.allOperators = numberOperators
    this.operatorsSingleSelectConfig = new SearchableSelectConfig('label',
      'labels.selectOperator', '', false,
      false, false, false, false, false, true)
    this.appliedQuery = ''
    this.msName = 'ORDERMS'
  }
  public mounted(){
    if(this.$props.query) {
      const preFillData = this.checkIfRuleExists('orderQuantity', this.$props.query)
      if(preFillData && preFillData.value) {
        this.selectedOperator = preFillData.value.operator
        this.initialValue = preFillData.value.value
      }
    }
  }
  @Watch('value', {immediate: true, deep: true})
  public updateVal(newVal:any){
    this.initialValue = newVal
  }
  @Watch('initialValue', {immediate: true, deep: true})
  public updateInitialValue(newVal:any){
    this.updateQuery()
    this.$emit('input', {attribute: null, subAttribute: null, operator: this.selectedOperator, value: newVal, msName: this.msName, searchQuery: this.appliedQuery})
  }
  public addOperator(e:any){
    this.selectedOperator = e
    this.updateQuery()
    this.$emit('input', {attribute: null, subAttribute: null, operator: this.selectedOperator, value: this.initialValue, msName: this.msName, searchQuery: this.appliedQuery})
  }
  public removeOperator(e:any){
    this.selectedOperator = null
    this.updateQuery()
    this.$emit('input', {attribute: null, subAttribute: null, operator: this.selectedOperator, value: this.initialValue, msName: this.msName, searchQuery: this.appliedQuery})
  }

  public updateQuery(){
    this.appliedQuery = this.selectedOperator ? 'cartOrders.orderLines.quantity' + this.selectedOperator.id.replace('{k}', this.initialValue) : ''
  }
}
