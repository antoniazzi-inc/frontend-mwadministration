import { Component, Vue } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import CommonHelpers from '@/shared/commonHelpers'
import CartOrder, {ICartOrder} from "@/shared/models/orderms/CartOrderModel";
import CustomerComponent from "@/entities/orderms/order/editOrder/tabs/customer/customer.vue";
import CartOrdersService from "@/shared/services/orderms/CartOrdersService";
import {AxiosResponse} from "axios";
import BeneficiariesComponent from "@/entities/orderms/order/editOrder/tabs/beneficiaries/beneficiaries.vue";
import OrderComponent from "@/entities/orderms/order/editOrder/tabs/order/order.vue";
import InvoiceComponent from "@/entities/orderms/order/editOrder/tabs/invoice/invoice.vue";
import PaymentComponent from "@/entities/orderms/order/editOrder/tabs/payment/payment.vue";
import AffiliateComponent from "@/entities/orderms/order/editOrder/tabs/affiliate/affiliate.vue";
import DeliveryComponent from "@/entities/orderms/order/editOrder/tabs/delivery/delivery.vue";
import HistoryComponent from "@/entities/orderms/order/editOrder/tabs/history/history.vue";
import OrderPreviewComponent from "@/entities/orderms/order/editOrder/tabs/orderPreview/orderPreview.vue";

@Component({
  components: {
    CustomerComponent,
    BeneficiariesComponent,
    OrderComponent,
    InvoiceComponent,
    PaymentComponent,
    AffiliateComponent,
    DeliveryComponent,
    HistoryComponent,
    OrderPreviewComponent
  },
  beforeRouteEnter (to, from, next) {
    next((vm: any) => {
      if (to.params.id) {
        vm.retrieveItem(to.params.id)
      }
    })
  }
})
export default class EditOrderComponent extends mixins(CommonHelpers, Vue) {
  public currentTab:string
  public currentTabLeft:string
  public cartOrder:ICartOrder
  public cartOrderService:any
  public id:any

  constructor () {
    super()
    this.currentTab = 'customers'
    this.currentTabLeft = 'summary'
    this.id = null
    this.cartOrder = new CartOrder()
    this.cartOrderService = CartOrdersService.getInstance()
  }

  public mounted () {

  }


  public updateCart (newCart:any) {
      if(newCart){
        this.cartOrder = newCart
      } else {
        this.retrieveItem(this.id)
      }
  }

  public retrieveItem (id:any) {
    this.id = id
    this.cartOrderService.get(id).then((resp:AxiosResponse) => {
      if(resp && resp.data){
        this.cartOrder = resp.data
      } else {
        this.setAlert('errorInFetch', 'error')
      }
    })
  }
}
