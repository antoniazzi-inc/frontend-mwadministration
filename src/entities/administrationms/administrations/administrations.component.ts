import { Component, Vue } from 'vue-property-decorator'
import AdministrationService from "@/shared/services/administrationService";
import SimpleSearchComponent from "@/components/simpleSearch/simpleSearch.vue";
import PaginationTableComponent from "@/components/paginationTable/paginationTable.vue";
import {AxiosResponse} from "axios";
@Component({
  components: {
    'simple-search': SimpleSearchComponent,
    PaginationTableComponent
  }
})
export default class AdministrationsComponent extends Vue {
  $refs!: {
    paginationTable: PaginationTableComponent;
  }

  public administrationService:any
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
        // @ts-ignore
        this.$vueOnToast.pop('success', this.$t('toastMessages.administrationRemoved'))
        // @ts-ignore
        this.$refs.paginationTable.retrieveData()
      } else {
        // @ts-ignore
        this.$vueOnToast.pop('error', this.$t('toastMessages.administrationError'))
      }
    })
  }
}
