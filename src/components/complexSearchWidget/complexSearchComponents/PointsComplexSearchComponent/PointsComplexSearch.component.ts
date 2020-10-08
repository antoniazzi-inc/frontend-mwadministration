import {mixins} from "vue-class-component";
import CommonHelpers from "@/shared/commonHelpers";
import {Component, Vue, Watch} from "vue-property-decorator";
import {pointOperators} from "@/shared/complexSearchOperators";
import {ISearchableSelectConfig, SearchableSelectConfig} from "@/shared/models/SearchableSelectConfig";
import SearchableSelectComponent from "@/components/searchableSelect/searchableSelect.vue";
@Component({
  components:{
    SearchableSelectComponent
  }
})
export default class PointsComplexSearchComponent extends mixins(CommonHelpers, Vue) {
  public initialValue: number|null
  public allOperators: any[]
  public operatorsSingleSelectConfig: ISearchableSelectConfig
  public selectedOperator: any
  public appliedQuery: any
  public msName: any
  constructor() {
    super();
    this.initialValue = null
    this.selectedOperator = null
    this.allOperators = pointOperators
    this.operatorsSingleSelectConfig = new SearchableSelectConfig('label',
      'labels.selectOperator', '', false,
      false, false, false, false, false, true)
    this.appliedQuery = 'relationProfile.points'
    this.msName = 'RELATIONMS'
  }
  @Watch('value', {immediate: true, deep: true})
  public updateVal(newVal:any){
    this.initialValue = newVal
  }
  @Watch('initialValue', {immediate: true, deep: true})
  public updateInitialValue(newVal:any){
    this.updateQuery()
    this.$emit('input', {attribute: null, subAttribute: null, operator: this.selectedOperator, value: newVal, msName: this.msName, searchQuery: this.appliedQuery})
  }

  public addOperator(e:any){
    this.selectedOperator = e
    this.updateQuery()
    this.$emit('input', {attribute: null, subAttribute: null, operator: this.selectedOperator, value: this.initialValue, msName: this.msName, searchQuery: this.appliedQuery})
  }
  public removeOperator(e:any){
    this.selectedOperator = null
    this.updateQuery()
    this.$emit('input', {attribute: null, subAttribute: null, operator: null, value: this.initialValue, msName: this.msName, searchQuery: this.appliedQuery})
  }

  public updateQuery(){
    this.appliedQuery = this.selectedOperator ? 'relationProfile.points' + this.selectedOperator.id.replace('{k}', this.initialValue) : ''
  }
}
