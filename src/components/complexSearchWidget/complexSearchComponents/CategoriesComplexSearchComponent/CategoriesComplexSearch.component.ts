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
  public selectedCategories: any[]
  constructor() {
    super();
    this.categoriesSingleSelectConfig =  new SearchableSelectConfig('code',
      'labels.selectCategory', '', false,
      false, false, true, false)
    this.operatorsSingleSelectConfig = new SearchableSelectConfig('label',
      'labels.selectOperator', '', false,
      false, false, false, false, false, true)
    this.allOperators = equalOperators
    this.selectedOperator = null
    this.selectedCategories = []
  }

  public addCategory(e:any){
    if(!e) return
    this.selectedCategories.push(e)
    this.$emit('input', {attribute: null, subAttribute: null, operator: this.selectedOperator, value: this.selectedCategories})
  }
  public removeCategory(e:any){
    if(!e) return
    let ind = this.selectedCategories.findIndex((obj:any) => obj.id === e.id)
    if(ind > -1){
      this.selectedCategories.splice(ind, 1)
      this.$emit('input', {attribute: null, subAttribute: null, operator: this.selectedOperator, value: this.selectedCategories})
    }
  }
  public addOperator(e:any){
    if(!e) return
    this.selectedOperator = e
    this.$emit('input', {attribute: null, subAttribute: null, operator: this.selectedOperator, value: this.selectedCategories})
  }
  public removeOperator(e:any){
    if(!e) return
    this.selectedOperator = null
    this.$emit('input', {attribute: null, subAttribute: null, operator: null, value: this.selectedCategories})
  }
}
