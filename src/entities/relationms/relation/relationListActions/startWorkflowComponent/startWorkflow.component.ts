import { Component, Vue } from 'vue-property-decorator'
import RelationService from '@/shared/services/relationService'
import PaginationTableComponent from '@/components/paginationTable/paginationTable.vue'
import { AxiosResponse } from 'axios'
import { mixins } from 'vue-class-component'
import CommonHelpers from '@/shared/commonHelpers'
import SimpleSearchComponent from '@/components/simpleSearch/simpleSearch.vue'
import { ISearchableSelectConfig, SearchableSelectConfig } from '@/shared/models/SearchableSelectConfig'
import SearchableSelectComponent from '@/components/searchableSelect/searchableSelect.vue'
import complexSearchComponent from '@/entities/relationms/relation/complexSearch/complexSearch.vue'
import { EventBus } from '@/shared/eventBus'
import ComplexSearchComponent from "@/components/complexSearchWidget/complexSearch.vue";

@Component({
  components: {
    SearchableSelectComponent
  }
})
export default class StartWorkflowComponent extends mixins(CommonHelpers, Vue) {
  public searchableSelectConfig: ISearchableSelectConfig
  public selectedValue:any
  constructor () {
    super()
    this.searchableSelectConfig = new SearchableSelectConfig('label',
      'labels.chooseWorkflow', '', false,
      false, true, false, false)
    this.selectedValue = null
  }
  public mounted () {
  }
  public updateValue(e:any){
    this.selectedValue = e
    this.$emit('updateCurrentAction', {value: e, type:'update'})
  }
  public removeValue(e:any){
    this.selectedValue = null
    this.$emit('updateCurrentAction', {value: null, type:'remove'})
  }
}
