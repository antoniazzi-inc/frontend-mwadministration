/*
 *
 *  * Copyright 2018-2021 Antoniazzi Holding BV
 *  *
 *  * This program is free software: you can redistribute it and/or modify it
 *  * under the terms of the GNU General Public License as published by
 *  * the Free Software Foundation, either version 3 of the License,
 *  * or (at your option) any later version.
 *  *
 *  * This program is distributed in the hope that it will be useful,
 *  * but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 *  * GNU General Public License for more details.
 *  *
 *  * You should have received a copy of the GNU General Public License
 *  * along with this program. If not, see <https://www.gnu.org/licenses/>.
 *
 */

import Component, {mixins} from 'vue-class-component'
import {Vue, Watch} from 'vue-property-decorator'
import * as Tables from '@/shared/tabelsDefinitions'
import CommonHelpers from '@/shared/commonHelpers'

@Component({
  props: {
    page: Number,
    total: Number,
    totalPages: Number,
    table: String,
    perPage: Number,
    tableFields: Object,
    location: String
  }
})
export default class PaginationComponent extends mixins(CommonHelpers, Vue) {
  public currentPage: number;
  public itemsPerPage: number;
  public clickedIndex: number;
  public sequenceToDisplay: any[];
  public tables: any;
  public columnsConfig: [];
  public actions: any[];

  constructor(props: any) {
    super(props)
    this.currentPage = 0
    this.clickedIndex = 1
    this.itemsPerPage = 10
    this.columnsConfig = []
    this.actions = []
    this.sequenceToDisplay = [1, 2, 3, 4, 5, 6]
    this.tables = Tables
  }

