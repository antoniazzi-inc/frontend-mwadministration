import { mixins } from 'vue-class-component'
import CommonHelpers from '@/shared/commonHelpers'
import {Component, Vue, Watch} from 'vue-property-decorator'
import {ITagEntity} from "@/shared/models/tagModel";
import {ISearchableSelectConfig, SearchableSelectConfig} from "@/shared/models/SearchableSelectConfig";
import SearchableSelectComponent from "@/components/searchableSelect/searchableSelect.vue";
import {AxiosResponse} from "axios";
import {IRelationEntity, RelationEntity} from "@/shared/models/relationModel";
import RelationService from "@/shared/services/relationService";

@Component({
  components: {
    SearchableSelectComponent
  },
  props: {
    rel: Object
  }
})
export default class TagsSubTabComponent extends mixins(Vue, CommonHelpers) {
  public searchableConfig: ISearchableSelectConfig
  public currentTab: string
  public relationCopy: IRelationEntity
  public relationService: any
  public selectedTags: ITagEntity[]
  constructor () {
    super()
    this.currentTab = 'profile'
    this.selectedTags = []
    this.relationService = RelationService.getInstance()
    this.relationCopy = new RelationEntity()
    this.searchableConfig = new SearchableSelectConfig('code',
      'labels.tags', '', false,
      false, true, true, false)
  }

  @Watch('rel', {immediate:true, deep: true})
  public populateTags(newVal: any) {
    this.relationCopy = newVal
    if(newVal && newVal.relationTags){
      this.selectedTags = newVal.relationTags
    }
  }

  public tagsChanged(tags:any[]){
    this.selectedTags = tags
    if(tags) this.updateRelation(tags)
  }

  public updateRelation(tags:any){
    let allTags:any = []
    let dto = JSON.parse(JSON.stringify(this.relationCopy))
    dto.relationTags = []
    if(tags)
      tags.forEach((tag:any)=>{
        allTags.push({id: tag.id, version: tag.version})
      })
    dto.relationTags = allTags
    this.relationService.put(dto).then((resp:AxiosResponse)=>{
      if(resp){
        this.$emit('updateRel', resp.data)
        this.setAlert('relationTagsUpdated', 'success')
      } else {
        this.setAlert('relationTagsUpdateError', 'error')
      }
    })
  }
}
