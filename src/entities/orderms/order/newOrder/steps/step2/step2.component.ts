import {Component, Vue, Watch} from 'vue-property-decorator'
import {mixins} from 'vue-class-component'
import CommonHelpers from '@/shared/commonHelpers'
import CartOrder, {ICartOrder} from "@/shared/models/orderms/CartOrderModel";
import OrderLine, {IOrderLine} from "@/shared/models/orderms/OrderLineModel";
import {ISearchableSelectConfig, SearchableSelectConfig} from "@/shared/models/SearchableSelectConfig";
import SearchableSelectComponent from "@/components/searchableSelect/searchableSelect.vue";
import Store from "@/store";
import {Money} from "v-money";
import ToggleSwitch from "@/components/toggleSwitch/toggleSwitch.vue";
import {AxiosResponse} from "axios";
import promotionsService from "@/shared/services/promotionsService";
import {productType} from "@/shared/models/productms/ProductModel";
import productService from "@/shared/services/productService";
import InvoicePreviewComponent from "@/entities/orderms/order/newOrder/invoicePreview/invoicePreview.vue";
import OrderPromotion from "@/shared/models/orderms/OrderPromotionModel";
import OrderSubscription from "@/shared/models/orderms/OrderSubscriptionModel";
import OrderLinePaymentSchedule from "@/shared/models/orderms/OrderLinePaymentScheduleModel";
import moment, {Moment} from "moment";
import AffiliateCommision from "@/shared/models/orderms/AffiliateCommisionModel";

@Component({
  props: {
    cartOrder: Object,
    beneficiaryList: Array
  },
  components: {
    SearchableSelectComponent,
    money: Money,
    ToggleSwitch,
    InvoicePreviewComponent
  }
})
export default class Step2Component extends mixins(CommonHelpers, Vue) {
  refs!: {
    removeLine: HTMLElement
  }
  public addProduct: boolean
  public addPromotion: boolean
  public usePaymentSchedule: boolean
  public useProductSubscription: boolean
  public isEditingOrderLine: boolean
  public singleSelectConfigProduct: ISearchableSelectConfig
  public singleSelectConfigDeliveryMethod: ISearchableSelectConfig
  public singleSelectConfigAttribute: ISearchableSelectConfig
  public singleSelectConfigBeneficiary: ISearchableSelectConfig
  public singleSelectConfigPromotion: ISearchableSelectConfig
  public cartOrderCopy: ICartOrder
  public selectedProduct: any
  public selectedPaymentSchedule: any
  public selectedPromotion: any
  public orderLineToDelete: any
  public newOrderLineError: any
  public promotionToDelete: any
  public promotionsService: any
  public singleSelectConfigAffiliate: ISearchableSelectConfig
  public productService: any
  public selectedOrderLineDeliveryMethod: any
  public selectedAffiliate: any
  public selectedProductAttributes: any[]
  public productAttributes: any[]
  public availablePrmotions: any[]
  public allPromotions: any[]
  public selectedBeneficiaries: any[]
  public allProducts: any[]
  public allOrderLines: any[]
  public newOrderLine: IOrderLine | any
  public moneyFixed = {
    decimal: ',',
    thousands: '.',
    prefix: Store.state.currency,
    suffix: '',
    precision: 2,
    masked: false
  }

