import {Component, Vue, Watch} from "vue-property-decorator";
import ToggleSwitch from "@/components/toggleSwitch/toggleSwitch.vue";
import {IPromotion, Promotion} from "@/shared/models/PromotionModel";
import {ITypePersonalCouponBased, TypePersonalCouponBased} from "@/shared/models/TypePersonalCouponBasedModel";
import {AxiosResponse} from "axios";
import {mixins} from "vue-class-component";
import CommonHelpers from "@/shared/commonHelpers";
import typepersonalcouponbasedsService from "@/shared/services/type-personal-coupon-basedsService";
@Component({
    props: {
        promotion: Object
    },
    components: {
      ToggleSwitch
    },
    mounted(){

    }
})
export default class PersonalCouponBasedTabComponent extends mixins(CommonHelpers, Vue) {
  $refs!:{
    removeUnusedCoupons: HTMLElement
  }
  public promotionCopy: IPromotion
  public typePersonalCouponBased: ITypePersonalCouponBased
  public validDays: boolean
  public imported: boolean
  public temporaryValid: any
  public typePersonalCouponBasedService: any
  constructor() {
    super();
    this.validDays = false
    this.imported = false
    this.typePersonalCouponBasedService = typepersonalcouponbasedsService.getInstance()
    this.temporaryValid = 0
    this.promotionCopy = new Promotion()
    this.typePersonalCouponBased = new TypePersonalCouponBased()
  }

  @Watch('promotion', {immediate: true, deep: true})
  public updatePromo(newVal:IPromotion) {
    if(newVal) {
      this.promotionCopy = newVal
      if(newVal.typePersonalCouponBased) {
        this.typePersonalCouponBased = newVal.typePersonalCouponBased
        this.temporaryValid = newVal.typePersonalCouponBased.period?.split(' ')[0]
        this.validDays = newVal.typePersonalCouponBased.period?.split(' ')[1] === 'hours' ? true : false
      }

    }
  }

  public previousState(){
    this.$router.push('/promotions')
  }
  public clearUnusedCoupons(){
    this.closeModal()
  }
  public closeModal () {
    // @ts-ignore
    $(this.$refs.removeUnusedCoupons).modal('hide')
  }

  public save(){
    let dto = this.typePersonalCouponBased;
    if(this.promotionCopy.promotionType === 'TEMPORARY_COUPON'){
      if(this.validDays) {
        dto.period = this.temporaryValid + ' hours'
      } else {
        dto.period = this.temporaryValid + ' days'
      }
    }
    if(this.typePersonalCouponBased.coupons && this.typePersonalCouponBased.coupons.length) {
      dto.coupons = this.typePersonalCouponBased.coupons;
    }
    this.typePersonalCouponBasedService.put(dto).then((resp:AxiosResponse) => {
      if(resp && resp.data){
        this.setAlert('personalCouponUpdated', 'success')
        this.promotionCopy.typePersonalCouponBased = resp.data;
        this.$emit('updatePromo', this.promotionCopy);
      } else {
        this.setAlert('personalCouponUpdateError', 'error')
      }
    });
  }
}
