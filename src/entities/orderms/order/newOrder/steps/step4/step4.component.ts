import {Component, Vue, Watch} from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import CommonHelpers from '@/shared/commonHelpers'
import {ISearchableSelectConfig, SearchableSelectConfig} from "@/shared/models/SearchableSelectConfig";
import CartOrder from "@/shared/models/orderms/CartOrderModel";
import SearchableSelectComponent from "@/components/searchableSelect/searchableSelect.vue";
import moment from "moment";
import flatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'
import ToggleSwitch from "@/components/toggleSwitch/toggleSwitch.vue";
import MultiLanguageHtmlEditorComponent from "@/components/multiLanguageHtmlEditor/MultiLanguageHtmlEditor.vue";
import InvoicePreviewComponent from "@/entities/orderms/order/newOrder/invoicePreview/invoicePreview.vue";
@Component({
  components: {
    SearchableSelectComponent,
    flatPickr,
    ToggleSwitch,
    MultiLanguageHtmlEditorComponent,
    InvoicePreviewComponent
  },
  props: {
    cartOrder: Object
  }
})
export default class Step4Component extends mixins(CommonHelpers, Vue) {
  public singleSelectConfigInvoiceTemplate: ISearchableSelectConfig
  public selectedInvoiceTemplate: any
  public invoiceAdditionalDetails: any
  public cartOrderCopy: any
  public dateConfig: any
  public invoiceDate: any
  public invoiceScheduledOn: any
  public invoiceLanguage: any
  public invoiceDeliveryDate: any
  public invoicePreviewData: any
  public invoiceEmailContent: any
  public invoiceEmailSubject: any


  constructor () {
    super()
    this.dateConfig = {
      wrap: false,
      altInput: false,
      dateFormat: 'm-d-Y'
    }
    this.invoiceDate = null
    this.invoiceDeliveryDate = moment().format('MM-DD-YYYY')
    this.invoiceScheduledOn = moment().format('MM-DD-YYYY')
    this.singleSelectConfigInvoiceTemplate = new SearchableSelectConfig('name',
      'labels.chooseInvoiceTemplate', '', false,
      false, true, false, false, false, true)
    this.selectedInvoiceTemplate = null
    this.invoiceAdditionalDetails = ''
    this.invoiceLanguage = ''
    this.invoiceEmailSubject = ''
    this.invoiceEmailContent = ''
    this.cartOrderCopy = new CartOrder()
    this.invoicePreviewData = {
      invoiceSendDate: moment().format('MM-DD-YYYY')
    }
  }
  @Watch('cartOrder', {immediate: true, deep: true})
  public cartOrderUpdate (newVal:any) {
    if(!newVal) return false
    this.cartOrderCopy = newVal
  }
  public mounted () {
    this.invoiceDate = moment().format('MM-DD-YYYY')
    this.invoiceLanguage = this.$store.state.currentLanguage
  }
  public changeInvoiceTemplate (template:any) {
    if(template && template.templateDataJson) {
      this.invoiceEmailContent = JSON.parse(template.templateDataJson).invoiceEmailContent
    }
    this.selectedInvoiceTemplate = template
  }
  public removeInvoiceTemplate () {
    this.selectedInvoiceTemplate = null
    this.invoiceEmailContent = ''
  }
  public changeLangauge (event:any) {
    let lang = event.target.value;
    this.invoiceLanguage = lang;
  }
  public updateInvoiceEmailContent(content:any){
    this.invoiceEmailContent = content;
  }
  public validateStep(){
    return new Promise(resolve => {
      resolve({status: true, msg: ''})
    })
  }
}
