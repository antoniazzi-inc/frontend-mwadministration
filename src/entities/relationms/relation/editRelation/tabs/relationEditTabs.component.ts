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
