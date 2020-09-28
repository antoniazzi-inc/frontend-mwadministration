import { mixins } from 'vue-class-component'
import CommonHelpers from '@/shared/commonHelpers'
import { Component, Vue, Watch } from 'vue-property-decorator'
import draggable from 'vuedraggable'
import { IRelationEntity, RelationEntity } from '@/shared/models/relationms/relationModel'
import { IRelationGroup } from '@/shared/models/relationms/relation-group.model'
import RelationService from '@/shared/services/relationService'
import { AxiosResponse } from 'axios'

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
  public controlOnStart: boolean
  public isChanged: boolean
  public allGroups: IRelationGroup[]
  public relationCopy: IRelationEntity
  constructor () {
    super()
    this.relationService = RelationService.getInstance()
    this.relationCopy = new RelationEntity()
    this.currentTab = 'profile'
    this.groupSearch = ''
    this.controlOnStart = false
    this.isChanged = false
    this.allGroups = []
  }

  public mounted () {
    this.allGroups = this.$store.state.lookups.groups
  }

  @Watch('active', { immediate: true, deep: true })
  public init (newVal: any) {
    this.isChanged = false
  }

  @Watch('rel', { immediate: true, deep: true })
  public updateRelation (newVal: any) {
    if (newVal) {
      this.relationCopy = newVal
    }
    this.allGroups = this.excludeGroups()
    this.groupSearch = ''
  }

  @Watch('relationCopy.relationGroups', { immediate: true, deep: true })
  public updateGroups (newVal: any) {
    if (this.isChanged) {
      const allGroups: any = []
      const dto = this.relationCopy
      if (this.relationCopy.relationGroups) {
        this.relationCopy.relationGroups.forEach(group => {
          allGroups.push({ id: group.id, version: group.version, createdOn: group.createdOn, updatedOn: group.updatedOn })
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

  public excludeGroups () {
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

  public clone (obj: any, e: any) {
    this.isChanged = true
    return obj
  }
  public onSort (obj:any, e:any) {

  }

  public pullFunction (e: any) {
    return this.controlOnStart ? 'clone' : true
  }

  public start ({ originalEvent }: any) {
    this.isChanged = true
    this.controlOnStart = originalEvent.ctrlKey
  }

  public removeGroup (group: any) {
    this.isChanged = true
    let index = null
    this.relationCopy.relationGroups?.forEach((relationGroup: any, ind: number) => {
      if (group.id === relationGroup.id) {
        index = ind
      }
    })
    if (index !== null) this.relationCopy.relationGroups?.splice(index, 1)
  }

  public search () {
    const search = this.groupSearch
    this.allGroups = this.$store.state.lookups.groups.filter(function (e: any) { return e.label.indexOf(search) !== -1 })
  }
}
