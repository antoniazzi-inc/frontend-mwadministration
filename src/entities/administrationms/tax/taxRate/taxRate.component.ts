import { Component, Vue } from 'vue-property-decorator'
import PaginationTableComponent from '@/components/paginationTable/paginationTable.vue'
import TaxRateService from '@/shared/services/taxRateService'
import { AxiosResponse } from 'axios'
import SimpleSearchComponent from '@/components/simpleSearch/simpleSearch.vue'
import { mixins } from 'vue-class-component'
import CommonHelpers from '@/shared/commonHelpers'
@Component({
  components: {
    'simple-search': SimpleSearchComponent,
    PaginationTableComponent
  }
})
export default class TaxRateComponent extends mixins(Vue, CommonHelpers) {
  $refs!: {
    paginationTable: PaginationTableComponent;
  }
  public active:boolean
  public taxRateService: any
  constructor () {
    super()
    this.active=false
    this.taxRateService = TaxRateService.getInstance()
  }

  public mounted () {
    this.active =true
  }
  public searchTaxRate (q: any) {}
  public editTaxRate (tax: any) {
    this.$router.push({ name: 'EditTaxRate', params: { id: tax.id } })
  }

  public removeTaxRate (tax: any) {
    this.taxRateService.delete(tax.id).then((resp: AxiosResponse) => {
      if (resp) {
        this.setAlert('taxRateRemoved', 'success')
      } else {
        this.setAlert('taxRateError', 'error')
      }
    })
  }
}
