import { Component, Vue } from 'vue-property-decorator'
import RelationService from '@/shared/services/relationService'
import PaginationTableComponent from '@/components/paginationTable/paginationTable.vue'
import {AxiosResponse} from "axios";
import {mixins} from "vue-class-component";
import CommonHelpers from "@/shared/commonHelpers";

@Component({
  components: {
    PaginationTableComponent
  }
})
export default class RelationComponent extends mixins(CommonHelpers, Vue) {
  public relationService: any
  public active: boolean
  constructor () {
    super()
    this.active = true
    this.relationService = RelationService.getInstance()
  }

  public newRelation () {}
  public editRelation (rel: any) {
    this.$router.push({ name: 'EditRelations', params: { id: rel.id } })
  }

  public deleteRelation (rel: any) {
    this.active = false
    if(rel.id) this.relationService.delete(rel.id).then((resp:AxiosResponse)=>{
      this.active = true
      if(resp){
        this.setAlert('relationRemoved', 'success')
      } else {
        this.setAlert('relationRemoveError', 'error')
      }
    })
  }
}