  constructor() {
    super()
    this.addProduct = false
    this.addPromotion = false
    this.usePaymentSchedule = false
    this.useProductSubscription = false
    this.isEditingOrderLine = false
    this.selectedProduct = null
    this.promotionToDelete = null
    this.orderLineToDelete = null
    this.selectedPaymentSchedule = null
    this.selectedAffiliate = null
    this.selectedPromotion = null
    this.newOrderLineError = ''
    this.singleSelectConfigAffiliate = new SearchableSelectConfig('label',
      'labels.chooseAffilaite', '', false,
      false, true, false, false)
    this.selectedProductAttributes = []
    this.selectedOrderLineDeliveryMethod = null
    this.promotionsService = promotionsService.getInstance()
    this.productService = productService.getInstance()
    this.productAttributes = []
    this.allProducts = []
    this.availablePrmotions = []
    this.selectedBeneficiaries = []
    this.allOrderLines = []
    this.allPromotions = []
    this.cartOrderCopy = new CartOrder()
    this.newOrderLine = new OrderLine()
    this.singleSelectConfigBeneficiary = new SearchableSelectConfig('email',
      'labels.chooseBeneficiary', '', false,
      false, true, true, false)
    this.singleSelectConfigProduct = new SearchableSelectConfig('label',
      'labels.chooseProduct', '', false,
      false, true, false, false, false, true)
    this.singleSelectConfigPromotion = new SearchableSelectConfig('label',
      'labels.choosePromotion', '', false,
      false, true, false, false, false, true)
    this.singleSelectConfigAttribute = new SearchableSelectConfig('label',
      'labels.chooseProductAttribute', '', false,
      false, true, true, false, false, true)
    this.singleSelectConfigDeliveryMethod = new SearchableSelectConfig('label',
      'labels.chooseDeliveryMethod', '', false,
      false, true, false, false, false, true)
  }

  @Watch('cartOrder', {immediate: true, deep: true})
  public updateCartOrder(newVal: any) {
    if (newVal) {
      this.cartOrderCopy = newVal
    }
  }

  public mounted() {

  }

  public addNewProduct() {
    this.newOrderLine = new OrderLine()
    this.selectedProduct = null
    this.selectedOrderLineDeliveryMethod = null
    this.selectedProductAttributes = []
    this.addProduct = true
    this.addPromotion = false
  }

  public addNewPromotion() {
    this.addPromotion = true
    this.addProduct = false
  }

  public productChanged(prod: any) {
    if (!prod) return
    this.selectedProduct = prod
    this.productAttributes = []
    this.productService.get(prod.value.id).then((resp: AxiosResponse) => {
      if (resp.data) {
        if (resp.data.attributes && resp.data.attributes.length) {
          resp.data.attributes.forEach((item: any) => {
            let allAttrs = item.attributeValues.map((attr: any) => {
              return {
                label: `${this.getMultiLangName(item.attributeLanguages).name} -> ${this.getMultiLangName(attr.attributeValueLanguages).name} (+${attr.price}${this.$store.state.currency}) ${this.$t('labels.maxItems')} ${attr.stock}`,
                value: attr,
                attribute: item
              }
            })
            this.productAttributes = this.productAttributes.concat(allAttrs)
          })

        }
        let changedProd = {...resp.data, id: undefined, createdOn: undefined, updatedOn: undefined, version: undefined}
        this.newOrderLine.orderProduct = {
          ...changedProd,
          productId: resp.data.id,
          productName: this.getMultiLangName(resp.data.productLanguages).name,
          relationId: this.cartOrderCopy.orderCustomer?.relationId,
          productPrice: resp.data.price,
          taxPercentage: resp.data.tax,
          orderProductAttributeValues: []
        }
      }
    })
  }

  public productRemoved(prod: any) {
    this.selectedProduct = null
    this.newOrderLine.orderProduct = undefined
  }

  public productAttributeChanged(attr: any) {
    if (!attr) return
    this.selectedProductAttributes = attr
  }

  public productAttributeRemoved(attr: any) {
    let index = this.selectedProductAttributes.findIndex(e => e.value.id === attr.value.id)
    if (index > -1) {
      this.selectedProductAttributes.splice(index, 1)
    }
  }

  public orderLineDeliveryMethodChanged(deliveryMethod: any) {
    if (!deliveryMethod) return
    this.selectedOrderLineDeliveryMethod = deliveryMethod
    this.newOrderLine.orderLineDeliveryMethod = {
      relationId: this.cartOrderCopy.orderCustomer ? this.cartOrderCopy.orderCustomer.relationId : undefined,
      deliveryMethodId:  deliveryMethod.value.id,
      name:  this.getMultiLangName(deliveryMethod.value.deliveryMethodLanguages).name,
      detailsJson: undefined

    }
  }

  public orderLineDeliveryMethodRemoved(deliveryMethod: any) {
    this.selectedOrderLineDeliveryMethod = null
    this.newOrderLine.orderLineDeliveryMethod = undefined
  }

