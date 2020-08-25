import {Component, Vue, Watch} from "vue-property-decorator";
import Store from "@/store";
import {IPromotion, Promotion} from "@/shared/models/productms/PromotionModel";
import CommonHelpers from "@/shared/commonHelpers";
import {mixins} from "vue-class-component";
import {AxiosResponse} from "axios";
import typecouponbasedsService from "@/shared/services/type-coupon-basedsService";
@Component({
    props: {
        promotion: Object
    },
    components: {
    },
    mounted(){

    }
})
export default class CouponBasedTabComponent extends mixins(Vue, CommonHelpers) {
  public couponCode: any
  public promotionCopy: any
  public typeCouponBasedService: any
  public maxUsageCoupon: any


  constructor() {
    super();
    this.couponCode = 0
    this.promotionCopy = new Promotion()
    this.typeCouponBasedService = typecouponbasedsService.getInstance()
    this.maxUsageCoupon = 0
  }

  @Watch('promotion', {immediate: true, deep: true})
  public updatePromo(newVal:IPromotion) {
    if(newVal) {
      this.promotionCopy = newVal
      if(newVal.typeCouponBased && newVal.typeCouponBased.coupon) {
        this.couponCode = newVal.typeCouponBased.coupon.code
        this.maxUsageCoupon = newVal.typeCouponBased.coupon.maxTimesUsed
      }

    }
  }
  public previousState(){
    this.$router.push('/promotions')
  }
  public generateCouponCode(){
    this.couponCode = this.generateRandom();
  }
  public saveCouponBased(){
    let self = this;
    let dto = {
      id: this.promotionCopy.typeCouponBased.id,
      administrationId: this.promotionCopy.typeCouponBased.administrationId,
      createdOn: this.promotionCopy.typeCouponBased.createdOn,
      updatedOn: this.promotionCopy.typeCouponBased.updatedOn,
      version: this.promotionCopy.typeCouponBased.version,
      discount: this.promotionCopy.typeCouponBased.discount,
      coupon: {
        administrationId: this.promotionCopy.typeCouponBased.coupon.administrationId,
        availableTo: this.promotionCopy.typeCouponBased.coupon.availableTo,
        code: this.couponCode,
        createdOn: this.promotionCopy.typeCouponBased.coupon.createdOn,
        id: this.promotionCopy.typeCouponBased.coupon.id,
        maxTimesUsed: this.maxUsageCoupon,
        timesUsed: this.promotionCopy.typeCouponBased.coupon.timesUsed,
        typePersonalCouponBased: this.promotionCopy.typeCouponBased.coupon.typePersonalCouponBased,
        updatedOn: this.promotionCopy.typeCouponBased.coupon.updatedOn,
        version: this.promotionCopy.typeCouponBased.coupon.version,
      }
    };
    this.typeCouponBasedService.put(dto).then((resp:AxiosResponse) => {
      if(resp && resp.data){
        this.setAlert('typeCouponBasedUpdated', 'success')
        self.promotionCopy.typeCouponBased = resp.data;
        this.$emit('updatePromo', this.promotionCopy)
      } else {
        this.setAlert('typeCouponBasedUpdateError', 'error')
      }
    });
  }
}
