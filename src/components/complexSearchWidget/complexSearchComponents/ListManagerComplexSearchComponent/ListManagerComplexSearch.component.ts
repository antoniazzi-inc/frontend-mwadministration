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
import {listmgrOperators} from "@/shared/complexSearchOperators";
import SearchableSelectComponent from "@/components/searchableSelect/searchableSelect.vue";
import flatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'
@Component({
  components:{
    SearchableSelectComponent,
    flatPickr
  }, props: {
    query: [Object,Array,String]
  }
})
export default class ListManagerComplexSearchComponent extends mixins(CommonHelpers, Vue) {
  public listManagerSingleSelectConfig: ISearchableSelectConfig
  public operatorsSingleSelectConfig: ISearchableSelectConfig
  public allOperators: any[]
  public selectedOperator: any
  public selectedListManager: any
  public dateConfig: any
  public dateValue: any
  constructor() {
    super();
    this.listManagerSingleSelectConfig =  new SearchableSelectConfig('code',
      'labels.selectListManager', '', false,
      false, false, false, false)
    this.operatorsSingleSelectConfig = new SearchableSelectConfig('label',
      'labels.selectOperator', '', false,
      false, false, false, false, false, true)
    this.allOperators = listmgrOperators
    this.selectedOperator = null
    this.selectedListManager = null
    this.dateValue = null
    this.dateConfig = {
      wrap: false,
      altInput: false,
      dateFormat: 'd-m-Y'
    }
  }

  @Watch('dateValue', {immediate: true, deep: true})
  public updateSearchValue(newVal:any){
    this.$emit('input', {attribute: this.selectedListManager, subAttribute: null, operator: this.selectedOperator, value: this.dateValue})
  }
  public addListManager(e:any){
    this.selectedListManager = e
    this.$emit('input', {attribute: this.selectedListManager, subAttribute: null, operator: this.selectedOperator, value: this.dateValue})
  }
  public removeListManager(e:any){
    this.selectedListManager = null
    this.$emit('input', {attribute: this.selectedListManager, subAttribute: null, operator: this.selectedOperator, value: this.dateValue})
  }
  public addOperator(e:any){
    this.selectedOperator = e
    this.$emit('input', {attribute: this.selectedListManager, subAttribute: null, operator: this.selectedOperator, value: this.dateValue})
  }
  public removeOperator(e:any){
    this.selectedOperator = null
    this.$emit('input', {attribute: this.selectedListManager, subAttribute: null, operator: this.selectedOperator, value: this.dateValue})
  }
}
