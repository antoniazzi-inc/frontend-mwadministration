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

import {Component, Vue} from 'vue-property-decorator'

import PaginationTableComponent from '@/components/paginationTable/paginationTable.vue'
import {AxiosResponse} from 'axios'
import {mixins} from 'vue-class-component'
import CommonHelpers from '@/shared/commonHelpers'
import SimpleSearchComponent from '@/components/simpleSearch/simpleSearch.vue'
import promotionsService from "@/shared/services/promotionsService";
import SearchableSelectComponent from "@/components/searchableSelect/searchableSelect.vue";
import flatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'
import {ISearchableSelectConfig, SearchableSelectConfig} from "@/shared/models/SearchableSelectConfig";
import {promotionType} from "@/shared/models/productms/PromotionModel";
import {IMoneyConfig, MoneyConfig} from "@/shared/models/moneyConfig";
import moment from "moment";
import {DATE_FORMAT, INSTANT_FORMAT} from "@/shared/filters";

@Component({
  components: {
    PaginationTableComponent,
    'simple-search': SimpleSearchComponent,
    SearchableSelectComponent,
    flatPickr
  }
})
export default class PromotionComponent extends mixins(CommonHelpers, Vue) {
  public promotionService: any
  public validFromConfig: any
  public validToConfig: any
  public availableFrom: any
  public selectedDiscount: any
  public availableTo: any
  public selectedPromoType: any
  public percentageAmount: number
  public money: IMoneyConfig
  public allPromoTypes: any[]
  public allDiscountTypes: any[]
  public promotionTypeConfig: ISearchableSelectConfig
  public discountTypeConfig: ISearchableSelectConfig
  public active: boolean
  public currentSearchName: string
  public currentSearchMacro: string

  constructor() {
    super()
    this.active = false
    this.availableFrom = moment().format(DATE_FORMAT)
    this.availableTo = null
    this.selectedPromoType = null
    this.selectedDiscount = null
    this.percentageAmount = 0
    this.allPromoTypes = []
    this.currentSearchName = ''
    this.currentSearchMacro = ''
    this.money = new MoneyConfig('', '', '', '%', 0, false)
    this.promotionService = promotionsService.getInstance()
    this.validFromConfig = {
      wrap: true,
      altInput: false,
      dateFormat: 'd-m-Y',
      minDate: ''
    }
    this.validToConfig = {
      wrap: true,
      altInput: false,
      dateFormat: 'd-m-Y',
      minDate: ''
    }
    this.promotionTypeConfig = new SearchableSelectConfig('label',
      'labels.selectPromotionType', '', false,
      false, true, false, false)
    this.discountTypeConfig = new SearchableSelectConfig('label',
      'labels.selectDiscountType', '', false,
      false, true, false, false)
    this.allDiscountTypes = [];
  }

  public mounted() {
    this.allPromoTypes = [{
      label: this.$t('labels.affiliate'),
      value: promotionType.AFFILIATE
    }, {
      label: this.$t('labels.bundle'),
      value: promotionType.BUNDLE
    }, {
      label: this.$t('labels.coupon'),
      value: promotionType.COUPON
    }, {
      label: this.$t('labels.loyalty'),
      value: promotionType.LOYALTY
    }, {
      label: this.$t('labels.personalCoupon'),
      value: promotionType.PERSONAL_COUPON
    }, {
      label: this.$t('labels.price'),
      value: promotionType.PRICE
    }, {
      label: this.$t('labels.quantity'),
      value: promotionType.QUANTITY
    }, {
      label: this.$t('labels.temporaryCoupon'),
      value: promotionType.TEMPORARY_COUPON
    }, {
      label: this.$t('labels.time'),
      value: promotionType.TIME
    }]
    this.allDiscountTypes = [{
      id: 1,
      name: 'percentage',
      label: this.$t('labels.percentage')
    }, {
      id: 2,
      name: 'fixed',
      label: this.$t('labels.fixedAmount')
    }, {
      id: 3,
      name: 'noShipping',
      label: this.$t('labels.noShipping')
    }, {
      id: 4,
      name: 'freeItems',
      label: this.$t('labels.freeItems')
    }]
    this.active = true
  }

  public editPromotion(promo: any) {
    this.$router.push({name: 'EditPromotion', params: {id: promo.id}})
  }

