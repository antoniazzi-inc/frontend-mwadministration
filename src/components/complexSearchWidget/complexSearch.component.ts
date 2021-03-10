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
import QueryBuilder from 'query-builder-vue';
import GroupOperatorComponent from "@/components/complexSearchWidget/groupOperator/groupOperator.vue";
import RuleOperatorComponent from "@/components/complexSearchWidget/ruleOperator/ruleOperator.vue";
import SearchableSelectComponent from "@/components/searchableSelect/searchableSelect.vue";
import GroupControlComponent from "@/components/complexSearchWidget/groupControl/groupControl.vue";
import {AutomationRules, CommonRules, ShopRules} from "@/shared/searchRules";
import RelationFIeldsComplexSearchComponent
  from "@/components/complexSearchWidget/complexSearchComponents/relationFIeldsComplexSearch/relationFIeldsComplexSearch.vue";
import RelationFreeFIeldsComplexSearchComponent
  from "@/components/complexSearchWidget/complexSearchComponents/relationFreeFIeldsComplexSearch/relationFreeFIeldsComplexSearch.vue";
import InputNumberComplexSearchComponent
  from "@/components/complexSearchWidget/complexSearchComponents/OrderQuantityComplexSearchComponent/OrderQuantityComplexSearch.vue";
import SearchableSelectComplexSearchComponent
  from "@/components/complexSearchWidget/complexSearchComponents/RegionsComplexSearchComponent/RegionsComplexSearch.vue";
@Component({
  props:{
    location: String,
    complexSearchQuery: [Object,Array,String]
  },
  components: {
    RelationFIeldsComplexSearchComponent,
    RelationFreeFIeldsComplexSearchComponent,
    InputNumberComplexSearchComponent,
    SearchableSelectComplexSearchComponent,
    QueryBuilder,
    'group-operator-slot': GroupOperatorComponent,
    'rule-slot': RuleOperatorComponent,
    'group-ctrl-slot': GroupControlComponent,
    SearchableSelectComponent
  }
})
export default class ComplexSearchComponent extends mixins(CommonHelpers, Vue){
  public query:any
  public secondLvl:number
  public saving:boolean
  public newQueryName:string
  public newQueryDesc:string
  constructor() {
    super();
    this.secondLvl = 0
    this.saving = false
    this.newQueryName = ''
    this.newQueryDesc = ''
    this.query = {
      operatorIdentifier: 'and',
      children: []
    }
  }
  @Watch('complexSearchQuery', {immediate: true, deep: true})
  public updateQuery(newVal:any){
    if(newVal)
      this.query = newVal
  }
  get showsave () {
    return this.query != null && this.query.children && this.query.children.length > 0
  }
  get config() {
    return {
      operators: [
        {
          name: 'labels.AND',
          identifier: 'and',
        },
        {
          name: 'labels.OR',
          identifier: 'or',
        },
      ],
      rules: this.getRules(),
      colors: ['hsl(88, 50%, 55%)', 'hsl(187, 100%, 45%)'],
    };
  }

  public getRules(){
    switch (this.$props.location) {
      case 'relations':
        let automationRules = AutomationRules
        let shopRules = ShopRules
        let result = CommonRules.concat(automationRules).concat(shopRules)
        return result
      case '':
        break;
      default:
        return CommonRules
    }
  }
  public loadQueries () {
    this.$emit('show-queries')
  }

  public validated () {
    return true
  }
  public dosave () {
    if (this.validated()) {
      this.newQueryName = this.$props.queryName
      if (this.newQueryName === 'current') this.newQueryName = ''
      this.newQueryDesc = ''
      this.saving = true
    }
  }
  public doSearch(){
    this.$emit('search', this.query)
  }
  public clear(){
    this.query = {
      operatorIdentifier: 'and',
      children: []
    }
    localStorage.setItem('activeSearch', '')
    this.$emit('search', this.query)
  }
}
