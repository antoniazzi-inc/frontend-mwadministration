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

import {Component, Vue, Watch} from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import CommonHelpers from '@/shared/commonHelpers'
import moment from "moment";
import InvoiceStrategy, {IInvoiceStrategy} from "@/shared/models/orderms/InvoiceStrategy";
import InvoiceStrategyService from "@/shared/services/orderms/InvoiceStrategyService";
import {AxiosResponse} from "axios";
@Component({
  props: {
    active: Boolean
  },
  components: {
  }
})
export default class InvoicingComponent extends mixins(CommonHelpers, Vue) {
    $refs!: {
    };
    public showAlert:any
    public finalDate:any
    public invoiceStrategy: IInvoiceStrategy
    public invoiceStrategyService: any
    constructor (props: any) {
      super(props)
      this.showAlert = false
      this.invoiceStrategy = new InvoiceStrategy()
      this.finalDate = moment('31-12-2020', 'DD-MM-YYYY')
      this.invoiceStrategyService = InvoiceStrategyService.getInstance()
    }
    @Watch('active', {immediate: true, deep: true})
    public updateActive(newVal:any){
      if(newVal){
        const pagination:any = {
          page: 0,
          size: 100000,
          sort: 'id,asc'
        }
        this.invoiceStrategyService.getAll(pagination).then((resp:AxiosResponse)=>{
          if(resp && resp.data){
            this.invoiceStrategy = resp.data.content[0]
          }
        })
      }
    }

    public mounted () {
      if(moment().isBefore(this.finalDate, 'month') && moment().isBefore(this.finalDate, 'day')) {
        this.showAlert = true
      } else {
        this.showAlert = false
      }
    }

    public saveInvoicing(){
      if(this.invoiceStrategy && this.invoiceStrategy.id) {
        this.invoiceStrategyService.put(this.invoiceStrategy).then((resp:AxiosResponse) => {
          if(resp && resp.data){
            this.setAlert('invoicingUpdated', 'success')
          }
        })
      } else {
        this.invoiceStrategyService.post(this.invoiceStrategy).then((resp:AxiosResponse) => {
          if(resp && resp.data){
            this.setAlert('invoicingUpdated', 'success')
          }
        })
      }
    }
    public cancel(){

    }
}