  public deletePromotion(promo: any) {
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

  public simpleSearch() {
    const queryArray: any = []
    if (this.currentSearchName !== '') {
      queryArray.push({
        mainOperator: 'and',
        children: [{
          key: 'typeCouponBased.coupon.code',
          value: this.currentSearchName,
          inBetweenOperator: '==',
          afterOperator: 'or',
          exactSearch: false
        }, {
          key: 'promotionLanguages.name',
          value: this.currentSearchName,
          inBetweenOperator: '==',
          afterOperator: 'or',
          exactSearch: false,
        }, {
          key: 'promotionLanguages.description',
          value: this.currentSearchName,
          inBetweenOperator: '==',
          afterOperator: '',
          exactSearch: false
        }]
      })
    } if (this.selectedPromoType !== null) {
      queryArray.push({
        mainOperator: 'and',
        children: [{
          key: 'promotionType',
          value: this.selectedPromoType.value.toString(),
          inBetweenOperator: '==',
          afterOperator: '',
          exactSearch: true
        }]
      })
    } if (this.selectedDiscount !== null) {
      queryArray.push({
        mainOperator: 'and',
        children: [{
          key: this.getSearchKey('discount').result,
          value: this.getSearchKey('discount').value ? 'false' : this.selectedDiscount.name.toString(),
          inBetweenOperator: this.getSearchKey('discount').value ? this.getSearchKey('discount').value : '==',
          afterOperator: '',
          exactSearch: true
        }]
      })
    } if (this.availableFrom) {
      queryArray.push({
        mainOperator: 'and',
        children: [{
          key: 'availableFrom',
          value: moment(this.availableFrom).format('DD-MM-YYYYTHH:mm:ss') + 'Z',
          inBetweenOperator: '>=',
          afterOperator: '',
          exactSearch: true
        }]
      })
    } if (this.availableTo) {
      queryArray.push({
        mainOperator: 'and',
        children: [{
          key: 'availableTo',
          value: moment(this.availableTo).format(INSTANT_FORMAT),
          inBetweenOperator: '<=',
          afterOperator: '',
          exactSearch: true
        }]
      })
    } if (this.percentageAmount > 0) {
      queryArray.push({
        mainOperator: 'and',
        children: [{
          key: this.getSearchKey('discount'),
          value: this.percentageAmount,
          inBetweenOperator: '==',
          afterOperator: '',
          exactSearch: false
        }]
      })
    } if (this.currentSearchMacro !== '') {
      queryArray.push({
        mainOperator: 'and',
        children: [{
          key: 'typePersonalCouponBased.macroName',
          value: this.currentSearchMacro,
          inBetweenOperator: '==',
          afterOperator: '',
          exactSearch: false
        }]
      })
    }
    const finalQ = this.queryBuilder(queryArray)
    // @ts-ignore
    this.$refs.paginationTable.retrieveData('api/productms/api/promotions', undefined, finalQ)
  }

  public getSearchKey(key:string) {
    let result = ''
    let value:any = '=empty='
    switch (key) {
      case 'discount':
        switch (this.selectedPromoType.value) {
          case 'TIME':
            result = 'typeTimeBased.discount.' + this.selectedDiscount.name
            break;
          case 'AFFILIATE':
            result = 'typeAffiliateBased.discount.' + this.selectedDiscount.name
            break;
          case 'BUNDLE':
            result = 'typeBundleBaseds.discount.' + this.selectedDiscount.name
            break;
          case 'COUPON':
            result = 'typeCouponBased.discount.' + this.selectedDiscount.name
            break;
          case 'LOYALTY':
            result = 'typeLoyaltyBased.discount.' + this.selectedDiscount.name
            break;
          case 'PERSONAL_COUPON':
            result = 'typePersonalCouponBased.discount.' + this.selectedDiscount.name
            break;
          case 'PRICE':
            result = 'typePriceBaseds.discount.' + this.selectedDiscount.name
            break;
          case 'QUANTITY':
            result = 'typeQuantityBaseds.discount.' + this.selectedDiscount.name
            break;
          case 'TEMPORARY_COUPON':
            result = 'typePersonalCouponBased.discount.' + this.selectedDiscount.name
            break;
        }
    }
    return {result: result, value: value}
  }
  public clear() {
    this.selectedDiscount = null
    this.selectedPromoType = null
    this.currentSearchMacro = ''
    this.currentSearchName = ''
    this.percentageAmount = 0
    this.availableFrom = null
    this.availableTo = null
  }

  public addPromoType(promo: any) {
    this.selectedPromoType = promo
  }

  public removePromoType(promo: any) {
    this.selectedPromoType = null
  }

  public addDiscountType(promo: any) {
    this.selectedDiscount = promo
  }

  public removeDiscountType(promo: any) {
    this.selectedDiscount = null
  }
}
