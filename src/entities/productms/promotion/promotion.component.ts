import { Component, Vue } from 'vue-property-decorator'

import PaginationTableComponent from '@/components/paginationTable/paginationTable.vue'
import { AxiosResponse } from 'axios'
import { mixins } from 'vue-class-component'
import CommonHelpers from '@/shared/commonHelpers'
import SimpleSearchComponent from '@/components/simpleSearch/simpleSearch.vue'
import promotionsService from "@/shared/services/promotionsService";

@Component({
  components: {
    PaginationTableComponent,
    'simple-search': SimpleSearchComponent
  }
})
export default class PromotionComponent extends mixins(CommonHelpers, Vue) {
  public promotionService: any
  public active: boolean
  constructor () {
    super()
    this.active = true
    this.promotionService = promotionsService.getInstance()
  }

  public mounted () {
  }

  public editPromotion (promo: any) {
    this.$router.push({ name: 'EditPromotion', params: { id: promo.id } })
  }

  public deletePromotion (promo: any) {
    this.active = false
    if (promo.id) {
      this.promotionService.delete(promo.id).then((resp: AxiosResponse) => {
        this.active = true
        if (resp) {
          this.setAlert('promotionRemoved', 'success')
        } else {
          this.setAlert('promotionRemoveError', 'error')
        }
      })
    }
  }
}
