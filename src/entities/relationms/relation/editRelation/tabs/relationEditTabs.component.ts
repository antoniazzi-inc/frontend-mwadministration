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

import { mixins } from 'vue-class-component'
import CommonHelpers from '@/shared/commonHelpers'
import { Component, Vue, Watch } from 'vue-property-decorator'
import EventsTabComponent from '@/entities/relationms/relation/editRelation/tabs/eventsTab/eventsTab.vue'
import ContactHistoryTabComponent
  from '@/entities/relationms/relation/editRelation/tabs/contactHistoryTab/contactHistoryTab.vue'
import TasksTabComponent from '@/entities/relationms/relation/editRelation/tabs/tasksTab/tasksTab.vue'
import OrdersTabComponent from '@/entities/relationms/relation/editRelation/tabs/ordersTab/ordersTab.vue'
import ProfileTabComponent from '@/entities/relationms/relation/editRelation/tabs/profileTab/profileTab.vue'
import { IRelationEntity } from '@/shared/models/relationms/relationModel'

@Component({
  props: {
    activeTab: String,
    relation: Object,
    activeSubTab: String,
  },
  components: {
    ProfileTabComponent,
    EventsTabComponent,
    ContactHistoryTabComponent,
    TasksTabComponent,
    OrdersTabComponent
  }
})
export default class RelationEditTabsComponent extends mixins(Vue, CommonHelpers) {
  public currentTab: string
  public currentSubTab: string
  constructor () {
    super()
    this.currentTab = 'profile'
    this.currentSubTab = 'general'
  }
  @Watch('activeTab', {immediate: true})
  public updateActiveTab(newVal:any){
    if(newVal){
      this.currentTab = newVal
    }
  }
  @Watch('activeSubTab', {immediate: true})
  public updateSubActiveTab(newVal:any){
    if(newVal){
      this.currentSubTab = newVal
    }
  }
  public mounted () {
   // this.changeTabs(this.$props.activeTab, this.$props.activeSubTab)
  }

  public changeTabs (tab: string, subTab: string) {
    this.currentTab = tab || 'profile'
    this.currentSubTab = subTab || 'general'
  }

  public updateRelation (rel: IRelationEntity) {
    this.$emit('updateRel', rel)
  }

  public goBack () {
    this.$router.push({ name: 'Relations' })
  }
}
