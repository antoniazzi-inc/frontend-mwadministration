import { Component, Vue } from 'vue-property-decorator'
import RelationService from '@/shared/services/relationService'
import PaginationTableComponent from '@/components/paginationTable/paginationTable.vue'
import { AxiosResponse } from 'axios'
import { mixins } from 'vue-class-component'
import CommonHelpers from '@/shared/commonHelpers'
import SimpleSearchComponent from '@/components/simpleSearch/simpleSearch.vue'
import { ISearchableSelectConfig, SearchableSelectConfig } from '@/shared/models/SearchableSelectConfig'
import SearchableSelectComponent from '@/components/searchableSelect/searchableSelect.vue'
import complexSearchComponent from '@/entities/relationms/relation/complexSearch/complexSearch.vue'
import { EventBus } from '@/shared/eventBus'
import ComplexSearchComponent from "@/components/complexSearchWidget/complexSearch.vue";

@Component({
  components: {
    complexSearch: complexSearchComponent,
    PaginationTableComponent,
    'simple-search': SimpleSearchComponent,
    SearchableSelectComponent,
    ComplexSearchComponent
  },
  beforeRouteEnter (to, from, next) {
    next((vm: any) => {
      if (to.query.groupId) {
        vm.populateSearch(to.query.groupId)
      }
    })
  }
})
export default class RelationComponent extends mixins(CommonHelpers, Vue) {
  public relationService: any
  public searchableTagsConfig: ISearchableSelectConfig
  public searchableCatsConfig: ISearchableSelectConfig
  public searchableGroupsConfig: ISearchableSelectConfig
  public currentSearchName: string
  public currentSearchEmail: string
  public currentSearchGroups: any
  public currentSearchTags: any[]
  public selectedTags: any[]
  public selectedGroups: any[]
  public selectedCategories: any
  public currentSearchCategory: string
  public active: boolean
  public showQueryPopupForSimpleQueries: boolean
  public showSearchQueries: boolean
  public complexFilter = {
    operator: 'and',
    children: []
  };

  public queryName = '';
  public complexId = 0;
  constructor () {
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
    this.selectedGroups = []
    this.selectedCategories = null
    this.active = true
    this.showQueryPopupForSimpleQueries = false
    this.showSearchQueries = false
    this.relationService = RelationService.getInstance()
  }

  public mounted () {
    EventBus.$on('refreshRelations', (content: any) => {
      if (content === 'FAILED') {
        this.setAlert('relationsImportError', 'error')
      } else {
        this.setAlert('relationsImported', 'success')
      }
    })
    // @ts-ignore
     this.$refs.paginationTable.retrieveData('api/relationms/api/relations', undefined, undefined)
  }

  public populateSearch (groupId:any) {
    let self = this
    let ind = this.$store.state.lookups.groups.findIndex((e:any)=> e.id === parseInt(groupId))
    if(ind > -1) {
      this.selectedGroups = this.$store.state.lookups.groups[ind]
      this.currentSearchGroups = groupId
      setTimeout(function () {
        self.simpleSearch()
      }, 150)
    }
  }
  public simpleSearch () {
    const queryArray: any = []
    if (this.currentSearchName !== '') {
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
    if (this.currentSearchGroups) {
      const groups: any = []
      queryArray.push({
        mainOperator: 'and',
        children: [{
          key: 'relationGroups.id',
          value: this.currentSearchGroups,
          inBetweenOperator: '=in=',
          afterOperator: '',
          exactSearch: false
        }]
      })
    }
    if (this.currentSearchCategory !== '') {
      queryArray.push({
        mainOperator: 'and',
        children: [{
          key: 'relationProfile.categoryId',
          value: this.currentSearchCategory,
          inBetweenOperator: '==',
          afterOperator: '',
          exactSearch: true
        }]
      })
    }
    if (this.currentSearchTags.length > 0) {
      const tags: any = []
      $.each(this.currentSearchTags, function (k, v) {
        tags.push(v.id)
      })
      queryArray.push({
        mainOperator: '',
        children: [{
          key: 'relationProfile.categoryId',
          value: tags.join(),
          inBetweenOperator: '=in=',
          afterOperator: '',
          exactSearch: false
        }]
      })
    }
    const finalQ = this.queryBuilder(queryArray)
    // @ts-ignore
    this.$refs.paginationTable.retrieveData('api/relationms/api/relations', undefined, finalQ)
  }

  public clear () {
    this.currentSearchEmail = ''
    this.currentSearchName = ''
    this.currentSearchTags = []
    this.selectedTags = []
    this.currentSearchCategory = ''
    this.selectedCategories = null
    this.currentSearchGroups = null
    this.selectedGroups = []
    // @ts-ignore
    this.$refs.paginationTable.retrieveData('api/relationms/api/relations', undefined, undefined)
  }

  public editRelation (rel: any) {
    this.$router.push({ name: 'EditRelations', params: { id: rel.id } })
  }

  public deleteRelation (rel: any) {
    if(!rel) return false
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

  public tagSearchChanged (tag: any) {
    this.currentSearchTags.push(tag)
  }

  public tagSearchRemoved (tag: any) {
    let index = null
    $.each(this.currentSearchTags, function (k, v) {
      if (v.id === tag.id) {
        index = k
      }
    })
    if (index !== null) {
      this.currentSearchTags.splice(index, 1)
    }
  }

  public groupSearchChanged (group: any) {
    this.currentSearchGroups= group
  }

  public groupSearchRemoved (group: any) {
    this.currentSearchGroups = null
  }

  public categorySearchChanged (category: any) {
    this.selectedCategories = category
    this.currentSearchCategory += category.id
  }

  public categorySearchRemoved () {
    this.selectedCategories = null
    this.currentSearchCategory = ''
  }

  public startComplexSearch (query: any) {
    if(!query) return
    // @ts-ignore
    this.$refs.paginationTable.retrieveData('api/relationms/api/relations', undefined, query)
  }

  public openSearchQueries (isForSimpleQueries: any) {
    this.showQueryPopupForSimpleQueries = isForSimpleQueries
    this.showSearchQueries = true;
    (<any> this.$refs.searchQueries).show()
  }
}
