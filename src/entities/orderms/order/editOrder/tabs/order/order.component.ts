import {Component, Inject, Vue, Watch} from "vue-property-decorator";
import {mixins} from "vue-class-component";
import {debounce} from 'debounce';
import {Money} from 'v-money'
import JhiToggleSwitch from "@/components/toggleSwitch/toggleSwitch.vue";
import SearchableSelectComponent from "@/components/searchableSelect/searchableSelect.vue";
import CommonHelpers from "@/shared/commonHelpers";
import {IProduct} from "@/shared/models/productms/ProductModel";
import {ISearchableSelectConfig, SearchableSelectConfig} from "@/shared/models/SearchableSelectConfig";
import productService from "@/shared/services/productService";
import CartOrdersService from "@/shared/services/orderms/CartOrdersService";
import attributesService from "@/shared/services/attributesService";
import promotionsService from "@/shared/services/promotionsService";
import deliveryMethodService from "@/shared/services/deliveryMethodService";
import RelationService from "@/shared/services/relationService";
import OrderLinesService from "@/shared/services/orderms/OrderLinesService";
import {AxiosResponse} from "axios";
import {ProductLanguage} from "@/shared/models/productms/ProductLanguageModel";
import {Discount} from "@/shared/models/productms/DiscountModel";
import OrderProduct from "@/shared/models/orderms/OrderProductModel";
import OrderLineBeneficiary from "@/shared/models/orderms/OrderLineBeneficiaryModel";
import OrderLine, {IOrderLine} from "@/shared/models/orderms/OrderLineModel";
import OrderLineDeliveryMethod from "@/shared/models/orderms/OrderLineDeliveryMethodModel";
import OrderDiscountLinesService from "@/shared/services/orderms/OrderDiscountLinesService";
import OrderDiscountLine from "@/shared/models/orderms/OrderDiscountLineModel";
import {IRelationEntity} from "@/shared/models/relationms/relationModel";
import {Beneficiary} from "@/shared/models/beneficiary.model";
import BeneficiaryDeliveryAddress from "@/shared/models/orderms/BeneficiaryDeliveryAddressModel";
import CartOrder from "@/shared/models/orderms/CartOrderModel";
import OrderProductEvent from "@/shared/models/orderms/OrderProductEvent";
import OrderProductPurchasedVoucher from "@/shared/models/orderms/OrderProductPurchasedVoucher";

@Component({
  props: {
    order: {
      type: Object
    }
  },
  components: {
    SearchableSelectComponent,
    'money': Money,
    'toggle-switch': JhiToggleSwitch
  }
})
export default class OrderComponent extends mixins(Vue, CommonHelpers) {
  refs!:{
    copyBeneficiary:HTMLElement
  }
  public isProductSelected: boolean;
  public useProductSubscription: boolean;
  public orderHasSubscription: boolean;
  public isEditingOrderLine: boolean;
  public addProduct: boolean;
  public addNewPromotion: boolean;
  public usePaymentSchedule: boolean;
  public productAdditionalInfo: string;
  public deliveryMethodError: any;
  public orderLineToRemove: number | any;
  public indexToEdit: number | any;
  public orderLinePromotionToRemove: number | any;
  public customerCountry: string;
  public allProducts: IProduct[];
  public orderLines: IOrderLine[];
  public allRelations: [];
  public cartorderRelations: [];
  public selectedProduct: any;
  public timer: any;
  public orderCopy: any;
  public selectedCopyBeneficiary: any;
  public selectedProductSubscription: any;
  public singSelectConfigProduct: ISearchableSelectConfig;
  public allShippingMethods: any[];
  public allShippingMethodsBackup: any[];
  public selectedShippingMethods: any;
  public searchProductInit: any;
  public selectedProductFeature: any;
  public selectedPaymentSchedule: any;
  public selectedPaymentMethod: any;
  public moneyFixed: any;
  public productQuantity: any;
  public orderLineToCopy: any;
  public allProductFeatures: any[];
  public beneficiaryList: any[];
  public selectedOrderLine: any;
  public selectedBeneficiary: any[];
  public allPromotions: any[];
  public selectedPromotions: any[];
  public availablePrmotions: any[];
  public allEvents: any[];
  public selectedPromotion: any;
  public multiSelectConfig: ISearchableSelectConfig;
  public singleSelectConfigAttribute: ISearchableSelectConfig;
  public singleSelectConfigBeneficiary: ISearchableSelectConfig;
  public singleSelectConfigAffiliate: ISearchableSelectConfig;
  public multiSelectConfigBeneficiary: ISearchableSelectConfig;
  public singleSelectConfigDeliveryMethod: ISearchableSelectConfig;
  public singleSelectConfigEvents: ISearchableSelectConfig;
  public productService: any;
  public cartOrderService: any;
  public selectedEvent: any;
  public attributeService: any;
  public promotionService: any;
  public deliveryMethodService: any;
  public selectedAffiliate: any;
  public selectedBeneficiaries: any;
  public selectedProductType: any;
  public relationService: any;
  public orderLineService: any;
  public orderDiscountLineService: any;
  public singleSelectConfig: ISearchableSelectConfig =
    new SearchableSelectConfig('label', 'labels.selectPromotion', '', false, false, true, false, true, false, false)

