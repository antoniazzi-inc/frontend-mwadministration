import { Component, Vue } from 'vue-property-decorator'
import { IRelationEntity, RelationEntity } from '@/shared/models/relationms/relationModel'
import RelationService from '@/shared/services/relationService'
import { AxiosResponse } from 'axios'
import ToggleSwitch from '@/components/toggleSwitch/toggleSwitch.vue'
import { ISearchableSelectConfig, SearchableSelectConfig } from '@/shared/models/SearchableSelectConfig'
import { IRole } from '@/shared/models/administrationms/role.model'
import { RelationProfile } from '@/shared/models/relationms/relation-profile.model'
import SearchableSelectComponent from '@/components/searchableSelect/searchableSelect.vue'
import { mixins } from 'vue-class-component'
import CommonHelpers from '@/shared/commonHelpers'

@Component({
  components: {
    ToggleSwitch,
    SearchableSelectComponent
  },
  beforeRouteEnter (to, from, next) {
    next((vm: any) => {
      if (to.params.id) {
        vm.retrieveItem(to.params.id)
      }
    })
  }
})
export default class NewUserComponent extends mixins(CommonHelpers, Vue) {
  public userAccount: IRelationEntity
  public relationService: any
  public changePassword: boolean
  public repeatPassword: string
  public selectedRoles: IRole[]
  public searchableConfig: ISearchableSelectConfig
  constructor () {
    super()
    this.relationService = RelationService.getInstance()
    this.userAccount = new RelationEntity()
    this.selectedRoles = []
    this.changePassword = false
    this.repeatPassword = ''
    this.searchableConfig = new SearchableSelectConfig('name',
      'labels.roles', '', true,
      false, false, true, false, false, false)
  }

  public retrieveItem (id: number) {
    this.relationService.get(id).then((resp: AxiosResponse) => {
      if (resp) {
        this.userAccount = resp.data
        this.selectedRoles = resp.data.roles.filter((role:any) => role.code !== 'ROLE_ADMIN' && role.code !== 'ROLE_USER')
      }
    })
  }

  public created () {
    this.userAccount.relationProfile = new RelationProfile()
  }

  public previousState () {
    this.$router.push('/account/settings?tab=users')
  }

  public checkEmail () {
    const pagination = {
      page: 0,
      size: 20,
      sort: 'id,asc'
    }
    const query = 'email=in=(' + this.userAccount.email + ')'
    this.relationService.getAll(pagination, query).then((resp: AxiosResponse) => {
      if (resp.data.content.length > 0) {
        // TODO
        // @ts-ignore
        this.errors.add('email', this.$t('labels.duplicate'), this.$t('labels.duplicateEntity'))
      }
    })
  }

  public roleChanged (role: any) {
    this.selectedRoles = role
  }

  public roleRemoved (role: any) {
    let index = null
    $.each(this.selectedRoles, function (k, v) {
      if (v.id === role.id) {
        index = k
      }
    })
    if (index !== null) {
      this.selectedRoles.splice(index, 1)
    }
  }

  public save () {
    this.$validator.validateAll().then(resp => {
      if (resp) {
        const allRoles = []
        const self = this
        this.userAccount.tfaEnabled = false
        $.each(this.$store.state.lookups.roles, function (key, val) {
          $.each(self.selectedRoles, function (k, v) {
            if (v.id === val.id) {
              allRoles.push({ id: v.id, version: v.version, code: v.code, name: v.name })
            }
          })
        })
        allRoles.push({ id: 2, version: 0 }, { id: 3, version: 0 })
        this.userAccount.roles = allRoles
        if (this.userAccount.id) {
          this.userAccount.relationAddresses = undefined
          this.userAccount.relationPhones = undefined
          this.userAccount.relationCustomFields = undefined
          this.userAccount.contactHistories = undefined
          this.relationService
            .put(this.userAccount)
            .then((resp: AxiosResponse) => {
              if (resp) {
                this.previousState()
                this.setAlert('userUpdated', 'success')
              } else {
                this.setAlert('userUpdateError', 'error')
              }
            })
        } else {
          this.relationService.post(this.userAccount).then((resp: AxiosResponse) => {
            if (resp) {
              this.previousState()
              this.setAlert('userCreated', 'success')
            } else {
              this.setAlert('userCreateError', 'error')
            }
          })
        }
      } else {
        return false
      }
    })
  }
}
