import {mixins} from "vue-class-component";
import CommonHelpers from "@/shared/commonHelpers";
import {Component, Vue, Watch} from "vue-property-decorator";
import SearchableSelectComponent from "@/components/searchableSelect/searchableSelect.vue";
import {ISearchableSelectConfig, SearchableSelectConfig} from "@/shared/models/SearchableSelectConfig";
import {orderOperators} from "@/shared/complexSearchOperators";
import flatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'
import moment from "moment";
import {DATE_FORMAT} from "@/shared/filters";
@Component({
  components:{
    SearchableSelectComponent,
    flatPickr
  }
})
export default class OrderComplexSearchComponent extends mixins(CommonHelpers, Vue) {
  public initialValue: number|null
  public selectedOperator: any
  public operatorsSingleSelectConfig: ISearchableSelectConfig
  public productSingleSelectConfig: ISearchableSelectConfig
  public productAttributeSingleSelectConfig: ISearchableSelectConfig
  public allOperators: any
  public allProductAttributes: any
  public selectedProduct: any
  public selectedProductAttribute: any
  public dateConfig: any
  public dateValue: any
  public searchQuery: any
  public subSearchQuery: any
  public dateSearchQuery: any
  public msName: any
  public appliedQuery: any
  constructor() {
    super();
    this.initialValue = null
    this.dateValue = null
    this.selectedOperator = null
    this.selectedProduct = null
    this.selectedProductAttribute = null
    this.allOperators = orderOperators
    this.allProductAttributes = []
    this.operatorsSingleSelectConfig = new SearchableSelectConfig('label',
      'labels.selectOperator', '', false,
      false, false, false, false, false, true)
    this.productAttributeSingleSelectConfig = new SearchableSelectConfig('label',
      'labels.selectProductAttribute', '', false,
      false, true, false, false, false, true)
    this.productSingleSelectConfig = new SearchableSelectConfig('label',
      'labels.selectProduct', '', false,
      false, true, false, false, false, true)
    this.dateConfig = {
      wrap: false,
      altInput: false,
      dateFormat: 'd-m-Y'
    }
    this.searchQuery = 'orderLines.product.productId=={productId}'
    this.subSearchQuery = 'orderLines.product.orderProductAttributeValues.attributeValueId=={attributeValueId}'
    this.dateSearchQuery = 'createdOn'
    this.appliedQuery = ''
    this.msName = 'ORDERMS'
  }
  public mounted(){
    this.updateQuery()
  }
  @Watch('value', {immediate: true, deep: true})
  public updateVal(newVal:any){
    this.dateValue = newVal
  }
  @Watch('dateValue', {immediate: true, deep: true})
  public updateInitialValue(newVal:any){
    this.updateQuery()
    this.$emit('input', {attribute: this.selectedProduct, subAttribute: this.selectedProductAttribute, operator: this.selectedOperator, value: newVal, msName: this.msName, searchQuery:this.appliedQuery})
  }
  public addOperator(e:any){
    this.selectedOperator = e
    this.updateQuery()
    this.$emit('input', {attribute: this.selectedProduct, subAttribute: this.selectedProductAttribute, operator: this.selectedOperator, value: this.dateValue, msName: this.msName, searchQuery:this.appliedQuery})
  }
  public removeOperator(e:any){
    this.selectedOperator = null
    this.updateQuery()
    this.$emit('input', {attribute: this.selectedProduct, subAttribute: this.selectedProductAttribute, operator: this.selectedOperator, value: this.dateValue, msName: this.msName, searchQuery:this.appliedQuery})
  }
  public addProduct(e:any){
    const ind = this.$store.state.lookups.products.findIndex((prod:any) => prod.value.id === e.value.id)
    if(ind > -1 && this.$store.state.lookups.products[ind].value.attributes && this.$store.state.lookups.products[ind].value.attributes.length) {
      let allAttrs:any = []
      this.$store.state.lookups.products[ind].value.attributes.forEach((attr:any) => {
        attr.attributeValues.forEach((attrVal:any)=>{
          allAttrs.push({
            label: `${this.getMultiLangName(attr.attributeLanguages).name} -> ${this.getMultiLangName(attrVal.attributeValueLanguages).name} (+${attrVal.price}${this.$store.state.currency})`,
            value: attrVal
          })
        })
      })
      this.$set(this, 'allProductAttributes', allAttrs)
    } else {
      this.$set(this, 'allProductAttributes', [])
    }
    this.selectedProduct = e
    this.updateQuery()
    this.$emit('input', {attribute: this.selectedProduct, subAttribute: this.selectedProductAttribute, operator: this.selectedOperator, value: this.dateValue, msName: this.msName, searchQuery:this.appliedQuery})
  }
  public removeProduct(e:any){
    this.selectedProduct = null
    this.updateQuery()
    this.$emit('input', {attribute: this.selectedProduct, subAttribute: this.selectedProductAttribute, operator: this.selectedOperator, value: this.dateValue, msName: this.msName, searchQuery:this.appliedQuery})
  }
  public addProductAttribute(e:any){
    this.selectedProductAttribute = e
    this.updateQuery()
    this.$emit('input', {attribute: this.selectedProduct, subAttribute: this.selectedProductAttribute, operator: this.selectedOperator, value: this.dateValue, msName: this.msName, searchQuery:this.appliedQuery})
  }
  public removeProductAttribute(e:any){
    this.selectedProductAttribute = null
    this.updateQuery()
    this.$emit('input', {attribute: this.selectedProduct, subAttribute: this.selectedProductAttribute, operator: this.selectedOperator, value: this.dateValue, msName: this.msName, searchQuery:this.appliedQuery})
  }

  public updateQuery(){
    let operator = this.selectedOperator ? this.selectedOperator.id : null
    let productId = this.selectedProduct && this.selectedProduct.value ? this.selectedProduct.value.id : null
    let productAttrId = this.selectedProductAttribute && this.selectedProductAttribute.value ? this.selectedProductAttribute.value.id : null
    let query = ''
    if(productAttrId) {
      query = this.subSearchQuery.replace('{attributeValueId}', productAttrId)
    } else {
      query = this.searchQuery.replace('{productId}', productId)
    }
    let value = this.dateValue ? this.dateValue : null
    if (operator && (this.selectedOperator.labelValue.match('before') || this.selectedOperator.labelValue.match('after')) && query && value) {
      this.appliedQuery = query + ' AND createdOn' + operator.replace('{k}', value)
    } else {
      if(operator) {
        if(this.selectedOperator.labelValue.match('ordered')){
          this.appliedQuery = query + ' AND createdOn=empty=false'
        } else {
          this.appliedQuery = query + ' AND createdOn' + operator
        }
      }else
      this.appliedQuery = ''
    }
  }
}
