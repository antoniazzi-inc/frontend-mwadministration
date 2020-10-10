import {Component, Vue, Watch} from 'vue-property-decorator'
import {mixins} from 'vue-class-component'
import CommonHelpers from '@/shared/commonHelpers'
import * as Tables from '@/shared/tabelsDefinitions'
import Chrome from 'vue-color/src/components/Chrome'
import SimpleSearchComponent from '@/components/simpleSearch/simpleSearch.vue'
import PaginationComponent from '@/components/paginationTable/pagination.vue'
import {AxiosResponse} from "axios";
import axios from "axios";
import ComplexSearchService from "@/shared/services/complexSearchService";

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
  $refs!: {
    deleteModal: HTMLElement;
  }
  public totalItems: number;
  public nextPage: number;
  public itemsPerPage: any;
  public currentPage: number;
  public totalPages: number;
  public selectAll: boolean;
  public tables: any;
  public tableFields: any;
  public complexSearchService: any;
  public itemToDelete: object | any;
  public allData: any[];
  public selectedRows: any[];
  public data: any[];
  public isLoading: boolean;
  protected props = {
    table: String,
    active: Boolean
  }

  constructor() {
    super()
    this.totalItems = 1
    this.itemsPerPage = 10
    this.currentPage = 0
    this.totalPages = 1
    this.nextPage = -1
    this.data = []
    this.allData = []
    this.selectedRows = []
    this.tables = Tables
    this.itemToDelete = null
    this.isLoading = true
    this.selectAll = false
    this.tableFields = {}
    this.complexSearchService = ComplexSearchService.getInstance()
  }

  /*
    * Name: selectAllVisible
    * arg: selectAll -> checkbox event
    * description: select all rows in order to take action over
    * Author: Nick Dam
    */
  public selectAllVisible(e: any) {
    this.selectAll = e.currentTarget.checked
    if (e.currentTarget.checked) {
      this.selectedRows = this.allData.map((row: any, ind: number) => {
        return {id: row.id, index: ind}
      })
    } else {
      this.selectedRows = []
    }
    console.log(this.selectedRows)
  }

  public checkSelectAllStatus() {
    if (this.allData.length === this.selectedRows.length) {
      this.selectAll = true
    } else {
      this.selectAll = false
    }
  }

  public toggleSelectRow(rowItemId: any, rowIndex: any) {
    let ind = this.selectedRows.findIndex((r: any) => r.id === rowItemId)
    if (ind === -1) {
      this.selectedRows.push({id: rowItemId, index: rowIndex})
    } else {
      this.selectedRows.splice(ind, 1)
    }
    this.checkSelectAllStatus()
  }

  public selectRow(e: any, rowItemId: any, rowIndex: any) {
    let ind = this.selectedRows.findIndex((r: any) => r.id === rowItemId)
    if (e.currentTarget.checked) {
      this.selectedRows.push({id: rowItemId, index: rowIndex})
    } else {
      if (ind > -1) {
        this.selectedRows.splice(ind, 1)
      }
    }
    this.checkSelectAllStatus()
  }

  @Watch('active', {immediate: false, deep: true})
  public retrieveData(newVal: string | boolean, pagination: any, query?: string) {
    if (this.$props.active || this.$props.active === null) {
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
        this.allData = resp.data.content
        this.totalPages = resp.data.totalPages
        this.isLoading = false
        this.data = resp.data.content
        this.itemsPerPage = resp.data.pageable.pageSize
        if(this.selectAll) {
          this.selectAllVisible({currentTarget: {checked: true}})
        }
      }).catch(() => {
        this.isLoading = false
      })
    }
  }

  public created() {
    this.tableFields = this.getTableVisibilityFields(this.$props.table)
    this.itemsPerPage = (this.tableFields) ? this.tableFields.itemsPerPage : 10
  }

  public itemAction(action: string, item: any) {
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
      case 'onViewMembers':
        this.$emit('onViewMembers', item)
        break
    }
  }

  public async rerenderPage() {
    this.tableFields = await this.getTableVisibilityFields(this.$props.table)
    this.$forceUpdate()
  }

  public onChangePage(pagination: any) {
    this.retrieveData('api/administrationms/api/categories', pagination)
  }
  public complexSearch(url:any, query: any) {
    query = {
      ...query,
      page: this.currentPage,
      size: this.itemsPerPage,
      sort: 'id,desc'
    }
    this.complexSearchService.searchRelations(url, query).then((resp:AxiosResponse) => {
      if(resp && resp.data) {
        this.totalItems = resp.data.totalElements
        this.currentPage = resp.data.pageable.pageNumber
        this.allData = resp.data.content
        this.totalPages = resp.data.totalPages
        this.isLoading = false
        this.data = resp.data.content
        this.itemsPerPage = resp.data.pageable.pageSize
        if(this.selectAll) {
          this.selectAllVisible({currentTarget: {checked: true}})
        }
      }
    })
  }

  public updateTableAction(item: any) {
    this.$emit('updateTableAction', item)
  }

  public prepareRemove(item: any) {
    this.itemToDelete = item
  }

  public closeDeleteModal() {
    // @ts-ignore
    $(this.$refs.deleteModal).modal('hide')
  }

  public checkVisibility(col: any) {
    const tableFields = this.getTableVisibilityFields(this.$props.table)
    return tableFields[col.field]
  }
}
