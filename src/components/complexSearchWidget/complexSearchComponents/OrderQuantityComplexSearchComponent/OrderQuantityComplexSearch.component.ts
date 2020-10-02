import {mixins} from "vue-class-component";
import CommonHelpers from "@/shared/commonHelpers";
import {Component, Vue, Watch} from "vue-property-decorator";
import { numberOperators} from "@/shared/complexSearchOperators";
import {ISearchableSelectConfig, SearchableSelectConfig} from "@/shared/models/SearchableSelectConfig";
import SearchableSelectComponent from "@/components/searchableSelect/searchableSelect.vue";
@Component({
  components:{
    SearchableSelectComponent
  }
})
export default class OrderQuantityComplexSearchComponent extends mixins(CommonHelpers, Vue) {
  public initialValue: number|null
  public selectedOperator: any
  public operatorsSingleSelectConfig: ISearchableSelectConfig
  public allOperators: any
  constructor() {
    super();
    this.initialValue = null
    this.selectedOperator = null
    this.allOperators = numberOperators
    this.operatorsSingleSelectConfig = new SearchableSelectConfig('label',
      'labels.selectOperator', '', false,
      false, false, false, false, false, true)
  }
  @Watch('value', {immediate: true, deep: true})
  public updateVal(newVal:any){
    this.initialValue = newVal
  }
  @Watch('initialValue', {immediate: true, deep: true})
  public updateInitialValue(newVal:any){
    this.$emit('input', {attribute: null, subAttribute: null, operator: this.selectedOperator, value: newVal})
  }
  public addOperator(e:any){
    this.selectedOperator = e
    this.$emit('input', {attribute: null, subAttribute: null, operator: this.selectedOperator, value: this.initialValue})
  }
  public removeOperator(e:any){
    this.selectedOperator = null
    this.$emit('input', {attribute: null, subAttribute: null, operator: this.selectedOperator, value: this.initialValue})
  }
}
