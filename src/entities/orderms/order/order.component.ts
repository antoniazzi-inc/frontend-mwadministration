import {Component, Vue} from 'vue-property-decorator'

import PaginationTableComponent from '@/components/paginationTable/paginationTable.vue'
import {AxiosResponse} from 'axios'
import {mixins} from 'vue-class-component'
import CommonHelpers from '@/shared/commonHelpers'
import SimpleSearchComponent from '@/components/simpleSearch/simpleSearch.vue'
import {ISearchableSelectConfig, SearchableSelectConfig} from '@/shared/models/SearchableSelectConfig'
import SearchableSelectComponent from '@/components/searchableSelect/searchableSelect.vue'
import complexSearchComponent from '@/entities/relationms/relation/complexSearch/complexSearch.vue'
import {productType} from "@/shared/models/productms/ProductModel";
import CartOrdersService from "@/shared/services/orderms/CartOrdersService";
import OrderInfoComponent from "@/entities/orderms/order/orderInfo/orderInfo.vue";
import CartOrder, {ICartOrder} from "@/shared/models/orderms/CartOrderModel";

@Component({
  components: {
    complexSearch: complexSearchComponent,
    PaginationTableComponent,
    'simple-search': SimpleSearchComponent,
    SearchableSelectComponent,
    OrderInfoComponent
  }
})
export default class OrderComponent extends mixins(CommonHelpers, Vue) {
  $refs!:{
    orderInfoModal: HTMLElement
  }
  public orderService: any
  public searchableAffiliatesConfig: ISearchableSelectConfig
  public searchableCatsConfig: ISearchableSelectConfig
  public searchablePromotionsConfig: ISearchableSelectConfig
  public searchableGroupsConfig: ISearchableSelectConfig
  public searchableProductsConfig: ISearchableSelectConfig
  public currentSearchName: string
  public currentSearchOrderId: string
  public currentSearchEmail: string
  public currentSearchGroups: any[]
  public selectedAffiliates: any[]
  public currentSearchTags: any[]
  public selectedCategories: any[]
  public selectedProductTypes: any
  public selectedPromotion: any[]
  public selectedGroups: any[]
  public allProductTypes: any[]
  public selectedProducts: any[]
  public RecentlyAddedSearch: any
  public paymentStatusSearch: any
  public currentSearchCategory: string
  public invoiceNumberSearch: any
  public active: boolean
  public showQueryPopupForSimpleQueries: boolean
  public showSearchQueries: boolean
  public selectedOrder: ICartOrder
  public complexFilter = {
    operator: 'and',
    children: []
  };

  public queryName = '';
  public complexId = 0;

  constructor() {
    super()
    this.selectedOrder = new CartOrder()
    this.searchableAffiliatesConfig = new SearchableSelectConfig('label',
      'labels.selectProductType', '', false,
      false, true, false, false)
    this.searchableCatsConfig = new SearchableSelectConfig('code',
      'labels.selectCategories', '', false,
      false, true, true, false)
    this.searchablePromotionsConfig = new SearchableSelectConfig('label',
      'labels.selectPromotions', '', false,
      false, true, true, false)
    this.searchableGroupsConfig = new SearchableSelectConfig('code',
      'labels.selectCategories', '', false,
      false, true, true, false)
    this.searchableProductsConfig = new SearchableSelectConfig('label',
      'labels.selectProducts', '', false,
      false, true, true, false)
    this.currentSearchName = ''
    this.currentSearchOrderId = ''
    this.invoiceNumberSearch = ''
    this.currentSearchEmail = ''
    this.RecentlyAddedSearch = ''
    this.paymentStatusSearch = ''
    this.currentSearchTags = []
    this.selectedCategories = []
    this.allProductTypes = []
    this.currentSearchGroups = []
    this.selectedProductTypes = null
    this.currentSearchCategory = ''
    this.selectedGroups = []
    this.selectedAffiliates = []
    this.selectedProducts = []
    this.selectedPromotion = []
    this.active = true
    this.showQueryPopupForSimpleQueries = false
    this.showSearchQueries = false
    this.orderService = CartOrdersService.getInstance()
  }

  public mounted() {
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

  }

