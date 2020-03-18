import { Component, Vue } from 'vue-property-decorator'
import PaginationTableComponent from '@/components/paginationTable/paginationTable.vue'
import { AxiosResponse } from 'axios'
import SimpleSearchComponent from '@/components/simpleSearch/simpleSearch.vue'
import RegionService from '@/shared/services/regionService'
@Component({
  components: {
    'simple-search': SimpleSearchComponent,
    PaginationTableComponent
  }
})
export default class RegionComponent extends Vue {
  $refs!: {
    paginationTable: PaginationTableComponent;
  }

  public regionService: any
  constructor () {
    super()
    this.regionService = RegionService.getInstance()
  }

  public searchRegion (q: any) {}
  public editRegion (tax: any) {
    this.$router.push({ name: 'EditRegion', params: { id: tax.id } })
  }

  public removeRegion (tax: any) {
    this.regionService.delete(tax.id).then((resp: AxiosResponse) => {
      if (resp) {
        // @ts-ignore
        this.$vueOnToast.pop('success', this.$t('toastMessages.regionRemoved'))
        // @ts-ignore
        this.$refs.paginationTable.retrieveData()
      } else {
        // @ts-ignore
        this.$vueOnToast.pop('error', this.$t('toastMessages.regionError'))
      }
    })
  }
}
