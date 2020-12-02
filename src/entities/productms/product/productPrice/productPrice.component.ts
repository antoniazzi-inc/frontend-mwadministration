import {Component, Vue, Watch} from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import CommonHelpers from '@/shared/commonHelpers'
import {IMoneyConfig, MoneyConfig} from "@/shared/models/moneyConfig";
import Store from "@/store";
import ToggleSwitch from "@/components/toggleSwitch/toggleSwitch.vue";

@Component({
  components: {
    ToggleSwitch
  },
  props:{
    priceRoundingProp: {
      type: Boolean,
      required: false
    },
    taxProp: {
      type: Number,
      required: false
    },
    priceProp: {
      type: Number,
      required: false
    },
  }
})
export default class ProductPriceComponent extends mixins(CommonHelpers, Vue) {
  public price: any
  public priceTemp: any
  public moneyConfig: IMoneyConfig
  public isInclusiveActive: boolean
  public inclusivePrice: any
  public tax: any
  public allTaxRates: any[]
  public priceRounding: boolean
  constructor () {
    super()
    this.price = 0
    this.priceTemp = 0
    this.moneyConfig = new MoneyConfig(undefined, undefined, '', Store.state.currency, 0, false)
    this.isInclusiveActive = false
    this.inclusivePrice = 0
    this.tax = null
    this.allTaxRates = []
    this.priceRounding = false
  }

  public mounted () {
    let tax = this.getAllCountryTaxRates(this.$store.state.lookups.taxRates, this.$store.state.administration.country.id)
    if(tax) {
      this.allTaxRates = tax
      this.tax = tax[0].rate
    }
  }
  @Watch('priceRoundingProp')
  public updatePriceRounding(newVal:any){
    if(newVal !== undefined && newVal !== null) this.priceRounding = newVal
  }
  @Watch('taxProp')
  public updateTax(newVal:any){
    if(newVal !== undefined && newVal !== null && newVal >= 0) this.tax = newVal
  }
  @Watch('priceProp')
  public updatePrice(newVal:any){
    if(newVal !== undefined && newVal !== null && newVal >= 0 && !this.priceTemp) this.priceTemp = newVal
  }


  @Watch('isInclusiveActive')
  public changeInclusiveActive(value:any){
    if(value) {
      this.price = (this.priceTemp * (1 / (1 + (this.tax / 100)))).toFixed(2)
      this.inclusivePrice = this.priceTemp
    } else {
      this.inclusivePrice = (this.priceTemp * (1 + (this.tax / 100))).toFixed(2)
      this.price = this.priceTemp
    }
    this.checkIfShouldBeRounded()
  }
  @Watch('priceTemp')
  public changePriceTemp(value:any){
    if(this.isInclusiveActive) {
      this.price = (value * (1 / (1 + (this.tax / 100)))).toFixed(2)
      this.inclusivePrice = value
    } else {
      this.inclusivePrice = (value * (1 + (this.tax / 100))).toFixed(2)
      this.price = value
    }
    this.$emit('priceChanged', {price: this.price, tax: this.tax, priceRounding: this.priceRounding})
  }

  @Watch('priceRounding')
  public changePriceRounding(isActive:any){
    if(isActive) {
      if (this.isInclusiveActive) {
        this.priceTemp = this.round5(this.calculateExclusive() * (1 + (this.tax/100)))
      } else {
        this.priceTemp = this.round5((this.calculateInclusive() * (1 / (1 + (this.tax / 100)))).toFixed(2))
      }
    } else {
      if (this.isInclusiveActive) {
        this.priceTemp = (this.calculateExclusive() * (1 + (this.tax/100))).toFixed(2)
      } else {
        this.priceTemp = (this.calculateInclusive() * (1 / (1 + (this.tax / 100)))).toFixed(2)
      }
    }
  }

  public taxChanged() {
    this.checkIfShouldBeRounded()
    this.$emit('priceChanged', {price: this.price, tax: this.tax, priceRounding: this.priceRounding})
  }

  public checkIfShouldBeRounded() {
    if(this.isInclusiveActive) {
      let newInclusive = (this.calculateExclusive() * (1 + (this.tax / 100)))
      if(newInclusive.toFixed(2) !== this.inclusivePrice.toFixed(2)) {
        this.priceRounding = true
      } else {
        this.priceRounding = false
      }
    } else {
        let newExclusive = (this.calculateInclusive() * (1 / (1+ (this.tax/100))))
      if(newExclusive.toFixed(2) !== this.price.toFixed(2)) {
        this.priceRounding = true
      } else {
        this.priceRounding = false
      }
    }
  }

  public calculateExclusive() {
    if(this.isInclusiveActive){
      this.price = (this.priceTemp * (1 / (1 + (this.tax / 100)))).toFixed(2)
    } else {
      let p = (this.calculateInclusive() * (1 / (1 + (this.tax / 100)))).toFixed(2)
      this.price = p
    }
    this.$emit('priceChanged', {price: this.price, tax: this.tax, priceRounding: this.priceRounding})
    return this.price
  }

  public calculateInclusive() {
    if(this.priceRounding) {
      this.inclusivePrice = this.round5(this.priceTemp * (1 + (this.tax / 100)))
    } else {
      this.inclusivePrice = (this.priceTemp * (1 + (this.tax / 100)))
    }
    return this.inclusivePrice.toFixed(2)
  }

  public round5(value:any) {
    let converted:any = parseFloat(value); // Make sure we have a number
    let decimal:any = (converted - parseInt(converted, 10));
    decimal = Math.round(decimal * 10);
    if (decimal == 5) { return (parseInt(converted, 10)+0.5); }
    if ( (decimal < 3) || (decimal > 7) ) {
      return Math.round(converted);
    } else {
      return (parseInt(converted, 10)+0.5);
    }
  }
}
