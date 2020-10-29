import {Component, Vue, Watch} from "vue-property-decorator";
import {IMultiLanguageConfig, MultiLanguageConfig} from "@/shared/models/MultiLanguageConfig";
import moment from "moment";
import {IMoneyConfig, MoneyConfig} from "@/shared/models/moneyConfig";
import Store from "@/store";
import MultiLanguageComponent from "@/components/multiLanguage/MultiLanguage.vue";
import flatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'
import {IPromotion, Promotion} from "@/shared/models/productms/PromotionModel";
import {ISearchableSelectConfig, SearchableSelectConfig} from "@/shared/models/SearchableSelectConfig";
import ToggleSwitch from "@/components/toggleSwitch/toggleSwitch.vue";
import SearchableSelectComponent from "@/components/searchableSelect/searchableSelect.vue";
import CommonHelpers from "@/shared/commonHelpers";
import {mixins} from "vue-class-component";
import {AxiosResponse} from "axios";
import promotionsService from "@/shared/services/promotionsService";
import discountsService from "@/shared/services/discountsService";
import {DATE_FORMAT} from "@/shared/filters";

@Component({
  props: {
    promotion: Object
  },
  components: {
    MultiLanguageComponent,
    ToggleSwitch,
    flatPickr,
    SearchableSelectComponent
  },
  mounted() {

  }
})
export default class GeneralTabComponent extends mixins(CommonHelpers, Vue) {
  public multiLangConfig: IMultiLanguageConfig
  public validFromConfig: any
  public validToConfig: any
  public promoType: any
  public availableFrom: any
  public availableTo: any
  public selectedDiscountType: any
  public selectedProduct: any
  public discountQuantityAmount: any
  public moneyPercentage: any
  public discountService: any
  public promotionService: any
  public discountPriceAmount: any
  public money: any
  public useMoreDecimalst: boolean
  public wholeOrder: boolean
  public allDiscountTypes: any[]
  public freeItems: any[]
  public singleSelectConfig: ISearchableSelectConfig
  public promotionCopy: any

  constructor(props: any) {
    super(props);
    this.promotionCopy = new Promotion()
    this.multiLangConfig = new MultiLanguageConfig(true, true,
      'labels.promotionName', 'labels.promotionDescription', false,
      false, false, true, true, false)
    this.validFromConfig = {
      wrap: true,
      altInput: false,
      dateFormat: 'm-d-Y',
      minDate: null
    }
    this.validToConfig = {
      wrap: true,
      altInput: false,
      dateFormat: 'm-d-Y',
      minDate: null
    }
    this.availableFrom = null
    this.availableTo = null
    this.promotionService = promotionsService.getInstance()
    this.discountService = discountsService.getInstance()
    this.selectedProduct = null
    this.selectedDiscountType = null
    this.wholeOrder = false
    this.promoType = ''
    this.discountQuantityAmount = 0
    this.freeItems = []
    this.discountPriceAmount = 0
    this.money = new MoneyConfig(',', '.', Store.state.currency, '', 2, false)
    this.moneyPercentage = new MoneyConfig(',', '.', '', ' %', 2, false)
    this.allDiscountTypes = [{
      id: 1,
      name: 'percentage',
      label: 'percentage'
    }, {
      id: 2,
      name: 'fixed',
      label: 'fixedAmount'
    }, {
      id: 3,
      name: 'noShipping',
      label: 'noShipping'
    }, {
      id: 4,
      name: 'freeItems',
      label: 'freeItems'
    }]
    this.useMoreDecimalst = false
    this.singleSelectConfig = new SearchableSelectConfig('label',
      '', '', false,
      false, false, false, false)
  }

  @Watch('useMoreDecimalst', {immediate: true, deep: true})
  public updateUseMoreDecimalst(newVal: any) {
    this.money.precision = newVal ? 3 : 2
  }

  @Watch('wholeOrder', {immediate: true, deep: true})
  public updateWholeOrder(newVal: any) {
    this.wholeOrder = newVal
    if (this.promotionCopy[this.promoType] && this.promotionCopy[this.promoType].discount) this.promotionCopy[this.promoType].discount.entireOrder = newVal
  }

