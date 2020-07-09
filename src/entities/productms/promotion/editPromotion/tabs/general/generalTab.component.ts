import {Component, Vue, Watch} from "vue-property-decorator";
import {IMultiLanguageConfig, MultiLanguageConfig} from "@/shared/models/MultiLanguageConfig";
import moment from "moment";
import {IMoneyConfig, MoneyConfig} from "@/shared/models/moneyConfig";
import Store from "@/store";
import MultiLanguageComponent from "@/components/multiLanguage/MultiLanguage.vue";
import flatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'
import {IPromotion, Promotion} from "@/shared/models/PromotionModel";
import {ISearchableSelectConfig, SearchableSelectConfig} from "@/shared/models/SearchableSelectConfig";
import ToggleSwitch from "@/components/toggleSwitch/toggleSwitch.vue";
import SearchableSelectComponent from "@/components/searchableSelect/searchableSelect.vue";
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
    mounted(){

    }
})
export default class GeneralTabComponent extends Vue {
  public multiLangConfig:IMultiLanguageConfig
  public validFromConfig:any
  public validToConfig:any
  public availableFrom:any
  public availableTo:any
  public selectedDiscountType:any
  public selectedProduct:any
  public discountQuantityAmount:any
  public moneyPercentage:any
  public discountPriceAmount:any
  public money:any
  public useMoreDecimalst:boolean
  public wholeOrder:boolean
  public allDiscountTypes:any[]
  public moneyConfig:IMoneyConfig
  public singleSelectConfig:ISearchableSelectConfig
  public promotionCopy:IPromotion
  constructor(props:any) {
    super(props);
    this.promotionCopy = new Promotion()
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
    this.availableFrom =  new Date()
    this.availableTo = null
    this.selectedProduct = null
    this.selectedDiscountType = null
    this.wholeOrder = false
    this.discountQuantityAmount = 0
    this.discountPriceAmount = 0
  this.money = {
    decimal: ',',
    thousands: '.',
    prefix: Store.state.currency,
    suffix: '',
    precision: 2,
    masked: false
  }
  this.moneyPercentage = {
      decimal: '',
      thousands: '',
      prefix: '',
      suffix: '%',
      precision: 0,
      masked: false
    }
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
    this.useMoreDecimalst= false
  this.singleSelectConfig = new SearchableSelectConfig('label',
      '', '', false,
      false, false, false, false)
  }

  @Watch('useMoreDecimalst', {immediate: true, deep: true})
  public updateUseMoreDecimalst(newVal: any) {
    this.money.precision = newVal ? 3 : 2
  }
  @Watch('promotion', {immediate: true, deep: true})
  public updatePromotion(newVal: any) {
    this.promotionCopy = newVal
    this.availableFrom = newVal && newVal.availableFrom ? newVal.availableFrom : new Date()
    this.availableTo = newVal && newVal.availableTo ? newVal.availableTo : null
  }
  @Watch('availableFrom', {immediate: true, deep: true})
  public changeAvailableToMin(newVal: any) {
    this.validToConfig.minDate = moment(newVal).format('MM-DD-YYYY')
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
    debugger
    if(this.availableTo === null) return false
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

  public addProduct(prod:any){
    this.selectedProduct = prod
  }
  public removeProduct(prod:any){
    this.selectedProduct = null
  }
  public save(){

  }
  public back(){
    this.$router.push('promotions')
  }
}
