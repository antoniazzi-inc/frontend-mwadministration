import Component from "vue-class-component";
import {Vue, Watch} from "vue-property-decorator";
import CartOrder, {ICartOrder} from "@/shared/models/orderms/CartOrderModel";

@Component({
    props:{
        order:{
            type: Object
        }
    }
})
export default class PaymentComponent extends Vue{
  public orderCopy: ICartOrder;
  public selectedInvoice: any;
  public showHistory: Boolean;
  public exampleInvoiceStatuses: any;
  constructor(){
      super();
      this.orderCopy = new CartOrder();
      this.showHistory = false;
      this.selectedInvoice = null;
      this.exampleInvoiceStatuses = [];
      this.exampleInvoiceStatuses.push( {'time': new Date(), 'method': 'incasso', 'status': 'paid', 'info': 'tx_76823464584'} );
  }
  @Watch('order', {immediate: true, deep: true})
  public updateCartOrder(newVal:any){
    if(newVal) this.orderCopy = newVal
  }
  public showPaymentHistory(invoice:any) {
      this.showHistory = true;
      this.selectedInvoice = invoice;
  }
  public getClassForStatus (type: any) {
    switch (type) {
      case 'paid':
        return 'fa fa-check'
      case 'open':
        return 'fa fa-open'
      case 'error':
        return 'fa fa-font'
    }
  }
  public execInvoiceAction(invoice:any, action: string) {
  }
}
