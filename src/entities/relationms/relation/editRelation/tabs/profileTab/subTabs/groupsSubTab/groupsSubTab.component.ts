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

import {mixins} from 'vue-class-component'
import CommonHelpers from '@/shared/commonHelpers'
import {Component, Vue, Watch} from 'vue-property-decorator'
import draggable from 'vuedraggable'
import {IRelationEntity, RelationEntity} from '@/shared/models/relationms/relationModel'
import {IRelationGroup} from '@/shared/models/relationms/relation-group.model'
import RelationService from '@/shared/services/relationService'
import {AxiosResponse} from 'axios'

@Component({
  components: {
    draggable
  },
  props: {
    active: Boolean,
    rel: Object
  }
})
export default class GroupsSubTabComponent extends mixins(Vue, CommonHelpers) {
  public currentTab: string
  public groupSearch: string
  public relationService: any
  public groupsBackup: any[]
  public controlOnStart: boolean
  public isChanged: boolean
  public allGroups: IRelationGroup[]
  public relationCopy: IRelationEntity

  constructor() {
    super()
    this.relationService = RelationService.getInstance()
    this.relationCopy = new RelationEntity()
    this.currentTab = 'profile'
    this.groupSearch = ''
    this.controlOnStart = false
    this.isChanged = false
    this.allGroups = []
    this.groupsBackup = []
  }

  public mounted() {
    this.allGroups = this.$store.state.lookups.groups
  }

  @Watch('active', {immediate: true, deep: true})
  public init(newVal: any) {
    this.isChanged = false
  }

  @Watch('rel', {immediate: true, deep: true})
  public updateRelation(newVal: any) {
    if (newVal) {
      this.relationCopy = newVal
    }
    this.allGroups = this.excludeGroups()
    this.groupSearch = ''
  }

  @Watch('relationCopy.relationGroups', {immediate: true, deep: true})
  public updateGroups(newVal: any) {
    if (this.isChanged) {
      const allGroups: any = []
      const dto = this.relationCopy
      if (this.relationCopy.relationGroups) {
        this.relationCopy.relationGroups.forEach(group => {
          allGroups.push({id: group.id, version: group.version, createdOn: group.createdOn, updatedOn: group.updatedOn})
        })
      }
      dto.relationGroups = allGroups
      dto.relationPhones = undefined
      dto.relationAddresses = undefined
      dto.relationCustomFields = undefined
      dto.contactHistories = undefined
      this.relationService.put(dto).then((resp: AxiosResponse) => {
        if (resp) {
          this.$emit('updateRel', resp.data)
          this.setAlert('relationGroupsUpdated', 'success')
        } else {
          this.setAlert('relationGroupsUpdateError', 'error')
        }
      })
      this.isChanged = false
    }
  }

  public excludeGroups() {
    const allGroups: any = []
    this.$store.state.lookups.groups.forEach((group: any) => {
      let exclude = false
      this.relationCopy.relationGroups?.forEach((relationGroup: any) => {
        if (group.id === relationGroup.id) {
          exclude = true
        }
      })
      if (!exclude) {
        allGroups.push(group)
      }
    })
    return allGroups
  }

  public clone(obj: any, e: any) {
    this.isChanged = true
    return obj
  }

  public onSort(obj: any, e: any) {

  }

  public pullFunction(e: any) {
    return this.controlOnStart ? 'clone' : true
  }

  public start({originalEvent}: any) {
    this.isChanged = true
    this.controlOnStart = originalEvent.ctrlKey
  }

  public removeGroup(group: any) {
    this.isChanged = true
    let index = null
    this.relationCopy.relationGroups?.forEach((relationGroup: any, ind: number) => {
      if (group.id === relationGroup.id) {
        index = ind
      }
    })
    if (index !== null) this.relationCopy.relationGroups?.splice(index, 1)
  }

  public search() {
    let self = this
    const search = this.groupSearch
    if (search === '') {
      this.allGroups = this.excludeGroups()
    } else
      this.allGroups = this.allGroups.filter(function (e: any) {
        return (e.label.indexOf(search) !== -1 && self.relationCopy.relationGroups && self.relationCopy.relationGroups.length === 0) ||
          (e.label.indexOf(search) !== -1 && self.relationCopy.relationGroups && self.relationCopy.relationGroups.findIndex((g: any) => g.id !== e.id) !== -1)
      })
  }
}
