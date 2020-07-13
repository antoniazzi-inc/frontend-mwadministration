import {mixins} from 'vue-class-component'
import CommonHelpers from '@/shared/commonHelpers'
import {Component, Vue, Watch} from 'vue-property-decorator'
import SearchableSelectComponent from '../../../../components/searchableSelect/searchableSelect.vue'
import {IMultiLanguageConfig, MultiLanguageConfig} from '@/shared/models/MultiLanguageConfig'
import MultiLanguageComponent from '@/components/multiLanguage/MultiLanguage.vue'
import {IMoneyConfig, MoneyConfig} from '@/shared/models/moneyConfig'
import ToggleSwitch from '@/components/toggleSwitch/toggleSwitch.vue'
import flatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'
import {ISearchableSelectConfig, SearchableSelectConfig} from '@/shared/models/SearchableSelectConfig'
import UploadWidget from '@/components/uploadWidget/uploadWidget.vue'
import moment from 'moment'
import Store from '@/store/index'
import {IPromotion, Promotion, promotionType} from "@/shared/models/PromotionModel";
import {TypeTimeBased} from "@/shared/models/TypeTimeBasedModel";
import promotionsService from "@/shared/services/promotionsService";
import {Discount} from "@/shared/models/DiscountModel";
import {TypeAffiliateBased} from "@/shared/models/TypeAffiliateBasedModel";
import {TypeBundleBased} from "@/shared/models/TypeBundleBasedModel";
import {TypeCouponBased} from "@/shared/models/TypeCouponBasedModel";
import {Coupon} from "@/shared/models/CouponModel";
import {TypeLoyaltyBased} from "@/shared/models/TypeLoyaltyBasedModel";
import {TypePersonalCouponBased} from "@/shared/models/TypePersonalCouponBasedModel";
import {TypePriceBased} from "@/shared/models/TypePriceBasedModel";
import {TypeQuantityBased} from "@/shared/models/TypeQuantityBasedModel";
import {AxiosResponse} from "axios";

@Component({
  components: {
    SearchableSelectComponent,
    MultiLanguageComponent,
    flatPickr,
    'toggle-switch': ToggleSwitch,
    UploadWidget
  },
  beforeRouteEnter(to, from, next) {
    next((vm: any) => {
      if (to.query.local && to.query.local === 'true') {
        vm.loadProductFromSessionStorage()
      }
    })
  }
})
export default class NewPromotionComponent extends mixins(Vue, CommonHelpers) {
  public promotionService: any;
  public promotion: IPromotion;
  public selectedBundleProduct: any;
  public validFromConfig: any;
  public isSaving: boolean;
  public isValidatingStep2: boolean;
  public couponMaxTimesUsed: boolean;
  public forAllAffiliates: boolean;
  public notUrl: boolean;
  public validDays: boolean;
  public availableFrom: Date;
  public availableTo: Date | any;
  public isSubscription: boolean;
  public step: number;
  public discountQuantityAmount: number;
  public discountPriceAmount: number;
  public discountTypeId: number;
  public quantityType: number;
  public progress: any;
  public validToConfig: any;
  public selectedAffiliates: any[];
  public allAffiliates: any[];
  public selectedCourse: any;
  public selectedProduct: any;
  public moneyPercentage: any;
  public singleSelectConfig: ISearchableSelectConfig;
  public moneyConfig: IMoneyConfig;
  public searchableConfig: ISearchableSelectConfig;
  public multiLangConfig: IMultiLanguageConfig;
  public totalThreshhold: number;
  public maxTimesUsed: number;
  public temporaryValid: number;
  public bundleQuantity: number;
  public earnedPoints: number;
  public totalPurchaseAmount: number;
  public totalPurchaseItems: number;
  public pathToProduct: string;
  public couponCode: string;
  public discountTypes = [
    {
      id: 1,
      name: 'percentage',
      label: 'labels.percentage'
    }, {
      id: 2,
      name: 'fixed',
      label: 'labels.fixedAmount'
    }, {
      id: 3,
      name: 'noShipping',
      label: 'labels.noShipping'
    }, {
      id: 4,
      name: 'freeItems',
      label: 'labels.freeItems'
    }
  ];

