import {mixins} from "vue-class-component";
import CommonHelpers from "@/shared/commonHelpers";
import {Component, Vue} from "vue-property-decorator";
import {ISearchableSelectConfig, SearchableSelectConfig} from "@/shared/models/SearchableSelectConfig";
import {tagOperators} from "@/shared/complexSearchOperators";
import SearchableSelectComponent from "@/components/searchableSelect/searchableSelect.vue";
@Component({
  components:{
    SearchableSelectComponent
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
