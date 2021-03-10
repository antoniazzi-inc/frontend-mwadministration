/*
 *
 *  * Copyright 2018-2021 Antoniazzi Holding BV
 *  *
 *  * This program is free software: you can redistribute it and/or modify it
 *  * under the terms of the GNU General Public License as published by
 *  * the Free Software Foundation, either version 3 of the License,
 *  * or (at your option) any later version.
 *  *
 *  * This program is distributed in the hope that it will be useful,
 *  * but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 *  * GNU General Public License for more details.
 *  *
 *  * You should have received a copy of the GNU General Public License
 *  * along with this program. If not, see <https://www.gnu.org/licenses/>.
 *
 */

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
    debugger
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
