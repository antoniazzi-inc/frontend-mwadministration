import { Component, Vue, Watch } from 'vue-property-decorator'
import { IRole, Role } from '@/shared/models/administrationms/role.model'
import { IPermission } from '@/shared/models/administrationms/permission.model'
import ToggleSwitch from '@/components/toggleSwitch/toggleSwitch.vue'
import RoleService from '@/shared/services/roleService'
import { AxiosResponse } from 'axios'
import { mixins } from 'vue-class-component'
import CommonHelpers from '@/shared/commonHelpers'

@Component({
  props: {
    active: Boolean
  },
  components: {
    ToggleSwitch
  },
  beforeRouteEnter (to, from, next) {
    next((vm: any) => {
      if (to.params.id) {
        vm.retreiveItem(to.params.id)
      }
      if (to.query.action && to.query.action === 'copy') {
        vm.toCopy = true
      }
    })
  }
})
export default class NewRoleComponent extends mixins(CommonHelpers, Vue) {
  public role: IRole
  public roleService: any
  public permissions: IPermission[]
  public permissionsControl: any
  public toCopy: boolean
  public addAll: boolean
  constructor () {
    super()
    this.role = new Role()
    this.roleService = RoleService.getInstance()
    this.toCopy = false
    this.addAll = false
    this.permissions = []
    this.permissionsControl = {
      orders: { title: 'ordersAndInvoicing', data: [] },
      products: { title: 'productsAndDiscounts', data: [] },
      emails: { title: 'emailsAndContent', data: [] },
      mailings: { title: 'mailings', data: [] },
      workflows: { title: 'workflows', data: [] },
      relations: { title: 'relationsAndCrm', data: [] },
      users: { title: 'usersAndAuthorizations', data: [] },
      admin: { title: 'administration', data: [] }
    }
  }

  public retreiveItem (id: any) {
    const self = this
    this.roleService.get(id).then((resp: AxiosResponse) => {
      if (resp.data) {
        self.role = resp.data
        this.getAvailablePermissions()
      }
    })
  }

  @Watch('addAll', { immediate: true, deep: true })
  public updateAddAll (newVal:any) {
    if(newVal === true) {
      for (var key in this.permissionsControl) {
        if (this.permissionsControl.hasOwnProperty(key)) {
          this.permissionsControl[key].data.forEach((item:any, index:any)=>{
            this.permissionsControl[key].data[index].selected = true
          })
        }
      }
    } else if(newVal === false) {
      for (var key in this.permissionsControl) {
        if (this.permissionsControl.hasOwnProperty(key)) {
          this.permissionsControl[key].data.forEach((item:any, index:any)=>{
            this.permissionsControl[key].data[index].selected = false
          })
        }
      }
    }
  }
  @Watch('active', { immediate: true, deep: true })
  public updateF () {
    this.permissions = this.$store.state.lookups.permissions
    this.getAvailablePermissions()
  }

  public mounted () {
    this.permissions = this.$store.state.lookups.permissions
    this.generatePermissionControl()
  }

  public save () {
    const allPermiss: any = []
    const toAddPermiss: any = []
    if (this.toCopy) {
      this.role.id = undefined
      this.role.version = undefined
      this.role.administrationId = undefined
      this.role.createdOn = undefined
      this.role.updatedOn = undefined
    }
    for (const key in this.permissionsControl) {
      if (this.permissionsControl.hasOwnProperty(key)) {
        $.each(this.permissionsControl[key].data, function (key, value) {
          if (value.selected) {
            allPermiss.push({ id: value.id })
          }
        })
      }
    }
    $.each(this.permissions, function (k, v) {
      $.each(allPermiss, function (key, val) {
        if (v.id === val.id) {
          toAddPermiss.push({ id: v.id, version: v.version })
        }
      })
    })
    this.role.permissions = toAddPermiss
    this.role.code = this.role.name ? this.role.name.replace(' ', '_') : ''
    if (this.role.id) {
      this.roleService.put(this.role).then((resp: AxiosResponse) => {
        if (resp) {
          this.previousState()
          this.setAlert('roleUpdated', 'success')
        } else {
          this.setAlert('roleUpdateError', 'error')
        }
      })
    } else {
      this.roleService.post(this.role).then((resp: AxiosResponse) => {
        if (resp) {
          this.previousState()
          this.setAlert('roleCreated', 'success')
        } else {
          this.setAlert('roleCreateError', 'error')
        }
      })
    }
  }

  public previousState () {
    this.$router.push('/account/settings?tab=roles')
  }

  public resetPermissionsControl () {
    const self = this
    $.each(self.permissionsControl, function (key, val) {
      $.each(val.data, function (i, j) {
        self.permissionsControl[key].data[i].selected = false
      })
    })
  }

  public getAvailablePermissions () {
    const self = this
    this.resetPermissionsControl()
    if (this.role.permissions && this.role.permissions.length > 0) {
      $.each(this.role.permissions, function (k, v: any) {
        for (const key in self.permissionsControl) {
          if (self.permissionsControl.hasOwnProperty(key)) {
            $.each(self.permissionsControl[key].data, function (i, j) {
              const key = v.code.split('_')[0]
              if (key.toLowerCase() !== 'super' && key.toLowerCase() !== 'perm') {
                if (j.id === v.id) {
                  self.permissionsControl[key.toLowerCase()].data[i].selected = true
                }
              }
            })
          }
        }
      })
    }
  }

  public generatePermissionControl () {
    const self = this
    $.each(this.permissions, function (k, v: any) {
      const key = v.code.split('_')[0]
      if (key.toLowerCase() !== 'super' && key.toLowerCase() !== 'perm' && self.permissionsControl[key.toLowerCase()] &&
        self.permissionsControl[key.toLowerCase()].data) {
        const title = v.code.split('_')[v.code.split('_').length - 1]
        self.permissionsControl[key.toLowerCase()].data.push({
          id: v.id,
          code: v.code,
          title: title,
          selected: false
        })
      }
    })
    this.getAvailablePermissions()
  }
}
