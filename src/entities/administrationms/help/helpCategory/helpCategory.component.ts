import { Component, Vue } from 'vue-property-decorator'
import SimpleSearchComponent from '@/components/simpleSearch/simpleSearch.vue'
import PaginationTableComponent from '@/components/paginationTable/paginationTable.vue'
import { AxiosResponse } from 'axios'
import HelpCategoryService from '@/shared/services/helpCategoryService'
import { mixins } from 'vue-class-component'
import CommonHelpers from '@/shared/commonHelpers'
@Component({
  components: {
    'simple-search': SimpleSearchComponent,
    PaginationTableComponent
  }
})
export default class HelpCategoryComponent extends mixins(Vue, CommonHelpers) {
  $refs!: {
    paginationTable: PaginationTableComponent;
  }

  public helpCategoryService = HelpCategoryService.getInstance()
  constructor () {
    super()
  }

  public mounted () {
    this.retrieveData()
  }

  public retrieveData () {

  }

  public resetHelpCategory () {}
  public searchHelpCategory (query: string) {}
  public editHelpCategory (cat: any) {
    this.$router.push({ name: 'EditHelpCategory', params: { id: cat.id } })
  }

  public deleteHelpCategory (cat: any) {
    this.helpCategoryService.delete(cat.id).then((resp: AxiosResponse) => {
      if (resp) {
        this.setAlert('helpCategoryRemoved', 'success')
      } else {
        this.setAlert('errorHelpCategory', 'error')
      }
    })
  }
}
