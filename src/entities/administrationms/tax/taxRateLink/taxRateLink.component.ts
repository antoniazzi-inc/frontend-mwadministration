import { Component, Vue } from 'vue-property-decorator'
import TaxRateLinkService from '@/shared/services/taxRateLinkService'
import { AxiosResponse } from 'axios'
import SimpleSearchComponent from '@/components/simpleSearch/simpleSearch.vue'
import PaginationTableComponent from '@/components/paginationTable/paginationTable.vue'
import {mixins} from "vue-class-component";
import CommonHelpers from "@/shared/commonHelpers";
@Component({
  components: {
    'simple-search': SimpleSearchComponent,
    PaginationTableComponent
  }
})
export default class TaxRateLinkComponent extends mixins(Vue, CommonHelpers) {
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
        this.setAlert('taxRateLinkRemoved', 'success')
      } else {
        this.setAlert('taxRateLinkError', 'error')
      }
    })
  }
}
