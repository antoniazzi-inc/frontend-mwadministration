import { Component, Vue } from 'vue-property-decorator'
import RelationService from '@/shared/services/relationService'
import PaginationTableComponent from '@/components/paginationTable/paginationTable.vue'

@Component({
  components: {
    PaginationTableComponent
  }
})
export default class RelationComponent extends Vue {
  public relationService: any
  constructor () {
    super()
    this.relationService = RelationService.getInstance()
  }

  public newRelation () {}
  public editRelation (rel: any) {
    this.$router.push({ name: 'EditRelations', params: { id: rel.id } })
  }

  public deleteRelation (rel: any) {}
}
