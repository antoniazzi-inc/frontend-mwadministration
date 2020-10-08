import {mixins} from "vue-class-component";
import CommonHelpers from "@/shared/commonHelpers";
import {Component, Vue} from "vue-property-decorator";
import SearchableSelectComponent from "@/components/searchableSelect/searchableSelect.vue";
import {ISearchableSelectConfig, SearchableSelectConfig} from "@/shared/models/SearchableSelectConfig";
import {equalOperators} from "@/shared/complexSearchOperators";
@Component({
  components:{
    SearchableSelectComponent
  }
})
export default class CategoriesComplexSearchComponent extends mixins(CommonHelpers, Vue) {
  public categoriesSingleSelectConfig: ISearchableSelectConfig
  public operatorsSingleSelectConfig: ISearchableSelectConfig
  public allOperators: any[]
  public selectedOperator: any
  public selectedCategory: any
  public searchQuery: any
  public msName: any
  constructor() {
    super();
    this.categoriesSingleSelectConfig =  new SearchableSelectConfig('code',
      'labels.selectCategory', '', false,
      false, false, false, false)
    this.operatorsSingleSelectConfig = new SearchableSelectConfig('label',
      'labels.selectOperator', '', false,
      false, false, false, false, false, true)
    this.allOperators = equalOperators
    this.selectedOperator = null
    this.selectedCategory = null
    this.searchQuery = ''
    this.msName = 'RELATIONMS'
  }

  public addCategory(e:any){
    if(!e) return
    this.selectedCategory = e
    this.updateQuery()
    this.$emit('input', {attribute: null, subAttribute: null, operator: this.selectedOperator, value: this.selectedCategory, msName: this.msName, searchQuery: this.searchQuery})
  }
  public removeCategory(e:any){
    if(!e) return
    this.selectedCategory = null
    this.updateQuery()
    this.$emit('input', {attribute: null, subAttribute: null, operator: this.selectedOperator, value: this.selectedCategory, msName: this.msName, searchQuery: this.searchQuery})
  }
  public addOperator(e:any){
    if(!e) return
    this.selectedOperator = e
    this.updateQuery()
    this.$emit('input', {attribute: null, subAttribute: null, operator: this.selectedOperator, value: this.selectedCategory, msName: this.msName, searchQuery: this.searchQuery})
  }
  public removeOperator(e:any){
    if(!e) return
    this.selectedOperator = null
    this.updateQuery()
    this.$emit('input', {attribute: null, subAttribute: null, operator: null, value: this.selectedCategory, msName: this.msName, searchQuery: this.searchQuery})
  }


  public updateQuery(){
    let operator = this.selectedOperator ? this.selectedOperator.id : null
    let value = this.selectedCategory ? this.selectedCategory.id : null
    if(operator && value) {
      this.searchQuery = 'relationProfile.categoryId' + operator.replace('{k}', value)
    } else {
      this.searchQuery = ''
    }
  }
}
