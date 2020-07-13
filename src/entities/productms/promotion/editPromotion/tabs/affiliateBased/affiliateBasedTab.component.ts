import {Component, Vue} from "vue-property-decorator";
import SearchableSelectComponent from "@/components/searchableSelect/searchableSelect.vue";
import {ISearchableSelectConfig, SearchableSelectConfig} from "@/shared/models/SearchableSelectConfig";
import ToggleSwitch from "@/components/toggleSwitch/toggleSwitch.vue";
@Component({
    props: {
        promotion: Object
    },
    components: {
      SearchableSelectComponent,
      ToggleSwitch
    },
    mounted(){

    }
})
export default class AffiliateBasedTabComponent extends Vue {
  public forAllAffiliates: boolean
  public selectedAffiliates: any[]
  public multiSelectConfig: ISearchableSelectConfig
  public allAffiliates: any[]
  constructor() {
    super();
    this.forAllAffiliates = false
    this.selectedAffiliates = []
    this.allAffiliates = []
    this.multiSelectConfig = new SearchableSelectConfig('label',
      'labels.selectAffiliates', '', false,
      false, true, true, false);
  }
  public saveAffiliateBased(){}
  public addAffiliate(){}
  public removeAffiliate(){}
  public previousState(){
    this.$router.push('/promotions')
  }
}
