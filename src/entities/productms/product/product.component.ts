import { Component, Vue } from 'vue-property-decorator'

import PaginationTableComponent from '@/components/paginationTable/paginationTable.vue'
import { AxiosResponse } from 'axios'
import { mixins } from 'vue-class-component'
import CommonHelpers from '@/shared/commonHelpers'
import SimpleSearchComponent from '@/components/simpleSearch/simpleSearch.vue'
import { ISearchableSelectConfig, SearchableSelectConfig } from '@/shared/models/SearchableSelectConfig'
import SearchableSelectComponent from '@/components/searchableSelect/searchableSelect.vue'
import complexSearchComponent from '@/entities/relationms/relation/complexSearch/complexSearch.vue'
import ProductService from '@/shared/services/productService'

@Component({
  components: {
    complexSearch: complexSearchComponent,
    PaginationTableComponent,
    'simple-search': SimpleSearchComponent,
    SearchableSelectComponent
  }
})
export default class ProductComponent extends mixins(CommonHelpers, Vue) {
  public productService: any
  public searchableTagsConfig: ISearchableSelectConfig
  public searchableCatsConfig: ISearchableSelectConfig
  public searchableGroupsConfig: ISearchableSelectConfig
  public currentSearchName: string
  public currentSearchEmail: string
  public currentSearchGroups: any[]
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
      false, true, true, false)
    this.searchableGroupsConfig = new SearchableSelectConfig('name',
      'labels.selectGroups', '', false,
      false, true, false, false)
    this.currentSearchName = ''
    this.currentSearchEmail = ''
    this.currentSearchTags = []
    this.currentSearchGroups = []
    this.selectedTags = []
    this.currentSearchCategory = ''
    this.selectedGroups = []
    this.selectedCategories = null
    this.active = true
    this.showQueryPopupForSimpleQueries = false
    this.showSearchQueries = false
    this.productService = ProductService.getInstance()
  }

  public mounted () {

  }

  public simpleSearch () {

  }

  public clear () {
    this.currentSearchEmail = ''
    this.currentSearchName = ''
    this.currentSearchTags = []
    this.selectedTags = []
    this.currentSearchCategory = ''
    this.selectedCategories = null
    this.currentSearchGroups = []
    this.selectedGroups = []
    // @ts-ignore
    this.$refs.paginationTable.retrieveData('api/productms/api/products', undefined, undefined)
  }

  public editProduct (prod: any) {
    this.$router.push({ name: 'EditProduct', params: { id: prod.id } })
  }

  public deleteProduct (prod: any) {
    this.active = false
    if (prod.id) {
      this.productService.delete(prod.id).then((resp: AxiosResponse) => {
        this.active = true
        if (resp) {
          this.setAlert('productRemoved', 'success')
        } else {
          this.setAlert('productRemoveError', 'error')
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
    this.currentSearchGroups.push(group)
  }

  public groupSearchRemoved (group: any) {
    let index = null
    $.each(this.currentSearchGroups, function (k, v) {
      if (v.id === group.id) {
        index = k
      }
    })
    if (index !== null) {
      this.currentSearchGroups.splice(index, 1)
    }
  }

  public categorySearchChanged (category: any) {
    this.selectedCategories = category
    this.currentSearchCategory += category.id
  }

  public categorySearchRemoved () {
    this.selectedCategories = {}
    this.currentSearchCategory = ''
  }

  public startComplexSearch (query: any) {
    console.log(query)
    // @ts-ignore
    this.$refs.paginationTable.retrieveData('api/productms/api/products', undefined, query)
  }

  public openSearchQueries (isForSimpleQueries: any) {
    this.showQueryPopupForSimpleQueries = isForSimpleQueries
    this.showSearchQueries = true;
    (<any> this.$refs.searchQueries).show()
  }
}
