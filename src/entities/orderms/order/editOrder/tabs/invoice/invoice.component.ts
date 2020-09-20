import Component from "vue-class-component";
import FlatPickr from "vue-flatpickr-component";
import 'flatpickr/dist/flatpickr.css';
import SearchableSelectComponent from "@/components/searchableSelect/searchableSelect.vue";
import InvoiceTemplatesService from "@/shared/services/orderms/InvoiceTemplatesService";
import CommonHelpers from "@/shared/commonHelpers";
import CartOrder, {ICartOrder} from "@/shared/models/orderms/CartOrderModel";
import {IInvoiceTemplate} from "@/shared/models/orderms/InvoiceTemplateModel";
import {ISearchableSelectConfig, SearchableSelectConfig} from "@/shared/models/SearchableSelectConfig";
import {Watch} from "vue-property-decorator";
import {order} from "@/shared/tabelsDefinitions";

@Component({
  props: {
    order: {
      type: Object
    }
  },
  components: {
    'flat-pickr': FlatPickr,
    SearchableSelectComponent
  }
})
export default class InvoiceComponent extends (CommonHelpers) {
  public orderCopy: ICartOrder;
  public invoiceNumber: any;
  public invoiceTemplateService: any;
  public sendDate: any;
  public scheduledDate: any;
  public customerName: any;
  public configuration: any;
  public selectedInvoiceTemplate: any;
  public allCustomFields: any;
  public invoiceTemplates: IInvoiceTemplate[];
  public singleSelectConfig: ISearchableSelectConfig = new SearchableSelectConfig('name', 'labels.selectInvoiceTemplate', '', false, false, true, false, true, false, true)

  constructor() {
    super();
    this.orderCopy = new CartOrder();
    this.allCustomFields = []
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
  public updateOrder(newVal: any) {
    let self = this
    if (newVal && newVal.id) {
      this.orderCopy = newVal
      if (newVal.invoice) {
        this.selectedInvoiceTemplate = newVal.invoice.invoiceTemplate;
      }
      if (newVal.orderCustomer)
        this.customerName = newVal.orderCustomer.fullName;
      let detailsJSON = null
      if (newVal.invoice.additionalDetailsJson) {
        detailsJSON = JSON.parse(newVal.invoice.additionalDetailsJson)
        if (detailsJSON.customFields) {
          this.allCustomFields = detailsJSON.customFields
        }else {
          this.allCustomFields = this.getAllCustomFields(newVal.orderLines)
        }
      } else {
        this.allCustomFields = this.getAllCustomFields(newVal.orderLines)
      }
    }
  }
  public getAllCustomFields(orderLines:any){
    let allCustomFields:any = []
    orderLines.forEach((orderLine: any) => {
      if (orderLine.orderProduct && orderLine.orderProduct.registrationSettingsJson) {
        let settings = JSON.parse(orderLine.orderProduct.registrationSettingsJson)
        if (settings.freeFields && settings.freeFields.length) {
          allCustomFields = allCustomFields.concat(settings.freeFields)
        }
      }
    })
    return allCustomFields
  }
  public mounted() {
    this.retrieveAllInvoiceTemplates();
  }

  public save(e: any) {
  }

  public changeSendDate(e: any) {
  }

  public changeScheduledDate(e: any) {
  }
  public editCustomField(e: any) {
  }
  public deleteCustomField(e: any) {
  }

  public addInvoiceTemplate(e: any) {
    this.selectedInvoiceTemplate = e;
  }

  public removeInvoiceTemplate(e: any) {
    this.selectedInvoiceTemplate = null
  }

  public retrieveAllInvoiceTemplates(): void {
    this.invoiceTemplates = this.$store.state.lookups.invoiceTemplates
  }
}
