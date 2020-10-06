import { Component, Vue } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import CommonHelpers from '@/shared/commonHelpers'
import { ISearchableSelectConfig, SearchableSelectConfig } from '@/shared/models/SearchableSelectConfig'
import SearchableSelectComponent from '@/components/searchableSelect/searchableSelect.vue'

@Component({
  components: {
    SearchableSelectComponent
  }
})
export default class RemoveFromGroupComponent extends mixins(CommonHelpers, Vue) {
  public groupsSelectConfig: ISearchableSelectConfig
  public selectedGroup:any
  constructor () {
    super()
    this.groupsSelectConfig = new SearchableSelectConfig('label',
      'labels.chooseGroup', '', false,
      false, true, false, false)
    this.selectedGroup = null
  }
  public mounted () {
  }

  public updateGroup(e:any){
    this.selectedGroup = e
    this.$emit('updateCurrentAction', {value: e, type:'update'})
  }
  public removeGroup(e:any){
    this.selectedGroup = null
    this.$emit('updateCurrentAction', {value: null, type:'remove'})
  }
}
