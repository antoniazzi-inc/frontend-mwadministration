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
import {AxiosResponse} from "axios";
import typequantitybasedsService from "@/shared/services/type-quantity-basedsService";
import CommonHelpers from "@/shared/commonHelpers";
import {mixins} from "vue-class-component";
import {Discount} from "@/shared/models/productms/DiscountModel";
@Component({
    props: {
        promotion: Object
    },
    components: {
    },
    mounted(){

    }
})
export default class QuantityBasedTabComponent extends mixins(CommonHelpers, Vue) {
 public priceQuantityAmount: any
public promotionCopy:any
public typeQuantityBasedService:any
  constructor() {
    super();
    this.priceQuantityAmount = 0
    this.promotionCopy = null
    this.typeQuantityBasedService = typequantitybasedsService.getInstance()
  }

  @Watch('promotion', {immediate: true, deep: true})
  public updatePromo(newVal:IPromotion) {
    if(newVal) {
      this.promotionCopy = newVal
      if(newVal.typeQuantityBaseds && newVal.typeQuantityBaseds.length) {
       this.priceQuantityAmount = newVal.typeQuantityBaseds[0].quantity
      }

    }
  }
  public previousState(){
   this.promotionCopy = this.$props.promotion
  }
  public goBack() {
    this.$router.push('/promotions')
  }
  public saveQuantityBased(){
    let dto:any = {}
   if(this.$props.promotion.typeQuantityBaseds && this.$props.promotion.typeQuantityBaseds.length){
     dto = {
       id: this.$props.promotion.typeQuantityBaseds[0].id,
       administrationId: this.$props.promotion.typeQuantityBaseds[0].administrationId,
       createdOn: this.$props.promotion.typeQuantityBaseds[0].createdOn,
       updatedOn: this.$props.promotion.typeQuantityBaseds[0].updatedOn,
       version: this.$props.promotion.typeQuantityBaseds[0].version,
       discount: this.$props.promotion.typeQuantityBaseds[0].discount,
       quantity: this.priceQuantityAmount
     };
   } else {
     let discount = this.$props.promotion.typeQuantityBaseds[0] ? this.$props.promotion.typeQuantityBaseds[0].discount :
       new Discount(undefined, undefined, undefined, undefined, undefined,
         0)
     dto = {
       discount: discount,
       quantity: this.priceQuantityAmount,
       promotion: {
         id: this.promotionCopy.id,
         version: this.promotionCopy.version
       }
     };
  }
   if(dto.id){
     this.typeQuantityBasedService.put(dto).then((resp:AxiosResponse) => {
       if(resp && resp.data){
         this.setAlert('typeQuantityBasedUpdated', 'success')
         this.promotionCopy.typeQuantityBaseds[0] = resp;
         this.$emit('updatePromo', this.promotionCopy)
       } else {
         this.setAlert('typeQuantityBasedUpdateError', 'error')
       }
     });
  } else {
     this.typeQuantityBasedService.post(dto).then((resp:AxiosResponse) => {
       if(resp && resp.data){
         this.setAlert('typeQuantityBasedCreated', 'success')
         this.promotionCopy.typeQuantityBaseds[0] = resp;
         this.$emit('updatePromo', this.promotionCopy)
       } else {
         this.setAlert('typeQuantityBasedCreateError', 'error')
       }
     });
   }
  }
}
