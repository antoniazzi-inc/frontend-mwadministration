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
  public inclusivePrice: number
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
  @Watch('priceTemp')
  public updatePriceTemp(newVal:any){
    if(this.isInclusiveActive){
      this.price = (newVal * (1 / (1 + (this.tax / 100))))
      this.inclusivePrice = newVal
    } else {
      this.price = newVal
      this.inclusivePrice = newVal * (1 + (this.tax / 100))
    }
    this.changePriceRounding(this.priceRounding)
  }
  @Watch('priceRounding')
  public changePriceRounding(newVal:any){
    if(newVal){
      this.inclusivePrice = this.round5(this.inclusivePrice)
      if(this.isInclusiveActive) {
        this.priceTemp = this.inclusivePrice
      }
    } else {
      this.inclusivePrice = this.price * (1 + (this.tax / 100))
    }
    this.$emit('priceChanged', {tax: this.tax, price: this.price, inclusive: this.inclusivePrice, isInclusive: this.isInclusiveActive, rounded: this.priceRounding})
  }

  @Watch('isInclusiveActive')
  public changeIsInclusive(newVal:any){
    this.taxChanged()
  }
  public taxChanged(){
    if(this.isInclusiveActive){
      this.price = (this.priceTemp * (1 / (1 + (this.tax / 100))))
      this.inclusivePrice = this.priceTemp
    } else {
      this.price = this.priceTemp
      this.inclusivePrice = (this.priceTemp * (1 + (this.tax / 100)))
    }
    this.changePriceRounding(this.priceRounding)
    //this.$emit('priceChanged', {tax: this.tax, price: this.price, inclusive: this.inclusivePrice, isInclusive: this.isInclusiveActive, rounded: this.priceRounding})
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
