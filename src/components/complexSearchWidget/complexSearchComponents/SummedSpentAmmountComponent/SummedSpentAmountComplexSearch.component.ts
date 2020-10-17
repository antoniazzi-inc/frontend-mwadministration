import {mixins} from "vue-class-component";
import CommonHelpers from "@/shared/commonHelpers";
import {Component, Vue, Watch} from "vue-property-decorator";
import { Money } from 'v-money'
import {IMoneyConfig, MoneyConfig} from "@/shared/models/moneyConfig";
import {ISearchableSelectConfig, SearchableSelectConfig} from "@/shared/models/SearchableSelectConfig";
import {numberOperators} from "@/shared/complexSearchOperators";
import SearchableSelectComponent from "@/components/searchableSelect/searchableSelect.vue";
@Component({
  components:{
    Money,
    SearchableSelectComponent
  }, props: {
    query: [Object,Array,String]
  }
})
export default class SummedSpentAmountComplexSearchComponent extends mixins(CommonHelpers, Vue) {
  public initialValue: number|null
  public moneyConfig: IMoneyConfig
  public selectedOperator: any
  public operatorsSingleSelectConfig: ISearchableSelectConfig
  public allOperators: any
  public searchQuery: any
  public msName: any
  constructor() {
    super();
    this.initialValue = null
    this.moneyConfig = new MoneyConfig(undefined, undefined, '', this.$store.state.currency, 0, false)
    this.selectedOperator = null
    this.allOperators = numberOperators
    this.operatorsSingleSelectConfig = new SearchableSelectConfig('label',
      'labels.selectOperator', '', false,
      false, false, false, false, false, true)
    this.searchQuery = 'sum|orderRelation|cartOrders.totalAmount' /*TODO CHANGE TO totalAmount TBD Kristijan Should return summed value from all invoices*/
    this.msName = 'ORDERMS'
  }
  @Watch('query', {immediate: true, deep: true})
  public queryWatcher(newVal:any){
    if(newVal){
      const preFillData = this.checkIfRuleExists('summedOrderAmount',this.$props.query)
      if(preFillData && preFillData.value) {
        this.selectedOperator = preFillData.value.operator
        this.initialValue = preFillData.value.value
      }
    }
  }
  @Watch('initialValue', {immediate: true, deep: true})
  public updateInitialValue(newVal:any){
    this.updateQuery()
    this.$emit('input', {attribute: null, subAttribute: null, operator: this.selectedOperator, value: newVal, msName: this.msName, searchQuery: this.searchQuery})
  }
  public addOperator(e:any){
    this.selectedOperator = e
    this.updateQuery()
    this.$emit('input', {attribute: null, subAttribute: null, operator: this.selectedOperator, value: this.initialValue, msName: this.msName, searchQuery: this.searchQuery})
  }
  public removeOperator(e:any){
    this.selectedOperator = null
    this.updateQuery()
    this.$emit('input', {attribute: null, subAttribute: null, operator: this.selectedOperator, value: this.initialValue, msName: this.msName, searchQuery: this.searchQuery})
  }

  public updateQuery(){
    this.searchQuery = this.selectedOperator ? '(sum|orderRelation|cartOrders.totalAmount' + this.selectedOperator.id.replace('{k}', this.initialValue) + ')' : ''
  }
}