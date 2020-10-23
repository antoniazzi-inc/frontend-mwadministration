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
import {IPromotion, Promotion, promotionType} from "@/shared/models/productms/PromotionModel";
import {TypeTimeBased} from "@/shared/models/productms/TypeTimeBasedModel";
import promotionsService from "@/shared/services/promotionsService";
import {Discount} from "@/shared/models/productms/DiscountModel";
import {TypeAffiliateBased} from "@/shared/models/productms/TypeAffiliateBasedModel";
import {TypeBundleBased} from "@/shared/models/productms/TypeBundleBasedModel";
import {TypeCouponBased} from "@/shared/models/productms/TypeCouponBasedModel";
import {Coupon} from "@/shared/models/productms/CouponModel";
import {TypeLoyaltyBased} from "@/shared/models/productms/TypeLoyaltyBasedModel";
import {TypePersonalCouponBased} from "@/shared/models/productms/TypePersonalCouponBasedModel";
import {TypePriceBased} from "@/shared/models/productms/TypePriceBasedModel";
import {TypeQuantityBased} from "@/shared/models/productms/TypeQuantityBasedModel";
import {AxiosResponse} from "axios";
import {DATE_FORMAT} from "@/shared/filters";

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
  public step4Error: any;
  public isSaving: boolean;
  public isValidatingStep2: boolean;
  public isStep4Validation: boolean;
  public couponMaxTimesUsed: boolean;
  public forAllAffiliates: boolean;
  public notUrl: boolean;
  public validDays: boolean;
  public availableFrom: any;
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
  public singleSelectConfigAffiliate: ISearchableSelectConfig;
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
    this.isStep4Validation = false
    this.validDays = false
    this.forAllAffiliates = false
    this.step4Error = ''
    this.moneyPercentage = {
      decimal: ',',
      thousands: '.',
      prefix: '',
      suffix: ' %',
      precision: 2,
      masked: false
    };
    this.singleSelectConfig = new SearchableSelectConfig('label',
      'labels.chooseProduct', '', true,
      false, false, false, false)
    this.singleSelectConfigAffiliate = new SearchableSelectConfig('label',
      'labels.chooseAffiliates', '', true,
      false, false, false, false)
    this.progress = 0
    this.discountTypeId = 1
    this.discountPriceAmount = 0.0;
    this.discountQuantityAmount = 0.0;
    this.promotionService = promotionsService.getInstance()
    this.availableFrom = moment().format(DATE_FORMAT)
    this.availableTo = null
    this.promotion = new Promotion(undefined, undefined, undefined, undefined,
      undefined, promotionType.AFFILIATE, undefined, undefined, undefined
      , undefined, undefined, undefined, new TypeAffiliateBased(undefined
        , undefined, undefined, undefined, undefined, undefined, new Discount()))
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
      dateFormat: 'd-m-Y'
      //,minDate: moment().format(DATE_FORMAT)
    }
    this.validToConfig = {
      wrap: true,
      altInput: false,
      dateFormat: 'd-m-Y',
      minDate: moment().format(DATE_FORMAT)
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
    //this.$validator.pause()
    this.promotion.typeTimeBased = new TypeTimeBased()
  }

  @Watch('availableFrom', {immediate: true, deep: true})
  public changeAvailableToMin(newVal: any) {
    this.validToConfig.minDate = moment(newVal).format(DATE_FORMAT)
  }

  @Watch('forAllAffiliates', {immediate: true, deep: true})
  public changeForAllAffiliates(newVal: any) {
    if (newVal) {
      this.step4Error = ''
    }
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
                id: self.selectedProduct.value.id,
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
              id: self.selectedBundleProduct.value.id,
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
          if (self.promotion.typeLoyaltyBased) {
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
          self.promotion.typeQuantityBaseds ? self.promotion.typeQuantityBaseds[0].quantity = parseInt(self.quantityType.toString()) : null
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
          console.log(this.promotion.availableFrom)
          this.promotion.availableTo = moment(this.availableTo, 'YYYY-MM-DDTHH:mm')
          if (this.promotion.availableTo === null) this.promotion.availableTo = undefined
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
    let self = this
    return new Promise(resolve => {
      if (this.step > 3) {
        resolve(false)
        return
      } else {
        this.validateStep().then(resp => {
          if (resp) {
            self.step += 1;
          }
          resolve(resp)
        })
      }
    })
  }

  public validateStep() {
    const self = this
    return new Promise((resolve, reject) => {
      if (this.step === 0) {
        resolve(true)
      } else if (this.step === 1) {
        if (this.promotion.promotionLanguages && this.promotion.promotionLanguages.length && this.promotion.promotionLanguages[0].name) {
          self.isValidatingStep2 = false
          resolve(true)
        } else {
          resolve(false)
        }
      } else if (this.step === 2) {
        this.$validator.validateAll().then(valid => {
          if (this.discountTypeId === 1 || this.discountTypeId === 2) {
            if (this.discountPriceAmount >= 1) {
              resolve(true)
            } else {
              this.$validator.errors.add({
                field: 'discountAmount',
                msg: this.$t('labels.discountAmountBiggerThan1').toString()
              })
              resolve(false)
            }
          } else if (this.discountTypeId === 3) {
            resolve(true)
          } else if (this.discountTypeId === 4) {
            if (this.selectedProduct && this.discountQuantityAmount > 0) {
              resolve(true)
            } else {
              resolve(false)
            }
          }
        })
      } else if (this.step >= 3) {
        switch (this.promotion.promotionType) {
          case 'TIME':
            this.step4Error = ''
            resolve(true)
            break;
          case 'AFFILIATE':
            if (this.forAllAffiliates) {
              this.step4Error = ''
              resolve(true)
            } else {
              if (this.selectedAffiliates.length) {
                this.step4Error = ''
                resolve(true)
              } else {
                this.step4Error = this.$t('labels.atLeastOneAffiliate')
                resolve(false)
              }
            }
            break;
          case 'BUNDLE':
            this.$validator.validateAll({bundleQuantity: this.bundleQuantity}).then(resp => {
              if (resp && this.selectedBundleProduct && this.selectedBundleProduct.value) {
                resolve(true)
                this.step4Error = ''
              } else {
                this.step4Error = ''
                resolve(false)
                if (!this.selectedBundleProduct) this.step4Error = this.$t('labels.selectBundleProduct')
              }
            })
            break;
          case 'COUPON':
            this.$validator.validateAll({
              couponMaxTimesUsed: this.maxTimesUsed,
              couponCode: this.couponCode
            }).then(resp => {
              if (resp) {
                resolve(true)
              } else {
                if (this.couponCode && this.couponMaxTimesUsed) {
                  resolve(true)
                } else {
                  resolve(false)
                }
              }
            })
            break;
          case 'LOYALTY':
              resolve(this.validateLoyalty())
            break;
          case 'PERSONAL_COUPON':
            if (this.couponMaxTimesUsed) {
              resolve(true)
            } else {
              this.isStep4Validation = true
              this.$validator.validateAll({
                couponMaxTimesUsed: self.maxTimesUsed
              }).then(resp => {
                resolve(resp)
              })
            }
            break;
          case 'PRICE':
            this.$validator.validateAll({
              totalThreshhold: this.totalThreshhold
            }).then(resp => {
              if (!resp) {
                this.step4Error = this.$t('labels.priceMustBeBiggerOrEqualTo1')
              }
              resolve(resp)
            })
            break;
          case 'QUANTITY':
            this.$validator.validateAll({
              quantity: this.quantityType
            }).then(resp => {
              resolve(resp)
            })
            break;
          case 'TEMPORARY_COUPON':
            if (this.couponMaxTimesUsed && this.temporaryValid > 0) {
              resolve(true)
            } else {
              if (!this.couponMaxTimesUsed) {
                this.$validator.validateAll({
                  temporaryValid: this.temporaryValid,
                  couponMaxTimesUsed: this.maxTimesUsed
                }).then(resp => {
                  resolve(resp)
                })
              } else {
                this.$validator.validateAll({
                  temporaryValid: this.temporaryValid
                }).then(resp => {
                  resolve(resp)
                })
              }
            }
            break;
        }
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

  public validateLoyalty() {
    if(this.earnedPoints){
      return true
    } else if(this.totalPurchaseAmount) {
      return true
    } else if(this.totalPurchaseItems){
      return true
    } else {
      return false
    }
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
