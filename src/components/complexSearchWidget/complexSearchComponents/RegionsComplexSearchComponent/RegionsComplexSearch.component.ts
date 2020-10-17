import {mixins} from "vue-class-component";
import CommonHelpers from "@/shared/commonHelpers";
import {Component, Vue} from "vue-property-decorator";
import {ISearchableSelectConfig, SearchableSelectConfig} from "@/shared/models/SearchableSelectConfig";
import SearchableSelectComponent from "@/components/searchableSelect/searchableSelect.vue";
@Component({
  components:{
    SearchableSelectComponent
  }, props: {
    query: [Object,Array,String]
  }
})
export default class RegionsComplexSearchComponent extends mixins(CommonHelpers, Vue) {
  public regionsSingleSelectConfig: ISearchableSelectConfig
  public selectedOperator: any
  public selectedRegion: any
  constructor() {
    super();
    this.regionsSingleSelectConfig =  new SearchableSelectConfig('name',
      'labels.selectRegion', '', false,
      false, false, false, false)
    this.selectedRegion = null
  }

  public addRegion(e:any){
    this.$emit('input', e)
  }
  public removeRegion(e:any){
    this.$emit('input', e)
  }
}
