import {Component, Vue} from 'vue-property-decorator'
import {mixins} from 'vue-class-component'
import CommonHelpers from '@/shared/commonHelpers'
import SearchableSelectComponent from '@/components/searchableSelect/searchableSelect.vue'
import Step1Component from "@/entities/orderms/order/newOrder/steps/step1/step1.vue";
import Step2Component from "@/entities/orderms/order/newOrder/steps/step2/step2.vue";
import Step3Component from "@/entities/orderms/order/newOrder/steps/step3/step3.vue";
import Step4Component from "@/entities/orderms/order/newOrder/steps/step4/step4.vue";
import CartOrder, {ICartOrder} from "@/shared/models/orderms/CartOrderModel";
import CartOrdersService from "@/shared/services/orderms/CartOrdersService";
import RelationService from "@/shared/services/relationService";
import Invoice, {invoiceType} from "@/shared/models/orderms/InvoiceModel";
import Axios, {AxiosResponse} from "axios";
import CustomerBillingAddress from "@/shared/models/orderms/CustomerBillingAddressModel";
import CustomerDeliveryAddress from "@/shared/models/orderms/CustomerDeliveryAddressModel";
import {IRelationAddress, RelationAddress} from "@/shared/models/relationms/relation-address.model";
import RelationAddressService from "@/shared/services/relationAddressService";
import moment from "moment";
import {DATE_FORMAT, INSTANT_FORMAT} from "@/shared/filters";

@Component({
  components: {
    SearchableSelectComponent,
    step1: Step1Component,
    step2: Step2Component,
    step3: Step3Component,
    step4: Step4Component,
  },
  beforeRouteEnter (to, from, next) {
    next((vm: any) => {
      if (to.query.relId) {
        vm.populateRelation(to.query.relId)
      }
    })
  }
})
export default class NewOrderComponent extends mixins(CommonHelpers, Vue) {
  $refs!: {
    step1: Step1Component,
    step2: Step2Component,
    step3: Step3Component,
    step4: Step4Component
  }
  public cartOrder: ICartOrder | any
  public cartOrderService: any
  public relationService: any
  public beneficiaries: any[]
  public stepValidationError: any
  public relationAddressService: any
  public customerRelation: any
  public step: number

  constructor() {
    super()
    this.step = 0
    this.stepValidationError = ''
    this.cartOrder = new CartOrder()
    this.beneficiaries = []
    this.customerRelation = null
    this.cartOrderService = CartOrdersService.getInstance()
    this.relationService = RelationService.getInstance()
    this.relationAddressService = RelationAddressService.getInstance()
  }

