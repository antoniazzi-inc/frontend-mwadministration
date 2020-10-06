import {Component, Vue} from 'vue-property-decorator'
import RelationService from '@/shared/services/relationService'
import PaginationTableComponent from '@/components/paginationTable/paginationTable.vue'
import {AxiosResponse} from 'axios'
import {mixins} from 'vue-class-component'
import CommonHelpers from '@/shared/commonHelpers'
import SimpleSearchComponent from '@/components/simpleSearch/simpleSearch.vue'
import {ISearchableSelectConfig, SearchableSelectConfig} from '@/shared/models/SearchableSelectConfig'
import SearchableSelectComponent from '@/components/searchableSelect/searchableSelect.vue'
import complexSearchComponent from '@/entities/relationms/relation/complexSearch/complexSearch.vue'
import {EventBus} from '@/shared/eventBus'
import ComplexSearchComponent from "@/components/complexSearchWidget/complexSearch.vue";
import AddToGroupComponent from "@/entities/relationms/relation/relationListActions/addToGroupComponent/addToGroup.vue";
import RemoveFromGroupComponent
  from "@/entities/relationms/relation/relationListActions/removeFromGroupComponent/removeFromGroup.vue";
import BulkChangeComponent from "@/entities/relationms/relation/relationListActions/bulkChangeComponent/bulkChange.vue";
import DeleteRelationsComponent
  from "@/entities/relationms/relation/relationListActions/deleteRelationsComponent/deleteRelations.vue";
import ExportToExcelComponent
  from "@/entities/relationms/relation/relationListActions/exportToExcelComponent/exportToExcel.vue";
import SendMailingComponent
  from "@/entities/relationms/relation/relationListActions/sendMailingComponent/sendMailing.vue";
import StartListManagerComponent
  from "@/entities/relationms/relation/relationListActions/startListManagerComponent/startListManager.vue";
import StartWorkflowComponent
  from "@/entities/relationms/relation/relationListActions/startWorkflowComponent/startWorkflow.vue";

@Component({
  components: {
    complexSearch: complexSearchComponent,
    PaginationTableComponent,
    'simple-search': SimpleSearchComponent,
    SearchableSelectComponent,
    ComplexSearchComponent,
    AddToGroupComponent,
    RemoveFromGroupComponent,
    BulkChangeComponent,
    DeleteRelationsComponent,
    ExportToExcelComponent,
    SendMailingComponent,
    StartListManagerComponent,
    StartWorkflowComponent
  },
  beforeRouteEnter(to, from, next) {
    next((vm: any) => {
      if (to.query.groupId) {
        vm.groupsSeach = true
        vm.populateSearch(to.query.groupId)
      }
    })
  }
})
export default class RelationComponent extends mixins(CommonHelpers, Vue) {
  refs!: {
    actionModal: HTMLElement
  }
  public relationService: any
  public searchableTagsConfig: ISearchableSelectConfig
  public searchableCatsConfig: ISearchableSelectConfig
  public searchableGroupsConfig: ISearchableSelectConfig
  public currentSearchName: string
  public currentSearchEmail: string
  public currentSearchGroups: any
  public currentSearchTags: any[]
  public selectedTags: any[]
  public selectedGroups: any
  public selectedCategories: any
  public currentSearchCategory: string
  public active: any
  public selectedAction: any
  public showQueryPopupForSimpleQueries: boolean
  public showSearchQueries: boolean
  public groupsSeach: boolean
  public complexFilter = {
    operator: 'and',
    children: []
  };

  public queryName = '';
  public complexId = 0;

