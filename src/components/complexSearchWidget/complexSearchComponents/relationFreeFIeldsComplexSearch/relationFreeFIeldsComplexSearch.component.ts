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
  },
  props:{
    query: [Object, Array, String]
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
  public appliedQuery: any
  public appliedSubQuery: any
  public msName: any
  public currentQuery: any
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
    this.appliedQuery = 'relationCustomFields.customField.id=={conditionId} and relationCustomFields.value'
    this.appliedSubQuery = 'relationCustomFields.customField.id=={conditionId} and relationCustomFields.customField.customFieldOptions.id'
    this.currentQuery = ''
    this.msName = 'RELATIONMS'

  }
  @Watch('query', {immediate: true, deep: true})
  public queryWatcher(newVal:any){
    if(newVal){
      const preFillData = this.checkIfRuleExists('freeFields',this.$props.query)
      if(preFillData && preFillData.value) {
        this.selectedOperator = preFillData.value.operator
        this.selectedFreeField = preFillData.value.attribute
        this.selectedFreeFieldOption = preFillData.value.attributeValue
        if(this.selectedFreeField && this.selectedFreeField.value && this.selectedFreeField.value.customFieldType === 'BOOLEAN') {
          this.selectedFieldType = 'boolean'
          this.searchValue = preFillData.value.value
        } else if(this.selectedFreeField && this.selectedFreeField.value && this.selectedFreeField.value.customFieldType === 'TEXT') {
          this.selectedFieldType = 'text'
          this.searchValue = preFillData.value.value
        } else if(this.selectedFreeField && this.selectedFreeField.value && this.selectedFreeField.value.customFieldType === 'OPTION_LIST') {
          this.selectedFieldType = 'optionList'
          this.searchValue = preFillData.value.value
        }
      }
    }
  }
  @Watch('searchValue', {immediate: true, deep: true})
  public updateSearchValue(newVal:any){
    this.searchValue = newVal
    this.updateQuery()
    this.$emit('input', {attribute: this.selectedFreeField, subAttribute: this.selectedFreeFieldOption, operator: this.selectedOperator, value: newVal, msName: this.msName, searchQuery: this.currentQuery})
  }

  public addFreeField(e:any){
    switch (e.value.customFieldType) {
      case 'BOOLEAN':
        this.selectedFieldType = 'boolean'
        this.allOperators = []
        this.selectedOperator = {id: '=={k}', label: 'Equals'}
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
    this.updateQuery()
    this.$emit('input', {attribute: this.selectedFreeField, subAttribute: this.selectedFreeFieldOption, operator: this.selectedOperator, value: this.searchValue, msName: this.msName, searchQuery: this.currentQuery})
  }
  public removeFreeField(e:any){
    this.selectedFreeField = null
    this.selectedFreeFieldOption = null
    this.updateQuery()
    this.$emit('input', {attribute: this.selectedFreeField, subAttribute: this.selectedFreeFieldOption, operator: this.selectedOperator, value: this.searchValue, msName: this.msName, searchQuery: this.currentQuery})
  }
  public addOperator(e:any){
    this.selectedOperator = e
    this.updateQuery()
    this.$emit('input', {attribute: this.selectedFreeField, subAttribute: this.selectedFreeFieldOption, operator: this.selectedOperator, value: this.searchValue, msName: this.msName, searchQuery: this.currentQuery})
  }
  public removeOperator(e:any){
    this.selectedOperator = null
    this.updateQuery()
    this.$emit('input', {attribute: this.selectedFreeField, subAttribute: this.selectedFreeFieldOption, operator: null, value: this.searchValue, msName: this.msName, searchQuery: this.currentQuery})
  }
  public addFreeFieldOption(e:any){
    this.selectedFreeFieldOption = e
    this.updateQuery()
    this.$emit('input', {attribute: this.selectedFreeField, subAttribute: this.selectedFreeFieldOption, operator: this.selectedOperator, value: this.searchValue, msName: this.msName, searchQuery: this.currentQuery})
  }
  public removeFreeFieldOption(e:any){
    this.selectedFreeFieldOption = null
    this.updateQuery()
    this.$emit('input', {attribute: this.selectedFreeField, subAttribute: null, operator: this.selectedOperator, value: this.searchValue, msName: this.msName, searchQuery: this.currentQuery})
  }

  public updateQuery(){
    let operator = this.selectedOperator ? this.selectedOperator.id : null
    let customField = this.selectedFreeField && this.selectedFreeField.value ? this.selectedFreeField.value.id : null
    let customFieldOption = this.selectedFreeFieldOption && this.selectedFreeFieldOption.value ? this.selectedFreeFieldOption.value.id : null
    if(customFieldOption) {
      this.currentQuery = this.appliedSubQuery.replace('{conditionId}', customField) + operator.replace('{k}', customFieldOption)
    } else {
      if(operator)
        this.currentQuery = this.appliedQuery.replace('{conditionId}', customField) +  operator.replace('{k}', this.searchValue)
    }
  }
}
