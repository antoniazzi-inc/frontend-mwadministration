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
