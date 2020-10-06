import {Component, Vue, Watch} from 'vue-property-decorator'
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
export default class AddToGroupComponent extends mixins(CommonHelpers, Vue) {
  public groupsSelectConfig: ISearchableSelectConfig
  public selectedGroup:any
  public newGroupName:any
  public addNewGroup:Boolean
  constructor () {
    super()
this.groupsSelectConfig = new SearchableSelectConfig('label',
  'labels.chooseGroup', 'buttons.addNew', false,
  true, true, false, false)
    this.selectedGroup = null
    this.addNewGroup = false
    this.newGroupName = ''
  }
  @Watch('newGroupName', {immediate: true, deep: true})
  public updateNewGroupName (e:any) {
    if(e){
      this.$emit('updateCurrentAction', {value: e, type:'create'})
    }
  }
  public mounted () {
  }

  public createNewGroup(){
    this.addNewGroup = true
  }
  public updateGroup(e:any){
    this.selectedGroup = e
    this.$emit('updateCurrentAction', {value: e, type:'update'})
  }
  public removeGroup(e:any){
    this.selectedGroup = null
    this.$emit('updateCurrentAction', {value: null, type:'remove'})
  }

  public cancelNewGroup(){
    this.addNewGroup = false
    this.newGroupName = ''
    this.$emit('updateCurrentAction', {value: null, type:'remove'})
  }

}
