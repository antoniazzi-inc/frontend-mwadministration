import { Component, Vue } from 'vue-property-decorator'
import { IWorkflow, Workflow } from '@/shared/models/workflowms/workflow.model'
import WorkflowService from '@/shared/services/workflowService'
import { ISearchableSelectConfig, SearchableSelectConfig } from '@/shared/models/SearchableSelectConfig'
import { ICategoryEntity } from '@/shared/models/administrationms/categoryModel'
import CommonHelpers from '@/shared/commonHelpers'
import { mixins } from 'vue-class-component'
import PaginationTableComponent from '@/components/paginationTable/paginationTable.vue'
import SearchableSelectComponent from '@/components/searchableSelect/searchableSelect.vue'
import SimpleSearchComponent from '@/components/simpleSearch/simpleSearch.vue'
import moment from "moment";

@Component({
  components: {
    PaginationTableComponent,
    SearchableSelectComponent,
    SimpleSearch: SimpleSearchComponent
  }
})
export default class WorkflowsComponent extends mixins(CommonHelpers, Vue) {
  $refs!: {
    paginationTable: PaginationTableComponent;
    //groupModal: HTMLElement;
  }
  public active:boolean
  public searchableConfigCat: ISearchableSelectConfig
  public selectedCategory: ICategoryEntity | null
  public workflowService: any
  public workflow: IWorkflow
  public allWorkflows: IWorkflow[]

  constructor () {
    super()
    this.selectedCategory = null
    this.active = false
    this.searchableConfigCat = new SearchableSelectConfig('code',
      'labels.category', '', false,
      false, true, false, false)
    this.workflowService = WorkflowService.getInstance()
    this.workflow = new Workflow()
    this.allWorkflows = []
  }

  public mounted () {
    this.allWorkflows = [] //this.$store.state.lookups.workflows
    this.active = true
  }

  public doFocus () {
    const self = this
    setTimeout(function () {
      // @ts-ignore
      //self.$refs.name.focus()
    }, 200)
  }

  public async resetWorkflow () {
    this.workflow = new Workflow()
    this.selectedCategory = null
    await this.$validator.reset()
    this.doFocus()
  }

  public searchWorkflows (query: any) {
    console.log('faking...')
    let def = {}
    let now = moment()
    this.allWorkflows.push(new Workflow(1, 1, 'eerste', 'eerste poging', 1, 'OPEN', 0, def, now, now))
  }

  public editWorkflow (workflow: any) {
  }

  public startEditor() {
    this.$router.push({name: 'EditWorkflow', params: {id: '1'}}) //workflow.id}})
  }

  public onViewStatistics (workflow:any) {
    //this.$router.push('/relations?groupId='+group.id)
  }

  public saveWorkflow () {
  }

  public copyWorkflow (workflow: any) {
  }

  public deleteWorkflow (workflow: any) {
  }

  public categoryUpdated (cat: any) {
    this.selectedCategory = cat
  }

  public categoryRemoved (cat: any) {
    this.selectedCategory = null
  }

}