  constructor() {
    super()
    this.step = 0
    this.totalPurchaseAmount = 0
    this.totalPurchaseItems = 0
    this.earnedPoints = 0
    this.totalThreshhold = 0
    this.temporaryValid = 0
    this.maxTimesUsed = 0
    this.bundleQuantity = 0
    this.pathToProduct = ''
    this.couponCode = ''
    this.quantityType = 0
    this.selectedAffiliates = []
    this.allAffiliates = []
    this.selectedProduct = null
    this.selectedBundleProduct = null
    this.couponMaxTimesUsed = false
    this.validDays = false
    this.forAllAffiliates = false
    this.moneyPercentage = {
      decimal: ',',
      thousands: '.',
      prefix: '',
      suffix: '%',
      precision: 0,
      masked: false
    };
    this.singleSelectConfig = new SearchableSelectConfig('label',
      'labels.chooseProduct', '', true,
      false, false, false, false)
    this.progress = 0
    this.discountTypeId = 1
    this.discountPriceAmount = 0.0;
    this.discountQuantityAmount = 0.0;
    this.promotionService = promotionsService.getInstance()
    this.availableFrom = new Date()
    this.availableTo = null
    this.promotion = new Promotion(undefined, undefined, undefined, undefined,
      undefined, promotionType.AFFILIATE)
    this.searchableConfig = new SearchableSelectConfig('enName',
      'labels.country', 'labels.addNewCourse', true,
      true, false, false, false)
    this.isValidatingStep2 = false
    this.isSaving = false
    this.isSubscription = false
    this.selectedCourse = null
    this.notUrl = false
    this.multiLangConfig = new MultiLanguageConfig(true, true,
      'labels.promotionName', 'labels.promotionDescription', false,
      false, false, true, true, false)
    this.validFromConfig = {
      wrap: true,
      altInput: false,
      dateFormat: 'm-d-Y',
      minDate: moment().format('MM-DD-YYYY')
    }
    this.validToConfig = {
      wrap: true,
      altInput: false,
      dateFormat: 'm-d-Y',
      minDate: moment().format('MM-DD-YYYY')
    }
    this.moneyConfig = new MoneyConfig(undefined, undefined, '', Store.state.currency, 0, false)
  }

  public resetPromotionTypes() {
    return new Promise(resolve => {
      this.promotion.typeAffiliateBased = undefined
      this.promotion.typeBundleBaseds = undefined
      this.promotion.typeCouponBased = undefined
      this.promotion.typeLoyaltyBased = undefined
      this.promotion.typePersonalCouponBased = undefined
      this.promotion.typePriceBaseds = undefined
      this.promotion.typeQuantityBaseds = undefined
      this.promotion.typeTimeBased = undefined
      resolve()
    })
  }

  public created() {
    this.promotion.typeTimeBased = new TypeTimeBased()
  }

  @Watch('availableFrom', {immediate: true, deep: true})
  public changeAvailableToMin(newVal: any) {
    this.validToConfig.minDate = moment(newVal).format('MM-DD-YYYY')
  }

  public generateCouponCode() {
    this.couponCode = this.generateRandom();
  }

