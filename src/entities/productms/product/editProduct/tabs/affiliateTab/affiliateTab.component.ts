import { Component, Inject, Vue, Watch } from 'vue-property-decorator'
import Trumbowyg from 'vue-trumbowyg'
import 'trumbowyg/dist/ui/trumbowyg.css'
import { Money } from 'v-money'
import { AxiosResponse } from 'axios'
import CommonHelpers from '@/shared/commonHelpers'
import { mixins } from 'vue-class-component'
import { Company, ICompany } from '@/shared/models/company.model'
import ProductService from '@/shared/services/productService'
import { IProduct, Product } from '@/shared/models/ProductModel'
import { AffiliateAgreement, IAffiliateAgreement } from '@/shared/models/AffiliateAgreementModel'
import { AffiliateAgreementProduct, IAffiliateAgreementProduct } from '@/shared/models/AffiliateAgreementProductModel'
import ToggleSwitch from '@/components/toggleSwitch/toggleSwitch.vue'
import Store from '@/store/index'
@Component({
  props: {
    product: Object
  },
  components: {
    trumbowyg: Trumbowyg,
    'toggle-switch': ToggleSwitch,
    money: Money
  }
})
export default class AffiliateTabComponent extends mixins(Vue, CommonHelpers) {
    public productService: any = ProductService.getInstance()
    public isAvailable = false;
    public isSalesInfo = false;
    public useFixed = false;
    public fixedReward = 0;
    public percentageReward = 0;
    public selectedCompany: ICompany = new Company();
    public checkoutUpsell = '';
    public backToCallingPage = false;
    public productCopy: IProduct = new Product();
    public productBackup: IProduct = new Product();
    public affiliateAgreement: IAffiliateAgreement = new AffiliateAgreement();
    public affiliateAgreementProduct: IAffiliateAgreementProduct = new AffiliateAgreementProduct();
    public editorConfig = {};
    public moneyFixed = {
      decimal: ',',
      thousands: '.',
      prefix: Store.state.currency,
      suffix: '',
      precision: 2,
      masked: false
    }

    public moneyPercentage = {
      decimal: '',
      thousands: '',
      prefix: '',
      suffix: '%',
      precision: 0,
      masked: false
    }

    @Watch('product', { immediate: true, deep: true })
    public updatedProd (newVal: any) {
      this.productCopy = newVal
      this.productBackup = JSON.parse(JSON.stringify(newVal))
      this.fixedReward = newVal.generalFlatCommission ? newVal.generalFlatCommission : 0
      this.percentageReward = newVal.generalPercentageCommission ? newVal.generalPercentageCommission : 0
      this.isSalesInfo = !!newVal.affiliateSalesInfoJson
    }

    public save () {
      const dto = JSON.parse(JSON.stringify(this.productCopy))
      dto.typeDigital = undefined
      dto.typeService = undefined
      dto.typePhysical = undefined
      dto.followupAction = undefined
      dto.typeCourse = undefined
      dto.productSubscription = undefined
      if (this.isAvailable) {
        if (this.fixedReward > 0) {
          dto.generalFlatCommission = this.fixedReward
        }
        if (this.percentageReward > 0) {
          dto.generalPercentageCommission = this.percentageReward
        }
      } else {
        dto.generalFlatCommission = null
        dto.generalPercentageCommission = null
        dto.affiliateSalesInfoJson = null
      }
      this.productService.put(dto).then((resp: AxiosResponse) => {
        this.setAlert('productUpdated', 'success')
      })
    }

    public cancel () {
      this.productCopy = this.productBackup
    }
}