  constructor() {
    super();
    this.productService = productService.getInstance()
    this.cartOrderService = CartOrdersService.getInstance()
    this.attributeService = attributesService.getInstance()
    this.promotionService = promotionsService.getInstance()
    this.deliveryMethodService = deliveryMethodService.getInstance()
    this.relationService = RelationService.getInstance()
    this.orderLineService = OrderLinesService.getInstance()
    this.orderDiscountLineService = OrderDiscountLinesService.getInstance()
    this.allShippingMethods = [];
    this.singleSelectConfigEvents = new SearchableSelectConfig('label',
      'labels.chooseEvent', '', false,
      false, true, false, false, false, true)
    this.singleSelectConfigBeneficiary = new SearchableSelectConfig('email',
      'labels.chooseBeneficiary', '', false,
      false, true, false, false)
    this.multiSelectConfigBeneficiary = new SearchableSelectConfig('email',
      'labels.chooseBeneficiary', '', false,
      false, true, true, false)
    this.allRelations = [];
    this.cartorderRelations = [];
    this.allEvents = [];
    this.allShippingMethodsBackup = [];
    this.selectedShippingMethods = null;
    this.selectedPaymentMethod = null;
    this.selectedProductType = null;
    this.selectedEvent = null;
    this.timer = null;
    this.selectedAffiliate = null;
    this.orderCopy = null;
    this.moneyFixed = {
      decimal: ',',
      thousands: '.',
      prefix: '€',
      suffix: '',
      precision: 2,
      masked: false
    };

    this.singleSelectConfigAffiliate = new SearchableSelectConfig('email',
      'labels.chooseAffilaite', '', false,
      false, true, false, false)
    this.multiSelectConfig = new SearchableSelectConfig('email',
      'labels.chooseBeneficiary', '', false,
      false, true, true, false, false, true)

    this.isProductSelected = false;
    this.usePaymentSchedule = false;
    this.addNewPromotion = false;
    this.isEditingOrderLine = false;
    this.useProductSubscription = false;
    this.orderHasSubscription = false;
    this.addProduct = false;
    this.productAdditionalInfo = '';
    this.customerCountry = '';
    this.selectedProduct = {
      value: {
        price: 0
      }
    };
    this.allProducts = [];
    this.orderLines = [];
    this.selectedProductFeature = null;
    this.allPromotions = [];
    this.selectedPromotions = [];
    this.selectedPromotion = null;
    this.selectedPaymentSchedule = null;
    this.selectedOrderLine = null;
    this.orderLineToRemove = null;
    this.indexToEdit = null;
    this.orderLinePromotionToRemove = null;
    this.productQuantity = 1;
    this.deliveryMethodError = '';
    this.selectedProductSubscription = null;
    this.selectedCopyBeneficiary = null;
    this.orderLineToCopy = null;
    this.selectedBeneficiary = [];
    this.beneficiaryList = [];
    this.selectedBeneficiaries = [];
    this.availablePrmotions = [];
    this.allProductFeatures = [];
    this.searchProductInit = function () {
    };
    this.singleSelectConfigAttribute = new SearchableSelectConfig('label',
      'labels.chooseProductAttribute', '', false,
      false, true, true, false, false, false)
    this.singleSelectConfigDeliveryMethod = new SearchableSelectConfig('label',
      'labels.chooseDeliveryMethod', '', false,
      false, true, false, false, false, false)
    this.singSelectConfigProduct = new SearchableSelectConfig('label',
      'labels.product',
      '',
      false,
      false,
      true,
      false,
      false,
      false,
      false)
  }

  @Watch('useProductSubscription', {immediate: true, deep: true})
  public updateUseProductSubscription(newVal: any) {
    if (newVal) {
      this.orderHasSubscription = true;
      if(this.selectedProduct && this.selectedProduct.value)
      this.selectedProductSubscription = this.selectedProduct.value.productSubscription;
    } else {
      this.orderHasSubscription = false;
      this.selectedProductSubscription = null;
    }
  }

  @Watch('usePaymentSchedule', {immediate: true, deep: true})
  public updateUsePaymentSchedule(newVal: any) {
    this.orderHasSubscription = newVal;
  }

