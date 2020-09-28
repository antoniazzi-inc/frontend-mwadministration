import {Component, Vue, Watch} from "vue-property-decorator";
import {Money} from "v-money";
import Store from "@/store";
import {IPromotion, Promotion} from "@/shared/models/productms/PromotionModel";
import {AxiosResponse} from "axios";
import typeloyaltybasedsService from "@/shared/services/type-loyalty-basedsService";
import CommonHelpers from "@/shared/commonHelpers";
import {mixins} from "vue-class-component";
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
export default class LoyaltyTabComponent extends mixins(CommonHelpers, Vue) {
  public loyaltyPoints: any
  public loyaltyItemsEarlier: any
  public loyaltyAmountEarlier: any
  public promotionCopy: any
  public typeLoyaltyBasedService: any
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
    this.loyaltyPoints = 0
    this.typeLoyaltyBasedService = typeloyaltybasedsService.getInstance()
    this.promotionCopy = new Promotion()
    this.loyaltyItemsEarlier = 0
    this.loyaltyAmountEarlier = 0
  }

  @Watch('promotion', {immediate: true, deep: true})
  public updatePromo(newVal:IPromotion) {
    if(newVal) {
      this.promotionCopy = newVal
      if(newVal.typeLoyaltyBased) {
        this.loyaltyPoints = newVal.typeLoyaltyBased.points
        this.loyaltyAmountEarlier = newVal.typeLoyaltyBased.totalPurchaseAmount
        this.loyaltyItemsEarlier = newVal.typeLoyaltyBased.totalPurchaseItems
      }

    }
  }
  public previousState(){
    this.promotionCopy = this.$props.promotion
  }
  public goBack() {
    this.$router.push('/promotions')
  }
  public saveLoyaltyBased(){
    let dto = {
      id: this.promotionCopy.typeLoyaltyBased.id,
      administrationId: this.promotionCopy.typeLoyaltyBased.administrationId,
      createdOn: this.promotionCopy.typeLoyaltyBased.createdOn,
      updatedOn: this.promotionCopy.typeLoyaltyBased.updatedOn,
      version: this.promotionCopy.typeLoyaltyBased.version,
      discount: this.promotionCopy.typeLoyaltyBased.discount,
      points: this.loyaltyPoints,
      totalPurchaseAmount: this.loyaltyAmountEarlier,
      totalPurchaseItems: this.loyaltyItemsEarlier
    };
    this.typeLoyaltyBasedService.put(dto).then((resp:AxiosResponse) => {
      if(resp && resp.data){
        this.setAlert('typeLoyaltyBasedUpdated', 'success')
        this.promotionCopy.typeLoyaltyBased = resp.data;
        this.$emit('updatePromo', this.promotionCopy)
      }else{
        this.setAlert('typeLoyaltyBasedUpdateError', 'error')
      }
    });
  }
}
