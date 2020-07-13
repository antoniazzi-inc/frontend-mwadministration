import {Component, Vue, Watch} from "vue-property-decorator";
import {IPromotion} from "@/shared/models/PromotionModel";
import money, {Money} from 'v-money'
import Store from "@/store";
import typepricebasedsService from "@/shared/services/type-price-basedsService";
import {AxiosResponse} from "axios";
import CommonHelpers from "@/shared/commonHelpers";
import {mixins} from "vue-class-component";
import {Discount} from "@/shared/models/DiscountModel";
@Component({
    props: {
        promotion: Object
    },
    components: {
      money: Money
    },
    mounted(){

    }
})
export default class PriceBasedTabComponent extends mixins(CommonHelpers,Vue) {
  public priceBasedAmount: any
  public promotionCopy: any
  public typePriceBasedService: any
  public moneyFixed = {
    decimal: ',',
    thousands: '.',
    prefix: Store.state.currency,
    suffix: '',
    precision: 2,
    masked: false
  }

  constructor() {
    super();
    this.priceBasedAmount = 0
    this.promotionCopy = null
    this.typePriceBasedService = typepricebasedsService.getInstance()
  }

  @Watch('promotion', {immediate: true, deep: true})
  public updatePromo(newVal:IPromotion) {
    if(newVal) {
      this.promotionCopy = newVal
      if(newVal.typePriceBaseds && newVal.typePriceBaseds.length) {
        this.priceBasedAmount = newVal.typePriceBaseds[0].price
      }

    }
  }
  public previousState(){
    this.$router.push('/promotions')
  }
  public savePriceBased(){
    let dto = {}
    if(this.promotionCopy.typePriceBaseds && this.promotionCopy.typePriceBaseds[0]){
      dto = {
        id: this.promotionCopy.typePriceBaseds[0].id,
        administrationId: this.promotionCopy.typePriceBaseds[0].administrationId,
        createdOn: this.promotionCopy.typePriceBaseds[0].createdOn,
        updatedOn: this.promotionCopy.typePriceBaseds[0].updatedOn,
        version: this.promotionCopy.typePriceBaseds[0].version,
        discount: this.promotionCopy.typePriceBaseds[0].discount,
        price: this.priceBasedAmount
      };
      this.typePriceBasedService.put(dto).then((resp:AxiosResponse) => {
        if(resp && resp.data){
          this.setAlert('typePriceBasedUpdated', 'success')
          this.promotionCopy.typePriceBaseds[0] = resp.data;
          this.$emit('updatePromo', this.promotionCopy)
        } else {
          this.setAlert('typePriceBasedUpdateError', 'error')
        }
      });
    } else {
      let discount = this.promotionCopy.typePriceBaseds[0] &&  this.promotionCopy.typePriceBaseds[0].discount ?
        this.promotionCopy.typePriceBaseds[0].discount :
        new Discount(undefined, undefined, undefined, undefined, undefined, 0)
      dto = {
        discount: discount,
        price: this.priceBasedAmount,
        promotion: {
          id: this.promotionCopy.id,
          version: this.promotionCopy.version
        }
      };
      this.typePriceBasedService.post(dto).then((resp:AxiosResponse) => {
        if(resp && resp.data){
          this.setAlert('typePriceBasedCreated', 'success')
          this.promotionCopy.typePriceBaseds[0] = resp.data;
          this.$emit('updatePromo', this.promotionCopy)
        } else {
          this.setAlert('typePriceBasedCreateError', 'error')
        }
      });
    }

  }
}
