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
import {Component, Vue} from "vue-property-decorator";
import {ISearchableSelectConfig, SearchableSelectConfig} from "@/shared/models/SearchableSelectConfig";
import {groupOperators} from "@/shared/complexSearchOperators";
import SearchableSelectComponent from "@/components/searchableSelect/searchableSelect.vue";
@Component({
  components:{
    SearchableSelectComponent
  },
  props:{
    query: [Object,Array,String]
  }
})
export default class GroupsComplexSearchComponent extends mixins(CommonHelpers, Vue) {
  public groupsSingleSelectConfig: ISearchableSelectConfig
  public operatorsSingleSelectConfig: ISearchableSelectConfig
  public allOperators: any[]
  public selectedOperator: any
  public selectedGroup: any
  public searchQuery: any
  public msName: any
  constructor() {
    super();
    this.groupsSingleSelectConfig =  new SearchableSelectConfig('name',
      'labels.selectGroup', '', false,
      false, false, false, false)
    this.operatorsSingleSelectConfig = new SearchableSelectConfig('label',
      'labels.selectOperator', '', false,
      false, false, false, false, false, true)
    this.allOperators = groupOperators
    this.selectedOperator = null
    this.selectedGroup = null
    this.searchQuery = ''
    this.msName = 'RELATIONMS'
  }

  public mounted(){
    if(this.$props.query){
      const preFillData = this.checkIfRuleExists('groups', this.$props.query)
      if(preFillData && preFillData.value) {
        this.selectedGroup = preFillData.value.value
        this.selectedOperator = preFillData.value.operator
      }
    }
  }
  public addGroup(e:any){
    this.selectedGroup = e
    this.updateQuery()
    this.$emit('input', {attribute: null, subAttribute: null, operator: this.selectedOperator, value: this.selectedGroup, msName: this.msName, searchQuery:this.searchQuery})
  }
  public removeGroup(e:any){
    this.selectedGroup = null
    this.updateQuery()
    this.$emit('input', {attribute: null, subAttribute: null, operator: this.selectedOperator, value: null, msName: this.msName, searchQuery:this.searchQuery})
  }
  public addOperator(e:any){
    this.selectedOperator = e
    this.updateQuery()
    this.$emit('input', {attribute: null, subAttribute: null, operator: this.selectedOperator, value: this.selectedGroup, msName: this.msName, searchQuery:this.searchQuery})
  }
  public removeOperator(e:any){
    this.selectedOperator = null
    this.updateQuery()
    this.$emit('input', {attribute: null, subAttribute: null, operator: null, value: this.selectedGroup, msName: this.msName, searchQuery:this.searchQuery})
  }

  public updateQuery(){
    let operator = this.selectedOperator ? this.selectedOperator.id : null
    let value = this.selectedGroup ? this.selectedGroup.id : null
    if(operator && value) {
      this.searchQuery = 'relationGroups.id' + operator.replace('{k}', value)
    } else {
      this.searchQuery = ''
    }
  }
}
