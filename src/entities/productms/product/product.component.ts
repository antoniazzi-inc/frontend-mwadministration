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

import { Component, Vue } from 'vue-property-decorator'

import PaginationTableComponent from '@/components/paginationTable/paginationTable.vue'
import { AxiosResponse } from 'axios'
import { mixins } from 'vue-class-component'
import CommonHelpers from '@/shared/commonHelpers'
import SimpleSearchComponent from '@/components/simpleSearch/simpleSearch.vue'
import { ISearchableSelectConfig, SearchableSelectConfig } from '@/shared/models/SearchableSelectConfig'
import SearchableSelectComponent from '@/components/searchableSelect/searchableSelect.vue'
import complexSearchComponent from '@/entities/relationms/relation/complexSearch/complexSearch.vue'
import ProductService from '@/shared/services/productService'
import {productType} from "@/shared/models/productms/ProductModel";

@Component({
  components: {
    complexSearch: complexSearchComponent,
    PaginationTableComponent,
    'simple-search': SimpleSearchComponent,
    SearchableSelectComponent
  }
})
export default class ProductComponent extends mixins(CommonHelpers, Vue) {
  public productService: any
  public searchableProductTypeConfig: ISearchableSelectConfig
  public searchableCatsConfig: ISearchableSelectConfig
  public searchableGroupsConfig: ISearchableSelectConfig
  public currentSearchName: string
  public currentSearchEmail: string
  public currentSearchGroups: any[]
  public currentSearchTags: any[]
  public selectedProductTypes: any
  public selectedPromotion: any
  public selectedGroups: any[]
  public allProductTypes: any[]
  public selectedCategories: any
  public currentSearchCategory: string
  public active: boolean
  public showQueryPopupForSimpleQueries: boolean
  public showSearchQueries: boolean
  public complexFilter = {
    operator: 'and',
    children: []
  };

  public queryName = '';
  public complexId = 0;
  constructor () {
    super()
    this.searchableProductTypeConfig = new SearchableSelectConfig('label',
      'labels.selectProductType', '', false,
      false, true, false, false)
    this.searchableCatsConfig = new SearchableSelectConfig('label',
      'labels.selectPromotion', '', false,
      false, true, false, false)
    this.searchableGroupsConfig = new SearchableSelectConfig('code',
      'labels.selectCategory', '', false,
      false, true, false, false)
    this.currentSearchName = ''
    this.currentSearchEmail = ''
    this.currentSearchTags = []
    this.allProductTypes = []
    this.currentSearchGroups = []
    this.selectedProductTypes = null
    this.currentSearchCategory = ''
    this.selectedGroups = []
    this.selectedCategories = null
    this.selectedPromotion = null
    this.active = false
    this.showQueryPopupForSimpleQueries = false
    this.showSearchQueries = false
    this.productService = ProductService.getInstance()
  }

  public mounted () {
    this.allProductTypes = [{
      label: this.$t('labels.digital'),
      value: productType.DIGITAL
    }, {
      label: this.$t('labels.service'),
      value: productType.SERVICE
    }, {
      label: this.$t('labels.course'),
      value: productType.COURSE
    }, {
      label: this.$t('labels.physical'),
      value: productType.PHYSICAL
    }, {
      label: this.$t('labels.voucher'),
      value: productType.VOUCHER
    }]
    this.active = true
  }

  public simpleSearch () {
    const queryArray: any = []
    if (this.currentSearchName !== '') {
      queryArray.push({
        mainOperator: 'and',
        children: [{
          key: 'sku',
          value: this.currentSearchName,
          inBetweenOperator: '==',
          afterOperator: 'or',
          exactSearch: false
        }, {
          key: 'productLanguages.name',
          value: this.currentSearchName,
          inBetweenOperator: '==',
          afterOperator: 'or',
          exactSearch: false,
        }, {
          key: 'productLanguages.description',
          value: this.currentSearchName,
          inBetweenOperator: '==',
          afterOperator: '',
          exactSearch: false
        }]
      })
    }
    if(this.selectedProductTypes !== null) {
      queryArray.push({
        mainOperator: 'and',
        children: [{
          key: 'productType',
          value: this.selectedProductTypes.value.toString(),
          inBetweenOperator: '==',
          afterOperator: '',
          exactSearch: true
        }]
      })
    }
    if(this.selectedCategories !== null) {
      queryArray.push({
        mainOperator: 'and',
        children: [{
          key: 'productCategories.categoryId',
          value: this.selectedCategories.id.toString(),
          inBetweenOperator: '==',
          afterOperator: '',
          exactSearch: true
        }]
      })
    }
    if(this.selectedPromotion !== null) {
      queryArray.push({
        mainOperator: 'and',
        children: [{
          key: 'promotions.id',
          value: this.selectedPromotion.id,
          inBetweenOperator: '==',
          afterOperator: '',
          exactSearch: false
        }]
      })
    }
    const finalQ = this.queryBuilder(queryArray)
    // @ts-ignore
    this.$refs.paginationTable.retrieveData('api/productms/api/products', undefined, finalQ)
  }

  public clear () {
    this.currentSearchName = ''
    this.selectedProductTypes = null
    this.selectedCategories = null
    this.selectedPromotion = null
    // @ts-ignore
    this.$refs.paginationTable.retrieveData('api/productms/api/products', undefined, undefined)
  }

  public editProduct (prod: any) {
    this.updateRecentItemsAfterRead(prod.id, prod.productLanguages[0].name, 'product')
    this.$router.push({ name: 'EditProduct', params: { id: prod.id } })
  }

  public deleteProduct (prod: any) {
    this.active = false
    if (prod.id) {
      this.productService.delete(prod.id).then((resp: AxiosResponse) => {
        this.active = true
        if (resp) {
          this.setAlert('productRemoved', 'success')
        } else {
          this.setAlert('productRemoveError', 'error')
        }
      })
    }
  }

  public productTypeSearchChanged (productType: any) {
    this.selectedProductTypes = productType
  }

  public productTypeSearchRemoved (tag: any) {
    this.selectedProductTypes = null
  }


  public categorySearchChanged (category: any) {
    this.selectedCategories = category
  }

  public categorySearchRemoved () {
    this.selectedCategories = null
  }

  public promotionSearchChanged (promo:any) {
    this.selectedCategories = promo
  }
  public promotionSearchRemoved () {
    this.selectedPromotion = null
  }
}
