import { Component, Vue } from 'vue-property-decorator'
import PaginationTableComponent from '@/components/paginationTable/paginationTable.vue'
import RoleService from '@/shared/services/roleService'
import { IRole, Role } from '@/shared/models/role.model'
import SimpleSearchComponent from '@/components/simpleSearch/simpleSearch.vue'
@Component({
  props: {
    active: Boolean
  },
  components: {
    PaginationTableComponent,
    'simple-search': SimpleSearchComponent
  }
})
export default class RolesComponent extends Vue {
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

  public searchRole (q: string) {

  }

  public editRole () {

  }

  public copyRole () {

  }

  public deleteRole () {

  }
}
