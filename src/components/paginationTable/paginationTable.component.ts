import { Component, Vue, Watch } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import CommonHelpers from '@/shared/commonHelpers'
import * as Tables from '@/shared/tabelsDefinitions'
import Chrome from 'vue-color/src/components/Chrome'
import SimpleSearchComponent from '@/components/simpleSearch/simpleSearch.vue'
import PaginationComponent from '@/components/paginationTable/pagination.vue'
import { CustomField, CustomFieldType } from '@/shared/models/relationms/custom-field.model'
import { Language } from '@/shared/models/language.model'
import moment from 'moment'
import { CustomFieldOption } from '@/shared/models/relationms/custom-field-option.model'

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
    searchQuery: {
      type: String
    },
    table: {
      type: String
    },
    noDataLabel: {
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
  public itemsPerPage: any;
  public currentPage: number;
  public totalPages: number;
  public tables: any;
  public tableFields: any;
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
    this.tableFields = {}
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
      if (!query && this.$props.searchQuery) {
        query = this.$props.searchQuery
      }
      this.$props.service.getAll(pagination, query).then((resp: any) => {
        this.totalItems = resp.data.totalElements
        this.currentPage = resp.data.pageable.pageNumber
        this.totalPages = resp.data.totalPages
        this.itemsPerPage = resp.data.pageable.pageSize
        this.data = resp.data.content
        this.allData = resp.data.content
        this.isLoading = false
      }).catch(() => {
        this.isLoading = false
      })
    }
  }

  public created () {
    this.tableFields = this.getTableVisibilityFields(this.$props.table)
    this.itemsPerPage = (this.tableFields) ? this.tableFields.itemsPerPage : 10
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

  public async rerenderPage () {
    this.tableFields = await this.getTableVisibilityFields(this.$props.table)
    this.$forceUpdate()
  }

  public onChangePage (pagination: any) {
    this.retrieveData('api/administrationms/api/categories', pagination)
  }

  public prepareRemove (item: any) {
    this.itemToDelete = item
  }

  public closeDeleteModal () {
    // @ts-ignore
    $(this.$refs.deleteModal).modal('hide')
  }

  public checkVisibility (col: any) {
    const tableFields = this.getTableVisibilityFields(this.$props.table)
    return (tableFields) ? tableFields[col.field] : false
  }
}
