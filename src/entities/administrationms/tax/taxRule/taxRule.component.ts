import { Component, Vue } from 'vue-property-decorator'
import SimpleSearchComponent from '@/components/simpleSearch/simpleSearch.vue'
import PaginationTableComponent from '@/components/paginationTable/paginationTable.vue'
import TaxRuleService from '@/shared/services/taxRuleService'
import { AxiosResponse } from 'axios'
@Component({
  components: {
    'simple-search': SimpleSearchComponent,
    PaginationTableComponent
  }
})
export default class TaxRuleComponent extends Vue {
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
        // @ts-ignore
        this.$vueOnToast.pop('success', this.$t('toastMessages.taxRuleRemoved'))
        // @ts-ignore
        this.$refs.paginationTable.retrieveData()
      } else {
        // @ts-ignore
        this.$vueOnToast.pop('error', this.$t('toastMessages.taxRuleError'))
      }
    })
  }
}
