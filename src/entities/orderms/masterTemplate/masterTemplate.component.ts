import { Component, Vue } from 'vue-property-decorator'
import SimpleSearchComponent from '@/components/simpleSearch/simpleSearch.vue'
import PaginationTableComponent from '@/components/paginationTable/paginationTable.vue'
import { AxiosResponse } from 'axios'
import MasterTemplateService from '@/shared/services/masterTemplateService'
import { mixins } from 'vue-class-component'
import CommonHelpers from '@/shared/commonHelpers'
import MasterTemplate, {IMasterTemplate} from "@/shared/models/orderms/MasterTemplateModel";
import HtmlEditorComponent from "@/components/htmlEditor/htmlEditor.vue";
@Component({
  components: {
    'simple-search': SimpleSearchComponent,
    PaginationTableComponent,
    HtmlEditorComponent
  }
})
export default class MasterTemplateComponent extends mixins(Vue, CommonHelpers) {
  $refs!: {
    paginationTable: PaginationTableComponent;
    masterTemplateModal: HTMLElement;
  }
  public active:boolean
  public masterTemplateService: any
  public masterTemplate: IMasterTemplate
  constructor () {
    super()
    this.active=false
    this.masterTemplate= new MasterTemplate()
    this.masterTemplateService = MasterTemplateService.getInstance()
  }
  public mounted(){
    this.active = true
  }
  public searchMasterTemplate (query: string) {
    const fields: string[] = ['name']
    const q: string = this.makeSimpleSearchQuery(fields, query)
    // @ts-ignore
    this.$refs.paginationTable.retrieveData('api/orderms/api/master-templates', undefined, q)
  }

  public editMasterTemplate (masterTemplate: any) {
    this.$router.push({ name: 'NewMasterTemplates', params: { id: masterTemplate.id } })
  }

  public deleteMasterTemplate (masterTemplate: any) {
    this.masterTemplateService.delete(masterTemplate.id).then((resp: AxiosResponse) => {
      if (resp) {
        this.setAlert('masterTemplateRemoved', 'success')
      } else {
        this.setAlert('helpTagError', 'error')
      }
    })
  }
}
