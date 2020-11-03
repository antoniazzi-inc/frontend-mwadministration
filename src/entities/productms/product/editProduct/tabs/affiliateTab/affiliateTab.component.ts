import { Component, Inject, Vue, Watch } from 'vue-property-decorator'
import Trumbowyg from 'vue-trumbowyg'
import 'trumbowyg/dist/ui/trumbowyg.css'
import { Money } from 'v-money'
import { AxiosResponse } from 'axios'
import CommonHelpers from '@/shared/commonHelpers'
import { mixins } from 'vue-class-component'
import { Company, ICompany } from '@/shared/models/relationms/company.model'
import ProductService from '@/shared/services/productService'
import { IProduct, Product } from '@/shared/models/productms/ProductModel'
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
    public productBackup: IProduct|null = null;
    public affiliateAgreement: IAffiliateAgreement = new AffiliateAgreement();
    public affiliateAgreementProduct: IAffiliateAgreementProduct = new AffiliateAgreementProduct();
    public editorConfig = {};
    public moneyFixed = {
      decimal: ',',
      thousands: '.',
      prefix: Store.state.currency + ' ',
      suffix: '',
      precision: 2,
      masked: false
    }

    public moneyPercentage = {
      decimal: ',',
      thousands: '.',
      prefix: '',
      suffix: ' %',
      precision: 2,
      masked: false
    }

    @Watch('product', { immediate: true, deep: true })
    public updatedProd (newVal: any) {
      this.productCopy = newVal
      if(this.productBackup === null && newVal.id){
        let copy = JSON.parse(JSON.stringify(newVal))
        this.productBackup = Object.assign({}, copy)
      }
      this.isSalesInfo = !!newVal.affiliateSalesInfoJson
    }

    public save () {
      const dto = JSON.parse(JSON.stringify(this.productCopy))
      dto.typeDigital = undefined
      dto.typeService = undefined
      dto.typePhysical = undefined
      dto.typeCourse = undefined
      dto.productSubscription = undefined
      if (!this.productCopy.availableForAffiliates) {
        dto.generalFlatCommission = null
        dto.generalPercentageCommission = null
        dto.affiliateSalesInfoJson = null
      }
      this.productService.put(dto).then((resp: AxiosResponse) => {
        if(resp && resp.data){
          this.setAlert('productUpdated', 'success')
          this.productBackup = Object.assign({}, resp.data)
        }
      })
    }
    public goBack() {
      this.$router.push('/products')
    }
    public cancel () {
      if(this.productBackup) {
        this.isSalesInfo = this.productBackup.affiliateSalesInfoJson ? true : false
        if(this.productBackup && this.productBackup.affiliateSalesInfoJson){
          this.productCopy.affiliateSalesInfoJson = JSON.parse(JSON.stringify(this.productBackup.affiliateSalesInfoJson))
          this.productCopy.availableForAffiliates = this.productBackup.availableForAffiliates ? JSON.parse(JSON.stringify(this.productBackup.availableForAffiliates)) : false
        }
        let copy = JSON.parse(JSON.stringify(this.productBackup))
        this.productCopy = Object.assign({}, copy)
      } else {
        let copy = JSON.parse(JSON.stringify( this.$props.product))
        this.productCopy = Object.assign({}, copy)
      }
    }
}
