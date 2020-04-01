import { Component, Vue } from 'vue-property-decorator'
import SimpleSearchComponent from '@/components/simpleSearch/simpleSearch.vue'
import PaginationTableComponent from '@/components/paginationTable/paginationTable.vue'
import TaxRuleService from '@/shared/services/taxRuleService'
import { AxiosResponse } from 'axios'
import { mixins } from 'vue-class-component'
import CommonHelpers from '@/shared/commonHelpers'
@Component({
  components: {
    'simple-search': SimpleSearchComponent,
    PaginationTableComponent
  }
})
export default class TaxRuleComponent extends mixins(Vue, CommonHelpers) {
  $refs!: {
    paginationTable: PaginationTableComponent;
  }

  public taxRuleService: any
  constructor () {
    super()
    this.taxRuleService = TaxRuleService.getInstance()
  }

  public searchTaxRule (q: any) {}
  public editTaxRule (tax: any) {
    this.$router.push({ name: 'EditTaxRule', params: { id: tax.id } })
  }

  public removeTaxRule (tax: any) {
    this.taxRuleService.delete(tax.id).then((resp: AxiosResponse) => {
      if (resp) {
        this.setAlert('taxRuleRemoved', 'success')
      } else {
        this.setAlert('taxRuleError', 'error')
      }
    })
  }
}
