import {mixins} from "vue-class-component";
import CommonHelpers from "@/shared/commonHelpers";
import {Component, Vue, Watch} from "vue-property-decorator";
import {ISearchableSelectConfig, SearchableSelectConfig} from "@/shared/models/SearchableSelectConfig";
import {equalOperators, textOperators, yesnoOperators} from "@/shared/complexSearchOperators";
import SearchableSelectComponent from "@/components/searchableSelect/searchableSelect.vue";
import ToggleSwitch from "@/components/toggleSwitch/toggleSwitch.vue";
@Component({
  components:{
    SearchableSelectComponent,
    ToggleSwitch
  }
})
export default class RelationFreeFIeldsComplexSearchComponent extends mixins(CommonHelpers, Vue) {
  public freeFieldSingleSelectConfig: ISearchableSelectConfig
  public operatorsSingleSelectConfig: ISearchableSelectConfig
  public freeFieldOptionSingleSelectConfig: ISearchableSelectConfig
  public allOperators: any[]
  public allFreeFieldOptions: any[]
  public selectedFieldType:any
  public selectedFreeFieldOption:any
  public selectedOperator: any
  public selectedFreeField: any
  public searchValue: any
  constructor() {
    super();
    this.freeFieldSingleSelectConfig =  new SearchableSelectConfig('label',
      'labels.selectFreeField', '', false,
      false, false, false, false)
    this.freeFieldOptionSingleSelectConfig =  new SearchableSelectConfig('label',
      'labels.selectFreeFieldOption', '', false,
      false, true, false, false)
    this.operatorsSingleSelectConfig = new SearchableSelectConfig('label',
      'labels.selectOperator', '', false,
      false, false, false, false, false, true)
    this.allOperators = textOperators
    this.selectedOperator = null
    this.selectedFreeField = null
    this.selectedFreeFieldOption = null
    this.allFreeFieldOptions = []
    this.searchValue = null
    this.selectedFieldType = ''
  }

  @Watch('searchValue', {immediate: true, deep: true})
  public updateSearchValue(newVal:any){
    this.$emit('input', {attribute: this.selectedFreeField, subAttribute: this.selectedFreeFieldOption, operator: this.selectedOperator, value: newVal})
  }

  public addFreeField(e:any){
    switch (e.value.customFieldType) {
      case 'BOOLEAN':
        this.selectedFieldType = 'boolean'
        this.allOperators = []
        this.selectedOperator = null
        this.searchValue = true
        break;
      case 'TEXT':
        this.selectedFieldType = 'text'
        this.allOperators = textOperators
        break;
      case 'OPTION_LIST':
        this.selectedFieldType = 'optionList'
        this.allFreeFieldOptions = e.value.customFieldOptions.map((item:any)=>{
          return {
            label: this.getMultiLangName(item.customFieldOptionLanguages).name,
            value: item
          }
        })
        this.allOperators = equalOperators
        break;
    }
    this.selectedFreeField = e
    this.$emit('input', {attribute: this.selectedFreeField, subAttribute: this.selectedFreeFieldOption, operator: this.selectedOperator, value: this.searchValue})
  }
  public removeFreeField(e:any){
    this.selectedFreeField = null
    this.selectedFreeFieldOption = null
    this.$emit('input', {attribute: this.selectedFreeField, subAttribute: this.selectedFreeFieldOption, operator: this.selectedOperator, value: this.searchValue})
  }
  public addOperator(e:any){
    this.selectedOperator = e
    this.$emit('input', {attribute: this.selectedFreeField, subAttribute: this.selectedFreeFieldOption, operator: this.selectedOperator, value: this.searchValue})
  }
  public removeOperator(e:any){
    this.selectedOperator = null
    this.$emit('input', {attribute: this.selectedFreeField, subAttribute: this.selectedFreeFieldOption, operator: null, value: this.searchValue})
  }
  public addFreeFieldOption(e:any){
    this.selectedFreeFieldOption = e
    this.$emit('input', {attribute: this.selectedFreeField, subAttribute: this.selectedFreeFieldOption, operator: this.selectedOperator, value: this.searchValue})
  }
  public removeFreeFieldOption(e:any){
    this.selectedFreeFieldOption = null
    this.$emit('input', {attribute: this.selectedFreeField, subAttribute: null, operator: this.selectedOperator, value: this.searchValue})
  }
}
