import { Component, Vue } from 'vue-property-decorator'
import {IRelationGroup, RelationGroup} from "@/shared/models/relation-group.model";
import RelationGroupService from "@/shared/services/relationGroupService";
import {ISearchableSelectConfig, SearchableSelectConfig} from "@/shared/models/SearchableSelectConfig";
import {ICategoryEntity} from "@/shared/models/categoryModel";
import {AxiosResponse} from "axios";
import CommonHelpers from "@/shared/commonHelpers";
import {mixins} from "vue-class-component";
import PaginationTableComponent from "@/components/paginationTable/paginationTable.vue";
import SearchableSelectComponent from "@/components/searchableSelect/searchableSelect.vue";
import SimpleSearchComponent from "@/components/simpleSearch/simpleSearch.vue";

@Component({
  components: {
    PaginationTableComponent,
    SearchableSelectComponent,
    SimpleSearch: SimpleSearchComponent
  }
})
export default class RelationGroupsComponent extends mixins(CommonHelpers,Vue) {
  $refs!: {
    paginationTable: PaginationTableComponent;
    groupModal: HTMLElement
  }
  public searchableConfigCat: ISearchableSelectConfig
  public selectedCategory: ICategoryEntity | null
  public relationGroupService: any
  public group: IRelationGroup
  public allGroups: IRelationGroup[]

  constructor() {
    super();
    this.selectedCategory = null
    this.searchableConfigCat = new SearchableSelectConfig('code',
      'labels.category', '', false,
      false, true, false, false)
    this.relationGroupService = RelationGroupService.getInstance()
    this.group = new RelationGroup()
    this.allGroups = []
  }
  public mounted(){
    let pagination = {
      page: 0,
      size: 100000,
      sort: ['id,desc']
    }
    this.relationGroupService.getAll(pagination,undefined).then((resp:AxiosResponse)=>{
      if(resp){
        this.allGroups = resp.data.content
      }
    })
  }
  public async resetGroup(){
    this.group = new RelationGroup()
    this.selectedCategory = null
    await this.$validator.reset()
  }

  public searchGroups(query:any){}

  public editGroup(group:any){
    this.openModal()
    this.group = group
    let selectedCat = null
    this.$store.state.lookups.categories.forEach((cat:any)=>{
      if(cat.id === group.categoryId){
        selectedCat = cat
      }
    })
    this.selectedCategory = selectedCat
  }

  public saveGroup(){
    this.$validator.validateAll().then(async resp=>{
      let isDuplicateName = false
      this.allGroups.forEach((group:IRelationGroup)=>{
        if(group.label === this.group.label){
          isDuplicateName = true
        }
      })
      if(isDuplicateName){
        //@ts-ignore
        this.$refs.paginationTable.retrieveData('api/relationms/api/relation-groups', undefined, '');
        return this.setAlert('relationGroupDuplicateName', 'error')
      }
      if(resp && !isDuplicateName){
        this.group.name = this.group.label?.replace(/\s/g, '_')
        this.group.categoryId = this.selectedCategory?.id
        if(this.group.id){
          this.relationGroupService.put(this.group).then((resp:AxiosResponse)=>{
            if(resp){
              this.setAlert('relationGroupUpdated', 'success')
              //@ts-ignore
              this.$refs.paginationTable.retrieveData('api/relationms/api/relation-groups', undefined, '');
            } else {
              this.setAlert('relationGroupUpdateError', 'error')
            }
            this.closeModal()
          })
        } else {
          this.relationGroupService.post(this.group).then((resp:AxiosResponse)=>{
            if(resp){
              this.setAlert('relationGroupCreated', 'success')
              //@ts-ignore
              this.$refs.paginationTable.retrieveData('api/relationms/api/relation-groups', undefined, '');
            } else {
              this.setAlert('relationGroupError', 'error')
            }
            this.closeModal()
          })
        }
       await this.$validator.reset()
      }
    })
  }
  public copyGroup(group:any){
    let selectedCat = null
    this.$store.state.lookups.categories.forEach((cat:any)=>{
      if(cat.id === group.categoryId){
        selectedCat = cat
      }
    })
    this.selectedCategory = selectedCat
    this.group = group
    this.group.label = `${group.label} ${this.$t('labels.copy')}`
    this.group.id = undefined
    this.group.version = undefined
    this.group.createdOn = undefined
    this.group.updatedOn = undefined
    this.saveGroup()
  }

  public deleteGroup(group:any){
    let self = this;
    if(group && group.id) {
      this.relationGroupService.delete(group.id).then(async (resp:AxiosResponse)=>{
        if(resp){
          this.setAlert('relationGroupRemoved', 'success')
          //@ts-ignore
          this.$refs.paginationTable.retrieveData('api/relationms/api/relation-groups', undefined, '');
        } else {
          this.setAlert('relationGroupRemoveError', 'error')
        }
        await this.$validator.reset()
      })
    }
  }

  public categoryUpdated(cat:any){
    this.selectedCategory = cat
  }

  public categoryRemoved(cat:any){
    this.selectedCategory = null
  }
  public closeModal(){
    //@ts-ignore
    $(this.$refs.groupModal).modal('hide')
  }
  public openModal(){
    //@ts-ignore
    $(this.$refs.groupModal).modal('show')
  }
}
