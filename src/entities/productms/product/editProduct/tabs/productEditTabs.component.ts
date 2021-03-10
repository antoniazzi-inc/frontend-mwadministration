/*
 *
 *  * Copyright 2018-2021 Antoniazzi Holding BV
 *  *
 *  * This program is free software: you can redistribute it and/or modify it
 *  * under the terms of the GNU General Public License as published by
 *  * the Free Software Foundation, either version 3 of the License,
 *  * or (at your option) any later version.
 *  *
 *  * This program is distributed in the hope that it will be useful,
 *  * but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 *  * GNU General Public License for more details.
 *  *
 *  * You should have received a copy of the GNU General Public License
 *  * along with this program. If not, see <https://www.gnu.org/licenses/>.
 *
 */

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
import VoucherTabComponent from "@/entities/productms/product/editProduct/tabs/voucherTab/voucherTab.vue";

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
    BrandingTabComponent,
    VoucherTabComponent
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
  public updateProductOnSocket (prod: IProduct) {
    this.$emit('updateProductOnSocket', prod)
  }

  public goBack () {
    this.$router.push({ name: 'Products' })
  }

}
