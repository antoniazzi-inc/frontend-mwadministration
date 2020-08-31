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
    constructor(){
        super();
        this.orderCopy = new CartOrder();
        this.showHistory = false;
        this.selectedInvoice = null;
    }
    @Watch('order', {immediate: true, deep: true})
    public updateCartOrder(newVal:any){
      if(newVal) this.orderCopy = newVal
    }
    public showPaymentHistory(invoice:any) {
        this.showHistory = true;
        this.selectedInvoice = invoice;
    }
}
