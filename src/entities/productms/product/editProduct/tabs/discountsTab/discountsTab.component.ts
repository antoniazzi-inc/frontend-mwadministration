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

import { Component, Inject, Vue, Watch } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import CommonHelpers from '@/shared/commonHelpers'
import promotionsService from '@/shared/services/promotionsService'
import ProductService from '@/shared/services/productService'
import { IProduct, Product } from '@/shared/models/productms/ProductModel'
import { AxiosResponse } from 'axios'
import { ISearchableSelectConfig, SearchableSelectConfig } from '@/shared/models/SearchableSelectConfig'
import SearchableSelectComponent from '@/components/searchableSelect/searchableSelect.vue'

@Component({
  props: {
    product: Object,
    clicked: Boolean,
    newPromotion: Boolean
  },
  components: {
    SearchableSelectComponent
  }
})
export default class DiscountsTabComponent extends mixins(Vue, CommonHelpers) {
  public promotionService: any = promotionsService.getInstance();
  public productService: any = ProductService.getInstance();
  public isNewAdded = false;
  public selectedDiscounts: any = [];
  public multiSelectConfig: ISearchableSelectConfig =
    new SearchableSelectConfig('label',
      'labels.chooseOption', '', false,
      false, true, true, false)

  public productCopy: IProduct = new Product();
  public productCopyBackup: any = null;

  @Watch('product', { immediate: true, deep: false })
  public updateProd (newVal: any) {
    this.productCopy = newVal
    if (this.productCopyBackup === null) {
      this.productCopyBackup = JSON.parse(JSON.stringify(newVal))
    }
  }

  @Watch('newPromotion', { immediate: true, deep: true })
  public updateNewPromotion (newVal: any) {
    this.isNewAdded = newVal
    if (newVal) {
      this.preselectPromotion()
    }
  }

  @Watch('clicked', { immediate: true, deep: true })
  public updateClicked (newVal: any) {
    const self = this
    const selPromotions: any = []
    self.selectedDiscounts = []
    if (this.productCopy.promotions && this.productCopy.promotions.length) {
      $.each(this.productCopy.promotions, function (k, v) {
        selPromotions.push({
          id: v.id,
          label: self.getMultiLangName(v.promotionLanguages).name,
          value: v
        })
      })
    }
    Vue.nextTick(function () {
      self.selectedDiscounts = selPromotions
    })
  }

  public mounted () {

  }

  public getDiscountDesc(promo:any) {
    if (promo.value.typeCouponBased) {
      return this.descDiscount(promo.value.typeCouponBased.discount, null)
    }
    else if (promo.value.typeTimeBased) {
      return this.descDiscount(promo.value.typeTimeBased.discount, null)
    }
    else if (promo.value.typeLoyaltyBased) {
      return this.descDiscount(promo.value.typeLoyaltyBased.discount, null)
    }
    else if (promo.value.typeQuantityBaseds && promo.value.typeQuantityBaseds.length) {
      return this.descDiscount(promo.value.typeQuantityBaseds[0].discount, promo.value)
    }
    else if (promo.value.typePriceBaseds && promo.value.typePriceBaseds.length) {
      return this.descDiscount(promo.value.typePriceBaseds[0].discount, promo.value)
    }
    else if (promo.value.typePersonalCouponBased) {
      return this.descDiscount(promo.value.typePersonalCouponBased.discount, promo.value)
    }
    else if (promo.value.typeBundleBaseds && promo.value.typeBundleBaseds.length) {
      return this.descDiscount(promo.value.typeBundleBaseds[0].discount, null)
    }
    else {
      return ''
    }
  }

  public descDiscount(discount:any, promo:any) {
    if (discount == undefined) {
      console.log(promo)
      return 'HUH .. undefined??'
    }
    if (discount.fixed) {
      if (this.$options && this.$options.filters){
        return this.$options.filters.formatAmount(discount.fixed)
      }
      else return discount.fixed
    }
    else if (discount.percentage) {
      return discount.percentage + '%'
    }
    else if (discount.noShipping) {
      return 'free shipping'
    }
    else {
      if (discount.freeItemsJson.products.length > 0) {
        if (this.$store.state.lookups.products.findIndex((prod:any)=>prod.value.id === discount.freeItemsJson.products[0].id) > -1) {
          let p = this.$store.state.lookups.products[this.$store.state.lookups.products.findIndex((prod:any)=>prod.value.id === discount.freeItemsJson.products[0].id)].label
          return 'free item (' + p + ')'
        }
        else return 'free item'
      }
      else return 'free item'
    }
  }

  public goBack() {
    this.$router.push('/products')
  }
  public removeDiscount (discount: any) {
    this.selectedDiscounts = discount
  }

  public preselectPromotion () {
    if (this.$store.state.lookups.promotions) {
      this.selectedDiscounts.push(this.$store.state.lookups.promotions[this.$store.state.lookups.promotions.length - 1])
      this.isNewAdded = false
    }
  }

  public addDiscount (discounts: any) {
    this.selectedDiscounts = discounts
  }

  public cancel () {
  }

  public save () {
    const discountsToSave: any = []
    $.each(this.selectedDiscounts, function (k, v) {
      const promo = {
        id: v.value.id,
        version: v.value.version
      }
      discountsToSave.push(promo)
    })
    this.productCopy.attributes = undefined
    this.productCopy.typeDigital = undefined
    this.productCopy.promotions = discountsToSave
    this.productService.put(this.productCopy).then((resp: AxiosResponse) => {
      this.setAlert('productUpdated', 'success')
      this.productCopy = resp.data
      this.productCopyBackup = JSON.parse(JSON.stringify(resp.data))
    })
  }
}
