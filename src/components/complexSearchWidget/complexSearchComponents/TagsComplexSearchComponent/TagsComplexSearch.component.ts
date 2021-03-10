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
import {tagOperators} from "@/shared/complexSearchOperators";
import SearchableSelectComponent from "@/components/searchableSelect/searchableSelect.vue";
@Component({
  components:{
    SearchableSelectComponent
  }, props: {
    query: [Object,Array,String]
  }
})
export default class TagsComplexSearchComponent extends mixins(CommonHelpers, Vue) {
  public tagsSingleSelectConfig: ISearchableSelectConfig
  public operatorsSingleSelectConfig: ISearchableSelectConfig
  public allOperators: any[]
  public selectedOperator: any
  public selectedTag: any
  public currentQuery: any
  public msName: any
  constructor() {
    super();
    this.tagsSingleSelectConfig =  new SearchableSelectConfig('code',
      'labels.selectTag', '', false,
      false, false, false, false)
    this.operatorsSingleSelectConfig = new SearchableSelectConfig('label',
      'labels.selectOperator', '', false,
      false, false, false, false, false, true)
    this.allOperators = tagOperators
    this.selectedOperator = null
    this.selectedTag = null
    this.currentQuery = 'relationTags.id'
    this.msName = 'RELATIONMS'
  }
  @Watch('query', {immediate: true, deep: true})
  public queryWatcher(newVal:any){
    if(newVal){
      const preFillData = this.checkIfRuleExists('tags',this.$props.query)
      if(preFillData && preFillData.value) {
        this.selectedTag = preFillData.value.value
        this.selectedOperator = preFillData.value.operator
      }
    }
  }
  public addTag(e:any){
    this.selectedTag = e
    let operator = this.selectedOperator ? this.selectedOperator.id : null
    let value = this.selectedTag ? this.selectedTag.id : null
    this.currentQuery = 'relationTags.id' + operator.replace('{k}', value)
    this.$emit('input', {attribute: null, subAttribute: null, operator: this.selectedOperator, value: this.selectedTag, msName: this.msName, searchQuery: this.currentQuery})
  }
  public removeTag(e:any){
    this.selectedTag = null
    let operator = this.selectedOperator ? this.selectedOperator.id : null
    let value = this.selectedTag ? this.selectedTag.id : null
    this.currentQuery = 'relationTags.id' + operator.replace('{k}', value)
    this.$emit('input', {attribute: null, subAttribute: null, operator: this.selectedOperator, value: this.selectedTag, msName: this.msName, searchQuery: this.currentQuery})
  }
  public addOperator(e:any){
    this.selectedOperator = e
    let operator = this.selectedOperator ? this.selectedOperator.id : null
    let value = this.selectedTag ? this.selectedTag.id : null
    this.currentQuery = 'relationTags.id' + operator.replace('{k}', value)
    this.$emit('input', {attribute: null, subAttribute: null, operator: this.selectedOperator, value: this.selectedTag, msName: this.msName, searchQuery: this.currentQuery})
  }
  public removeOperator(e:any){
    this.selectedOperator = null
    let operator = this.selectedOperator ? this.selectedOperator.id : null
    let value = this.selectedTag ? this.selectedTag.id : null
    this.currentQuery = 'relationTags.id' + operator.replace('{k}', value)
    this.$emit('input', {attribute: null, subAttribute: null, operator: this.selectedOperator, value: this.selectedTag, msName: this.msName, searchQuery: this.currentQuery})
  }
}
