import { mixins } from 'vue-class-component'
import CommonHelpers from '@/shared/commonHelpers'
import { Component, Vue } from 'vue-property-decorator'
import { IProduct } from '@/shared/models/productms/ProductModel'
import AffiliateTabComponent from '@/entities/productms/product/editProduct/tabs/affiliateTab/affiliateTab.vue'
import BrandingTabComponent from '@/entities/productms/product/editProduct/tabs/brandingTab/brandingTab.vue'
import CheckoutTabComponent from '@/entities/productms/product/editProduct/tabs/checkoutTab/checkoutTab.vue'
import CourseTabComponent from '@/entities/productms/product/editProduct/tabs/courseTab/courseTab.vue'
import DigitalTabComponent from '@/entities/productms/product/editProduct/tabs/digitalTab/digitalTab.vue'
import DiscountsTabComponent from '@/entities/productms/product/editProduct/tabs/discountsTab/discountsTab.vue'
import FeaturesTabComponent from '@/entities/productms/product/editProduct/tabs/featuresTab/featuresTab.vue'
import FollowUpTabComponent from '@/entities/productms/product/editProduct/tabs/followUpTab/followUpTab.vue'
import GeneralTabComponent from '@/entities/productms/product/editProduct/tabs/generalTab/generalTab.vue'
import PayBtnTabComponent from '@/entities/productms/product/editProduct/tabs/payBtnTab/payBtnTab.vue'
import PhysicalTabComponent from '@/entities/productms/product/editProduct/tabs/physicalTab/physicalTab.vue'
import PaymentTabComponent from '@/entities/productms/product/editProduct/tabs/paymentTab/paymentTab.vue'

@Component({
  props: {
    activeTab: String,
    product: Object
  },
  components: {
    GeneralTabComponent,
    DigitalTabComponent,
    PhysicalTabComponent,
    CourseTabComponent,
    FeaturesTabComponent,
    DiscountsTabComponent,
    PayBtnTabComponent,
    FollowUpTabComponent,
    AffiliateTabComponent,
    PaymentTabComponent,
    CheckoutTabComponent,
    BrandingTabComponent
  }
})
export default class ProductEditTabsComponent extends mixins(Vue, CommonHelpers) {
  public currentTab: string
  public preselectPromo: any
  constructor () {
    super()
    this.currentTab = 'general'
    this.preselectPromo = null
  }

  public mounted () {
    this.changeTabs('general', this.$props.activeTab)
  }

  public changeTabs (tab: string, subTab: string) {
    this.currentTab = tab || 'general'
  }

  public updateProduct (prod: IProduct) {
    this.$emit('updateProduct', prod)
  }

  public goBack () {
    this.$router.push({ name: 'Products' })
  }
}