  public changeProductType(type: any) {
    let self = this;
    this.resetPromotionTypes().then(resp => {
      this.promotion.promotionType = type;
      switch (type) {
        case 'TIME':
          self.promotion.typeTimeBased = new TypeTimeBased();
          self.promotion.typeTimeBased.discount = new Discount();
          break;
        case 'AFFILIATE':
          self.promotion.typeAffiliateBased = new TypeAffiliateBased();
          self.promotion.typeAffiliateBased.discount = new Discount();
          break;
        case 'BUNDLE':
          self.promotion.typeBundleBaseds = [new TypeBundleBased()];
          self.promotion.typeBundleBaseds[0].discount = new Discount();
          break;
        case 'COUPON':
          self.promotion.typeCouponBased = new TypeCouponBased();
          self.promotion.typeCouponBased.discount = new Discount();
          self.promotion.typeCouponBased.coupon = new Coupon();
          break;
        case 'LOYALTY':
          self.promotion.typeLoyaltyBased = new TypeLoyaltyBased();
          self.promotion.typeLoyaltyBased.discount = new Discount();
          break;
        case 'PERSONAL_COUPON':
          self.promotion.typePersonalCouponBased = new TypePersonalCouponBased();
          self.promotion.typePersonalCouponBased.discount = new Discount();
          break;
        case 'PRICE':
          self.promotion.typePriceBaseds = [new TypePriceBased()];
          self.promotion.typePriceBaseds[0].discount = new Discount();
          break;
        case 'QUANTITY':
          self.promotion.typeQuantityBaseds = [new TypeQuantityBased()];
          self.promotion.typeQuantityBaseds[0].discount = new Discount();
          break;
        case 'TEMPORARY_COUPON':
          self.promotion.typePersonalCouponBased = new TypePersonalCouponBased();
          self.promotion.typePersonalCouponBased.discount = new Discount();
          break;
      }
    })
  }

  public validateAvailableTo(e: any) {
    if (this.availableTo === null) {
      return true
    }
    if (this.availableTo) {
      if (moment(moment(this.availableTo)).isAfter(this.availableFrom)) {
        return true
      } else {
        return false
      }
    } else {
      return false
    }
  }

