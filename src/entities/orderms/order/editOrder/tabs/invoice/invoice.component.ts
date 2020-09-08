import Component from "vue-class-component";
import FlatPickr from "vue-flatpickr-component";
import 'flatpickr/dist/flatpickr.css';
import SearchableSelectComponent from "@/components/searchableSelect/searchableSelect.vue";
import InvoiceTemplatesService from "@/shared/services/orderms/InvoiceTemplatesService";
import CommonHelpers from "@/shared/commonHelpers";
import CartOrder, {ICartOrder} from "@/shared/models/orderms/CartOrderModel";
import {IInvoiceTemplate} from "@/shared/models/orderms/InvoiceTemplateModel";
import {ISearchableSelectConfig, SearchableSelectConfig} from "@/shared/models/SearchableSelectConfig";
import {Vue, Watch} from "vue-property-decorator";
@Component({
    props:{
        order:{
            type: Object
        }
    },
    components:{
        'flat-pickr': FlatPickr,
        SearchableSelectComponent
    }
})
export default class InvoiceComponent extends (CommonHelpers){
    public orderCopy: ICartOrder;
    public invoiceNumber: any;
    public invoiceTemplateService: any;
    public sendDate: any;
    public scheduledDate: any;
    public customerName: any;
    public configuration: any;
    public selectedInvoiceTemplate: any;
    public invoiceTemplates: IInvoiceTemplate[];
    public singleSelectConfig:ISearchableSelectConfig = new SearchableSelectConfig('name', 'labels.selectInvoiceTemplate', '', false, false, true, false, true, false )
    constructor(){
        super();
        this.orderCopy = new CartOrder();
        this.invoiceNumber = '';
        this.customerName = '';
        this.sendDate = null;
        this.invoiceTemplateService = InvoiceTemplatesService.getInstance();
        this.scheduledDate = null;
        this.selectedInvoiceTemplate = null;
        this.invoiceTemplates = [];
        this.configuration = {
            allowInput: true,
            altInput: true,
            enableTime: true,
            dateFormat: 'Y-m-d H:i'
        };
    }
    @Watch('order', {immediate: true, deep: true})
    public updateOrder(newVal:any){
      let self = this
      if(newVal){
        this.orderCopy = newVal
        if(newVal.invoice){
        this.sendDate = newVal.invoice.sentOn;
        this.scheduledDate = newVal.invoice.scheduledOn;
        this.invoiceNumber = newVal.invoice.invoiceNumber;
        this.selectedInvoiceTemplate = newVal.invoice.invoiceTemplate;
        }
        if(newVal.orderCustomer)
        this.customerName = newVal.orderCustomer.fullName;
      }
    }
  public mounted(){
    this.retrieveAllInvoiceTemplates();
  }
    public save(e:any){}
    public changeSendDate(e:any){}
    public changeScheduledDate(e:any){}
    public addInvoiceTemplate(e:any){
        this.selectedInvoiceTemplate = e;
    }
    public removeInvoiceTemplate(e:any){
        this.selectedInvoiceTemplate = null
    }

    public retrieveAllInvoiceTemplates(): void {
      this.invoiceTemplates = this.$store.state.lookups.invoiceTemplates
    }
}
