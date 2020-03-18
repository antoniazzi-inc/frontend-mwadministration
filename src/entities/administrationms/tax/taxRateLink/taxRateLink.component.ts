import { Component, Vue } from 'vue-property-decorator'
import TaxRateLinkService from '@/shared/services/taxRateLinkService'
import { AxiosResponse } from 'axios'
import SimpleSearchComponent from '@/components/simpleSearch/simpleSearch.vue'
import PaginationTableComponent from '@/components/paginationTable/paginationTable.vue'
@Component({
  components: {
    'simple-search': SimpleSearchComponent,
    PaginationTableComponent
  }
})
export default class TaxRateLinkComponent extends Vue {
  $refs!: {
    paginationTable: PaginationTableComponent;
  }

  public taxRateLinkService: any
  constructor () {
    super()
    this.taxRateLinkService = TaxRateLinkService.getInstance()
  }

  public searchTaxRateLink (q: any) {}
  public editTaxRateLink (taxLink: any) {
    this.$router.push({ name: 'EditTaxRateLink', params: { id: taxLink.id } })
  }

  public removeTaxRateLink (taxLink: any) {
    this.taxRateLinkService.delete(taxLink.id).then((resp: AxiosResponse) => {
      if (resp) {
        // @ts-ignore
        this.$vueOnToast.pop('success', this.$t('toastMessages.taxRateLinkRemoved'))
        // @ts-ignore
        this.$refs.paginationTable.retrieveData()
      } else {
        // @ts-ignore
        this.$vueOnToast.pop('error', this.$t('toastMessages.taxRateLinkError'))
      }
    })
  }
}