  public mounted() {

  }
  public populateRelation(relId: any) {
    this.relationService.get(relId).then((resp:AxiosResponse)=>{
      if(resp && resp.data){
        let step1: any = this.$refs.step1
        // @ts-ignore
        step1.selectedRelation = resp.data
        let billAddrInd = resp.data.relationAddresses.findIndex((addr:any)=> addr.usedForBilling === true)
        // @ts-ignore
        billAddrInd > -1 ? step1.cartOrder.customerBillingAddress = resp.data.relationAddresses[billAddrInd] :
          resp.data.relationAddresses && resp.data.relationAddresses.length ? step1.cartOrder.customerBillingAddress = resp.data.relationAddresses[0] : step1.cartOrder.customerBillingAddress = new RelationAddress()
        let deliveryAddrInd = resp.data.relationAddresses.findIndex((addr:any)=> addr.usedForDelivery === true)
        // @ts-ignore
        deliveryAddrInd > -1 ? step1.cartOrder.customerDeliveryAddress = resp.data.relationAddresses[deliveryAddrInd] :
          resp.data.relationAddresses && resp.data.relationAddresses.length ? step1.cartOrder.customerDeliveryAddress = resp.data.relationAddresses[0] : step1.cartOrder.customerDeliveryAddress = new RelationAddress()
      }
    })
  }
  public validateStep(step: number) {
    let self = this
    return new Promise(resolve => {
      // @ts-ignore
      self.$refs[`step${self.step + 1}`].validateStep().then((validation: any) => {
        // @ts-ignore
        self.beneficiaries = self.$refs.step1.beneficiaryList
        // @ts-ignore
        self.customerRelation = self.$refs.step1.selectedRelation
        let benefIndex = self.beneficiaries.findIndex((e:any)=> e.id === self.customerRelation.id)
        if(benefIndex === -1)
          self.beneficiaries.push(self.customerRelation)
        if (validation.msg) {
          self.stepValidationError = validation.msg
        } else {
          self.stepValidationError = ''
        }
        if (self.step === 0) {
          let step1: any = this.$refs.step1
          this.cartOrder.currency = this.$store.state.currencyName
          this.cartOrder.languageCode = this.$store.state.currentLanguage

          this.cartOrder.orderCustomer = {
            relationId: step1.selectedRelation.id,
            email: step1.selectedRelation.email,
            fullName: `${step1.selectedRelation.relationProfile.firstName ? step1.selectedRelation.relationProfile.firstName : ''} ${step1.selectedRelation.relationProfile.middleName ? step1.selectedRelation.relationProfile.middleName : ''} ${step1.selectedRelation.relationProfile.lastName ? step1.selectedRelation.relationProfile.lastName : ''}`,
            title: step1.selectedRelation.relationProfile.title,
            isCompany: step1.isCompany,
            companyName: step1.companyName,
            vatNumber: step1.cartOrderCopy.orderCustomer.vatNumber,
            taxRulesJson: step1.cartOrderCopy.orderCustomer.taxRulesJson
          }
          this.cartOrder.customerBillingAddress = step1.cartOrderCopy.customerBillingAddress
          this.cartOrder.customerDeliveryAddress = step1.cartOrderCopy.customerDeliveryAddress
        } else if (this.step === 3) {
          let step4: any = self.$refs.step4
          this.cartOrder.invoice = new Invoice(undefined, undefined, undefined, undefined, undefined, this.cartOrder.orderCustomer?.relationId,
            invoiceType.ORDER, this.cartOrder.orderCustomer.fullName, this.cartOrder.orderCustomer.email, undefined, undefined, undefined,
            undefined, undefined, undefined, undefined, undefined, undefined, undefined, JSON.stringify(step4.invoiceAdditionalDetails),
            undefined, undefined, undefined, undefined, undefined, undefined, undefined)
          this.cartOrder.invoice.scheduledOn = moment(step4.invoiceScheduledOn, DATE_FORMAT).format(INSTANT_FORMAT)
          if(step4.selectedInvoiceTemplate && step4.selectedInvoiceTemplate.id)
          this.cartOrder.invoice.invoiceTemplate = {
            id: step4.selectedInvoiceTemplate.id,
            version: step4.selectedInvoiceTemplate.version
          }
          let additionalDetalis = {
            emailSubject: step4.invoiceEmailSubject,
            emailContent: step4.invoiceEmailContent,
            deliveryDate: step4.invoiceDeliveryDate,
            details: step4.invoiceAdditionalDetails.split('\n')
          }
          this.cartOrder.invoice.additionalDetailsJson = JSON.stringify(additionalDetalis)
        }
        resolve(validation.status)
      })
    })
  }

