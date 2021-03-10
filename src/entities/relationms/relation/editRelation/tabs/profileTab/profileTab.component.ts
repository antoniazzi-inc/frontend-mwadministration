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
import { IRelationEntity } from '@/shared/models/relationms/relationModel'

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

  }

  @Watch('activeSubTab', { immediate: true, deep: true })
  public changeTab (name: string) {
    this.currentSubTab = name || 'general'
  }

  public update (rel: IRelationEntity) {
    this.$emit('update', rel)
  }
}
