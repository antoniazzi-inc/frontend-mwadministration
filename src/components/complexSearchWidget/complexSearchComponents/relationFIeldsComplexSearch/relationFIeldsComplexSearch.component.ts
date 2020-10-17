import {mixins} from "vue-class-component";
import CommonHelpers from "@/shared/commonHelpers";
import {Component, Vue, Watch} from "vue-property-decorator";
import {ISearchableSelectConfig, SearchableSelectConfig} from "@/shared/models/SearchableSelectConfig";
import {dateOperators, equalOperators, genderOperators, textOperators} from "@/shared/complexSearchOperators";
import SearchableSelectComponent from "@/components/searchableSelect/searchableSelect.vue";
import flatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'
import moment from "moment";
import {DATE_FORMAT, INSTANT_FORMAT} from "@/shared/filters";
@Component({
  components: {
    SearchableSelectComponent,
    flatPickr
  }, props: {
    query: [Object,Array,String]
  }
})
export default class RelationFIeldsComplexSearchComponent extends mixins(CommonHelpers, Vue) {
  public relationFieldSingleSelectConfig: ISearchableSelectConfig
  public operatorsSingleSelectConfig: ISearchableSelectConfig
  public genderSingleSelectConfig: ISearchableSelectConfig
  public allOperators: any[]
  public allRelationFields: any[]
  public outputElementOptions: any[]
  public selectedOperator: any
  public selectedRelationField: any
  public selectedGeneder: any
  public dateConfig: any
  public searchValue: string
  public dateValue: string
  public outputElement: string
  public appliedQuery: string
  public msName: string
  public finalQuery: string

