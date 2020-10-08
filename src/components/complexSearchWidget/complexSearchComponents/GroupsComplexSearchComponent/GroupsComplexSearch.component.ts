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