  public addOrderLine() {
    let self = this
    this.$validator.validateAll({quantityProd: this.newOrderLine.quantity}).then(resp => {
      if (resp) {
        if (!this.selectedProduct || this.selectedProduct && !this.selectedProduct.value.id) {
          this.newOrderLineError = this.$t('labels.selectAProduct')
          return false
        } else if (this.selectedProduct.value.productType === productType.PHYSICAL && !this.selectedOrderLineDeliveryMethod || this.selectedOrderLineDeliveryMethod && !this.selectedOrderLineDeliveryMethod.value.id) {
          this.newOrderLineError = this.$t('labels.pleaseChooseDeliveryMethod')
          return false
        }
      } else {
        return false
      }
      if (this.selectedBeneficiaries && this.selectedBeneficiaries.length) {
        this.newOrderLine.beneficiaryList = this.selectedBeneficiaries
      }
      if (this.selectedProductAttributes && this.selectedProductAttributes.length) {
        let attributes:any = []
        this.newOrderLineError = ''
        this.selectedProductAttributes.forEach((item: any) => {
          if(this.newOrderLineError !== '') return false
          if (item.value.stock && item.value.stock < parseInt(self.newOrderLine.quantity)) {
            this.newOrderLineError = `${item.label} ${this.$t('labels.stockValidationError')}`
            return false
          } else
            attributes.push({
              relationId: this.cartOrderCopy.orderCustomer ? this.cartOrderCopy.orderCustomer.relationId : undefined,
              attributeId: item.attribute.id,
              attributeValueId: item.value.id,
              attributeName: this.getMultiLangName(item.attribute.attributeLanguages).name,
              attributeDescription: this.getMultiLangName(item.attribute.attributeLanguages).description,
              attributeValueName: this.getMultiLangName(item.value.attributeValueLanguages).name,
              attributeValueDescription: this.getMultiLangName(item.value.attributeValueLanguages).description,
              attributeValuePrice: item.value.price
            })
        })
        if(this.newOrderLineError != '') return false
        this.newOrderLine.orderProduct.orderProductAttributeValues = attributes
      } else if(this.selectedProduct.value.stock < this.newOrderLine.quantity) {
        this.newOrderLineError = `${this.selectedProduct.label} ${this.$t('labels.stockValidationError')}`
        return false
      }
      if(this.useProductSubscription){
        let startDate:any = null
        switch (this.selectedProduct.value.productSubscription.startDate) {
          case 'firstOfCurrentMonth':
            startDate = moment().startOf('month')
            break
          case 'firstOfNextMonth':
            startDate = moment().add(1, 'month').startOf('month')
            break
          case 'now':
            startDate = moment()
            break
          case 'paymentDone':
            startDate = null
            break
        }
        this.newOrderLine.orderSubscription = new OrderSubscription(undefined, undefined, undefined, undefined, undefined,
          this.cartOrderCopy.orderCustomer ? this.cartOrderCopy.orderCustomer.relationId : undefined,
          this.selectedProduct.value.productSubscription.period, startDate !== null ? moment(startDate).format('YYYY-MM-DDTHH:mm:ss') + 'Z' : undefined,
          undefined, undefined, true, undefined, undefined)
      }
      if(this.selectedAffiliate && this.selectedAffiliate !== null) {
        this.newOrderLine.affiliateCommisions = [new AffiliateCommision(undefined, undefined, undefined, undefined, undefined, this.cartOrderCopy.orderCustomer?.relationId,
          this.selectedAffiliate.id, undefined, undefined, undefined, undefined)] //TODO check if all values are correct
      }
      if(this.usePaymentSchedule){
        const reminderDateIndex = this.$store.state.administration.administrationSettings.findIndex((e:any)=> e.settingKey === 'reminderDate')
        let reminderDate:any = null
        if(reminderDateIndex > -1){
          reminderDate = this.$store.state.administration.administrationSettings[reminderDateIndex].settingValueJson
        }
        let paymentSchedules = self.selectedProduct.value.paymentSchedules[self.selectedPaymentSchedule].paymentScheduleOptions.map((e:any, i:number)=>{
          let paymentDate:any = moment().format('YYYY-MM-DDTHH:mm:ss') + 'Z'
          if(i > 0) {
            switch (self.selectedProduct.value.paymentSchedules[self.selectedPaymentSchedule].period){
              case 'month':
                paymentDate = moment().add(i, "month").format('YYYY-MM-DDTHH:mm:ss') + 'Z'
                break;
              case 'week':
                paymentDate = moment().add(i, "week").format('YYYY-MM-DDTHH:mm:ss') + 'Z'
                break;
              case 'day':
                paymentDate = moment().add(i, "day").format('YYYY-MM-DDTHH:mm:ss') + 'Z'
                break;
            }
          }
          return new OrderLinePaymentSchedule(undefined, undefined, undefined, undefined, undefined,
            this.cartOrderCopy.orderCustomer?.relationId, moment(paymentDate).add(reminderDate, 'days'), paymentDate, self.newOrderLine.quantity, e.price)
        })
        this.newOrderLine.orderLinePaymentSchedules = paymentSchedules
      }
      if (this.allOrderLines) {
        this.allOrderLines.push(this.newOrderLine)
        this.newOrderLine = new OrderLine()
      } else {
        this.allOrderLines = [this.newOrderLine]
        this.newOrderLine = new OrderLine()
      }
      this.$emit('onUpdate', {field: 'orderLines', payload: this.allOrderLines})
      this.addProduct = false
      this.allProducts.push(this.selectedProduct)
      this.populatePromotions()
    })
  }

