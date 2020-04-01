import { Component, Vue } from 'vue-property-decorator'
import AdministrationService from '@/shared/services/administrationService'
import SimpleSearchComponent from '@/components/simpleSearch/simpleSearch.vue'
import PaginationTableComponent from '@/components/paginationTable/paginationTable.vue'
import { AxiosResponse } from 'axios'
import { mixins } from 'vue-class-component'
import CommonHelpers from '@/shared/commonHelpers'
@Component({
  components: {
    'simple-search': SimpleSearchComponent,
    PaginationTableComponent
  }
})
export default class AdministrationsComponent extends mixins(Vue, CommonHelpers) {
  $refs!: {
    paginationTable: PaginationTableComponent;
  }

  public administrationService: any
  constructor () {
    super()
    this.administrationService = AdministrationService.getInstance()
  }

  public searchAdministration (q: any) {}
  public editAdministration (tax: any) {
    this.$router.push({ name: 'EditAdministration', params: { id: tax.id } })
  }

  public removeAdministration (administration: any) {
    this.administrationService.delete(administration.id).then((resp: AxiosResponse) => {
      if (resp) {
        this.setAlert('administrationRemoved', 'success')
      } else {
        this.setAlert('administrationError', 'error')
      }
    })
  }
}
