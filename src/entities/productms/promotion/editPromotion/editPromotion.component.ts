import { mixins } from 'vue-class-component'
import CommonHelpers from '@/shared/commonHelpers'
import { Component, Vue } from 'vue-property-decorator'
import { AxiosResponse } from 'axios'
import PromotionEditTabsComponent from './tabs/promotionEditTabs.vue'
import {IPromotion, Promotion} from "@/shared/models/productms/PromotionModel";
import promotionsService from "@/shared/services/promotionsService";

@Component({
  components: {
    PromotionEditTabsComponent
  },
  beforeRouteEnter (to, from, next) {
    next((vm: any) => {
      if (to.params.id) {
        vm.retrieveItem(to.params.id)
      }
    })
  },
  props: {}
})
export default class EditPromotionComponent extends mixins(Vue, CommonHelpers) {
  public promotion: IPromotion;
  public promotionService: any;

  constructor () {
    super()
    this.promotion = new Promotion()
    this.promotionService = promotionsService.getInstance()
  }

  public retrieveItem (id: any) {
    this.promotionService.get(id).then((resp: AxiosResponse) => {
      this.promotion = resp.data
    })
  }

  public updatePromotion (promo: IPromotion) {
    if (promo && promo.id) {
      this.retrieveItem(promo.id)
    } else {
      this.retrieveItem(this.promotion.id)
    }
  }

  public getPromotionName () {
    return this.getMultiLangName(this.promotion.promotionLanguages).name
  }
}
