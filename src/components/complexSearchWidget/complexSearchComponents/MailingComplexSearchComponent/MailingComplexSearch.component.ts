import {mixins} from "vue-class-component";
import CommonHelpers from "@/shared/commonHelpers";
import {Component, Vue} from "vue-property-decorator";
import SearchableSelectComponent from "@/components/searchableSelect/searchableSelect.vue";
import {ISearchableSelectConfig, SearchableSelectConfig} from "@/shared/models/SearchableSelectConfig";
import {mailingOperators} from "@/shared/complexSearchOperators";
@Component({
  components:{
    SearchableSelectComponent
  }
})
export default class MailingComplexSearchComponent extends mixins(CommonHelpers, Vue) {
  public mailingSingleSelectConfig: ISearchableSelectConfig
  public operatorsSingleSelectConfig: ISearchableSelectConfig
  public allOperators: any[]
  public selectedOperator: any
  public selectedMailing: any
  constructor() {
    super();
    this.mailingSingleSelectConfig =  new SearchableSelectConfig('code',
      'labels.selectMailing', '', false,
      false, false, false, false)
    this.operatorsSingleSelectConfig = new SearchableSelectConfig('label',
      'labels.selectOperator', '', false,
      false, false, false, false, false, true)
    this.allOperators = mailingOperators
    this.selectedOperator = null
    this.selectedMailing = null
  }

  public addMailing(e:any){
    this.selectedMailing = e
    this.$emit('input', {attribute: null, subAttribute: null, operator: this.selectedOperator, value: this.selectedMailing})
  }
  public removeMailing(e:any){
    this.selectedMailing = null
    this.$emit('input', {attribute: null, subAttribute: null, operator: this.selectedOperator, value: this.selectedMailing})
  }
  public addOperator(e:any){
    this.selectedOperator = e
    this.$emit('input', {attribute: null, subAttribute: null, operator: this.selectedOperator, value: this.selectedMailing})
  }
  public removeOperator(e:any){
    this.selectedOperator = null
    this.$emit('input', {attribute: null, subAttribute: null, operator: this.selectedOperator, value: this.selectedMailing})
  }
}
