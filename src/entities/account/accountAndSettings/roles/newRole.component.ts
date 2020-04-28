import { Component, Vue } from 'vue-property-decorator'
import {IRole, Role} from "@/shared/models/role.model";
import {IPermission} from "@/shared/models/permission.model";
import ToggleSwitch from "@/components/toggleSwitch/toggleSwitch.vue";
import RoleService from "@/shared/services/roleService";
import {AxiosResponse} from "axios";
import {mixins} from "vue-class-component";
import CommonHelpers from "@/shared/commonHelpers";

@Component({
  components:{
    ToggleSwitch
  },
  beforeRouteEnter (to, from, next) {
    next((vm: any) => {
      if(to.params.id){
        vm.retreiveItem(to.params.id)
      }
      if (to.query.action && to.query.action==='copy') {
        vm.toCopy = true
      }
    })
  }
})
export default class NewRoleComponent extends mixins(CommonHelpers, Vue) {
  public role:IRole
  public roleService:any
  public permissions:IPermission[]
  public permissionsControl:any
  public toCopy:boolean
  constructor () {
    super()
    this.roleService = RoleService.getInstance()
    this.toCopy = false
    this.permissions = []
    this.permissionsControl = {
      orders: {title: 'ordersAndInvoicing', data: []},
      products: {title: 'productsAndDiscounts', data: []},
      emails: {title: 'emailsAndContent', data: []},
      mailings: {title: 'mailings', data: []},
      workflows: {title: 'workflows', data: []},
      relations: {title: 'relationsAndCrm', data: []},
      users: {title: 'usersAndAuthorizations', data: []},
      admin: {title: 'administration', data: []}
    }
    this.role = new Role()
  }
  public retreiveItem(id:any){
    this.roleService.get(id).then((resp:AxiosResponse) => {
      if(resp.data) {
        this.role = resp.data
        this.resetPermissionsControl()
      }
    })
  }
  public mounted(){
    this.permissions = this.$store.state.lookups.permissions
    this.generatePermissionControl();
  }
  public save(){
    let allPermiss:any = [];
    let toAddPermiss:any = [];
    if(this.toCopy){
      this.role.id = undefined;
    }
    for (var key in this.permissionsControl) {
      if (this.permissionsControl.hasOwnProperty(key)) {
        $.each(this.permissionsControl[key].data, function (key, value) {
          if (value.selected) {
            allPermiss.push({id: value.id})
          }
        })
      }
    }
    $.each(this.permissions, function (k, v) {
      $.each(allPermiss, function (key, val) {
        if(v.id === val.id){
          toAddPermiss.push({id: v.id, version: v.version});
        }
      })
    });
    this.role.permissions = toAddPermiss;
    this.role.code = this.role.name ? this.role.name.replace(' ', '_') : '';
    if (this.role.id) {
      this.roleService.put(this.role).then((resp:AxiosResponse) => {
          if(resp){
            this.previousState()
            this.setAlert('roleUpdated', 'success')
          } else {
            this.setAlert('roleUpdateError', 'error')
          }

        });
    } else {
      this.roleService.post(this.role).then((resp:AxiosResponse) => {
        if(resp){
          this.previousState()
          this.setAlert('roleCreated', 'success')
        } else {
          this.setAlert('roleCreateError', 'error')
        }
        });
    }
  }
  public previousState(){
    this.$router.push('/account/settings?tab=roles')
  }
  public resetPermissionsControl () {
    let self = this
    $.each(self.permissionsControl, function (key, val) {
      $.each(val.data, function (i, j) {
        self.permissionsControl[key].data[i].selected = false
      })
    })
  }

  public getAvailablePermissions () {
    let self = this
    this.resetPermissionsControl();
    if (this.role.permissions && this.role.permissions.length > 0) {
      $.each(this.role.permissions, function (k, v:any) {
        for (var key in self.permissionsControl) {
          if (self.permissionsControl.hasOwnProperty(key)) {
            $.each(self.permissionsControl[key].data, function (i, j) {
              let key = v.code.split('_')[0]
              if (key !== 'super' && key !== 'perm') {
                if (j.id === v.id) {
                  self.permissionsControl[key].data[i].selected = true
                }
              }
            });
          }
        }
      })
    }
  }
  public generatePermissionControl () {
    let self = this
    $.each(this.permissions, function (k, v:any) {
      let key = v.code.split('_')[0]
      if (key !== 'super' && key !== 'perm') {
        let title = v.code.split('_')[v.code.split('_').length - 1]
        self.permissionsControl[key.toLowerCase()].data.push({
          id: v.id,
          code: v.code,
          title: title,
          selected: false
        })
      }
    })
    this.getAvailablePermissions();
  }
}
