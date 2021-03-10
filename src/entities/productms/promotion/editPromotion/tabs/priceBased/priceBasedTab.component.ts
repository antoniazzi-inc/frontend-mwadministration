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

import {Component, Vue, Watch} from "vue-property-decorator";
import {IPromotion} from "@/shared/models/productms/PromotionModel";
import money, {Money} from 'v-money'
import Store from "@/store";
import typepricebasedsService from "@/shared/services/type-price-basedsService";
import {AxiosResponse} from "axios";
import CommonHelpers from "@/shared/commonHelpers";
import {mixins} from "vue-class-component";
import {Discount} from "@/shared/models/productms/DiscountModel";
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
  public goBack() {
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
