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
import moment from "moment";
import AffiliateCommision from "@/shared/models/orderms/AffiliateCommisionModel";
import {INSTANT_FORMAT} from "@/shared/filters";
import OrderLineBeneficiary from "@/shared/models/orderms/OrderLineBeneficiaryModel";
import coursesService from "@/shared/services/coursesService";

@Component({
  props: {
    cartOrder: Object,
    beneficiaryList: Array,
    customerRelation: Object,
    active: Boolean
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
  public singleSelectConfigEvents: ISearchableSelectConfig
  public singleSelectConfigBeneficiary: ISearchableSelectConfig
  public singleSelectConfigPromotion: ISearchableSelectConfig
  public cartOrderCopy: ICartOrder
  public selectedProduct: any
  public selectedPaymentSchedule: any
  public selectedPromotion: any
  public orderLineToDelete: any
  public newOrderLineError: any
  public promotionToDelete: any
  public courseService: any
  public promotionsService: any
  public singleSelectConfigAffiliate: ISearchableSelectConfig
  public productService: any
  public selectedOrderLineDeliveryMethod: any
  public selectedAffiliate: any
  public selectedProductAttributes: any[]
  public selectedEvents: any
  public productAttributes: any[]
  public allEvents: any[]
  public availablePromotions: any
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
  public indexToEdit: number

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
    this.indexToEdit = -1
    this.selectedPromotion = null
    this.newOrderLineError = ''
    this.singleSelectConfigAffiliate = new SearchableSelectConfig('label',
      'labels.chooseAffilaite', '', false,
      false, true, false, false)
    this.selectedProductAttributes = []
    this.selectedOrderLineDeliveryMethod = null
    this.promotionsService = promotionsService.getInstance()
    this.productService = productService.getInstance()
    this.courseService = coursesService.getInstance()
    this.productAttributes = []
    this.allProducts = []
    this.availablePromotions = []
    this.selectedBeneficiaries = []
    this.allEvents = []
    this.selectedEvents = null
    this.allOrderLines = []
    this.allPromotions = []
    this.cartOrderCopy = new CartOrder()
    this.newOrderLine = new OrderLine()
    this.singleSelectConfigBeneficiary = new SearchableSelectConfig('email',
      'labels.chooseBeneficiary', '', false,
      false, true, true, false)
    this.singleSelectConfigProduct = new SearchableSelectConfig('label',
      'labels.chooseProduct', '', false,
      false, true, false, false, false, false)
    this.singleSelectConfigPromotion = new SearchableSelectConfig('label',
      'labels.choosePromotion', '', false,
      false, true, false, false, false, true)
    this.singleSelectConfigAttribute = new SearchableSelectConfig('label',
      'labels.chooseProductAttribute', '', false,
      false, true, true, false, false, false)
    this.singleSelectConfigEvents = new SearchableSelectConfig('label',
      'labels.chooseEvent', '', false,
      false, true, false, false, false, true)
    this.singleSelectConfigDeliveryMethod = new SearchableSelectConfig('label',
      'labels.chooseDeliveryMethod', '', false,
      false, true, false, false, false, false)
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
    let self = this
    if (!prod) return
    this.selectedProduct = prod
    this.productAttributes = []
    this.allEvents = []
    this.productService.get(prod.value.id).then((resp: AxiosResponse) => {
      if (resp.data) {
        if(resp.data.productType === 'COURSE'){
          let allEvents:any = []
          resp.data.typeCourse.course.events.forEach((e:any)=>{
            allEvents.push({
              label: self.getMultiLangName(e.eventLanguages).name,
              value: e
            })
          })
          debugger
          self.allEvents = allEvents
        }
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
      let ind = self.selectedBeneficiaries.findIndex((e: any) => e.id === self.$props.customerRelation.id)
      if (ind === -1)
        Vue.nextTick(function () {
          self.selectedBeneficiaries.push(self.$props.customerRelation)
        })
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
  public eventsRemoved(event: any) {
    this.selectedEvents = null
  }

  public eventsChanged(events: any) {
    if (!events) return
    this.selectedEvents = events
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
      deliveryMethodId: deliveryMethod.value.id,
      name: this.getMultiLangName(deliveryMethod.value.deliveryMethodLanguages).name,
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
        if (!self.selectedProduct || self.selectedProduct && !self.selectedProduct.value.id) {
          this.newOrderLineError = self.$t('labels.selectAProduct')
          return false
        } else if (self.selectedProduct.value.productType === productType.PHYSICAL && !self.selectedOrderLineDeliveryMethod || self.selectedOrderLineDeliveryMethod && !this.selectedOrderLineDeliveryMethod.value.id) {
          this.newOrderLineError = self.$t('labels.pleaseChooseDeliveryMethod')
          return false
        }
      } else {
        return false
      }
      if (self.selectedProductAttributes && self.selectedProductAttributes.length) {
        let attributes: any = []
        self.newOrderLineError = ''
        self.selectedProductAttributes.forEach((item: any) => {
          if (self.newOrderLineError !== '') return false
          if (item.value.stock && item.value.stock < parseInt(self.newOrderLine.quantity)) {
            self.newOrderLineError = `${item.label} ${self.$t('labels.stockValidationError')}`
            return false
          } else
            attributes.push({
              relationId: self.cartOrderCopy.orderCustomer ? self.cartOrderCopy.orderCustomer.relationId : undefined,
              attributeId: item.attribute.id,
              attributeValueId: item.value.id,
              attributeName: self.getMultiLangName(item.attribute.attributeLanguages).name,
              attributeDescription: self.getMultiLangName(item.attribute.attributeLanguages).description,
              attributeValueName: self.getMultiLangName(item.value.attributeValueLanguages).name,
              attributeValueDescription: self.getMultiLangName(item.value.attributeValueLanguages).description,
              attributeValuePrice: item.value.price
            })
        })
        if (self.newOrderLineError != '') return false
        self.newOrderLine.orderProduct.orderProductAttributeValues = attributes
      } else if (self.selectedProduct.value.stock < self.newOrderLine.quantity) {
        self.newOrderLineError = `${self.selectedProduct.label} ${self.$t('labels.stockValidationError')}`
        return false
      }
      if (self.useProductSubscription) {
        let startDate: any = null
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
        self.newOrderLine.orderSubscription = new OrderSubscription(undefined, undefined, undefined, undefined, undefined,
          self.cartOrderCopy.orderCustomer ? self.cartOrderCopy.orderCustomer.relationId : undefined,
          self.selectedProduct.value.productSubscription.period, startDate !== null ? moment(startDate).format(INSTANT_FORMAT) : undefined,
          undefined, undefined, true, undefined, undefined)
      }
      if (self.selectedAffiliate && self.selectedAffiliate !== null) {
        self.newOrderLine.affiliateCommisions = [new AffiliateCommision(undefined, undefined, undefined, undefined, undefined, this.cartOrderCopy.orderCustomer?.relationId,
          self.selectedAffiliate.id, undefined, undefined, undefined, undefined)] //TODO check if all values are correct
      }
      if (self.usePaymentSchedule) {
        const reminderDateIndex = self.$store.state.administration.administrationSettings.findIndex((e: any) => e.settingKey === 'reminderDate')
        let reminderDate: any = null
        if (reminderDateIndex > -1) {
          reminderDate = this.$store.state.administration.administrationSettings[reminderDateIndex].settingValueJson
        }
        let paymentSchedules = self.selectedProduct.value.paymentSchedules[self.selectedPaymentSchedule].paymentScheduleOptions.map((e: any, i: number) => {
          let paymentDate: any = moment().format(INSTANT_FORMAT)
          if (i > 0) {
            switch (self.selectedProduct.value.paymentSchedules[self.selectedPaymentSchedule].period) {
              case 'month':
                paymentDate = moment().add(i, "month").format(INSTANT_FORMAT)
                break;
              case 'week':
                paymentDate = moment().add(i, "week").format(INSTANT_FORMAT)
                break;
              case 'day':
                paymentDate = moment().add(i, "day").format(INSTANT_FORMAT)
                break;
            }
          }
          return new OrderLinePaymentSchedule(undefined, undefined, undefined, undefined, undefined,
            self.cartOrderCopy.orderCustomer?.relationId, moment(paymentDate).add(reminderDate, 'days'), paymentDate, self.newOrderLine.quantity, e.price)
        })
        self.newOrderLine.orderLinePaymentSchedules = paymentSchedules
      }
      let orderLinesToAdd:any = self.cartOrderCopy.orderLines ? self.cartOrderCopy.orderLines : []
      if (self.selectedBeneficiaries && self.selectedBeneficiaries.length >= 1) {
        let relId = self.cartOrderCopy.orderCustomer ? self.cartOrderCopy.orderCustomer.relationId : null
        let customerInd = self.selectedBeneficiaries.findIndex((e: any) => e.id === relId)
        this.selectedBeneficiaries.forEach((benef: any) => {
            let currOrderLine = JSON.parse(JSON.stringify(self.newOrderLine))
          if (customerInd === -1 || customerInd > -1 && benef.id !== self.selectedBeneficiaries[customerInd].id) {
            let benefFullName = `${benef.relationProfile.firstName} ${benef.relationProfile.middleName} ${benef.relationProfile.lastName}`
            currOrderLine.orderLineBeneficiary = new OrderLineBeneficiary(undefined, undefined, undefined, undefined, undefined, this.cartOrderCopy.orderCustomer?.relationId, benef.id, benef.email, benefFullName, benef.title)
            let deliveryAddrInd = benef.relationAddresses.findIndex((addr: any) => addr.usedForDelivery)
            currOrderLine.beneficiaryDeliveryAddress = deliveryAddrInd > -1 ? benef.relationAddresses[deliveryAddrInd] : benef.relationAddresses[0]
            currOrderLine.beneficiaryDeliveryAddress.relationId = self.cartOrderCopy.orderCustomer?.relationId
            currOrderLine.beneficiaryDeliveryAddress.beneficiaryRelationId = benef.id
            currOrderLine.beneficiaryDeliveryAddress.beneficiaryRelationAddressId = currOrderLine.beneficiaryDeliveryAddress.id
            currOrderLine.beneficiaryDeliveryAddress.id = undefined
            currOrderLine.beneficiaryDeliveryAddress.version = undefined
            currOrderLine.beneficiaryDeliveryAddress.createdOn = undefined
            currOrderLine.beneficiaryDeliveryAddress.updatedOn = undefined
            currOrderLine.beneficiaryDeliveryAddress.administrationId = undefined
            orderLinesToAdd.push(currOrderLine)
          } else {
            orderLinesToAdd.push(currOrderLine)
          }
        })
        self.createOrderLine(orderLinesToAdd)
      } else {
        self.createOrderLine(orderLinesToAdd)
      }
      this.$emit('onUpdate', {field: 'orderLines', payload: self.allOrderLines})
      this.addProduct = false
      this.allProducts.push(this.selectedProduct)
      this.populatePromotions()
    })
  }

  public createOrderLine(orderLines: any) {
    if (this.allOrderLines) {
      if (this.isEditingOrderLine) {
        this.allOrderLines[this.indexToEdit] = orderLines[0]
        this.indexToEdit = -1
        this.closeEditMode()
        this.newOrderLine = new OrderLine()
      } else {
        this.allOrderLines = orderLines
        this.newOrderLine = new OrderLine()
      }
    } else {
      this.allOrderLines = orderLines
      this.newOrderLine = new OrderLine()
    }
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
      if (this.allOrderLines && this.allOrderLines.length) {
        resolve({status: true, msg: ''})
      } else {
        resolve({status: false, msg: this.$t('labels.pleaseAddProducts')})
      }
    })
  }

  public addBeneficiary(beneficiary: any) {
    if (!beneficiary) return
    this.selectedBeneficiaries = beneficiary
  }

  public changeAffiliate(aff: any) {
    this.selectedAffiliate = aff
  }

  public removeAffiliate() {
    this.selectedAffiliate = null
  }

  public removeBeneficiary(beneficiary: any) {
    if (!beneficiary) return
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
        relationId: this.cartOrderCopy.orderCustomer? this.cartOrderCopy.orderCustomer.relationId : undefined,
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
        relationId: this.cartOrderCopy.orderCustomer? this.cartOrderCopy.orderCustomer.relationId : undefined,
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

  public editOrderLine(orderLine: any, index: number) {
    let self = this
    let attributeValue: any = [];
    this.isEditingOrderLine = true;
    this.indexToEdit = index;
    this.addProduct = true;
    this.newOrderLine = orderLine;
    this.useProductSubscription = orderLine.orderSubscription ? true : false
    this.usePaymentSchedule = orderLine.orderLinePaymentSchedules ? true : false
    let prodInd = this.allProducts.findIndex(e => e.value.id === orderLine.orderProduct.productId)
    if (prodInd > -1) this.selectedProduct = this.allProducts[prodInd]
    let deliveryInd = this.$store.state.lookups.deliveryMethods.findIndex((e: any) => e.value.id === orderLine.orderLineDeliveryMethod.deliveryMethodId)
    if (deliveryInd > -1) this.selectedOrderLineDeliveryMethod = this.$store.state.lookups.deliveryMethods[deliveryInd]
    if (orderLine.orderProduct.orderProductAttributeValues && orderLine.orderProduct.orderProductAttributeValues.length) {
      $.each(orderLine.orderProduct.orderProductAttributeValues, function (k, v) {
        $.each(self.productAttributes, function (i, j) {
          if (v.attributeId === j.attribute.id && j.value.id === v.attributeValueId) {
            attributeValue.push(j);
          }
        });
      });
      Vue.nextTick(function () {
        self.selectedProductAttributes = attributeValue;
      });
    }
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
          let index = self.$store.state.lookups.promotions.findIndex((p: any) => p.value.id === e.id)
          if (index > -1) {
            allPromotions.push(self.$store.state.lookups.promotions[index])
          }
        })
    })
    const allAvailablePromotions: any = []
    this.$store.state.lookups.promotions.forEach((promo: any) => {
      const discountType = self.getDiscountType(promo.value).type
      const isWholeOrder = (promo.value[discountType].discount) ? promo.value[discountType].discount.entireOrder : false
      if (isWholeOrder) allAvailablePromotions.push(promo)
    })
    let finalArr = allAvailablePromotions.concat(allPromotions)
    Vue.nextTick(function () {
      self.availablePromotions = Array.from(new Set(finalArr))
    })
  }
}
