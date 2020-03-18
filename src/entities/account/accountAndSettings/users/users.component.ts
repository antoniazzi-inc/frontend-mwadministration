import { Component, Vue } from 'vue-property-decorator'
import PaginationTableComponent from '@/components/paginationTable/paginationTable.vue'
import { IRole, Role } from '@/shared/models/role.model'
import RelationService from '@/shared/services/relationService'
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
export default class UsersComponent extends Vue {
  refs!: {
    paginationTable: PaginationTableComponent;
  }

  public relationService: any;
  public allRoles: IRole[];
  public role: IRole;
  constructor () {
    super()
    this.relationService = RelationService.getInstance()
    this.allRoles = []
    this.role = new Role()
  }

  public mounted () {

  }

  public newUser () {
    this.role = new Role()
  }

  public searchUser (q: string) {

  }

  public editUser () {

  }

  public copyUser () {

  }

  public deleteUser () {

  }
}
