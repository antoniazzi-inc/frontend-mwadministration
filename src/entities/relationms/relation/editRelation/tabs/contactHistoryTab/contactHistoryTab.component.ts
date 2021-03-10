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
import { IRelationEntity, RelationEntity } from '@/shared/models/relationms/relationModel'
import ContactWidget from '@/entities/relationms/relation/editRelation/tabs/contactHistoryTab/contactWidget.vue'
import { ContactHistory, IContactHistory } from '@/shared/models/relationms/contact-history.model'

@Component({
  components: {
    ContactWidget
  },
  props: {
    rel: Object,
    active: Boolean
  }
})
export default class ContactHistoryTabComponent extends mixins(Vue, CommonHelpers) {
  public currentTab: string
  public searchString: string
  public editMode: boolean
  public relationCopy: IRelationEntity

  constructor () {
    super()
    this.currentTab = 'profile'
    this.searchString = ''
    this.editMode = false

    this.relationCopy = new RelationEntity()
  }

  @Watch('rel', { immediate: true, deep: true })
  public fillRelation (newVal: any) {
    if (newVal) {
      this.relationCopy = newVal
    }
  }

  public addNewContact () {
    const newContact = new ContactHistory()
    newContact.info = ''
    this.relationCopy.contactHistories ? this.relationCopy.contactHistories.push(newContact) : this.relationCopy.contactHistories = [newContact]
    this.editMode = true
  }

  closeEditMode () {
    this.editMode = false
  }

  public searchContacts () {}
  public retrieveRelation (relation: any) {
    this.editMode = false
    this.$emit('update', relation)
    this.closeEditMode()
  }
}
