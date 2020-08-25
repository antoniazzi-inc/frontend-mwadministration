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
import moment from "moment";

@Component({
  components: {
    SearchableSelectComponent,
    step1: Step1Component,
    step2: Step2Component,
    step3: Step3Component,
    step4: Step4Component,
  }
})
export default class NewOrderComponent extends mixins(CommonHelpers, Vue) {
  $refs!: {
    step1: Step1Component,
    step2: Step2Component,
    step3: Step3Component,
    step4: Step4Component
  }
  public cartOrder: ICartOrder|any
  public cartOrderService: any
  public relationService: any
  public beneficiaries: any[]
  public stepValidationError: any
  public step: number

  constructor() {
    super()
    this.step = 0
    this.stepValidationError = ''
    this.cartOrder = new CartOrder()
    this.beneficiaries = []
    this.cartOrderService = CartOrdersService.getInstance()
    this.relationService = RelationService.getInstance()
  }

  public mounted() {

  }

  public validateStep(step: number) {
    let self = this
    return new Promise(resolve => {
      // @ts-ignore
      self.$refs[`step${self.step+1}`].validateStep().then((validation: any) => {
          // @ts-ignore
        self.beneficiaries = self.$refs.step1.beneficiaryList
        if (validation.msg) {
          self.stepValidationError = validation.msg
        } else {
          self.stepValidationError = ''
        }
        if(self.step === 0) {
          let step1:any = this.$refs.step1
          this.cartOrder.currency = this.$store.state.currency
          this.cartOrder.languageCode = this.$store.state.currentLanguage
          this.cartOrder.orderCustomer = {
            relationId: step1.selectedRelation.id,
            email: step1.selectedRelation.email,
            fullName: `${step1.selectedRelation.relationProfile.firstName ? step1.selectedRelation.relationProfile.firstName : ''}
            ${step1.selectedRelation.relationProfile.middleName ? step1.selectedRelation.relationProfile.middleName : ''}
            ${step1.selectedRelation.relationProfile.lastName ? step1.selectedRelation.relationProfile.lastName : ''}`,
            title: step1.selectedRelation.relationProfile.title
          }
          this.cartOrder.customerBillingAddress = step1.cartOrderCopy.customerBillingAddress
          this.cartOrder.customerDeliveryAddress = step1.cartOrderCopy.customerDeliveryAddress
          // @ts-ignore
         /* if(!self.$refs.step1.selectedRelation.id) {
            // @ts-ignore
            let addr = self.$refs.step1.cartOrderCopy.customerBillingAddress
            addr.usedForBilling = true
            addr.usedForDelivery = false
            addr.primary = true
            let dto = {
              // @ts-ignore
              ...self.$refs.step1.selectedRelation,
              // @ts-ignore
              relationAddresses: [addr],
              username: 'default_' + Math.random(),
              password: Math.random(),
              tfaEnabled: false,
            }
            this.relationService.post(dto).then((resp:AxiosResponse) => {
              if(resp && resp.data){
                this.cartOrder.orderCustomer = {
                  relationId: resp.data.id,
                  email: resp.data.email,
                  fullName: `${resp.data.relationProfile.firstName} ${resp.data.relationProfile.middleName} ${resp.data.relationProfile.lastNmae}`,
                  title: resp.data.relationProfile.title,
                }
                this.cartOrder.customerBillingAddress = resp.data.relationAddresses[0]
                // @ts-ignore
                this.$refs.step1.selectedRelation = resp.data
              }
            })
          }*/
        } else if(this.step === 3) {
          let step4:any = self.$refs.step4
          this.cartOrder.invoice = new Invoice(undefined, undefined, undefined, undefined, undefined, this.cartOrder.orderCustomer?.relationId,
            invoiceType.ORDER, this.cartOrder.orderCustomer.fullName, this.cartOrder.orderCustomer.email, undefined, undefined, undefined,
            undefined, undefined, undefined, undefined, undefined, undefined, undefined, JSON.stringify(step4.invoiceAdditionalDetails),
            undefined, undefined, undefined, undefined, undefined, step4.selectedInvoiceTemplate ? step4.selectedInvoiceTemplate.value : undefined, undefined)
          //this.cartOrder.invoice.scheduledOn = moment(step4.invoiceScheduledOn).format('YYYY-MM-DDTHH:mm:ss') + 'Z'
        }
        resolve(validation.status)
      })
    })
  }

  public onComplete() {
    this.cartOrderService.post(this.cartOrder).then((resp:AxiosResponse) => {
      if(resp) {
        this.$router.push('/orders')
      }
    })
  }

  public changeTab(e: any, z:any) {
    this.step = z
  }

  public updateStep(obj: any) {
    this.cartOrder[obj.field] = obj.payload
  }
}