  constructor() {
    super()
    this.searchableTagsConfig = new SearchableSelectConfig('code',
      'labels.selectTags', '', false,
      false, true, true, false)
    this.searchableCatsConfig = new SearchableSelectConfig('code',
      'labels.selectCategory', '', false,
      false, true, false, false)
    this.searchableGroupsConfig = new SearchableSelectConfig('name',
      'labels.selectGroups', '', false,
      false, true, false, false)
    this.currentSearchName = ''
    this.currentSearchEmail = ''
    this.currentSearchTags = []
    this.currentSearchGroups = null
    this.selectedTags = []
    this.currentSearchCategory = ''
    this.selectedAction = ''
    this.selectedGroups = []
    this.selectedCategories = null
    this.active = null
    this.showQueryPopupForSimpleQueries = false
    this.showSearchQueries = false
    this.groupsSeach = false
    this.relationService = RelationService.getInstance()
  }

  public mounted() {
    EventBus.$on('refreshRelations', (content: any) => {
      if (content === 'FAILED') {
        this.setAlert('relationsImportError', 'error')
      } else {
        this.setAlert('relationsImported', 'success')
      }
    })
    let simpleSearchQuery = this.reverseSimpleSearchQuery('relation')
    if (simpleSearchQuery.length && !this.groupsSeach) {
      this.currentSearchName = simpleSearchQuery.find((e: any) => e.id === 'currentSearchName') ? simpleSearchQuery.find((e: any) => e.id === 'currentSearchName').value : ''
      this.currentSearchEmail = simpleSearchQuery.find((e: any) => e.id === 'currentSearchEmail') ? simpleSearchQuery.find((e: any) => e.id === 'currentSearchEmail').value : ''
      this.selectedGroups = simpleSearchQuery.find((e: any) => e.id === 'selectedGroups') ? simpleSearchQuery.find((e: any) => e.id === 'selectedGroups').value : null
      this.selectedCategories = simpleSearchQuery.find((e: any) => e.id === 'selectedCategories') ? simpleSearchQuery.find((e: any) => e.id === 'selectedCategories').value : null
      this.selectedTags = simpleSearchQuery.find((e: any) => e.id === 'selectedTags') ? simpleSearchQuery.find((e: any) => e.id === 'selectedTags').value : []
      this.simpleSearch()
    } else {
      if(!this.groupsSeach)
        this.active = true
    }
  }

  public populateSearch(groupId: any) {
    let ind = this.$store.state.lookups.groups.findIndex((e: any) => e.id === parseInt(groupId))
    if (ind > -1) {
      this.clear(true)
      this.selectedGroups = this.$store.state.lookups.groups[ind]
      this.currentSearchGroups = groupId
      if(this.groupsSeach) this.simpleSearch()
    }
  }

  public updateAction(action: any) {
    this.selectedAction = action
    //@ts-ignore
    $(this.$refs.actionModal).modal('show')
  }

