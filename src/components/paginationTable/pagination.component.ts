import Component, { mixins } from 'vue-class-component'
import { Vue, Watch } from 'vue-property-decorator'
import * as Tables from '@/shared/tabelsDefinitions'
import CommonHelpers from '@/shared/commonHelpers'

@Component({
  props: {
    page: Number,
    total: Number,
    totalPages: Number,
    table: String,
    perPage: Number,
    tableFields: Object
  }
})
export default class PaginationComponent extends mixins(CommonHelpers, Vue) {
  public currentPage: number;
  public itemsPerPage: number;
  public tables: any;
  public columnsConfig: [];

  constructor (props: any) {
    super(props)
    this.currentPage = 0
    this.itemsPerPage = 10
    this.columnsConfig = []
    this.tables = Tables
  }

  /*
  * Name: first
  * arg:
  * description: calculate which item is showing
  * Author: Nick Dam
  */
  get first () {
    this.currentPage = this.$props.page
    const first = (this.currentPage) * this.itemsPerPage <= 0 ? 1 : (this.currentPage) * this.itemsPerPage
    return first
  }

  /*
  * Name: second
  * arg:
  * description: calculate how many items are showing
  * Author: Nick Dam
  */
  get second () {
    const second = (this.currentPage + 1) * this.itemsPerPage < this.$props.total ? (this.currentPage + 1) * this.itemsPerPage : this.$props.total
    return second
  }

  mounted () {
    this.fillTableConfig(this.$props.tableFields)
  }

  /*
  * Name: fillTableConfig
  * arg: config -> table configuration
  * description: render list of table columns visibility
  * Author: Nick Dam
  */
  @Watch('tableFields', { immediate: true, deep: true })
  public fillTableConfig (config: any) {
    const columns: any = []
    if (config) {
      this.itemsPerPage = this.$props.perPage
      for (const key in config) {
        if (config.hasOwnProperty(key) && key !== 'itemsPerPage') {
          columns.push({
            visible: config[key],
            id: key
          })
        }
      }
      this.columnsConfig = columns
    }
  }

  /*
  * Name: changeVisibility
  * arg: item => item to be changed
  * description: change specific column visibility
  * Author: Nick Dam
  */
  public async changeVisibility (item: any) {
    await this.changeColumnVisibility(item, this.$props.table)
    this.$emit('update')
  }

  /*
  * Name: changeItemsPerPage
  * arg: e -> event
  * description: Change items per page displayed
  * Author: Nick Dam
  */
  @Watch('perPage', { immediate: true, deep: true })
  public changeItemsPerPage (e: any) {
    let config: any = localStorage.getItem('tableColumns')
    if (config) config = JSON.parse(config)
    this.itemsPerPage = e.currentTarget ? parseInt(e.currentTarget.value) : this.$props.perPage
    config[this.$props.table].itemsPerPage = this.itemsPerPage
    localStorage.setItem('tableColumns', JSON.stringify(config))
    this.changePage(0)
  }

  /*
  * Name: toFirstPage
  * arg:
  * description: Reseting pagination to page 0
  * Author: Nick Dam
  */
  public toFirstPage () {
    this.changePage(0)
  }

  /*
  * Name: backPage
  * arg:
  * description: go to previous page
  * Author: Nick Dam
  */
  public backPage () {
    if (this.currentPage - 1 >= 0) this.changePage(this.currentPage - 1)
  }

  /*
  * Name: toLastPage
  * arg:
  * description: go to last page
  * Author: Nick Dam
  */
  public toLastPage () {
    this.changePage(this.$props.totalPages - 1)
  }

  /*
  * Name: nextPage
  * arg:
  * description: go to next page
  * Author: Nick Dam
  */
  public nextPage () {
    if (this.currentPage + 1 < this.$props.totalPages) this.changePage(this.currentPage + 1)
  }

  /*
  * Name: changePage
  * arg: page
  * description: go to given page
  * Author: Nick Dam
  */
  public changePage (page: any) {
    const pagination = {
      page: this.currentPage + 1 <= this.$props.totalPages ? page : this.$props.totalPages - 1,
      size: this.itemsPerPage,
      sort: ['id,desc']
    }
    this.$emit('changePage', pagination)
  }
}
