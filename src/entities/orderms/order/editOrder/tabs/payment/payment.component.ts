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