  public simpleSearch() {
    let queryArray: any = []
    let simpleSearchQuery: any = []
    if (this.currentSearchName !== '') {
      simpleSearchQuery.push({
        id: 'currentSearchName',
        value: this.currentSearchName
      })
      queryArray.push({
        mainOperator: 'and',
        children: [{
          key: 'relationProfile.firstName',
          value: this.currentSearchName,
          inBetweenOperator: '==',
          afterOperator: 'or',
          exactSearch: false
        }, {
          key: 'relationProfile.lastName',
          value: this.currentSearchName,
          inBetweenOperator: '==',
          afterOperator: 'or',
          exactSearch: false
        }, {
          key: 'relationProfile.middleName',
          value: this.currentSearchName,
          inBetweenOperator: '==',
          afterOperator: '',
          exactSearch: false
        }]
      })
    }
    if (this.currentSearchEmail !== '') {
      simpleSearchQuery.push({
        id: 'currentSearchEmail',
        value: this.currentSearchEmail
      })
      queryArray.push({
        mainOperator: 'and',
        children: [{
          key: 'email',
          value: this.currentSearchEmail,
          inBetweenOperator: '==',
          afterOperator: '',
          exactSearch: false
        }]
      })
    }
    if (this.selectedGroups && this.selectedGroups.id) {
      simpleSearchQuery.push({
        id: 'selectedGroups',
        value: this.selectedGroups
      })
      const groups: any = []
      queryArray.push({
        mainOperator: 'and',
        children: [{
          key: 'relationGroups.id',
          value: this.selectedGroups.id,
          inBetweenOperator: '=in=',
          afterOperator: '',
          exactSearch: false
        }]
      })
    }
    if (this.selectedCategories && this.selectedCategories.id) {
      simpleSearchQuery.push({
        id: 'selectedCategories',
        value: this.selectedCategories
      })
      queryArray.push({
        mainOperator: 'and',
        children: [{
          key: 'relationProfile.categoryId',
          value: this.selectedCategories.id,
          inBetweenOperator: '==',
          afterOperator: '',
          exactSearch: true
        }]
      })
    }
    if (this.selectedTags.length > 0) {
      simpleSearchQuery.push({
        id: 'selectedTags',
        value: this.selectedTags
      })
      let tags: any = []
      $.each(this.selectedTags, function (k, v) {
        tags.push(v.id)
      })
      queryArray.push({
        mainOperator: '',
        children: [{
          key: 'relationTags.id',
          value: tags.join().replace('\"', ''),
          inBetweenOperator: '=in=',
          afterOperator: '',
          exactSearch: false
        }]
      })
    }
    const finalQ = this.queryBuilder(queryArray)
    // @ts-ignore
    this.$refs.paginationTable.retrieveData('api/relationms/api/relations', undefined, finalQ)
    this.updateSimpleSearchQuery('relation', simpleSearchQuery)
  }

  public clear(update?:boolean) {
    this.currentSearchEmail = ''
    this.currentSearchName = ''
    this.currentSearchTags = []
    this.selectedTags = []
    this.currentSearchCategory = ''
    this.selectedCategories = null
    this.currentSearchGroups = null
    this.selectedGroups = []
    this.removeSimpleSearchQuery('relation')
    // @ts-ignore
   if(!update) this.$refs.paginationTable.retrieveData('api/relationms/api/relations', undefined, undefined)
  }

  public editRelation(rel: any) {
    this.$router.push({name: 'EditRelations', params: {id: rel.id}})
  }

  public deleteRelation(rel: any) {
    if (!rel) return false
    this.active = false
    if (rel.id) {
      if (rel.id === this.$store.state.userIdentity.id) {
        return this.setAlert('cannotDeleteThisUser', 'error')
      }
      this.relationService.delete(rel.id).then((resp: AxiosResponse) => {
        this.active = true
        if (resp) {
          this.setAlert('relationRemoved', 'success')
        } else {
          this.setAlert('relationRemoveError', 'error')
        }
      })
    }
  }

  public tagSearchChanged(tag: any) {
    this.currentSearchTags.push(tag)
    this.selectedTags.push(tag)
  }

  public tagSearchRemoved(tag: any) {
    let index = null
    $.each(this.currentSearchTags, function (k, v) {
      if (v.id === tag.id) {
        index = k
      }
    })
    if (index !== null) {
      this.currentSearchTags.splice(index, 1)
      this.selectedTags.splice(index, 1)
    }
  }

  public groupSearchChanged(group: any) {
    this.selectedGroups = group
    this.currentSearchGroups = group
  }

  public groupSearchRemoved(group: any) {
    this.selectedGroups = null
    this.currentSearchGroups = null
  }

  public categorySearchChanged(category: any) {
    this.selectedCategories = category
    this.currentSearchCategory += category.id
  }

  public categorySearchRemoved() {
    this.selectedCategories = null
    this.currentSearchCategory = ''
  }

  public startComplexSearch(query: any) {
    if (!query) return
    // @ts-ignore
    this.$refs.paginationTable.retrieveData('api/relationms/api/relations', undefined, query)
  }

  public openSearchQueries(isForSimpleQueries: any) {
    this.showQueryPopupForSimpleQueries = isForSimpleQueries
    this.showSearchQueries = true;
    (<any>this.$refs.searchQueries).show()
  }

  public updateCurrentAction(obj: any) {

  }
}
