import {mixins} from "vue-class-component";
import CommonHelpers from "@/shared/commonHelpers";
import {Component, Vue} from "vue-property-decorator";
import {ISearchableSelectConfig, SearchableSelectConfig} from "@/shared/models/SearchableSelectConfig";
import {emailOperators} from "@/shared/complexSearchOperators";
import SearchableSelectComponent from "@/components/searchableSelect/searchableSelect.vue";
@Component({
  components:{
    SearchableSelectComponent
  }
})
export default class EmailComplexSearchComponent extends mixins(CommonHelpers, Vue) {
  public emailSingleSelectConfig: ISearchableSelectConfig
  public operatorsSingleSelectConfig: ISearchableSelectConfig
  public allOperators: any[]
  public selectedOperator: any
  public selectedEmail: any
  constructor() {
    super();
    this.emailSingleSelectConfig =  new SearchableSelectConfig('code',
      'labels.selectEmail', '', false,
      false, false, false, false)
    this.operatorsSingleSelectConfig = new SearchableSelectConfig('label',
      'labels.selectOperator', '', false,
      false, false, false, false, false, true)
    this.allOperators = emailOperators
    this.selectedOperator = null
    this.selectedEmail = null
  }

  public addEmail(e:any){
    this.selectedEmail = e
    this.$emit('input', {attribute: null, subAttribute: null, operator: this.selectedOperator, value: this.selectedEmail})
  }
  public removeEmail(e:any){
    this.selectedEmail = null
    this.$emit('input', {attribute: null, subAttribute: null, operator: this.selectedOperator, value: this.selectedEmail})
  }
  public addOperator(e:any){
    this.selectedOperator = e
    this.$emit('input', {attribute: null, subAttribute: null, operator: this.selectedOperator, value: this.selectedEmail})
  }
  public removeOperator(e:any){
    this.selectedOperator = null
    this.$emit('input', {attribute: null, subAttribute: null, operator: this.selectedOperator, value: this.selectedEmail})
  }
}