  public createDto() {
    let self = this;
    let discountName: any = null;
    let discountValue: any = null;
    $.each(this.discountTypes, function (k, v) {
      if (v.id === self.discountTypeId) {
        if (v.name === 'fixed' || v.name === 'percentage') {
          discountName = v.name;
          discountValue = self.discountPriceAmount;
        } else {
          if (v.name === 'noShipping') {
            discountName = v.name;
            discountValue = true;
          } else {
            discountName = 'freeItemsJson';
            discountValue = {
              products: [{
                id: self.selectedProduct.id,
                quantity: self.discountQuantityAmount
              }],
              attributeValues: undefined
            };
          }
        }
      }
    });
    return new Promise(resolve => {
      switch (this.promotion.promotionType) {
        case 'TIME':
          if (self.promotion && self.promotion.typeTimeBased && self.promotion.typeTimeBased.discount)
            self.promotion.typeTimeBased.discount.noShipping = undefined;
          if (self.discountTypeId === 4) {
            // @ts-ignore
            self.promotion.typeTimeBased.discount[discountName] = discountValue;
          } else {
            //@ts-ignore
            self.promotion.typeTimeBased.discount[discountName] = JSON.stringify(discountValue);
          }
          break;
        case 'AFFILIATE':
          //@ts-ignore
          self.promotion.typeAffiliateBased.discount.noShipping = undefined;
          if (discountName === 'freeItemsJson') {
            if (self.promotion && self.promotion.typeAffiliateBased && self.promotion.typeAffiliateBased.discount)
              //@ts-ignore
              self.promotion.typeAffiliateBased.discount[discountName] = discountValue;
          } else {
            //@ts-ignore
            self.promotion.typeAffiliateBased.discount[discountName] = JSON.stringify(discountValue);
          }
          let affIds: any = [];
          $.each(self.selectedAffiliates, function (k, v) {
            affIds.push(v.id);
          })
          if (self.promotion.typeAffiliateBased) {
            self.promotion.typeAffiliateBased.affiliateIdsJson = JSON.stringify(affIds);
          } else {
            self.promotion.typeAffiliateBased = {
              affiliateIdsJson: JSON.stringify(affIds)
            }
          }
          break;
        case 'BUNDLE':
          let itemsJson = {
            products: [{
              id: self.selectedBundleProduct.id,
              quantity: self.bundleQuantity
            }],
            attributeValues: undefined
          };
          self.promotion.typeBundleBaseds && self.promotion.typeBundleBaseds[0].discount ? self.promotion.typeBundleBaseds[0].discount.noShipping = undefined : null
          self.promotion.typeBundleBaseds && self.promotion.typeBundleBaseds ? self.promotion.typeBundleBaseds[0].itemsJson = itemsJson : null

          if (discountName === 'freeItemsJson') {
            //@ts-ignore
            self.promotion.typeBundleBaseds[0].discount[discountName] = discountValue;
          } else {
            //@ts-ignore
            self.promotion.typeBundleBaseds[0].discount[discountName] = JSON.stringify(discountValue);
          }
          break;
        case 'COUPON':
          //@ts-ignore
          self.promotion.typeCouponBased.discount.noShipping = undefined;
          if (discountName === 'freeItemsJson') {
            //@ts-ignore
            self.promotion.typeCouponBased.discount[discountName] = discountValue;
          } else {
            //@ts-ignore
            self.promotion.typeCouponBased.discount[discountName] = JSON.stringify(discountValue);
          }
          //@ts-ignore
          self.promotion.typeCouponBased.coupon.code = self.couponCode;
          //@ts-ignore
          self.promotion.typeCouponBased.coupon.maxTimesUsed = self.maxTimesUsed;

          break;
        case 'LOYALTY':
          self.promotion.typeLoyaltyBased && self.promotion.typeLoyaltyBased.discount ? self.promotion.typeLoyaltyBased.discount.noShipping = undefined : null
          if (discountName === 'freeItemsJson') {
            //@ts-ignore
            self.promotion.typeLoyaltyBased.discount[discountName] = discountValue;
          } else {
            //@ts-ignore
            self.promotion.typeLoyaltyBased.discount[discountName] = JSON.stringify(discountValue);
          }
          if(self.promotion.typeLoyaltyBased){
            self.promotion.typeLoyaltyBased.totalPurchaseAmount = this.totalPurchaseAmount;
            self.promotion.typeLoyaltyBased.totalPurchaseItems = this.totalPurchaseItems;
            self.promotion.typeLoyaltyBased.points = this.earnedPoints;
          }
          break;
        case 'PERSONAL_COUPON':
          self.promotion.typePersonalCouponBased && self.promotion.typePersonalCouponBased.discount ? self.promotion.typePersonalCouponBased.discount.noShipping = undefined : null
          if (discountName === 'freeItemsJson') {
            //@ts-ignore
            self.promotion.typePersonalCouponBased.discount[discountName] = discountValue;
          } else {
            //@ts-ignore
            self.promotion.typePersonalCouponBased.discount[discountName] = JSON.stringify(discountValue);
          }
          self.promotion.typePersonalCouponBased ? self.promotion.typePersonalCouponBased.maxCouponsUsed = self.maxTimesUsed : null
          break;
        case 'PRICE':
          self.promotion.typePriceBaseds && self.promotion.typePriceBaseds[0].discount ? self.promotion.typePriceBaseds[0].discount.noShipping = undefined : null
          if (discountName === 'freeItemsJson') {
            //@ts-ignore
            self.promotion.typePriceBaseds[0].discount[discountName] = discountValue;
          } else {
            //@ts-ignore
            self.promotion.typePriceBaseds[0].discount[discountName] = JSON.stringify(discountValue);
          }
          self.promotion.typePriceBaseds && self.promotion.typePriceBaseds[0] ? self.promotion.typePriceBaseds[0].price = self.totalThreshhold : null
          break;
        case 'QUANTITY':
          self.promotion.typeQuantityBaseds && self.promotion.typeQuantityBaseds[0] && self.promotion.typeQuantityBaseds[0].discount ? self.promotion.typeQuantityBaseds[0].discount.noShipping = undefined : null
          if (discountName === 'freeItemsJson') {
            //@ts-ignore
            self.promotion.typeQuantityBaseds[0].discount[discountName] = discountValue;
          } else {
            //@ts-ignore
            self.promotion.typeQuantityBaseds[0].discount[discountName] = JSON.stringify(discountValue);
          }
          self.promotion.typeQuantityBaseds ? self.promotion.typeQuantityBaseds[0].quantity = self.quantityType : null
          break;
        case 'TEMPORARY_COUPON':
          self.promotion.typePersonalCouponBased && self.promotion.typePersonalCouponBased.discount ? self.promotion.typePersonalCouponBased.discount.noShipping = undefined : null
          if (discountName === 'freeItemsJson') {
            //@ts-ignore
            self.promotion.typePersonalCouponBased.discount[discountName] = discountValue;
          } else {
            //@ts-ignore
            self.promotion.typePersonalCouponBased.discount[discountName] = JSON.stringify(discountValue);
          }
          self.promotion.typePersonalCouponBased ? self.promotion.typePersonalCouponBased.maxCouponsUsed = self.maxTimesUsed : null
          let per = self.temporaryValid.toString();
          if (self.validDays) {
            per += ' hours'
          } else {
            per += ' days'
          }
          self.promotion.typePersonalCouponBased ? self.promotion.typePersonalCouponBased.period = per : null
          break;
      }
      resolve();
    });
  }

