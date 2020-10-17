import {mixins} from "vue-class-component";
import CommonHelpers from "@/shared/commonHelpers";
import {Component, Vue} from "vue-property-decorator";
import SearchableSelectComponent from "@/components/searchableSelect/searchableSelect.vue";
import flatPickr from "vue-flatpickr-component";
import 'flatpickr/dist/flatpickr.css'
import {ISearchableSelectConfig, SearchableSelectConfig} from "@/shared/models/SearchableSelectConfig";
import {linkOperators} from "@/shared/complexSearchOperators";
@Component({
  components:{
    SearchableSelectComponent,
    flatPickr
  }, props: {
    query: [Object,Array,String]
  }
})
export default class LinkComplexSearchComponent extends mixins(CommonHelpers, Vue) {
  public linkSingleSelectConfig: ISearchableSelectConfig
  public operatorsSingleSelectConfig: ISearchableSelectConfig
  public allOperators: any[]
  public selectedOperator: any
  public selectedLink: any
  public dateConfig: any
  public searchValue: any
  public dateValue: any
  constructor() {
    super();
    this.linkSingleSelectConfig =  new SearchableSelectConfig('code',
      'labels.selectLink', '', false,
      false, false, false, false)
    this.operatorsSingleSelectConfig = new SearchableSelectConfig('label',
      'labels.selectOperator', '', false,
      false, false, false, false, false, true)
    this.allOperators = linkOperators
    this.selectedOperator = null
    this.selectedLink = null
    this.searchValue = ''
    this.dateValue = null
    this.dateConfig = {
      wrap: false,
      altInput: false,
      dateFormat: 'd-m-Y'
    }
  }

  public addLink(e:any){
    this.selectedLink = e
    this.$emit('input', {attribute: null, subAttribute: null, operator: this.selectedOperator, value: this.selectedLink})
  }
  public removeLink(e:any){
    this.selectedLink = null
    this.$emit('input', {attribute: null, subAttribute: null, operator: this.selectedOperator, value: this.selectedLink})
  }
  public addOperator(e:any){
    this.selectedOperator = e
    this.$emit('input', {attribute: null, subAttribute: null, operator: this.selectedOperator, value: this.selectedLink})
  }
  public removeOperator(e:any){
    this.selectedOperator = null
    this.$emit('input', {attribute: null, subAttribute: null, operator: this.selectedOperator, value: this.selectedLink})
  }
}