  constructor() {
    super();
    this.relationFieldSingleSelectConfig = new SearchableSelectConfig('label',
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
    this.dateValue = ''
    this.outputElementOptions = []
    this.allRelationFields = []
    this.appliedQuery = ''
    this.finalQuery = ''
    this.msName = 'RELATIONMS'
  }
  public mounted() {
    this.allRelationFields = [
      {
        id: 'firstName',
        label: this.$t('labels.firstName'),
        outputElement: {type: 'text', options: null},
        operators: textOperators,
        searchQuery: 'relationProfile.firstName'
      },
      {
        id: 'LastName',
        label: this.$t('labels.lastName'),
        outputElement: {type: 'text', options: null},
        operators: textOperators,
        searchQuery: 'relationProfile.lastName'
      },
      {
        id: 'company',
        label: this.$t('labels.company'),
        outputElement: {type: 'text', options: null},
        operators: textOperators,
        searchQuery: 'relationProfile.companyName'
      },
      {
        id: 'email',
        label: this.$t('labels.email'),
        outputElement: {type: 'text', options: null},
        operators: textOperators,
        searchQuery: 'email'
      },
      {
        id: 'created',
        label: this.$t('labels.createdOn'),
        outputElement: {type: 'date', options: null},
        operators: dateOperators,
        searchQuery: 'createdOn'
      },
      {
        id: 'gender',
        label: this.$t('labels.gender'),
        outputElement: {type: 'singleSelect', options: genderOperators},
        operators: equalOperators,
        searchQuery: 'relationProfile.gender'
      },
      {
        id: 'postalCode',
        label: this.$t('labels.postalCode'),
        outputElement: {type: 'text', options: null},
        operators: textOperators,
        searchQuery: 'relationAddresses.postalCode'
      },
      {
        id: 'city',
        label: this.$t('labels.city'),
        outputElement: {type: 'text', options: null},
        operators: textOperators,
        searchQuery: 'relationAddresses.city'
      },
      {
        id: 'phone',
        label: this.$t('labels.phone'),
        outputElement: {type: 'text', options: null},
        operators: textOperators,
        searchQuery: 'relationPhones.number'
      },
      {
        id: 'website',
        label: this.$t('labels.website'),
        outputElement: {type: 'text', options: null},
        operators: textOperators,
        searchQuery: 'relationProfile.website'
      },
      {
        id: 'birthDate',
        label: this.$t('labels.birthDate'),
        outputElement: {type: 'date', options: null},
        operators: dateOperators,
        searchQuery: 'relationProfile.birthDate'
      }
    ]
    if(this.$props.query){
      const preFillData = this.checkIfRuleExists('relFields', this.$props.query)
      if(preFillData && preFillData.value) {
        this.selectedOperator = preFillData.value.operator
        this.selectedRelationField = preFillData.value.attribute
        this.outputElement = this.selectedRelationField.outputElement.type
        if(this.outputElement === 'date' && preFillData.value.value) {
          this.dateValue = moment(preFillData.value.value).format(DATE_FORMAT)
        } else if(this.outputElement === 'singleSelect' && preFillData.value.value){
          this.selectedGeneder = preFillData.value.value
        } else if(this.outputElement === 'text' && preFillData.value.value){
          this.searchValue = preFillData.value.value
        }
      }
    }
  }

  @Watch('dateValue', {immediate: true, deep: true})
  public updateDateValue(newVal: any) {
    if(this.selectedRelationField && this.selectedRelationField.outputElement && this.selectedRelationField.outputElement.type === 'date' && newVal){
      if(this.selectedRelationField.id === 'birthDate') {
        newVal = moment(newVal, 'DD-MM-YYYY').format('YYYY-MM-DD')
      } else
        newVal = moment(newVal, 'DD-MM-YYYY').format(INSTANT_FORMAT)
    }
    this.updateQuery(this.selectedOperator ? this.selectedOperator.id : null, this.selectedRelationField ? this.selectedRelationField.searchQuery : null, newVal)
    this.$emit('input', {
      attribute: this.selectedRelationField,
      subAttribute: null,
      operator: this.selectedOperator,
      value: newVal,
      msName: this.msName,
      searchQuery: this.finalQuery
    })
  }
  @Watch('searchValue', {immediate: true, deep: true})
  public updateSearchValue(newVal: any) {
    if(this.selectedRelationField && this.selectedRelationField.outputElement && this.selectedRelationField.outputElement.type === 'date' && newVal){
      if(this.selectedRelationField.id === 'birthDate') {
        newVal = moment(newVal, 'DD-MM-YYYY').format('YYYY-MM-DD')
      } else
        newVal = moment(newVal, 'DD-MM-YYYY').format(INSTANT_FORMAT)
    }
    this.updateQuery(this.selectedOperator ? this.selectedOperator.id : null, this.selectedRelationField ? this.selectedRelationField.searchQuery : null, newVal)
    this.$emit('input', {
      attribute: this.selectedRelationField,
      subAttribute: null,
      operator: this.selectedOperator,
      value: newVal,
      msName: this.msName,
      searchQuery: this.finalQuery
    })
  }

  @Watch('selectedGender', {immediate: true, deep: true})
  public updateGender(newVal: any) {
    this.updateQuery(this.selectedOperator ? this.selectedOperator.id : null, this.selectedRelationField ? this.selectedRelationField.searchQuery : null, newVal && newVal.id ? newVal.id : null)
    this.$emit('input', {
      attribute: this.selectedRelationField,
      subAttribute: null,
      operator: this.selectedOperator,
      value: newVal,
      msName: this.msName,
      searchQuery: this.finalQuery
    })
  }

  public addRelationField(e: any) {
    if (!e) return
    this.selectedRelationField = e
    this.outputElement = e.outputElement.type
    this.outputElementOptions = e.outputElement.options
    this.$set(this, 'allOperators', e.operators)
    this.selectedOperator = e.operators[0]
    this.updateQuery(this.selectedOperator.id, this.selectedRelationField.searchQuery, this.searchValue)
    this.$emit('input', {
      attribute: this.selectedRelationField,
      subAttribute: null,
      operator: this.selectedOperator,
      value: this.searchValue,
      msName: this.msName,
      searchQuery: this.finalQuery
    })
  }

  public removeRelationField(e: any) {
    if (!e) return
    this.selectedRelationField = null
    this.selectedOperator = null
    this.allOperators = []
    this.selectedRelationField = null
    this.updateQuery(this.selectedOperator.id, this.selectedRelationField.searchQuery, null)
    this.$emit('input', {
      attribute: null,
      subAttribute: null,
      operator: null,
      value: null,
      msName: this.msName,
      searchQuery: this.finalQuery
    })
  }

  public addGender(e: any) {
    if (!e) return
    this.selectedGeneder = e
    this.updateQuery(this.selectedOperator ? this.selectedOperator.id : null, this.selectedRelationField.searchQuery, this.selectedGeneder.labelValue)
    this.$emit('input', {
      attribute: this.selectedRelationField,
      subAttribute: null,
      operator: this.selectedOperator,
      value: this.selectedGeneder,
      msName: this.msName,
      searchQuery: this.finalQuery
    })
  }

  public removeGender(e: any) {
    if (!e) return
    this.selectedGeneder = null
    this.updateQuery(this.selectedOperator.id, this.selectedRelationField.searchQuery, null)
    this.$emit('input', {
      attribute: this.selectedRelationField,
      subAttribute: null,
      operator: this.selectedOperator,
      value: null,
      msName: this.msName,
      searchQuery: this.finalQuery
    })
  }

  public addOperator(e: any) {
    if (!e) return
    this.selectedOperator = e
    if(this.selectedRelationField && this.selectedRelationField.outputElement && this.selectedRelationField.outputElement.type === 'date' && this.searchValue){
      if(this.selectedRelationField.id === 'birthDate') {
        this.searchValue = moment(this.searchValue, 'DD-MM-YYYY').format('YYYY-MM-DD')
      } else
        this.searchValue = moment(this.searchValue, 'DD-MM-YYYY').format(INSTANT_FORMAT)
    }
    this.updateQuery(this.selectedOperator.id, this.selectedRelationField ? this.selectedRelationField.searchQuery : '', this.searchValue ? this.searchValue : this.selectedGeneder !== null ? this.selectedGeneder.labelValue : null)
    this.$emit('input', {
      attribute: this.selectedRelationField,
      subAttribute: null,
      operator: this.selectedOperator,
      value: this.searchValue ? this.searchValue : this.selectedGeneder !== null ? this.selectedGeneder : null,
      msName: this.msName,
      searchQuery: this.finalQuery
    })
  }

  public removeOperator(e: any) {
    if (!e) return
    this.selectedOperator = null
    this.updateQuery(null, this.selectedRelationField.searchQuery, this.searchValue ? this.searchValue : this.selectedGeneder !== null ? this.selectedGeneder.labelValue : null)
    this.$emit('input', {
      attribute: this.selectedRelationField,
      subAttribute: null,
      operator: null,
      value: this.searchValue ? this.searchValue : this.selectedGeneder !== null ? this.selectedGeneder : null,
      msName: this.msName,
      searchQuery: this.finalQuery
    })
  }

  public updateQuery(operator: any, query: any, value: any) {
    if (operator && query && value) {
      this.finalQuery = query + operator.replace('{k}', value)
    } else {
      this.finalQuery = ''
    }
  }
}