  @Watch('promotion', {immediate: true, deep: true})
  public async updatePromotion(newVal: any) {
    this.promotionCopy = newVal
    const self = this
    Vue.nextTick(function () {
      self.availableFrom = newVal && newVal.availableFrom ? moment(newVal.availableFrom).format(DATE_FORMAT) : moment().format(DATE_FORMAT)
      self.availableTo = newVal && newVal.availableTo ? moment(newVal.availableTo).format(DATE_FORMAT) : null
      self.validFromConfig.minDate = self.availableFrom
      self.validToConfig.minDate = self.availableFrom
    })
    let discountId: any = await this.getDiscountType(newVal)
    this.promoType = discountId.type
    if (this.promotionCopy[this.promoType]) {
      if (this.promoType === 'typeBundleBaseds' || this.promoType === 'typePriceBaseds' || this.promoType === 'typeQuantityBaseds') {
        if (this.promotionCopy[this.promoType][0] && this.promotionCopy[this.promoType][0].discount && this.promotionCopy[this.promoType][0].discount.fixed !== null && this.promotionCopy[this.promoType][0].discount.fixed) {
          this.selectedDiscountType = 2;
          this.discountPriceAmount = this.promotionCopy[this.promoType][0].discount.fixed;
        } else if (this.promotionCopy[this.promoType][0] && this.promotionCopy[this.promoType][0].discount && this.promotionCopy[this.promoType][0].discount.percentage !== null && this.promotionCopy[this.promoType][0].discount.percentage) {
          this.selectedDiscountType = 1;
          this.discountPriceAmount = this.promotionCopy[this.promoType][0].discount.percentage;
        } else if (this.promotionCopy[this.promoType][0] && this.promotionCopy[this.promoType][0].discount && this.promotionCopy[this.promoType][0].discount.noShipping !== null && this.promotionCopy[this.promoType][0].discount.noShipping) {
          this.selectedDiscountType = 3;
        } else if (this.promotionCopy[this.promoType][0] && this.promotionCopy[this.promoType][0].discount && this.promotionCopy[this.promoType][0].discount.freeItemsJson !== null && this.promotionCopy[this.promoType][0].discount.freeItemsJson) {
          this.selectedDiscountType = 4;
          this.getSelectedProductFromDiscount(this.promotionCopy[this.promoType][0].discount.freeItemsJson);
          this.freeItems = this.promotionCopy[this.promoType][0].discount.freeItemsJson
        }
        this.wholeOrder = this.promotionCopy[this.promoType][0] ? this.promotionCopy[this.promoType][0].discount ? this.promotionCopy[this.promoType][0].discount.entireOrder : false : false;
      } else {
        if (this.promotionCopy[this.promoType].discount && this.promotionCopy[this.promoType].discount.fixed && this.promotionCopy[this.promoType].discount.fixed !== null) {
          this.selectedDiscountType = 2;
          this.discountPriceAmount = this.promotionCopy[this.promoType].discount.fixed
        } else if (this.promotionCopy[this.promoType].discount && this.promotionCopy[this.promoType].discount.percentage && this.promotionCopy[this.promoType].discount.percentage !== null) {
          this.selectedDiscountType = 1;
          this.discountPriceAmount = this.promotionCopy[this.promoType].discount.percentage;
        } else if (this.promotionCopy[this.promoType].discount && this.promotionCopy[this.promoType].discount.noShipping && this.promotionCopy[this.promoType].discount.noShipping !== null) {
          this.selectedDiscountType = 3;
        } else if (this.promotionCopy[this.promoType].discount && this.promotionCopy[this.promoType].discount.freeItemsJson && this.promotionCopy[this.promoType].discount.freeItemsJson !== null) {
          this.selectedDiscountType = 4;
          this.getSelectedProductFromDiscount(this.promotionCopy[this.promoType].discount.freeItemsJson);
          this.freeItems = this.promotionCopy[this.promoType].discount.freeItemsJson
        }
        this.wholeOrder = this.promotionCopy[this.promoType].discount ? this.promotionCopy[this.promoType].discount.entireOrder : false;
      }
    }
    if (newVal && newVal[discountId.type] && newVal[discountId.type].discount && newVal[discountId.type].discount.freeItemsJson) {
      let products: any = []
      newVal[discountId.type].discount.freeItemsJson.products.forEach((prod: any) => {
        this.$store.state.lookups.products.forEach((product: any) => {
          if (prod.id === product.value.id) {
            products.push({prod: product, quantity: prod.quantity})
          }
        })
      })
      Vue.nextTick(function () {
        self.selectedProduct = products[0].prod
      })
      this.discountQuantityAmount = products[0].quantity
    }
    if (discountId.discount && (discountId.discount.id === 1 || discountId.discount.id === 2)) {
      let discountPrice = this.getDiscountType(newVal)
      this.discountPriceAmount = discountPrice.discount.value
    }
  }

  @Watch('availableFrom', {immediate: true, deep: true})
  public changeAvailableToMin(newVal: any) {
    this.validToConfig.minDate = moment(newVal).format(DATE_FORMAT)
  }

  public resetPromo() {
    // TODO restore to original values in this tab-panel
    this.goBack()
  }

