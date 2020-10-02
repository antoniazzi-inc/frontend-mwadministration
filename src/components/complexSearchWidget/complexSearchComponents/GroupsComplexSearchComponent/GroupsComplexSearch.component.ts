import {mixins} from "vue-class-component";
import CommonHelpers from "@/shared/commonHelpers";
import {Component, Vue} from "vue-property-decorator";
import {ISearchableSelectConfig, SearchableSelectConfig} from "@/shared/models/SearchableSelectConfig";
import {groupOperators} from "@/shared/complexSearchOperators";
import SearchableSelectComponent from "@/components/searchableSelect/searchableSelect.vue";
@Component({
  components:{
    SearchableSelectComponent
  }
})
export default class GroupsComplexSearchComponent extends mixins(CommonHelpers, Vue) {
  public groupsSingleSelectConfig: ISearchableSelectConfig
  public operatorsSingleSelectConfig: ISearchableSelectConfig
  public allOperators: any[]
  public selectedOperator: any
  public selectedGroup: any
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
  }

  public addGroup(e:any){
    this.selectedGroup = e
    this.$emit('input', {attribute: null, subAttribute: null, operator: this.selectedOperator, value: this.selectedGroup})
  }
  public removeGroup(e:any){
    this.selectedGroup = null
    this.$emit('input', {attribute: null, subAttribute: null, operator: this.selectedOperator, value: null})
  }
  public addOperator(e:any){
    this.selectedOperator = e
    this.$emit('input', {attribute: null, subAttribute: null, operator: this.selectedOperator, value: this.selectedGroup})
  }
  public removeOperator(e:any){
    this.selectedOperator = null
    this.$emit('input', {attribute: null, subAttribute: null, operator: null, value: this.selectedGroup})
  }
}
