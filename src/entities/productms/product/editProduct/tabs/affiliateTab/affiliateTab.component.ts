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

import { Component, Inject, Vue, Watch } from 'vue-property-decorator'
import Trumbowyg from 'vue-trumbowyg'
import 'trumbowyg/dist/ui/trumbowyg.css'
import { Money } from 'v-money'
import { AxiosResponse } from 'axios'
import CommonHelpers from '@/shared/commonHelpers'
import { mixins } from 'vue-class-component'
import { Company, ICompany } from '@/shared/models/relationms/company.model'
import ProductService from '@/shared/services/productService'
import { IProduct, Product } from '@/shared/models/productms/ProductModel'
import { AffiliateAgreement, IAffiliateAgreement } from '@/shared/models/AffiliateAgreementModel'
import { AffiliateAgreementProduct, IAffiliateAgreementProduct } from '@/shared/models/AffiliateAgreementProductModel'
import ToggleSwitch from '@/components/toggleSwitch/toggleSwitch.vue'
import Store from '@/store/index'
@Component({
  props: {
    product: Object
  },
  components: {
    trumbowyg: Trumbowyg,
    'toggle-switch': ToggleSwitch,
    money: Money
  }
})
export default class AffiliateTabComponent extends mixins(Vue, CommonHelpers) {
    public productService: any = ProductService.getInstance()
    public isAvailable = false;
    public isSalesInfo = false;
    public useFixed = false;
    public selectedCompany: ICompany = new Company();
    public checkoutUpsell = '';
    public backToCallingPage = false;
    public productCopy: IProduct = new Product();
    public productBackup: IProduct|null = null;
    public affiliateAgreement: IAffiliateAgreement = new AffiliateAgreement();
    public affiliateAgreementProduct: IAffiliateAgreementProduct = new AffiliateAgreementProduct();
    public editorConfig = {};
    public moneyFixed = {
      decimal: ',',
      thousands: '.',
      prefix: Store.state.currency + ' ',
      suffix: '',
      precision: 2,
      masked: false
    }

    public moneyPercentage = {
      decimal: ',',
      thousands: '.',
      prefix: '',
      suffix: ' %',
      precision: 2,
      masked: false
    }

    @Watch('product', { immediate: true, deep: true })
    public updatedProd (newVal: any) {
      this.productCopy = newVal
      if(this.productBackup === null && newVal.id){
        let copy = JSON.parse(JSON.stringify(this.$props.product))
        this.productBackup = Object.assign({}, copy)
        this.isSalesInfo = newVal.affiliateSalesInfoJson !== undefined
      }
    }
    @Watch('isSalesInfo', { immediate: true, deep: true })
    public isSalesInfoWatch (newVal: any) {
      if(newVal){
      //  this.productCopy.affiliateSalesInfoJson = ''
      } else {
       // this.productCopy.affiliateSalesInfoJson = undefined
      }
    }

    public save () {
      const dto = JSON.parse(JSON.stringify(this.productCopy))
      dto.typeDigital = undefined
      dto.typeService = undefined
      dto.typePhysical = undefined
      dto.typeCourse = undefined
      dto.productSubscription = undefined
      if (!this.productCopy.availableForAffiliates) {
        dto.generalFlatCommission = null
        dto.generalPercentageCommission = null
        dto.affiliateSalesInfoJson = null
      }
      this.productService.put(dto).then((resp: AxiosResponse) => {
        if(resp && resp.data){
          this.setAlert('productUpdated', 'success')
          this.productBackup = null
          this.$emit('update')
        }
      })
    }
    public goBack() {
      this.$router.push('/products')
    }
    public cancel () {
      if(this.productBackup) {
        if(this.productBackup && this.productBackup.affiliateSalesInfoJson){
          this.productCopy.affiliateSalesInfoJson = this.productBackup.affiliateSalesInfoJson
        } else {
          this.productCopy.affiliateSalesInfoJson = undefined
        }
        this.productCopy.generalPercentageCommission = this.productBackup.generalPercentageCommission
        this.productCopy.generalFlatCommission = this.productBackup.generalFlatCommission
        this.productCopy.availableForAffiliates = this.productBackup.availableForAffiliates
        let copy = this.productBackup
        this.productCopy = Object.assign({}, copy)
        this.isSalesInfo = this.productBackup.affiliateSalesInfoJson ? true : false
      } else {
        let copy = JSON.parse(JSON.stringify(this.$props.product))
        this.productCopy = Object.assign({}, copy)
      }
    }
}
