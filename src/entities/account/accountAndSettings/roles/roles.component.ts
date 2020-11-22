import { Component, Vue, Watch } from 'vue-property-decorator'
import PaginationTableComponent from '@/components/paginationTable/paginationTable.vue'
import RoleService from '@/shared/services/roleService'
import { IRole, Role } from '@/shared/models/administrationms/role.model'
import SimpleSearchComponent from '@/components/simpleSearch/simpleSearch.vue'
import { mixins } from 'vue-class-component'
import CommonHelpers from '@/shared/commonHelpers'
import { AxiosResponse } from 'axios'
@Component({
  props: {
    active: Boolean
  },
  components: {
    PaginationTableComponent,
    'simple-search': SimpleSearchComponent
  },
  beforeRouteEnter (to, from, next) {
    next((vm: any) => {
      vm.fill()
    })
  }
})
export default class RolesComponent extends mixins(CommonHelpers, Vue) {
  refs!: {
    paginationTable: PaginationTableComponent;
  }

  public roleService: any;
  public searchQuery: any;
  public activeTab: any;
  public allRoles: IRole[];
  public role: IRole;
  constructor () {
    super()
    this.searchQuery = 'code=out=(ROLE_SUPER_ADMIN,ROLE_USER,ROLE_ADMIN,ROLE_RELATION,ROLE_CUSTOMER,ROLE_BENEFICIARY,ROLE_AFFILIATE,ROLE_NEWSLETTER,ROLE_SUPPORT)'
    this.roleService = RoleService.getInstance()
    this.allRoles = []
    this.activeTab = false
    this.role = new Role()
  }
  @Watch('active')
  public activeChanged (newVal:any) {
    if(newVal !== undefined) this.activeTab = newVal
  }
  public mounted () {
    this.activeTab = true
  }

  public newRole () {
    this.role = new Role()
  }

  public searchRole (query: string) {
    const fields: string[] = ['name', 'code', 'description']
    const q: string = this.searchQuery + ' and ' + this.makeSimpleSearchQuery(fields, query)
    this.refreshData(q)
  }

  public refreshData (q: any) {
    // @ts-ignore
    this.$refs.paginationTable.retrieveData('api/relationms/api/roles', undefined, q)
  }

  public editRole (role: any) {
    this.$router.push('/account/settings/edit-role/' + role.id)
  }

  public copyRole (role: any) {
    this.$router.push('/account/settings/edit-role/' + role.id + '?action=copy')
  }

  public deleteRole (role: any) {
    if (role.id) {
      this.roleService.delete(role.id).then((resp: AxiosResponse) => {
        if (resp) {
          this.setAlert('roleDeleted', 'success')
          this.refreshData(this.searchQuery)
        } else {
          this.setAlert('roleDeleteError', 'error')
        }
      })
    }
  }
}