  public onComplete(e: any) {
    this.validateStep().then(resp => {
      if (resp) {
        this.createDto().then(() => {
          this.promotion.availableFrom = moment(this.availableFrom, 'YYYY-MM-DDTHH:mm')
          this.promotion.availableTo = moment(this.availableTo, 'YYYY-MM-DDTHH:mm')
          if(this.promotion.availableTo === null) this.promotion.availableTo = undefined
          this.promotionService.post(this.promotion).then((resp: AxiosResponse) => {
            if (resp) {
              this.setAlert('promotionCreated', 'success')
              this.goBack()
            } else {
              this.setAlert('promotionCreateError', 'error')
            }
          })
        })
      }
    })
  }

  public changeTab(e: any, a: any) {
    this.step = a
  }

  public stepBack() {
    if (this.step <= 0) {
      return
    } else {
      this.step -= 1;
      this.$validator.reset();
    }
  }

  public stepForward() {
    if (this.step >= 3) {
      return
    } else {
      this.validateStep().then(resp => {
        if (resp) {
          this.step += 1;
        }
      })
    }
  }

  public validateStep() {
    const self = this
    return new Promise((resolve, reject) => {
      if (this.step === 0) {
        resolve(true)
      } else if (this.step === 1) {
        this.$validator.validateAll().then(valid => {
          if (valid) {
            self.isValidatingStep2 = true
            resolve(true)
          } else {
            resolve(false)
          }
        })
      } else if (this.step === 2) {
        resolve(true)
      } else if (this.step === 3) {
        resolve(true)
      }
    })
  }

  public addPromotionLang(lang: any) {
    let index = null
    if (this.promotion.promotionLanguages) {
      this.promotion.promotionLanguages.forEach((currLang: any, i: any) => {
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
      this.promotion.promotionLanguages ? this.promotion.promotionLanguages.push(newLang) : this.promotion.promotionLanguages = [newLang]
    }
  }

  public changePromotionLang(lang: any) {
    let index = null
    if (this.promotion.promotionLanguages && this.promotion.promotionLanguages.length > 0) {
      $.each(this.promotion.promotionLanguages, function (k, v) {
        if (v.langKey === lang.langKey) {
          index = k
        }
      })
      if (index !== null) {
        this.promotion.promotionLanguages[index] = lang
      } else {
        this.promotion.promotionLanguages.push(lang)
      }
    } else {
      this.promotion.promotionLanguages ? this.promotion.promotionLanguages.push(lang) : undefined
    }
  }

  public removePromotionLang(lang: any) {
    let index = null
    if (this.promotion.promotionLanguages && this.promotion.promotionLanguages.length > 0) {
      $.each(this.promotion.promotionLanguages, function (k, v) {
        if (v.langKey === lang.langKey) {
          index = k
        }
      })
      if (index !== null) {
        this.promotion.promotionLanguages.splice(index, 1)
      }
    }
  }

  public goBack() {
    this.$router.push('/promotions')
  }

  public removeProduct(product: any) {
    this.selectedProduct = undefined;
  }

  public addProduct(product: any) {
    this.selectedProduct = product;
  }

  public removeBundleProduct(product: any) {
    this.selectedBundleProduct = {};
  }

  public addBundleProduct(product: any) {
    this.selectedBundleProduct = product;
  }

  public updateAffiliates(aff: any) {
    this.selectedAffiliates.push(aff)
  }

  public removeAffiliates(aff: any) {
  }
}