  public simpleSearch() {
    const queryArray: any = []
    if (this.currentSearchName !== '') {
      queryArray.push({
        mainOperator: 'and',
        children: [{
          key: 'orderCustomer.fullName',
          value: this.currentSearchName,
          inBetweenOperator: '==',
          afterOperator: 'or',
          exactSearch: false
        }, {
          key: 'orderCustomer.email',
          value: this.currentSearchName,
          inBetweenOperator: '==',
          afterOperator: '',
          exactSearch: false,
        }]
      })
    }
    if(this.currentSearchOrderId !== ''){
      queryArray.push({
        mainOperator: 'and',
        children: [{
          key: 'id',
          value: this.currentSearchOrderId,
          inBetweenOperator: '==',
          afterOperator: '',
          exactSearch: true,
        }]
      })
    }
    if(this.selectedProducts && this.selectedProducts.length) {
      let productIds = this.selectedProducts.map(e=>{
        return e.value.id
      })
      let newProductIds = productIds.join()
      newProductIds = newProductIds.replace(/,/g, '","')
      queryArray.push({
        mainOperator: 'and',
        children: [{
          key: 'orderLines.orderProduct.productId',
          value: newProductIds,
          inBetweenOperator: '=in=',
          afterOperator: '',
          exactSearch: true,
        }]
      })
    }
    if (this.selectedPromotion && this.selectedPromotion.length) {
      let promotionIds = this.selectedPromotion.map(e => {
        return e.value.id
      })
      let newPromotionIds = promotionIds.join()
      newPromotionIds = newPromotionIds.replace(/,/g, '","')
      queryArray.push({
        mainOperator: 'and',
        children: [{
          key: 'orderDiscountLines.orderPromotion.promotionId',
          value: newPromotionIds,
          inBetweenOperator: '=in=',
          afterOperator: '',
          exactSearch: false
        }]
      })
    }
    //TODO handle additional searches
   if(this.selectedCategories){}
   if(this.invoiceNumberSearch){}
   if(this.selectedAffiliates){}
   if(this.RecentlyAddedSearch){}
   if(this.paymentStatusSearch){}
    const finalQ = this.queryBuilder(queryArray)
    // @ts-ignore
    this.$refs.paginationTable.retrieveData('api/orderms/api/cart-orders', undefined, finalQ)
  }

  public clear() {
    this.currentSearchName = ''
    this.selectedProductTypes = null
    this.selectedCategories = []
    this.selectedPromotion = []
    // @ts-ignore
    this.$refs.paginationTable.retrieveData('api/orderms/api/cart-orders', undefined, undefined)
  }

  public editOrder(prod: any) {
    this.$router.push({name: 'EditOrder', params: {id: prod.id}})
  }

  public deleteOrder(order: any) {
    this.active = false
    if (order.id) {
      this.orderService.delete(order.id).then((resp: AxiosResponse) => {
        this.active = true
        if (resp) {
          this.setAlert('orderRemoved', 'success')
        } else {
          this.setAlert('orderRemoveError', 'error')
        }
      })
    }
  }

  public orderInfo(item:any) {
    this.orderService.get(item.id).then((resp:AxiosResponse)=>{
      if(resp && resp.data) {
        this.selectedOrder = resp.data
        //@ts-ignore
        $(this.$refs.orderInfoModal).modal('show')
      } else {
        this.setAlert('fetchError', 'error')
      }
    })

  }

  public affiliateSearchChanged(aff: any) {
    this.selectedAffiliates = aff
  }

  public affiliateSearchRemoved(aff: any) {
    let index = this.selectedAffiliates.findIndex((e)=> e.id === aff.id)
    if(index > -1){
      this.selectedAffiliates.splice(index, 1)
    }
  }


  public productSearchChanged(prod: any) {
    this.selectedProducts = prod
  }

  public productSearchRemoved(prod:any) {
    let index = this.selectedProducts.findIndex((e:any)=>prod.value.id === e.value.id)
    if(index > -1){
      this.selectedProducts.splice(index, 1)
    }
  }
  public categorySearchChanged(category: any) {
    this.selectedCategories = category
  }

  public categorySearchRemoved(cat:any) {
    let index = this.selectedCategories.findIndex((e:any)=>cat.id === e.id)
    if(index > -1){
      this.selectedCategories.splice(index, 1)
    }
    this.selectedCategories = []
  }

  public promotionSearchChanged(promo: any) {
    this.selectedPromotion = promo
  }

  public promotionSearchRemoved(promo:any) {
    let index = this.selectedPromotion.findIndex((e:any)=> e.value.id === promo.value.id)
    if(index > -1){
      this.selectedPromotion.splice(index, 1)
    }
  }
}
