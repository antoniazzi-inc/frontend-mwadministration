import { Component, Vue } from 'vue-property-decorator'
import PaginationTableComponent from '@/components/paginationTable/paginationTable.vue'
import RoleService from '@/shared/services/roleService'
import { IRole, Role } from '@/shared/models/role.model'
import SimpleSearchComponent from '@/components/simpleSearch/simpleSearch.vue'
import {mixins} from "vue-class-component";
import CommonHelpers from "@/shared/commonHelpers";
@Component({
  props: {
    active: Boolean
  },
  components: {
    PaginationTableComponent,
    'simple-search': SimpleSearchComponent
  }
})
export default class RolesComponent extends mixins(CommonHelpers, Vue) {
  refs!: {
    paginationTable: PaginationTableComponent;
  }

  public roleService: any;
  public allRoles: IRole[];
  public role: IRole;
  constructor () {
    super()
    this.roleService = RoleService.getInstance()
    this.allRoles = []
    this.role = new Role()
  }

  public mounted () {

  }

  public newRole () {
    this.role = new Role()
  }

  public searchRole (query: string) {
    let fields:string[] = ['name', 'code']
    let q:string = this.makeSimpleSearchQuery(fields ,query)
    // @ts-ignore
    this.$refs.paginationTable.retrieveData('api/relationms/api/roles', undefined, q);
  }

  public editRole (role:any) {
    this.$router.push('/account/settings/edit-role/' + role.id)
  }

  public copyRole (role:any) {
    this.$router.push('/account/settings/edit-role/' + role.id + '?action=copy')
  }

  public deleteRole () {

  }
}
