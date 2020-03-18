import {Component, Vue} from 'vue-property-decorator'
import SearchableSelectComponent from '@/components/searchableSelect/searchableSelect.vue'
import {mixins} from 'vue-class-component'
import CommonHelpers from '@/shared/commonHelpers'
import {ITaxRule, TaxRule, CustomerRegion, CustomerType} from '@/shared/models/tax-rule.model'
import {SearchableSelectConfig} from '@/shared/models/SearchableSelectConfig'
import TaxRuleService from '@/shared/services/taxRuleService'
import {AxiosResponse} from 'axios'

@Component({
  components: {
    SearchableSelectComponent
  },
  beforeRouteEnter(to, from, next) {
    next((vm: any) => {
      if (to.params.id) {
        vm.retrieveItem(to.params.id)
      }
    })
  }
})
export default class NewTaxRuleComponent extends mixins(CommonHelpers, Vue) {
  public taxRule: ITaxRule;
  public taxRuleService: any;
  public customerType: any;
  public customerRegion: any;
  public searchableConfig: any;

  constructor() {
    super();
    this.taxRuleService = TaxRuleService.getInstance();
    this.taxRule = new TaxRule();
    this.taxRule.customerType = CustomerType.ALL;
    this.customerType = {
      all: CustomerType.ALL,
      private: CustomerType.PRIVATE,
      company: CustomerType.COMPANY
    };
    this.customerRegion = {
      all: CustomerRegion.ALL,
      sameCountry: CustomerRegion.SAME_COUNTRY,
      otherCountryWorld: CustomerRegion.OTHER_COUNTRY_WORLD,
      otherCountryEu: CustomerRegion.OTHER_COUNTRY_WORLD
    };
    this.searchableConfig = new SearchableSelectConfig('enName',
      'labels.country', '', true,
      false, true, false, false)
  }

  public mounted() {
  }

  public retrieveItem(id: number) {
    this.taxRuleService.get(id).then((resp: AxiosResponse) => {
      this.taxRule = resp.data
    })
  }

  public cancel() {
    this.$router.go(-1)
  }

  public async save() {
    this.$validator.validateAll().then(success => {
      if (success && this.taxRule.country && this.taxRule.country.id) {
        const country = {
          id: this.taxRule.country ? this.taxRule.country.id : undefined,
          version: this.taxRule.country
            ? this.taxRule.country.version : undefined
        };
        this.taxRule.country = country;
        if (this.taxRule.id) {
          this.taxRuleService.put(this.taxRule).then((resp: AxiosResponse) => {
            if (resp) {
              // @ts-ignore
              this.$vueOnToast.pop('success', this.$t('toastMessages.taxRuleUpdated'));
              this.cancel()
            } else {
              // @ts-ignore
              this.$vueOnToast.pop('error', this.$t('toastMessages.taxRuleError'))
            }
          })
        } else {
          this.taxRuleService.post(this.taxRule).then((resp: AxiosResponse) => {
            if (resp) {
              // @ts-ignore
              this.$vueOnToast.pop('success', this.$t('toastMessages.taxRuleCreated'));
              this.cancel()
            } else {
              // @ts-ignore
              this.$vueOnToast.pop('error', this.$t('toastMessages.taxRuleError'))
            }
          })
        }
      }else {
        // @ts-ignore
        this.$vueOnToast.pop('error', this.$t('toastMessages.fillRequiredFields'))
      }
    })
  }

  public async countryChanged(country: any) {
    this.taxRule.country = country
  }

  public async countryRemoved(country: any) {
    this.taxRule.country = undefined
  }
}
