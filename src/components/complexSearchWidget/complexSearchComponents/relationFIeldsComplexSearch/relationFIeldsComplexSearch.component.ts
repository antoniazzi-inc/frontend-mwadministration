import {mixins} from "vue-class-component";
import CommonHelpers from "@/shared/commonHelpers";
import {Component, Vue, Watch} from "vue-property-decorator";
import {ISearchableSelectConfig, SearchableSelectConfig} from "@/shared/models/SearchableSelectConfig";
import {dateOperators, equalOperators, genderOperators, textOperators} from "@/shared/complexSearchOperators";
import SearchableSelectComponent from "@/components/searchableSelect/searchableSelect.vue";
import flatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'
@Component({
  components:{
    SearchableSelectComponent,
    flatPickr
  }
})
export default class RelationFIeldsComplexSearchComponent extends mixins(CommonHelpers, Vue) {
  public relationFieldSingleSelectConfig: ISearchableSelectConfig
  public operatorsSingleSelectConfig: ISearchableSelectConfig
  public genderSingleSelectConfig: ISearchableSelectConfig
  public allOperators: any[]
  public allRelationFields:any[]
  public outputElementOptions:any[]
  public selectedOperator: any
  public selectedRelationField: any
  public selectedGeneder: any
  public dateConfig: any
  public searchValue: string
  public outputElement: string
  constructor() {
    super();
    this.relationFieldSingleSelectConfig =  new SearchableSelectConfig('label',
      'labels.selectRelationField', '', false,
      false, false, false, false, false, true)
    this.operatorsSingleSelectConfig = new SearchableSelectConfig('label',
      'labels.selectOperator', '', false,
      false, false, false, false, false, true)
    this.genderSingleSelectConfig = new SearchableSelectConfig('label',
      'labels.selectGender', '', false,
      false, false, false, false)
    this.allOperators = textOperators
    this.selectedOperator = null
    this.selectedRelationField = null
    this.selectedGeneder = null
    this.dateConfig = {
      wrap: true,
      altInput: false,
      dateFormat: 'd-m-Y'
    }
    this.outputElement = ''
    this.searchValue = ''
    this.outputElementOptions = []
    this.allRelationFields = []
  }

  public mounted(){
    this.allRelationFields = [
      {
        id: 'firstName',
        label: this.$t('labels.firstName'),
        outputElement: { type: 'text', options: null },
        operators: textOperators,
        searchQuery: 'relationProfile.firstName'
      },
      {
        id: 'LastName',
        label: this.$t('labels.lastName'),
        outputElement: { type: 'text', options: null },
        operators: textOperators,
        searchQuery: 'relationProfile.lastName'
      },
      {
        id: 'company',
        label: this.$t('labels.company'),
        outputElement: { type: 'text', options: null },
        operators: textOperators,
        searchQuery: 'companies.name'
      },
      {
        id: 'email',
        label: this.$t('labels.email'),
        outputElement: { type: 'text', options: null },
        operators: textOperators,
        searchQuery: 'email'
      },
      {
        id: 'created',
        label: this.$t('labels.createdOn'),
        outputElement: { type: 'date', options: null },
        operators: dateOperators,
        searchQuery: 'createdOn'
      },
      {
        id: 'gender',
        label: this.$t('labels.gender'),
        outputElement: { type: 'singleSelect', options: genderOperators },
        operators: equalOperators,
        searchQuery: 'relationProfile.gender'
      },
      {
        id: 'postalCode',
        label: this.$t('labels.postalCode'),
        outputElement: { type: 'text', options: null },
        operators: textOperators,
        searchQuery: 'relationAddress.postalCode'
      },
      {
        id: 'city',
        label: this.$t('labels.city'),
        outputElement: { type: 'text', options: null },
        operators: textOperators,
        searchQuery: 'relationAddress.city'
      },
      {
        id: 'phone',
        label: this.$t('labels.phone'),
        outputElement: { type: 'text', options: null },
        operators: textOperators,
        searchQuery: 'relationPhone.number'
      },
      {
        id: 'website',
        label: this.$t('labels.website'),
        outputElement: { type: 'text', options: null },
        operators: textOperators,
        searchQuery: 'relationProfile.website'
      },
      {
        id: 'birthDate',
        label: this.$t('labels.birthDate'),
        outputElement: { type: 'date', options: null },
        operators: dateOperators,
        searchQuery: 'relationProfile.birthDate'
      }

    ]
  }
  @Watch('searchValue', {immediate: true, deep: true})
  public updateSearchValue(newVal:any){
    this.$emit('input', {attribute: this.selectedRelationField, subAttribute: null, operator: this.selectedOperator, value: newVal})
  }
  @Watch('selectedGender', {immediate: true, deep: true})
  public updateGender(newVal:any){
    this.$emit('input', {attribute: this.selectedRelationField, subAttribute: null, operator: this.selectedOperator, value: newVal})
  }
  public addRelationField(e:any){
    if(!e) return
    this.selectedRelationField = e
    this.outputElement = e.outputElement.type
    this.outputElementOptions = e.outputElement.options
    this.$set(this, 'allOperators', e.operators)
    this.selectedOperator = e.operators[0]
    this.$emit('input', {attribute: this.selectedRelationField, subAttribute: null, operator: this.selectedOperator, value: this.searchValue})
  }
  public removeRelationField(e:any){
    if(!e) return
    this.selectedRelationField = null
    this.selectedOperator = null
    this.allOperators = []
    this.selectedRelationField = null
    this.$emit('input', {attribute: null, subAttribute: null, operator: null, value: null})
  }

  public addGender(e:any){
    if(!e) return
    this.selectedGeneder = e
    this.$emit('input', {attribute: this.selectedRelationField, subAttribute: null, operator: this.selectedOperator, value: this.selectedGeneder})
  }
  public removeGender(e:any){
    if(!e) return
    this.selectedGeneder = null
    this.$emit('input', {attribute: this.selectedRelationField, subAttribute: null, operator: this.selectedOperator, value: null})
  }

  public addOperator(e:any){
    if(!e) return
    this.selectedOperator = e
    this.$emit('input', {attribute: this.selectedRelationField, subAttribute: null, operator: this.selectedOperator, value: this.searchValue ? this.searchValue : this.selectedGeneder !== null ? this.selectedGeneder : null})
  }
  public removeOperator(e:any){
    if(!e) return
    this.selectedOperator = null
    this.$emit('input', {attribute: this.selectedRelationField, subAttribute: null, operator: null, value: this.searchValue ? this.searchValue : this.selectedGeneder !== null ? this.selectedGeneder : null})
  }
}
