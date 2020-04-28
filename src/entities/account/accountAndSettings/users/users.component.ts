import { Component, Vue } from 'vue-property-decorator'
import PaginationTableComponent from '@/components/paginationTable/paginationTable.vue'
import { IRole, Role } from '@/shared/models/role.model'
import RelationService from '@/shared/services/relationService'
import SimpleSearchComponent from '@/components/simpleSearch/simpleSearch.vue'
import {AxiosResponse} from "axios";
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
export default class UsersComponent extends mixins(CommonHelpers, Vue) {
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

  public searchUser (query: string) {
    let fields:string[] = ['name', 'code']
    let q:string = this.makeSimpleSearchQuery(fields ,query, 'OR')
    // @ts-ignore
    this.$refs.paginationTable.retrieveData('api/relationms/api/roles', undefined, q);
  }

  public editUser (user:any) {
    this.$router.push('/account/user/edit-user/' + user.id)
  }

  public copyUser () {

  }

  public deleteUser (user:any) {
    this.relationService.delete(user.id).then((resp:AxiosResponse)=>{
        //@ts-ignore
        this.$refs.paginationTable.retrieveData('api/relationms/api/relations', undefined, '');
      if(resp){
        this.setAlert('userDeleted', 'success')
      } else {
        this.setAlert('userDeletedError', 'error')
      }
    })
  }
}