  @Watch('order', {immediate: true, deep: true})
  public updateOrder(newVal: any) {
    if (newVal) {
      this.orderCopy = newVal;
      this.orderLines = newVal.orderLines;
      let benefici:any = [{
        ...this.orderCopy.orderCustomer,
        relationAddresses: this.orderCopy.customerDeliveryAddress ? [this.orderCopy.customerDeliveryAddress] : [this.orderCopy.customerBillingAddress]
      }]
    if(newVal && newVal.orderLines)
      newVal.orderLines.forEach((line:IOrderLine)=>{
        if(line.orderLineBeneficiary && line.orderLineBeneficiary.beneficiaryRelationId) {
          let benefId = line.orderLineBeneficiary && line.orderLineBeneficiary.beneficiaryRelationId ? line.orderLineBeneficiary.beneficiaryRelationId : this.orderCopy.orderCustomer.relationId
          let existingBenef = benefici.findIndex((e:any) => e.id === benefId)
          if(existingBenef === -1) {
            benefici.push({
              ...line.orderLineBeneficiary ? line.orderLineBeneficiary : newVal.orderCustomer,
              relationAddresses: [line.beneficiaryDeliveryAddress ? line.beneficiaryDeliveryAddress : newVal.customerDeliveryAddress],
              id: line.orderLineBeneficiary.beneficiaryRelationId ? line.orderLineBeneficiary.beneficiaryRelationId : newVal.orderCustomer.relationId,
              email: line.orderLineBeneficiary.email ? line.orderLineBeneficiary.email : newVal.orderCustomer.email
            })
          }
        }
      })
      this.cartorderRelations = benefici
      this.beneficiaryList = benefici
      if(newVal.orderLines)
      this.populatePromotions()
    }
  }

 public created(){
 }
  public mounted() {
    this.retrieve();
    this.searchProductInit = debounce(this.searchProduct, 500);
  }

  public selectProduct() {
    let self = this;
    this.isProductSelected = true;
    this.addNewPromotion = false
    this.addProduct = true;
    this.allEvents = []
    this.selectedEvent = null
    this.selectedOrderLine = new OrderLine()
    this.selectedProduct = {
      name: null,
      value: {
        id: null,
        price: 0
      }
    };
    this.selectedShippingMethods = null;
    this.selectedPaymentSchedule = null;
    this.selectedProductFeature = null;
    this.useProductSubscription = false;
    this.selectedBeneficiary = [];
    this.productQuantity = 1;
    this.productAdditionalInfo = '';
  }

  public retrieve() {
    this.allProducts = this.$store.state.lookups.products;
    this.$set(this, 'allShippingMethods', this.$store.state.lookups.deliveryMethods);
    this.$set(this, 'allShippingMethodsBackup', this.$store.state.lookups.deliveryMethods);
  }

  public searchProduct(search: any) {
    let self = this;
    if (search) {
      let query = 'productLanguages.name==*' + search + '*';
      this.productService.getAll({
        page: 0,
        size: 1000,
        sort: 'id,asc'
      }, query).then((resp: AxiosResponse) => {
        let allProd: any = [];
        if (resp && resp.data)
          $.each(resp.data.content, function (k, v) {
            let prod = v;
            prod.productPrice = v.price;
            allProd.push({
              label: self.getMultiLangName(v.productLanguages && v.productLanguages.length ? v.productLanguages : new ProductLanguage()).name,
              value: prod
            });
          });
        this.allProducts = allProd;
      });
    } else {
      this.retrieve();
    }
  };

  public addNewShippingMethod(method: any) {
    if(!method) return
    this.selectedShippingMethods = method;
    this.$emit('update');
  }

  public removeShippingMethod() {
    this.selectedShippingMethods = null;
    this.$emit('update');
  }

  public addPromotion() {
    this.addNewPromotion = true;
    this.addProduct = false;
    this.isProductSelected = false;
    this.useProductSubscription = false;
    this.selectedPromotion = null;
  }

  public getPromotionName(promo: any) {
    if (promo.value.promotionLanguages && promo.value.promotionLanguages.length) {
      return this.getMultiLangName(promo.value.promotionLanguages).name;
    }
    return '';
  }
public getPromoName(item:any){
    let promoName:any = {
      name: '',
      description: ''
    }
  this.$store.state.lookups.promotions.forEach((promo:any)=>{
    let discount = this.getDiscountType(promo.value)
    if(discount.discount.id === item.discountId){
      promoName = this.getMultiLangName(promo.value.promotionLanguages)
    }
  })
  return promoName
}
  public getDiscountName(item:any){
    let promoName:any = ''
    this.$store.state.lookups.promotions.forEach((promo:any)=>{
      let discount = this.getDiscountType(promo.value)
      if(discount.discount.id === item.discountId){
        promoName = this.getDiscount(promo.value)
      }
    })
    return promoName
  }
  public getPromotionDesc(promo: any) {
    if (promo.value.promotionLanguages && promo.value.promotionLanguages.length) {
      return this.getMultiLangName(promo.value.promotionLanguages).description;
    }
    return '';
  }

