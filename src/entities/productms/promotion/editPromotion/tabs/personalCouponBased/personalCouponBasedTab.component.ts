import {Component, Vue, Watch} from "vue-property-decorator";
import ToggleSwitch from "@/components/toggleSwitch/toggleSwitch.vue";
import {IPromotion, Promotion} from "@/shared/models/productms/PromotionModel";
import {ITypePersonalCouponBased, TypePersonalCouponBased} from "@/shared/models/productms/TypePersonalCouponBasedModel";
import {AxiosResponse} from "axios";
import {mixins} from "vue-class-component";
import CommonHelpers from "@/shared/commonHelpers";
import typepersonalcouponbasedsService from "@/shared/services/type-personal-coupon-basedsService";
import Papa from "papaparse";
import vue2Dropzone from "vue2-dropzone";
import {ICoupon} from "@/shared/models/productms/CouponModel";

@Component({
  props: {
    promotion: Object
  },
  components: {
    ToggleSwitch,
    vueDropzone: vue2Dropzone
  },
  mounted() {

  }
})
export default class PersonalCouponBasedTabComponent extends mixins(CommonHelpers, Vue) {
  $refs!: {
    removeUnusedCoupons: HTMLElement
  }
  public promotionCopy: IPromotion
  public typePersonalCouponBased: ITypePersonalCouponBased
  public validDays: boolean
  public imported: boolean
  public temporaryValid: any
  public couponCodes: any[]
  public dropzoneOptions: any
  public typePersonalCouponBasedService: any

  constructor() {
    super();
    this.validDays = false
    this.imported = false
    this.typePersonalCouponBasedService = typepersonalcouponbasedsService.getInstance()
    this.temporaryValid = 0
    this.couponCodes = []
    this.promotionCopy = new Promotion()
    this.typePersonalCouponBased = new TypePersonalCouponBased()
    this.dropzoneOptions = {
      url: '#',
      autoProcessQueue: false,
      thumbnailWidth: 150,
      maxFilesize: 200,
      uploadMultiple: false,
      acceptedFiles: ['.csv', '.txt'].join(','),
      addRemoveLinks: true,
      headers: {'My-Awesome-Header': 'header value'}
    }
  }

  @Watch('validDays', {immediate: true, deep: true})
  public updateValidDays(newVal: any) {
    this.validDays = newVal
  }
  @Watch('promotion', {immediate: true, deep: true})
  public updatePromo(newVal: IPromotion) {
    if (newVal) {
      this.promotionCopy = newVal
      if (newVal.typePersonalCouponBased) {
        this.typePersonalCouponBased = newVal.typePersonalCouponBased
        this.temporaryValid = newVal.typePersonalCouponBased.period?.split(' ')[0]
        this.validDays = newVal.typePersonalCouponBased.period?.split(' ')[1] === 'hours' ? true : false
        if(this.typePersonalCouponBased.coupons && this.typePersonalCouponBased.coupons.length) {
          this.imported = true
        } else {
          this.imported = false
        }
      }

    }
  }

  public previousState() {
    this.$router.push('/promotions')
  }

  public clearUnusedCoupons() {
    this.closeModal()
  }

  public closeModal() {
    // @ts-ignore
    $(this.$refs.removeUnusedCoupons).modal('hide')
  }

  public save() {
    let dto:any = this.typePersonalCouponBased;
    let couponCodes: ICoupon[] = []
    if(this.couponCodes.length) {
      this.couponCodes.forEach(code=>{
        couponCodes.push({
          code: code[0],
          maxTimesUsed: 1,
          typePersonalCouponBased: {
            id: dto.id,
            version: dto.version
          }
        })
      })
      dto.coupons = couponCodes
    }
    if (this.promotionCopy.promotionType === 'TEMPORARY_COUPON') {
      if (this.validDays) {
        dto.period = this.temporaryValid + ' hours'
      } else {
        dto.period = this.temporaryValid + ' days'
      }
    }
    if (this.typePersonalCouponBased.coupons && this.typePersonalCouponBased.coupons.length) {
      dto.coupons = this.typePersonalCouponBased.coupons;
    }
    this.typePersonalCouponBasedService.put(dto).then((resp: AxiosResponse) => {
      if (resp && resp.data) {
        this.setAlert('personalCouponUpdated', 'success')
        this.promotionCopy.typePersonalCouponBased = resp.data;
        this.$emit('updatePromo', this.promotionCopy);
      } else {
        this.setAlert('personalCouponUpdateError', 'error')
      }
    });
  }

  public handleRemove(file: any) {
    this.couponCodes = []
  }
  public handleFile(file: any) {
    const reader = new FileReader()
    let self = this
    reader.onload = function (e: any) {
      let data = e.target.result
      Papa.parse(data,
        {
          delimiter: '\n',
          encoding: 'UTF-8',
          skipEmptyLines: true,
          complete: function (results: any) {
            self.couponCodes = results.data
          }
        })
    }
    reader.readAsBinaryString(file)
  }
}
