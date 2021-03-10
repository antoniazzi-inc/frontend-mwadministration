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
import ToggleSwitch from "@/components/toggleSwitch/toggleSwitch.vue";
@Component({
  props: {
    value: Object,
    query: [Object,Array,String]
  },
  components:{
    ToggleSwitch
  }
})
export default class IsCustomerComplexSearchComponent extends mixins(CommonHelpers, Vue) {
  public initalValue:any
  public label:string
  public currentQuery:string
  public msName:string
  constructor() {
    super();
    this.initalValue = false
    this.label = ''
    this.currentQuery = 'customer.id=null={k}'
    this.msName = 'RELATIONMS'
  }
  public mounted(){
    if(this.$props.query){
      const preFillData = this.checkIfRuleExists('isCustomer', this.$props.query)
      if(preFillData && preFillData.value) {
        this.initalValue = preFillData.value.value
      }
    }
  }
  @Watch('value', {immediate: true, deep: true})
  public updateVal(newVal:any){
    this.initalValue = newVal.value
  }
  @Watch('initalValue', {immediate: true, deep: true})
  public updateInitalValue(newVal:boolean){
    let val = newVal ? 'false' : 'true'
    this.$emit('input', {attribute: null, subAttribute: null, operator: null, value: newVal, msName: this.msName, searchQuery: this.currentQuery.replace('{k}', val)})
  }
}
