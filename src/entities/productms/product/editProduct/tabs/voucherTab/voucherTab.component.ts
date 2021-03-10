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

import { Component, Vue, Watch } from 'vue-property-decorator'
import { Money } from 'v-money'
import { mixins } from 'vue-class-component'
import ToggleSwitch from '@/components/toggleSwitch/toggleSwitch.vue'
import CommonHelpers from '@/shared/commonHelpers'
import { IProduct, Product } from '@/shared/models/productms/ProductModel'
import { IRegion } from '@/shared/models/administrationms/region.model'
import { ProductDeliveryMethod } from '@/shared/models/productms/ProductDeliveryMethodModel'
import { ITypePhysical, TypePhysical } from '@/shared/models/productms/TypePhysicalModel'
import typephysicalsService from '@/shared/services/type-physicalsService'
import productdeliverymethodsService from '@/shared/services/product-delivery-methodsService'
import { AxiosResponse } from 'axios'
import SearchableSelectComponent from '@/components/searchableSelect/searchableSelect.vue'
import { SearchableSelectConfig } from '@/shared/models/SearchableSelectConfig'
import Store from '@/store/index'
import {VoucherType} from "@/shared/models/orderms/OrderProductPurchasedVoucher";
import TypeVoucherBasedService from "@/shared/services/type-voucher-basedsService";
import productService from "@/shared/services/productService";

@Component({
  props: {
    product: Object,
    clicked: Boolean
  },
  components: {
    SearchableSelectComponent,
    'toggle-switch': ToggleSwitch,
    money: Money
  }
})
export default class VoucherTabComponent extends mixins(Vue, CommonHelpers) {
    public voucherSettings:any
    public productService:any
    public voucherService:any
    public voucherTypes:any
    public multiSelectConfig: SearchableSelectConfig = new SearchableSelectConfig('name',
      'labels.chooseOption', '', false,
      false, true, true, false)

    public singleSelectConfig: SearchableSelectConfig = new SearchableSelectConfig('label',
      'labels.chooseShippingMethod', '', false,
      false, true, false, false)

    public singleSelectRegionConfig: SearchableSelectConfig = new SearchableSelectConfig('name',
      'labels.chooseRegion', '', false,
      false, true, false, false)

    public money = {
      decimal: ',',
      thousands: '.',
      prefix: Store.state.currency,
      suffix: '',
      precision: 2,
      masked: false
    };
    constructor() {
      super();
      this.voucherService = TypeVoucherBasedService.getInstance()
      this.productService = productService.getInstance()
      this.voucherTypes = VoucherType
      this.voucherSettings = {
        type: 'MONEY',
        numberOfMinutes: 0,
        numberOfPoints: 0,
        moneyValue: 0,
        daysValid: 0
      }
    }
    @Watch('product', {immediate: true, deep: true})
    public updateVoucher(newVal:any){
      if(newVal && newVal.typeVoucher){
        this.voucherSettings = {
          daysValid: newVal.typeVoucher.daysValid,
          type: '',
          numberOfMinutes: 0,
          numberOfPoints: 0,
          moneyValue: 0,
        }
        switch (newVal.typeVoucher.voucherType) {
          case 'MONEY':
            this.voucherSettings.moneyValue = newVal.typeVoucher.value
            this.voucherSettings.type = 'MONEY'
            break
          case 'MINUTES':
            this.voucherSettings.numberOfMinutes = newVal.typeVoucher.value
            this.voucherSettings.type = 'MINUTES'
            break
          case 'POINTS':
            this.voucherSettings.numberOfPoints = newVal.typeVoucher.value
            this.voucherSettings.type = 'POINTS'
            break
        }
      }
    }
    public goBack(){
      this.$router.go(-1)
    }
    public cancel(){}
    public save(){
      let dto = {
        id: this.$props.product.typeVoucher ? this.$props.product.typeVoucher.id : undefined,
        version: this.$props.product.typeVoucher ? this.$props.product.typeVoucher.version : undefined,
        voucherType: '',
        daysValid: this.voucherSettings.daysValid,
        value: null,
        product: {
          id: this.$props.product.id,
          version: this.$props.product.version
       }
      }
      switch (this.voucherSettings.type) {
        case 'MONEY':
          dto.value = this.voucherSettings.moneyValue
          dto.voucherType = this.voucherTypes.MONEY
          break
        case 'MINUTES':
          dto.value = this.voucherSettings.numberOfMinutes
          dto.voucherType = this.voucherTypes.MINUTES
          break
        case 'POINTS':
          dto.value = this.voucherSettings.numberOfPoints
          dto.voucherType = this.voucherTypes.POINTS
          break
      }
      if(this.$props.product.typeVoucher && this.$props.product.typeVoucher.id){
        this.voucherService.put(dto).then((resp:AxiosResponse) => {
          if(resp && resp.data){
            this.setAlert('typeVoucherUpdated', 'success')
            let prod = this.$props.product
            prod.typeVoucher = resp.data
            this.$emit('update', prod)
          }
        })
      } else {
        let dtoProd = this.$props.product
        dtoProd.typeVoucher = dto
        this.productService.put(dtoProd).then((resp:AxiosResponse) => {
          if(resp && resp.data){
            this.setAlert('typeVoucherUpdated', 'success')
            this.$emit('update', resp.data)
          }
        })
      }
    }
}
