import { Component, Vue } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import CommonHelpers from '@/shared/commonHelpers'
import {ISearchableSelectConfig, SearchableSelectConfig} from '@/shared/models/SearchableSelectConfig'
import SearchableSelectComponent from '@/components/searchableSelect/searchableSelect.vue'

@Component({
  components: {
    SearchableSelectComponent
  }
})
export default class SendMailingComponent extends mixins(CommonHelpers, Vue) {
  public searchableSelectConfig: ISearchableSelectConfig
  public selectedValue:any
  constructor () {
    super()
    this.searchableSelectConfig = new SearchableSelectConfig('label',
      'labels.chooseMailing', '', false,
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