  /*
  * Name: first
  * arg:
  * description: calculate which item is showing
  * Author: Nick Dam
  */
  get first() {
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
  get second() {
    const second = (this.currentPage + 1) * this.itemsPerPage < this.$props.total ? (this.currentPage + 1) * this.itemsPerPage : this.$props.total
    return second
  }

  mounted() {
    let self = this
    if (this.$props.totalPages - 1 <= 6) {
      this.sequenceToDisplay = []
      for (let i = 1; i <= this.$props.totalPages; i++) {
        this.sequenceToDisplay.push(i)
      }
      if (this.$props.table === 'relation')
        this.actions = [{
          label: 'labels.addToGroup',
          callback: function () {
            self.$emit('updateAction','addToGroup')
          }
        },
          {
            label: 'labels.removeFromGroup',
            callback: function () {
              self.$emit('updateAction','removeFromGroup')
            }
          },
          {
            label: 'labels.exportToExcel',
            callback: function () {
              self.$emit('updateAction','exportToExcel')
            }
          },
          {
            label: 'labels.delete',
            callback: function () {
              self.$emit('updateAction','delete')
            }
          },
          {
            label: 'labels.sendMailing',
            callback: function () {
              self.$emit('updateAction','sendMailing')
            }
          },
          {
            label: 'labels.startWorkflow',
            callback: function () {
              self.$emit('updateAction','startWorkflow')
            }
          },
          {
            label: 'labels.startListManager',
            callback: function () {
              self.$emit('updateAction','startListManager')
            }
          },
          {
            label: 'labels.bulkChange',
            callback: function () {
              self.$emit('updateAction','bulkChange')
            }
          }]
    }
    this.fillTableConfig(this.$props.tableFields)
  }

  /*
  * Name: fillTableConfig
  * arg: config -> table configuration
  * description: render list of table columns visibility
  * Author: Nick Dam
  */
  @Watch('tableFields', {immediate: true, deep: true})
  public fillTableConfig(config: any) {
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
  public async changeVisibility(item: any) {
    if (item) {
      await this.changeColumnVisibility(item, this.$props.table)
      this.$emit('update')
    }
  }

  /*
  * Name: changeItemsPerPage
  * arg: e -> event
  * description: Change items per page displayed
  * Author: Nick Dam
  */
  @Watch('totalPages', {immediate: true, deep: true})
  public changeSequenceArray(newVal: any) {
    if (newVal - 1 <= 6) {
      this.sequenceToDisplay = []
      for (let i = 1; i <= newVal; i++) {
        this.sequenceToDisplay.push(i)
      }
    }
  }

  /*
  * Name: changeItemsPerPage
  * arg: e -> event
  * description: Change items per page displayed
  * Author: Nick Dam
  */
  @Watch('perPage', {immediate: true, deep: true})
  public changeItemsPerPage(e: any) {
    let config: any = localStorage.getItem('tableColumns')
    if (config) config = JSON.parse(config)
    this.itemsPerPage = e.currentTarget ? parseInt(e.currentTarget.value) : this.$props.perPage
    config[this.$props.table].itemsPerPage = this.itemsPerPage
    localStorage.setItem('tableColumns', JSON.stringify(config))
    //this.changePage(0)
  }

  /*
  * Name: toFirstPage
  * arg:
  * description: Reseting pagination to page 0
  * Author: Nick Dam
  */
  public toFirstPage() {
    this.clickedIndex = 1
    if (this.$props.totalPages - 1 <= 6) {
      this.sequenceToDisplay = []
      for (let i = 1; i <= this.$props.totalPages; i++) {
        this.sequenceToDisplay.push(i)
      }
    } else {
      this.sequenceToDisplay = [1, 2, 3, 4, 5, 6]
    }
    if (this.clickedIndex >= 1) this.changePage(0)
  }

  /*
  * Name: backPage
  * arg:
  * description: go to previous page
  * Author: Nick Dam
  */
  public backPage() {
    if (this.clickedIndex > 1) {
      if (this.$props.totalPages - 1 <= 6) {
        this.sequenceToDisplay = []
        for (let i = this.$props.totalPages; i >= 1; i--) {
          this.sequenceToDisplay.push(i)
        }
      } else {
        if (this.clickedIndex > this.sequenceToDisplay.length - 1) {
          this.sequenceToDisplay = [this.clickedIndex - 5, this.clickedIndex - 4, this.clickedIndex - 3, this.clickedIndex - 2, this.clickedIndex - 1, this.clickedIndex]
        }
      }
      this.sequenceToDisplay.shift()
      this.sequenceToDisplay.unshift(this.sequenceToDisplay[0] - 1)
      this.clickedIndex -= 1
      if (this.clickedIndex - 1 >= 0) this.changePage(this.clickedIndex - 1)
    }
  }

  /*
  * Name: toLastPage
  * arg:
  * description: go to last page
  * Author: Nick Dam
  */
  public toLastPage() {
    this.clickedIndex = this.$props.totalPages
    if (this.$props.totalPages - 1 <= 6) {
      this.sequenceToDisplay = []
      for (let i = this.$props.totalPages; i >= 1; i--) {
        this.sequenceToDisplay.push(i)
      }
    } else {
      if (this.clickedIndex > this.sequenceToDisplay.length - 1) {
        this.sequenceToDisplay = [this.clickedIndex - 5, this.clickedIndex - 4, this.clickedIndex - 3, this.clickedIndex - 2, this.clickedIndex - 1, this.clickedIndex]
      }
    }
    if (this.clickedIndex <= this.$props.totalPages) this.changePage(this.$props.totalPages - 1)
  }

  /*
  * Name: nextPage
  * arg:
  * description: go to next page
  * Author: Nick Dam
  */
  public nextPage() {
    if ((this.clickedIndex) < this.$props.totalPages) {
      if (this.clickedIndex < this.$props.totalPages) this.changePage(this.clickedIndex)
      this.clickedIndex += 1
    }
  }

  /*
  * Name: changePage
  * arg: page
  * description: go to given page
  * Author: Nick Dam
  */
  public changePage(page: any, clickedIndex?: number) {
    const pagination = {
      page: clickedIndex ? this.currentPage + clickedIndex : this.currentPage + 1 <= this.$props.totalPages ? page : clickedIndex ? this.$props.totalPages - clickedIndex : this.$props.totalPages - 1,
      size: this.itemsPerPage,
      sort: ['id,desc']
    }
    if (clickedIndex) {
      this.clickedIndex = page
    }
    this.$emit('changePage', pagination)
  }
}
