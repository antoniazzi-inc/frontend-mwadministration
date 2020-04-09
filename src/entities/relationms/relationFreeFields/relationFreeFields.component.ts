import {Component, Vue} from 'vue-property-decorator'
import PaginationTableComponent from "@/components/paginationTable/paginationTable.vue";
import SearchableSelectComponent from "@/components/searchableSelect/searchableSelect.vue";
import RelationFreeFieldService from "@/shared/services/relationFreeFieldService";
import {AxiosResponse} from "axios";
import {mixins} from "vue-class-component";
import CommonHelpers from "@/shared/commonHelpers";
import SimpleSearchComponent from "@/components/simpleSearch/simpleSearch.vue";

@Component({
  components: {
    PaginationTableComponent,
    SearchableSelectComponent,
    SimpleSearch: SimpleSearchComponent
  }
})
export default class RelationFreeFieldsComponent extends mixins(CommonHelpers, Vue) {
  public relationFreeFieldService: any
constructor() {
  super();
  this.relationFreeFieldService = RelationFreeFieldService.getInstance()
}
  public searchFreeField(q: any) {

  }
  public editFreeField(field: any) {
    this.$router.push('/relations-free-fields/new')
  }
  public deleteFreeField(field: any) {
    if(field && field.id) {
      this.relationFreeFieldService.delete(field.id).then((resp:AxiosResponse)=>{
        if(resp){
          this.setAlert('freeFieldRemoved', 'success')
        } else {
          this.setAlert('freeFieldRemoveError', 'error')
        }
      })
    }
  }
}