  public closeEditMode() {
    this.addProduct = false
    this.selectedBeneficiaries = []
    this.newOrderLine = new OrderLine()
    this.selectedProduct = null
    this.selectedProductAttributes = []
    this.selectedOrderLineDeliveryMethod = null
  }
  public validateStep() {
    return new Promise(resolve => {
      if(this.allOrderLines && this.allOrderLines.length) {
        resolve({status: true, msg: ''})
      } else {
        resolve({status: false, msg: this.$t('labels.pleaseAddProducts')})
      }
    })
  }
  public addBeneficiary(beneficiary: any) {
    this.selectedBeneficiaries = beneficiary
  }
  public changeAffiliate (aff:any) {
    this.selectedAffiliate = aff
  }
  public removeAffiliate () {
    this.selectedAffiliate = null
  }
  public removeBeneficiary(beneficiary: any) {
    let index = this.selectedBeneficiaries.findIndex((e) => e.id === beneficiary.id)
    if (index > -1) {
      this.selectedBeneficiaries.splice(index, 1)
    }
  }

  public addSelectedPromotion(promo: any) {
    this.selectedPromotion = promo
  }

  public removeSelectedPromotion(promo: any) {
    this.selectedPromotion = null
  }

  public closeAddPromotion(promo: any) {
    this.selectedPromotion = null
    this.addPromotion = false
  }