  public onComplete() {
    let step1: any = this.$refs.step1
    if (!step1.selectedRelation.id) {
      let tempAddr = {...step1.cartOrderCopy.customerBillingAddress}
      let addr = step1.selectedRelation.relationAddresses ? step1.selectedRelation.relationAddresses[0] : tempAddr
      addr.usedForBilling = true
      addr.usedForDelivery = false
      addr.primary = true
      let dto = {
        ...step1.selectedRelation,
        relationAddresses: [addr],
        username: 'default_' + Math.random(),
        password: Math.random(),
        tfaEnabled: false,
      }
      if (!step1.isDeliveryBilling) {
        dto.relationAddresses.push(step1.customerDeliveryAddress)
      }
      this.relationService.post(dto).then((resp: AxiosResponse) => {
        if (resp && resp.data) {
          this.cartOrder.orderCustomer = {
            relationId: resp.data.id,
            email: resp.data.email,
            fullName: resp.data.relationProfile.firstName + ' ' + resp.data.relationProfile.middleName + ' ' + resp.data.relationProfile.lastName,
            title: resp.data.relationProfile.title,
            isCompany: step1.isCompany,
            companyName: step1.companyName,
            vatNumber: step1.cartOrderCopy.orderCustomer.vatNumber,
            taxRulesJson: step1.cartOrderCopy.orderCustomer.taxRulesJson
          }
          let billAddrIndex = resp.data.relationAddresses.findIndex((e: any) => e.usedForBilling === true)
          let billAddr = null
          let DeliveryAddrIndex = resp.data.relationAddresses.findIndex((e: any) => e.usedForDelivery === true)
          let deliveryAddr = null
          if (billAddrIndex > -1) {
            billAddr = resp.data.relationAddresses[billAddrIndex]
          } else {
            billAddr = resp.data.relationAddresses[0]
          }
          if (DeliveryAddrIndex > -1) {
            deliveryAddr = resp.data.relationAddresses[DeliveryAddrIndex]
          } else {
            deliveryAddr = resp.data.relationAddresses[0]
          }
          this.cartOrder.customerBillingAddress = new CustomerBillingAddress(undefined, undefined, undefined, undefined,
            undefined, this.cartOrder.orderCustomer?.relationId, billAddr.id, billAddr.street, billAddr.houseNumber, billAddr.city,
            billAddr.countryId, billAddr.entranceNumber, billAddr.appartmentNumber, billAddr.postalCode, billAddr.addressType, undefined, undefined, undefined)
          this.cartOrder.customerDeliveryAddress = new CustomerDeliveryAddress(undefined, undefined, undefined, undefined,
            undefined, this.cartOrder.orderCustomer?.relationId, deliveryAddr.id, deliveryAddr.street, deliveryAddr.houseNumber, deliveryAddr.city,
            billAddr.countryId, deliveryAddr.entranceNumber, deliveryAddr.appartmentNumber, deliveryAddr.postalCode, deliveryAddr.addressType, undefined, undefined, undefined)
          step1.selectedRelation = resp.data
        }
        this.createCart()
      })
    } else if (step1.isCompany) {
      this.cartOrder.orderCustomer.isCompany = step1.isCompany
      this.cartOrder.orderCustomer.companyName = step1.companyName
      this.cartOrder.orderCustomer.relationId = step1.selectedRelation.id
      this.cartOrder.orderCustomer.vatNumber = step1.cartOrderCopy.orderCustomer.vatNumber
      this.cartOrder.orderCustomer.taxRulesJson = JSON.stringify({val: step1.cartOrderCopy.orderCustomer.taxRulesJson})
      this.createCart()
    } else if (!this.cartOrder.customerBillingAddress.relationAddressId) {
      let step1: any = this.$refs.step1
      let dto: IRelationAddress = {
        ...this.cartOrder.customerBillingAddress,
        primary: true,
        usedForBilling: true,
        usedForDelivery: true,
        relation: {
          id: step1.selectedRelation.id,
          version: step1.selectedRelation.version
        }
      }
      this.relationAddressService.post(dto).then((resp: AxiosResponse) => {
        if (resp && resp.data) {
          this.cartOrder.customerBillingAddress.relationAddressId = resp.data.id
          if (step1.isDeliveryBilling) {
            this.cartOrder.customerDeliveryAddress.relationAddressId = resp.data.id
          } else {
            if (!this.cartOrder.customerDeliveryAddress.relationAddressId) {
              let dto: IRelationAddress = {
                ...this.cartOrder.customerBillingAddress
              }
              this.relationAddressService.post(dto).then((resp: AxiosResponse) => {
                if (resp && resp.data) {
                  this.cartOrder.customerDeliveryAddress.relationAddressId = resp.data.id
                }
              })
            }
          }
        }
        this.createCart()
      })
    } else {
      if (step1.isDeliveryBilling) {
        this.cartOrder.customerDeliveryAddress.relationAddressId = this.cartOrder.customerBillingAddress.relationAddressId
      }
      this.createCart()
    }
  }

  public createCart() {
    this.cartOrder.relationId = this.cartOrder.orderCustomer.relationId
    this.cartOrderService.createCart(this.cartOrder).then((resp: AxiosResponse) => {
      if (resp) {
        this.setAlert('orderCreated', 'success')
        this.$router.push('/orders')
      } else {
        this.setAlert('orderCreateError', 'error')
      }
    })
  }

  public changeTab(e: any, z: any) {
    this.step = z
  }

  public updateStep(obj: any) {
    this.cartOrder[obj.field] = obj.payload
  }
}
