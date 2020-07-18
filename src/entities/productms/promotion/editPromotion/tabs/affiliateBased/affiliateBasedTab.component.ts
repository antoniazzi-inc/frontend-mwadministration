import {Component, Vue, Watch} from "vue-property-decorator";
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
  mounted() {

  }
})
export default class AffiliateBasedTabComponent extends Vue {
  public forAllAffiliates: boolean
  public selectedAffiliates: any[]
  public multiSelectConfig: ISearchableSelectConfig

  constructor() {
    super();
    this.forAllAffiliates = false
    this.selectedAffiliates = []
    this.multiSelectConfig = new SearchableSelectConfig('label',
      'labels.selectAffiliates', '', false,
      false, true, true, false);
  }

  @Watch('$props.promotion', {immediate: true, deep: true})
  public updateAffiliateBased(newVal: any) {
    if (newVal && newVal.typeAffiliateBased) {
      let aff = JSON.parse(newVal.typeAffiliateBased.affiliateIdsJson)
      if (aff.length) {
        this.getAllAffiliates(aff)
      } else {
        this.forAllAffiliates = true
      }
    }
  }

  public getAllAffiliates(aff: []) {
    this.$store.state.lookups.affiliates.forEach((af:any) => {
      aff.forEach(affiliate => {
        //TODO populate selectedAffiliates
      })
    })
  }

  public saveAffiliateBased() {
  }

  public addAffiliate() {
  }

  public removeAffiliate() {
  }

  public previousState() {
    this.$router.push('/promotions')
  }
}
