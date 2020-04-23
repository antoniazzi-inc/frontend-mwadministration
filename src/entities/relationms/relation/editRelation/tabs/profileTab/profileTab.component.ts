import { mixins } from 'vue-class-component'
import CommonHelpers from '@/shared/commonHelpers'
import { Component, Vue, Watch } from 'vue-property-decorator'
import GeneralSubTabComponent
  from '@/entities/relationms/relation/editRelation/tabs/profileTab/subTabs/generalSubTab/generalSubTab.vue'
import CustomerSubTabComponent
  from '@/entities/relationms/relation/editRelation/tabs/profileTab/subTabs/customerSubTab/customerSubTab.vue'
import FreeFieldsSubTabComponent
  from '@/entities/relationms/relation/editRelation/tabs/profileTab/subTabs/freeFieldsSubTab/freeFieldsSubTab.vue'
import TagsSubTabComponent
  from '@/entities/relationms/relation/editRelation/tabs/profileTab/subTabs/tagsSubTab/tagsSubTab.vue'
import GroupsSubTabComponent
  from '@/entities/relationms/relation/editRelation/tabs/profileTab/subTabs/groupsSubTab/groupsSubTab.vue'
import ContactsSubTabComponent
  from '@/entities/relationms/relation/editRelation/tabs/profileTab/subTabs/contactsSubTab/contactsSubTab.vue'
import CompanySubTabComponent
  from '@/entities/relationms/relation/editRelation/tabs/profileTab/subTabs/companySubTab/companySubTab.vue'
import AffiliatesSubTabComponent
  from '@/entities/relationms/relation/editRelation/tabs/profileTab/subTabs/affiliatesSubTab/affiliatesSubTab.vue'
import { IRelationEntity } from '@/shared/models/relationModel'

@Component({
  components: {
    GeneralSubTabComponent,
    TagsSubTabComponent,
    GroupsSubTabComponent,
    FreeFieldsSubTabComponent,
    CustomerSubTabComponent,
    ContactsSubTabComponent,
    CompanySubTabComponent,
    AffiliatesSubTabComponent

  },
  props: {
    activeSubTab: String,
    relation: Object
  }
})
export default class ProfileTabComponent extends mixins(Vue, CommonHelpers) {
  public currentSubTab: string
  constructor () {
    super()
    this.currentSubTab = 'general'
  }

  public mounted () {
    let url = window.location.href
    if(url.match('tab=freeFields')){
      this.changeTab('freeFields')
    } else {
      this.changeTab(this.$props.activeTab)
    }
  }

  @Watch('activeSubTab', { immediate: true, deep: true })
  public changeTab (name: string) {
    this.currentSubTab = name || 'general'
  }

  public update (rel: IRelationEntity) {
    this.$emit('update', rel)
  }
}
