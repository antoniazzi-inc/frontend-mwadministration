import { Component, Vue } from 'vue-property-decorator'
import PaginationTableComponent from '@/components/paginationTable/paginationTable.vue'
import { AxiosResponse } from 'axios'
import SimpleSearchComponent from '@/components/simpleSearch/simpleSearch.vue'
import RegionService from '@/shared/services/regionService'
import { mixins } from 'vue-class-component'
import CommonHelpers from '@/shared/commonHelpers'
@Component({
  components: {
    'simple-search': SimpleSearchComponent,
    PaginationTableComponent
  }
})
export default class RegionComponent extends mixins(Vue, CommonHelpers) {
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
        this.setAlert('regionRemoved', 'success')
      } else {
        this.setAlert('regionError', 'error')
      }
    })
  }
}
