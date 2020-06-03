import { Component, Inject, Vue, Watch } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import CommonHelpers from '@/shared/commonHelpers'
import promotionsService from '@/shared/services/promotionsService'
import ProductService from '@/shared/services/productService'
import { IProduct, Product } from '@/shared/models/ProductModel'
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
  public allDiscounts = [];
  public isNewAdded = false;
  public selectedDiscounts: any = [];
  public multiSelectConfig: ISearchableSelectConfig =
    new SearchableSelectConfig('label',
      'labels.chooseOption', '', false,
      false, true, true, false)

  public productCopy: IProduct = new Product();
  public productCopyBackup: any = null;

  @Watch('product', { immediate: true, deep: true })
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
          promotion: v
        })
      })
    }
    Vue.nextTick(function () {
      self.selectedDiscounts = selPromotions
    })
  }

  public mounted () {
    this.getAllDiscounts()
  }

  public getAllDiscounts () {
    const self = this
    this.promotionService.getAll({ page: 0, size: 1000, sort: {} }, undefined).then((resp: AxiosResponse) => {
      const allDiscount: any = []
      if (resp.data && resp.data.length) {
        $.each(resp.data, function (k, v) {
          allDiscount.push({
            id: v.id,
            label: self.getMultiLangName(v.promotionLanguages).name,
            promotion: v
          })
        })
      }
      this.allDiscounts = allDiscount
      if (this.isNewAdded) {
        this.preselectPromotion()
      }
    })
  }

  public removeDiscount (discount: any) {
    let index = null
    $.each(this.selectedDiscounts, function (k: any, v: any) {
      if (v.id === discount.id) {
        index = k
      }
    })
    if (index !== null) {
      this.selectedDiscounts.splice(index, 1)
    }
  }

  public preselectPromotion () {
    if (this.allDiscounts.length) {
      this.selectedDiscounts.push(this.allDiscounts[this.allDiscounts.length - 1])
      this.isNewAdded = false
    }
  }

  public addDiscount (discount: any) {
    this.selectedDiscounts.push(discount)
  }

  public cancel () {
  }

  public save () {
    const discountsToSave: any = []
    $.each(this.selectedDiscounts, function (k, v) {
      const promo = {
        id: v.id,
        administrationId: v.promotion.administrationId,
        availableFrom: v.promotion.availableFrom,
        availableTo: v.promotion.availableTo,
        recurrent: v.promotion.recurrent,
        createdOn: v.promotion.createdOn,
        updatedOn: v.promotion.updatedOn,
        version: v.promotion.version,
        promotionType: v.promotion.promotionType
      }
      discountsToSave.push(promo)
    })
    this.productCopy.promotions = discountsToSave
    this.productService().update(this.productCopy).then((resp: AxiosResponse) => {
      this.setAlert('productUpdated', 'success')
      this.productCopy = resp.data
      this.productCopyBackup = JSON.parse(JSON.stringify(resp.data))
    })
  }
}