  public addNewOrderPromotion() {
    this.allPromotions.push(this.selectedPromotion)
    let discountType: any = this.getDiscountType(this.selectedPromotion.value).type
    if (this.cartOrderCopy.orderDiscountLines) {
      this.cartOrderCopy.orderDiscountLines.push({
        relationId: this.cartOrderCopy.orderCustomer?.relationId,
        discountId: this.selectedPromotion.value[discountType].discount.id,
        percentage: this.selectedPromotion.value[discountType].discount.percentage,
        fixed: this.selectedPromotion.value[discountType].discount.fixed,
        noShipping: this.selectedPromotion.value[discountType].discount.noShipping ? this.selectedPromotion.value[discountType].discount.noShipping : false,
        freeItemsJson: this.selectedPromotion.value[discountType].discount.freeItemsJson,
        entireOrder: this.selectedPromotion.value.entireOrder,
        orderPromotion: new OrderPromotion(undefined, undefined, undefined, undefined, undefined, this.cartOrderCopy.orderCustomer?.relationId,
          this.selectedPromotion.value.id, this.selectedPromotion.promotionType, this.getMultiLangName(this.selectedPromotion.promotionLanguages).name,
          this.getMultiLangName(this.selectedPromotion.promotionLanguages).description, this.selectedPromotion.value.availableFrom, this.selectedPromotion.value.availableTo,
          this.selectedPromotion.value.recurrent, this.selectedPromotion.value.promotionTypeDetailsJson, this.selectedPromotion.value.products, this.selectedPromotion.value.attributeValues)
      })
    } else {
      this.cartOrderCopy.orderDiscountLines = [{
        relationId: this.cartOrderCopy.orderCustomer?.relationId,
        discountId: this.selectedPromotion.value[discountType].discount.id,
        percentage: this.selectedPromotion.value[discountType].discount.percentage,
        fixed: this.selectedPromotion.value[discountType].discount.fixed,
        noShipping: this.selectedPromotion.value[discountType].discount.noShipping ? this.selectedPromotion.value[discountType].discount.noShipping : false,
        freeItemsJson: this.selectedPromotion.value[discountType].discount.freeItemsJson,
        entireOrder: this.selectedPromotion.value.entireOrder,
        orderPromotion: new OrderPromotion(undefined, undefined, undefined, undefined, undefined, this.cartOrderCopy.orderCustomer?.relationId,
          this.selectedPromotion.value.id, this.selectedPromotion.value.promotionType, this.getMultiLangName(this.selectedPromotion.value.promotionLanguages).name,
          this.getMultiLangName(this.selectedPromotion.value.promotionLanguages).description, this.selectedPromotion.value.availableFrom, this.selectedPromotion.value.availableTo,
          this.selectedPromotion.value.recurrent, this.selectedPromotion.value.promotionTypeDetailsJson, this.selectedPromotion.value.products, this.selectedPromotion.value.attributeValues)
      }]
    }
    this.$emit('onUpdate', {field: 'orderDiscountLines', payload: this.cartOrderCopy.orderDiscountLines})
    this.addPromotion = false
    this.selectedPromotion = null
  }

  public editOrderLine(item: any, index: number) {

  }

  public deletePromotion(index: number) {
    this.promotionToDelete = index
  }

  public deletePromotionConfirmed() {
    if (this.promotionToDelete !== null) {
      this.allPromotions.splice(this.promotionToDelete, 1)
      this.promotionToDelete = null
    }
    // @ts-ignore
    $(this.$refs.removeLine).modal('hide')
  }

  public removeOrderLine(index: number) {
    this.orderLineToDelete = index
  }

  public removeOrderLineConfirmed() {
    if (this.orderLineToDelete !== null && this.allOrderLines) {
      this.allOrderLines.splice(this.orderLineToDelete, 1)
      this.orderLineToDelete = null
    }
    // @ts-ignore
    $(this.$refs.removeLine).modal('hide')
    this.populatePromotions()
  }

  public getProductName(item: any) {
    return this.getMultiLangName(item.orderProduct.productLanguages).name
  }

  public getProductDesc(item: any) {
    return this.getMultiLangName(item.orderProduct.productLanguages).description
  }

  public getDeliveryMethodName(item: any) {
    if (item.orderLineDeliveryMethod && item.orderLineDeliveryMethod.name) {
      return item.orderLineDeliveryMethod.name;
    }
    let result: any = '';
    if (item && item.orderLineDeliveryMethod) {
      result = item.orderLineDeliveryMethod.name;
    }
    return result;
  }

  public getProductAttributes(item: any) {
    let allItems: any = []
    $.each(item.orderProduct.orderProductAttributeValues, function (k, v) {
      allItems.push(` ${v.attributeName} -> ${v.attributeValueName}`);
    });
    return allItems.join();
  }

  public populatePromotions() {
    let self = this
    let allPromotions: any = []
    this.allProducts.forEach((item, index) => {
      if (item.value.promotions)
        item.value.promotions.forEach((e: any) => {
          allPromotions.push(e)
        })
    })
    let result = allPromotions.map((item: any) => {
      return {
        label: this.getMultiLangName(item.promotionLanguages).name,
        value: item
      }
    })
    Vue.nextTick(function () {
      self.availablePrmotions = result
    })
  }
}
