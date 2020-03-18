import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import CommonHelpers from '@/shared/commonHelpers'
import * as Tables from '@/shared/tabelsDefinitions'
import Chrome from 'vue-color/src/components/Chrome'
import SimpleSearchComponent from '@/components/simpleSearch/simpleSearch.vue'
import PaginationComponent from '@/components/paginationTable/pagination.vue'
@Component({
  components: {
    'simple-search': SimpleSearchComponent,
    'chrome-pciker': Chrome,
    pagination: PaginationComponent
  },
  props: {
    service: Object,
    active: {
      type: Boolean
    },
    table: {
      type: String
    }
  }
})
export default class PaginationTableComponent extends mixins(Vue, CommonHelpers) {
  protected props ={
    table: String,
    active: Boolean
  }

  $refs!: {
    deleteModal: HTMLElement;
  }

  public totalItems: number;
  public nextPage: number;
  public itemsPerPage: number|string;
  public currentPage: number;
  public totalPages: number;
  public helpers: object;
  public tables: object;
  public itemToDelete: object|any;
  public allData: any[];
  public data: any[];
  public isLoading: boolean;
  constructor () {
    super()
    this.totalItems = 1
    this.itemsPerPage = 10
    this.currentPage = 0
    this.totalPages = 1
    this.nextPage = -1
    this.data = []
    this.allData = []
    this.tables = Tables
    this.itemToDelete = null
    this.isLoading = true
    this.helpers = new CommonHelpers()
  }

  public checkAuthority (authority: []) {
    return this.hasAuthority(authority)
  }

  @Watch('active', { immediate: true, deep: true })
  public retrieveData (newVal: string|boolean, pagination: any, query?: string) {
    if (this.$props.active) {
      if (!pagination) {
        pagination = {
          page: 0,
          size: this.itemsPerPage,
          sort: ['id,desc']
        }
      }
      this.$props.service.getAll(pagination, query).then((resp: any) => {
        this.totalItems = resp.data.totalElements
        this.currentPage = resp.data.pageable.pageNumber
        this.totalPages = resp.data.totalPages
        this.itemsPerPage = resp.data.pageable.pageSize
        this.data = resp.data.content
        this.allData = resp.data.content
        this.isLoading = false
      }).catch((err:any)=>{
        this.isLoading = false
      })
    }
  }

  public itemAction (action: string, item: any) {
    switch (action) {
      case 'onEdit':
        this.$emit('onEdit', item)
        break
      case 'onCopy':
        this.$emit('onCopy', item)
        break
      case 'onDelete':
        this.$emit('onDelete', item)
        this.itemToDelete = null
        this.closeDeleteModal()
        break
      case 'onInfo':
        this.$emit('onInfo', item)
        break
    }
  }

  public  getMultiLangFieldName (col: any, item: any) {
    let result: any = []
    if (col.subField === null) {
      result =  this.getMultiLangName(item[col.field]).name
    } else {
      // @ts-ignore
      result = this.getMultiLangName(item[col.field])[col.subField]
    }
    if (Array.isArray(result)) {
      if (result.length > 0) {
        result = result.join(', ')
      } else {
        result = ''
      }
    }
    return result
  }

  public onChangePage (pagination: any) {
    console.log('onChangePage')
    this.retrieveData('api/administrationms/api/categories', pagination)
  }

  public prepareRemove (item: any) {
    this.itemToDelete = item
  }

  public closeDeleteModal () {
    // @ts-ignore
    $(this.$refs.deleteModal).modal('hide')
  }
}
