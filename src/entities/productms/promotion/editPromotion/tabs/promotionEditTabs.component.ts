import { mixins } from 'vue-class-component'
import CommonHelpers from '@/shared/commonHelpers'
import { Component, Vue } from 'vue-property-decorator'
import { IProduct } from '@/shared/models/productms/ProductModel'
import GeneralTabComponent from "@/entities/productms/promotion/editPromotion/tabs/general/generalTab.vue";

import PriceBasedTabComponent
  from "@/entities/productms/promotion/editPromotion/tabs/priceBased/priceBasedTab.vue";
import QuantityBasedTabComponent
  from "@/entities/productms/promotion/editPromotion/tabs/quantityBased/quantityBasedTab.vue";
import AffiliateBasedTabComponent
  from "@/entities/productms/promotion/editPromotion/tabs/affiliateBased/affiliateBasedTab.vue";
import BundleBasedTabComponent
  from "@/entities/productms/promotion/editPromotion/tabs/bundleBased/bundleBasedTab.vue";
import CouponBasedTabComponent
  from "@/entities/productms/promotion/editPromotion/tabs/couponBased/couponBasedTab.vue";
import PersonalCouponBasedTabComponent
  from "@/entities/productms/promotion/editPromotion/tabs/personalCouponBased/personalCouponBasedTab.vue";
import UsageTabComponent from "@/entities/productms/promotion/editPromotion/tabs/usage/usageTab.vue";
import LoyaltyTabComponent from "@/entities/productms/promotion/editPromotion/tabs/loyaltyTab/loyaltyTab.vue";
import ProductsTabComponent from "../tabs/products/productsTab.vue";

@Component({
  props: {
    activeTab: String,
    promotion: Object
  },
  components: {
    GeneralTabComponent,
    ProductsTabComponent,
    PriceBasedTabComponent,
    QuantityBasedTabComponent,
    AffiliateBasedTabComponent,
    BundleBasedTabComponent,
    CouponBasedTabComponent,
    PersonalCouponBasedTabComponent,
    UsageTabComponent,
    LoyaltyTabComponent
  }
})
export default class PromotionEditTabsComponent extends mixins(Vue, CommonHelpers) {
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

  public updatePromotion (prod: any) {
    this.$emit('updatePromotion', prod)
  }

  public goBack () {
    this.$router.push({ name: 'Promotions' })
  }
}