  public addProductSelect(prod: any) {
    if (!prod || !prod.value) return
    let self = this;
    let features: any = [];
    //@ts-ignore
    this.$parent.errorMesage = '';
    this.allProductFeatures = [];
    this.selectedProductFeature = [];
    let typeVoucherProd:any = null
    this.productService.get(prod.value.id).then((resp: AxiosResponse) => {
      let product = resp.data;
      //@ts-ignore
      product.productPrice = resp.price;
      this.selectedProduct = prod
      if (resp.data.attributes && resp.data.attributes.length) {
        $.each(resp.data.attributes, function (k, v) {
          let attributeName: any = '';

          if (v.attributeLanguages.length) attributeName = self.getMultiLangName(v.attributeLanguages).name;
          $.each(v.attributeValues, function (i, j) {
            let attributeValueName: any = '';
            if (j.attributeValueLanguages.length) attributeValueName = self.getMultiLangName(j.attributeValueLanguages).name;
            features.push({
              label: attributeName + ' -> ' + attributeValueName + '(+' + j.price + '€)',
              value: j,
              attributeId: v.id,
              attribute: v
            });
          });
        });
        self.allProductFeatures = features;
        if(this.selectedOrderLine.orderProduct && this.selectedOrderLine.orderProduct.orderProductAttributeValues){
          let selectedFeatures:any = []
          this.selectedOrderLine.orderProduct.orderProductAttributeValues.forEach((e:any)=>{
            let ind = features.findIndex((f:any)=> f.attributeId === e.attributeId)
            if(ind > -1){
              selectedFeatures.push(features[ind])
            }
          })
          this.selectedProductFeature = selectedFeatures
        }
      }
      if(resp && resp.data){
        if (resp.data.productType === 'COURSE') {
          this.selectedProductType = 'COURSE'
          let allEvents: any = []
          resp.data.typeCourse.course.events.forEach((e: any) => {
            allEvents.push({
              label: self.getMultiLangName(e.eventLanguages).name,
              value: e
            })
          })
          self.allEvents = allEvents
        } else if (resp.data.productType === 'VOUCHER') {
          this.selectedProductType = 'VOUCHER'
        }
      }
      this.allPromotions = []
      this.populatePromotions()
    });
  }
  public populatePromotions() {
    let self = this
    let allPromotions: any = []
    let allProducts: any = []

    this.orderCopy.orderLines.forEach((line:any) => {

      let index = self.$store.state.lookups.products.findIndex((e:any)=> e.value.id === line.orderProduct.productId)
      if(index > -1) {
        allProducts.push(self.$store.state.lookups.products[index])
      }
    })
    allProducts.forEach((item:any, index:number) => {
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
  public removeProduct(prod: any) {
    if(prod)
    this.selectedProduct = null;
  }

  public addProductFeatureSelect(feature: any) {
    if (!feature) return
    this.selectedProductFeature = feature;
  }

  public removeProductFeature(feature: any) {
    if(!feature) return
    this.selectedProductFeature = feature
  }

  public paymentScheduleChanged(schedule: any) {

  }

  public removeBeneficiary(beneficiary: any) {
    let index = null;
    $.each(this.selectedBeneficiary, function (k, v) {
      if (v.id === beneficiary.id) {
        index = k;
      }
    });
    if (index !== null) {
      this.selectedBeneficiary.splice(index, 1);
    }
  }

  public searchBeneficiary(searchString: any) {
    if (!searchString) return
    const queryArray: any = []
    queryArray.push({
        mainOperator: 'or',
        children: [{
          key: 'email',
          value: searchString,
          inBetweenOperator: '==',
          afterOperator: 'or',
          exactSearch: false
        }]
      },
      {
        mainOperator: 'or',
        children: [{
          key: 'relationProfile.firstName',
          value: searchString,
          inBetweenOperator: '==',
          afterOperator: 'or',
          exactSearch: false
        }]
      })
    let finalQ = this.queryBuilder(queryArray)
    const self = this
    if (this.timer) clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      self.beneficiaryList = self.cartorderRelations
    }, 500);
  }

  public addBeneficiary(beneficiary: any) {
    if (!beneficiary) return
    this.selectedBeneficiary = beneficiary;
  }

  public addSelectedPromotion(promotion: any) {
    if (!promotion) return
    this.selectedPromotion = promotion;
  }

  public removeSelectedPromotion(promotion: any) {
    let index = null;
    $.each(this.selectedPromotions, function (k, v) {
      if (v.value.id === promotion.id) {
        index = k;
      }
    });
    if (index !== null) {
      this.selectedPromotions.splice(index, 1);
    }
    this.selectedPromotion = null;
  }

  public addNewOrderPromotion() {
    if(this.checkForDuplicateDiscount(this.selectedPromotions, this.selectedPromotion)){
      return this.setAlert('youCanAddOnlyOnePercentageOrFixedPromotion', 'error')
    }
    let discountType:any = this.getDiscountType(this.selectedPromotion.value)
    let discount:any = this.selectedPromotion.value[discountType.type]
    let dto = new OrderDiscountLine(undefined, undefined, undefined, undefined, undefined, this.orderCopy.orderCustomer.relationId,
      discount.id, discount.discount.percentage, discount.discount.fixed, discount.discount.noShipping, discount.discount.freeItemsJson, discount.entireOrder, undefined,
      {id: this.orderCopy.id, version: this.orderCopy.version})
    this.orderDiscountLineService.post(dto).then((resp:AxiosResponse) => {
      if(resp && resp.data){
        this.selectedPromotions.push(resp.data);
        this.addNewPromotion = false;
        this.orderCopy.orderDiscountLines.push(resp.data)
        this.$emit('updateCart', this.orderCopy);
        this.setAlert('discountAdded', 'success')
      } else {
        this.setAlert('discountAddError', 'error')
      }
    })
  }

  public closeAddPromotion() {
    this.addNewPromotion = false;
  }

  public closeEditMode() {
    this.addProduct = false;
    this.isEditingOrderLine = false;
    this.isProductSelected = false;
    this.useProductSubscription = false;
  }


  public addOrderLine(e: any) {
    let self = this;
    if (this.orderHasSubscription && this.orderLines.length <= 0) {
      this.deliveryMethodError = this.$t('labels.subscriptionError');
      return false;
    } else {
      this.deliveryMethodError = '';
    }
    if (this.isEditingOrderLine) {
      this.saveEditedOrderLine();
      return;
    }
    let benefInd = this.selectedBeneficiary.findIndex((e:any)=>e.beneficiaryRelationId === this.orderCopy.orderCustomer.relationId)
    if(benefInd === -1)
      benefInd = this.selectedBeneficiary.findIndex((e:any)=>!e.beneficiaryRelationId && e.relationId === this.orderCopy.orderCustomer.relationId)
    if (this.selectedBeneficiary.length && benefInd === -1) {
      this.selectedBeneficiary.forEach(beneficiary => {
        self.createNewOrderLine(beneficiary).then((resp: any) => {
          resp.cartOrder = {
            id: this.$props.order.id,
            version: this.$props.order.version,
          }
          if (this.selectedProduct.value.productType === 'PHYSICAL' && (!this.selectedShippingMethods || !this.selectedShippingMethods.value)) {
            this.deliveryMethodError = this.$t('labels.shippingError');
            return false;
          } else {
            this.deliveryMethodError = '';
          }
          if(self.selectedEvent && self.selectedProduct.value.productType === 'COURSE'){
            resp.orderProduct.orderProductEvent = new OrderProductEvent(undefined, undefined, undefined, undefined,
              undefined, self.orderCopy.orderCustomer?.relationId, self.selectedEvent.value.id, this.selectedProduct.value.typeCourse.course.id,
              self.selectedEvent.value.eventStart, self.selectedEvent.value.eventEnd, self.selectedEvent.value.price, self.selectedEvent.value.seats)
          } else if(self.selectedProduct.value.productType === 'VOUCHER'){
            resp.orderProduct.orderProductPurchasedVoucher = new OrderProductPurchasedVoucher(undefined, undefined, undefined, undefined, undefined,
              this.orderCopy.orderCustomer?.relationId, self.selectedProduct.value.id, undefined, self.selectedProduct.value.typeVoucher.value
              , self.selectedProduct.value.typeVoucher.voucherType, undefined, undefined, undefined, self.selectedProduct.value.typeVoucher.daysValid)
          }
          this.createOrderLine(resp)
        });
      });
    } else {
      this.createNewOrderLine(undefined).then((resp: any) => {
        resp.cartOrder = {
          id: this.$props.order.id,
          version: this.$props.order.version,
        }
        if(self.selectedEvent && self.selectedProduct.value.productType === 'COURSE'){
          resp.orderProduct.orderProductEvent = new OrderProductEvent(undefined, undefined, undefined, undefined,
            undefined, self.orderCopy.orderCustomer?.relationId, self.selectedEvent.value.id, this.selectedProduct.value.typeCourse.course.id,
            self.selectedEvent.value.eventStart, self.selectedEvent.value.eventEnd, self.selectedEvent.value.price, self.selectedEvent.value.seats)
        } else if(self.selectedProduct.value.productType === 'VOUCHER'){
          resp.orderProduct.orderProductPurchasedVoucher = new OrderProductPurchasedVoucher(undefined, undefined, undefined, undefined, undefined,
            this.orderCopy.orderCustomer?.relationId, self.selectedProduct.value.id, undefined, self.selectedProduct.value.typeVoucher.value
            , self.selectedProduct.value.typeVoucher.voucherType, undefined, undefined, undefined, self.selectedProduct.value.typeVoucher.daysValid)
        }
        this.createOrderLine(resp)
      });
    }
    this.populatePromotions()
  }

  public createOrderLine(line: any) {
    this.orderLineService.post(line).then((orderLine: AxiosResponse) => {
      if (orderLine && orderLine.data) {
        this.setAlert('orderLineAdded', 'success')
        this.orderLines.push(orderLine.data);
        this.$emit('updateCart');
        this.closeEditMode();
        this.usePaymentSchedule = false;
        this.useProductSubscription = false;
        this.deliveryMethodError = '';
        this.orderCopy.orderLines = this.orderLines;
      }
    })
  }
  public changeAffiliate(aff:any){}
  public removeAffiliate(aff:any){}
  public saveEditedOrderLine() {
    let self = this;
    let allFeatures: any = [];
    $.each(this.selectedProductFeature, function (k, v) {
      allFeatures.push({
        attributeValue: v.value,
        attributeId: v.attributeId,
        attribute: v.attribute,
        relationId: this.$props.order.orderCustomer.relationId,
        attributeValueId: v.value.id,
        attributeName: self.getMultiLangName(v.attribute.attributeLanguages).name,
        attributeDescription: self.getMultiLangName(v.attribute.attributeLanguages).description,
        attributeValueName: self.getMultiLangName(v.value.attributeValueLanguages).name,
        attributeValueDescription: self.getMultiLangName(v.value.attributeValueLanguages).description,
        attributeValuePrice: v.value.price,
        orderProduct: v.attribute.product
      });
    });
    let schedule = this.usePaymentSchedule ? this.selectedProduct.value.paymentSchedules[this.selectedPaymentSchedule] : null;
    this.selectedOrderLine.quantity = parseInt(this.productQuantity);
    this.selectedOrderLine.additionalInfo = this.productAdditionalInfo;
    if(this.useProductSubscription){
      this.selectedProductSubscription.invoicePeriod = this.selectedProduct.value.productSubscription.period
    }
    this.selectedOrderLine.orderSubscription = this.useProductSubscription ? this.selectedProductSubscription : undefined;
    this.selectedOrderLine.orderLinePaymentSchedules = schedule;
    this.selectedOrderLine.orderProduct.orderProductAttributeValues = allFeatures
    this.selectedOrderLine.orderLineDeliveryMethod = this.selectedProduct.value.productType === 'PHYSICAL' ? {
      ...this.selectedOrderLine.orderLineDeliveryMethod,
      deliveryMethodId: this.selectedShippingMethods.value.id,
      name: this.selectedShippingMethods.label,
    } : undefined;
    this.orderLineService.put(this.selectedOrderLine).then((resp: AxiosResponse) => {
      if (!resp || !resp.data) {
        return
      }
      this.orderLines[this.indexToEdit] = JSON.parse(JSON.stringify(this.selectedOrderLine));
      this.closeEditMode();
      this.orderCopy.orderLines = this.orderLines;
      this.selectedOrderLine = null;
      this.$emit('updateCart', this.orderCopy);
      this.setAlert('orderLineUpdated', 'success')
      this.indexToEdit = null;
      this.isEditingOrderLine = false;
    });
  }

  public getDeliveryMethod(method: any) {
    let finalMethod = null;
    this.selectedProduct.value.productDeliveryMethods.forEach((deliverymethod: any) => {
      if (deliverymethod.deliveryMethodId === method.id) {
        finalMethod = deliverymethod;
      }
    });
    if (finalMethod === null) {
      this.deliveryMethodError = this.$t('labels.shippingError')
    } else {
      return finalMethod;
    }
  }

  public createNewOrderLine(beneficiary: any) {
    let self = this;
    let allFeatures: any = [];
    return new Promise(async resolve => {
      $.each(self.selectedProductFeature, (k, v) => {
        allFeatures.push({
          attributeValue: v.value,
          attributeId: v.attributeId,
          attribute: v.attribute,
          relationId: this.$props.order.orderCustomer.relationId,
          attributeValueId: v.value.id,
          attributeName: self.getMultiLangName(v.attribute.attributeLanguages).name,
          attributeDescription: self.getMultiLangName(v.attribute.attributeLanguages).description,
          attributeValueName: self.getMultiLangName(v.value.attributeValueLanguages).name,
          attributeValueDescription: self.getMultiLangName(v.value.attributeValueLanguages).description,
          attributeValuePrice: v.value.price,
          orderProduct: v.attribute.product
        });
      });
      let beneficiaryFullName: any, newBeneficiary, beneficiaryAddress
      //@ts-ignore
      if (beneficiary && beneficiary.beneficiaryRelationId !== self.$props.order.orderCustomer.relationId) {
        beneficiaryFullName = self.getBeneficiaryFullName(beneficiary);
        newBeneficiary = new OrderLineBeneficiary(undefined, undefined, undefined, undefined, undefined, this.$props.order.orderCustomer.relationId, beneficiary.id, beneficiary.email, beneficiaryFullName, beneficiary.title);
        if(!beneficiary.relationAddresses[0]){
          return this.setAlert('noBeneficiaryAddress', 'error')
        }
        beneficiaryAddress = beneficiary.relationAddresses[0];
        beneficiaryAddress.beneficiaryRelationId = beneficiary.beneficiaryRelationId ? beneficiary.beneficiaryRelationId : beneficiary.id;
        beneficiaryAddress.beneficiaryRelationAddressId = JSON.parse(JSON.stringify(beneficiary.relationAddresses[0].id));
        beneficiaryAddress.id = undefined;
        beneficiaryAddress.version = undefined;
        beneficiaryAddress.administrationId = undefined;
        beneficiaryAddress.createdOn = undefined;
        beneficiaryAddress.updatedOn = undefined;
      }
      let orderLine:any = new OrderLine(undefined, undefined, undefined, undefined, undefined, this.$props.order.orderCustomer.relationId, undefined, this.productQuantity, undefined, undefined,
        undefined, this.productAdditionalInfo, this.selectedProductSubscription, new OrderProduct(undefined, undefined, undefined, undefined, undefined, this.$props.order.orderCustomer.relationId,
          this.selectedProduct.value.id, this.selectedProduct.value.sku, this.getMultiLangName(this.selectedProduct.value.productLanguages).name,
          this.getMultiLangName(this.selectedProduct.value.productLanguages).description, this.selectedProduct.value.price, this.selectedProduct.value.tax,
          this.selectedProduct.value.taxLevel, this.selectedProduct.value.termsAndConditions, this.selectedProduct.value.points, this.selectedProduct.value.downloadUrl,
          this.selectedProduct.value.productType, this.selectedProduct.value.productTypeDetailsJson, allFeatures), beneficiaryAddress, newBeneficiary,
        self.selectedProduct.value.productType === 'PHYSICAL' ? new OrderLineDeliveryMethod(undefined, undefined, undefined, undefined, undefined, this.$props.order.orderCustomer.relationId, this.selectedShippingMethods.value.id, this.selectedShippingMethods.value.name, this.selectedShippingMethods.value.detailsJson) : undefined, this.usePaymentSchedule ? [this.selectedProduct.value.paymentSchedules[this.selectedPaymentSchedule]] : undefined, undefined, {
        id: this.orderCopy.id, version: this.orderCopy.version}, this.selectedOrderLine.payWithVoucher)
      resolve(orderLine);
    });
  }

  public getBeneficiaryFullName(beneficiary: any) {
    let firstName = '';
    let middleName = '';
    let lastName = '';
    if (beneficiary.fullName) {
      return beneficiary.fullName
    } else if (beneficiary.relationProfile) {
      if (beneficiary.relationProfile.firstName) {
        firstName = beneficiary.relationProfile.firstName;
      }
      if (beneficiary.relationProfile.middleName) {
        middleName = beneficiary.relationProfile.middleName;
      }
      if (beneficiary.relationProfile.lastName) {
        lastName = beneficiary.relationProfile.lastName;
      }
    }
    return firstName + ' ' + middleName + ' ' + lastName
  }

  public getProductAttributes(item: any) {
    let self = this;
    let allItems: any = []
    $.each(item.orderProduct.orderProductAttributeValues, function (k, v) {
      allItems.push(`${v.attributeName} -> ${v.attributeValueName} (+${v.attributeValuePrice}${self.$store.state.currency})`);
    });
    return allItems.join();
  }

  public editOrderLine(orderLine: any, index: any) {
    this.selectedProduct = null
    let self = this;
    let attributeValue: any = [];
    this.isEditingOrderLine = true;
    this.indexToEdit = index;
    this.addProduct = true;
    this.addNewPromotion = false;
    this.selectedOrderLine = orderLine;
    this.productQuantity = parseInt(orderLine.quantity);
    this.productAdditionalInfo = orderLine.additionalInfo;
    if (orderLine.orderSubscription) {
      this.useProductSubscription = true
      Vue.nextTick(function () {
        self.selectedProductSubscription = orderLine.orderSubscription;
      });
    } else {
      this.useProductSubscription = false;
      self.selectedProductSubscription = undefined;
    }
    let prod = self.$store.state.lookups.products.findIndex((e:any) => e.value.id === orderLine.orderProduct.productId)
    if(prod > -1){
      let selectedProd = self.$store.state.lookups.products[prod]
      this.addProductSelect(selectedProd)
    }
    if(orderLine.orderLineDeliveryMethod) {
      let ind = this.$store.state.lookups.deliveryMethods.findIndex((e:any) => e.value.id === orderLine.orderLineDeliveryMethod.deliveryMethodId)
      if(ind > -1) {
        this.$set(this, 'selectedShippingMethods', this.$store.state.lookups.deliveryMethods[ind])
      }
    }
    if (orderLine.orderProduct.orderProductAttributeValues && orderLine.orderProduct.orderProductAttributeValues.length) {
      $.each(orderLine.orderProduct.orderProductAttributeValues, function (k, v) {
        $.each(self.allProductFeatures, function (i, j) {
          if (v.attributeId === j.attribute.id && j.value.id === v.attributeValueId) {
            attributeValue.push(j);
          }
        });
      });
      Vue.nextTick(function () {
        self.selectedProductFeature = attributeValue;
      });
    }

  }

  public removeOrderLine(index: any) {
    this.orderLineToRemove = index;
  }

  public deletePromotion(promotion: any, index: any) {
    this.orderLinePromotionToRemove = index;
  }

  public closeDialogRemoveOrderLine() {

  }

  public closeDialogRemovePromotion() {
    (<any>this.$refs.removePromotion).hide();
  }

  public removeOrderLineConfirmed() {
    if (this.orderLineToRemove !== null) {
      this.orderLineService.delete(this.orderCopy.orderLines[this.orderLineToRemove].id).then((resp:AxiosResponse)=>{
        if(resp){
          this.orderLines.splice(this.orderLineToRemove, 1);
          this.orderLineToRemove = null;
          this.$emit('updateCart');
          this.orderCopy.orderLines = this.orderLines;
          this.setAlert('orderLineRemoved', 'success')
        }
      })
    }
  }

  public removePromotionConfirmed() {
    if (this.orderLinePromotionToRemove !== null) {
      let id = this.orderCopy.orderDiscountLines[this.orderLinePromotionToRemove].id
      this.orderDiscountLineService.delete(id).then((resp:AxiosResponse) => {
        if(resp){
          this.orderLinePromotionToRemove = null;
          let ind = this.orderCopy.orderDiscountLines.findIndex((e:any)=> e.id === id)
          if(ind > -1){
            this.orderCopy.orderDiscountLines.splice(ind, 1)
          }
          this.$emit('updateCart', this.orderCopy);
          this.setAlert('orderDiscountLineRemoved', 'success')
        }
      })

    }
  }
  public searchRelation(rel: any) {
    if(rel.id) return
    if(rel.length < 3) return;
    const self = this
    if (this.timer) clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      self.doSearch(rel)
    }, 500);
  }
  public doSearch(rel: any) {
    if(!rel && rel.length > 2) return
    const queryArray: any = []
    queryArray.push({
        mainOperator: 'or',
        children: [{
          key: 'email',
          value: rel,
          inBetweenOperator: '==',
          afterOperator: 'or',
          exactSearch: false
        }]
      },
      {
        mainOperator: 'or',
        children: [{
          key: 'relationProfile.firstName',
          value: rel,
          inBetweenOperator: '==',
          afterOperator: 'or',
          exactSearch: false
        }]
      })
    let finalQ = this.queryBuilder(queryArray)
    this.populateRelations(finalQ)
  }
  public populateRelations(query:any){
      const self = this
      const pagination = {
        page: 0,
        size: 100,
        sort: 'id,asc'
      }
      this.relationService.getAll(pagination, query ? query : undefined).then((resp: AxiosResponse) => {
        if (resp && resp.data) {
          if(resp.data.content.length > 0) {
            Vue.nextTick(function () {
              self.beneficiaryList = resp.data.content
            })
          } else {
            Vue.nextTick(function () {
              self.beneficiaryList = self.cartorderRelations
            })
          }
        }
      })
  }

  public addCopyBeneficiary(beneficiary:any){
    this.selectedCopyBeneficiary = beneficiary;
  }
  public removeCopyBeneficiary(){
    this.selectedCopyBeneficiary = null;
  }
  public closeCopyModal(){
    //@ts-ignore
    $(this.$refs.copyBeneficiary).modal('hide');
  }
  public copyBeneficiary(item:any, idnex:any){
    this.orderLineToCopy = JSON.parse(JSON.stringify(item));
  }
  public copyBenef(){
    let fullName = ''
    let title = this.selectedCopyBeneficiary.relationProfile ? this.selectedCopyBeneficiary.relationProfile.title :
      this.selectedCopyBeneficiary.title ? this.selectedCopyBeneficiary.title : ''
    if(!this.selectedCopyBeneficiary.fullName){
      let firstName =  this.selectedCopyBeneficiary.relationProfile.firstName ? this.selectedCopyBeneficiary.relationProfile.firstName : '';
      let middleName =  this.selectedCopyBeneficiary.relationProfile.middleName ? this.selectedCopyBeneficiary.relationProfile.middleName : '';
      let lastName =  this.selectedCopyBeneficiary.relationProfile.lastName ? this.selectedCopyBeneficiary.relationProfile.lastName : '';
      fullName = firstName + ' ' + middleName + ' ' + lastName;
    } else{
      fullName = this.selectedCopyBeneficiary.fullName;
    }

    let orderLineBenef = new OrderLineBeneficiary(undefined, undefined, undefined, undefined, undefined, this.orderCopy.orderCustomer?.relationId, this.selectedCopyBeneficiary.id, this.selectedCopyBeneficiary.email, fullName, title)
    let dto = {...this.orderLineToCopy, id: undefined, administrationId: undefined, version: undefined, createdOn: undefined, updatedOn: undefined}
    dto.orderLineBeneficiary = orderLineBenef
    dto.beneficiaryDeliveryAddress = {...dto.beneficiaryDeliveryAddress,
      id: undefined, administrationId: undefined, version: undefined, createdOn: undefined, updatedOn: undefined}
    dto.orderProduct = {...dto.orderProduct,
      id: undefined, administrationId: undefined, version: undefined, createdOn: undefined, updatedOn: undefined}
    dto.cartOrder = {
      id: this.orderCopy.id,
      version: this.orderCopy.version,
    }
    this.orderLineService.post(dto).then((resp:AxiosResponse) => {
      if(resp && resp.data) {
        this.orderCopy.orderLines?.push(resp.data)
        this.selectedCopyBeneficiary = new Beneficiary();
        this.orderLineToCopy = new CartOrder();
        this.setAlert('newOrderLineCreated','success')
        this.$emit('updateCart', this.orderCopy)
        this.closeCopyModal();
      }
    })

  }

  public eventChanged(event:any){
    if (!event) return
    this.selectedEvent = event

  }
  public eventRemoved(event:any){
    this.selectedEvent = null
  }
}
