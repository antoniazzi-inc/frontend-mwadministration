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
  public active:boolean
  public helpCategoryService = HelpCategoryService.getInstance()
  constructor () {
    super()
    this.active = false
  }

  public mounted () {
    this.retrieveData()
    this.active = true
  }

  public retrieveData () {

  }

  public resetHelpCategory () {}
  public searchHelpCategory (query: string) {
    const fields: string[] = ['helpCategoryLanguages.name']
    const q: string = this.makeSimpleSearchQuery(fields, query)
    // @ts-ignore
    this.$refs.paginationTable.retrieveData('api/administrationms/api/help-categories', undefined, q)
  }

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
