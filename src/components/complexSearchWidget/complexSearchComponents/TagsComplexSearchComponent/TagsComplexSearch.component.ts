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
  }

  public addTag(e:any){
    this.selectedTag = e
    this.$emit('input', {attribute: null, subAttribute: null, operator: this.selectedOperator, value: this.selectedTag})
  }
  public removeTag(e:any){
    this.selectedTag = null
    this.$emit('input', {attribute: null, subAttribute: null, operator: this.selectedOperator, value: this.selectedTag})
  }
  public addOperator(e:any){
    this.selectedOperator = e
    this.$emit('input', {attribute: null, subAttribute: null, operator: this.selectedOperator, value: this.selectedTag})
  }
  public removeOperator(e:any){
    this.selectedOperator = null
    this.$emit('input', {attribute: null, subAttribute: null, operator: this.selectedOperator, value: this.selectedTag})
  }
}
