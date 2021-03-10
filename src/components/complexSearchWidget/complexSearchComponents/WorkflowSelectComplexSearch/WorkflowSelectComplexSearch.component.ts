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
import {ISearchableSelectConfig, SearchableSelectConfig} from "@/shared/models/SearchableSelectConfig";
import SearchableSelectComponent from "@/components/searchableSelect/searchableSelect.vue";
import ProductService from "@/shared/services/productService";
import flatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'
import {workflowOperators} from "@/shared/complexSearchOperators";
@Component({
  components:{
    SearchableSelectComponent,
    flatPickr
  }, props: {
    query: [Object,Array,String]
  }
})
export default class WorkflowSelectComplexSearchComponent extends mixins(CommonHelpers, Vue) {
  public workflowSingleSelectConfig: ISearchableSelectConfig
  public productAttributeSingleSelectConfig: ISearchableSelectConfig
  public operatorsSingleSelectConfig: ISearchableSelectConfig
  public allWorkflowSteps: any[]
  public allOperators: any[]
  public selectedWorkflow: any
  public selectedWorkflowStep: any
  public selectedOperator: any
  public workflowService: any
  public dateConfig: any
  public dateValue: any
  constructor() {
    super();
    this.workflowSingleSelectConfig = new SearchableSelectConfig('label',
      'labels.selectProduct', '', false,
      false, false, false, false)
    this.productAttributeSingleSelectConfig = new SearchableSelectConfig('label',
      'labels.selectProductAttribute', '', false,
      false, false, false, false)
    this.operatorsSingleSelectConfig = new SearchableSelectConfig('label',
      'labels.selectOperator', '', false,
      false, false, false, false, false, true)
    this.workflowService = ProductService.getInstance()
    this.allWorkflowSteps = []
    this.selectedWorkflow = null
    this.selectedWorkflowStep = null
    this.selectedOperator = null
    this.allOperators = workflowOperators
    this.dateConfig = {
      wrap: true,
      altInput: false,
      dateFormat: 'd-m-Y'
    }
    this.dateValue = null
  }

  @Watch('query', {immediate: true, deep: true})
  public queryWatcher(newVal:any){

  }
  @Watch('dateValue', {immediate: true, deep: true})
  public updateSearchValue(newVal:any){
    this.$emit('input', {attribute: this.selectedWorkflow, subAttribute: this.selectedWorkflowStep, operator: this.selectedOperator, value: this.dateValue})
  }
  public addWorkflow(e:any){
    this.selectedWorkflow = e
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
      this.$set(this, 'allWorkflowSteps', allAttrs)
    } else {
      this.$set(this, 'allWorkflowSteps', [])
    }
    this.$emit('input', {attribute: this.selectedWorkflow, subAttribute: this.selectedWorkflowStep, operator: this.selectedOperator, value: this.dateValue})
  }
  public removeWorkflow(e:any){
    this.selectedWorkflow = null
    this.selectedWorkflowStep = null
    this.allWorkflowSteps = []
    this.$emit('input', {attribute: this.selectedWorkflow, subAttribute: this.selectedWorkflowStep, operator: this.selectedOperator, value: this.dateValue})
  }

  public addWorkflowStep(e:any){
    this.selectedWorkflowStep = e
    this.$emit('input', {attribute: this.selectedWorkflow, subAttribute: this.selectedWorkflowStep, operator: this.selectedOperator, value: this.dateValue})
  }
  public removeWorkflowStep(e:any){
    this.selectedWorkflowStep = null
    this.$emit('input', {attribute: this.selectedWorkflow, subAttribute: this.selectedWorkflowStep, operator: this.selectedOperator, value: this.dateValue})
  }
  public addOperator(e:any){
    this.selectedOperator = e
    this.$emit('input', {attribute: this.selectedWorkflow, subAttribute: this.selectedWorkflowStep, operator: this.selectedOperator, value: this.dateValue})
  }
  public removeOperator(e:any){
    this.selectedOperator = null
    this.$emit('input', {attribute: this.selectedWorkflow, subAttribute: this.selectedWorkflowStep, operator: this.selectedOperator, value: this.dateValue})
  }
}