  public getSelectedProductFromDiscount(freeItems: any) {
    let product: any = null;
    let self = this;
    if (freeItems) {
      $.each(this.$store.state.lookups.products, function (i, j) {
        $.each(freeItems.products, function (k, v) {
          if (j.value.id === v.id) {
            product = j;
            self.discountQuantityAmount = v.quantity
          }
        });
      });
    }
    if (product !== null) {
      Vue.nextTick(function () {
        self.selectedProduct = product;
      })
    }
  }

  public addPromotionLang(lang: any) {
    let index = null
    if (this.promotionCopy.promotionLanguages) {
      this.promotionCopy.promotionLanguages.forEach((currLang: any, i: any) => {
        if (currLang.langKey === lang) {
          index = i
        }
      })
    }
    const newLang: any = {
      name: '',
      description: '',
      langKey: lang
    }
    if (index === null) {
      this.promotionCopy.promotionLanguages ? this.promotionCopy.promotionLanguages.push(newLang) : this.promotionCopy.promotionLanguages = [newLang]
    }
  }

  public showDateError() {
    if (this.availableTo === null) return false
    return moment(this.availableTo).isBefore(moment(this.availableFrom))
  }

  public changePromotionLang(lang: any) {
    let index = null
    if (this.promotionCopy.promotionLanguages && this.promotionCopy.promotionLanguages.length > 0) {
      $.each(this.promotionCopy.promotionLanguages, function (k, v) {
        if (v.langKey === lang.langKey) {
          index = k
        }
      })
      if (index !== null) {
        this.promotionCopy.promotionLanguages[index] = lang
      } else {
        this.promotionCopy.promotionLanguages.push(lang)
      }
    } else {
      this.promotionCopy.promotionLanguages ? this.promotionCopy.promotionLanguages.push(lang) : undefined
    }
  }

  public removePromotionLang(lang: any) {
    let index = null
    if (this.promotionCopy.promotionLanguages && this.promotionCopy.promotionLanguages.length > 0) {
      $.each(this.promotionCopy.promotionLanguages, function (k, v) {
        if (v.langKey === lang.langKey) {
          index = k
        }
      })
      if (index !== null) {
        this.promotionCopy.promotionLanguages.splice(index, 1)
      }
    }
  }

  public addProduct(prod: any) {
    this.selectedProduct = prod
  }

  public removeProduct(prod: any) {
    this.selectedProduct = null
  }

  public save() {
    let self = this;
    let prods:any = []
    this.promotionCopy.products.forEach((e:any)=>{
      prods.push({
        id: e.id,
        version: e.version
      })
    })
    let dto: any = {
      id: this.promotionCopy.id,
      administrationId: this.promotionCopy.administrationId,
      version: this.promotionCopy.version,
      createdOn: this.promotionCopy.createdOn,
      updatedOn: this.promotionCopy.updatedOn,
      availableFrom: moment(this.availableFrom),
      availableTo: moment(this.availableTo),
      promotionType: this.promotionCopy.promotionType,
      recurrent: this.promotionCopy.recurrent,
      products: prods,
      promotionLanguages: this.promotionCopy.promotionLanguages,
    };
    dto[this.promoType] = this.promotionCopy[this.promoType];
    let updateDiscountDto: any = {
      id: this.promotionCopy[this.promoType].discount ? this.promotionCopy[this.promoType].discount.id : this.promotionCopy[this.promoType][0].discount.id,
      version: this.promotionCopy[this.promoType].discount ? this.promotionCopy[this.promoType].discount.version : this.promotionCopy[this.promoType][0].discount.version,
      entireOrder: this.wholeOrder,
      fixed: null,
      percentage: null,
      freeItemsJson: null,
      noShipping: null
    }
    this.promotionService.put(dto).then((resp: AxiosResponse) => {
      if (resp && resp.data) {
        this.promotionCopy = resp.data;
        switch (self.selectedDiscountType) {
          case 1:
            updateDiscountDto.percentage = self.discountPriceAmount
            break;
          case 2:
            updateDiscountDto.fixed = self.discountPriceAmount
            break;
          case 3:
            updateDiscountDto.noShipping = true;
            break;
          case 4:
            updateDiscountDto.freeItemsJson = self.freeItems;
            break;
        }
        this.discountService.put(updateDiscountDto).then((resp1: AxiosResponse) => {
          if (resp1 && resp1.data) {
            this.setAlert('promotionUpdated', 'success')
            Vue.nextTick(function () {
              self.promotionCopy[self.promoType].discount = resp1.data;
              self.$emit('updatePromo', self.promotionCopy);
            });
          } else {
            this.setAlert('promotionUpdateError', 'error')
          }
        });
      }
    });
  }

  public goBack() {
    this.$router.push('/promotions')
  }
}
