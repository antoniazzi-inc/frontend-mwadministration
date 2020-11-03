import Component, {mixins} from "vue-class-component";
import {Inject, Vue, Watch} from "vue-property-decorator";
import FlatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css';
import MultiLangHtmlEditorComponent from "@/components/multiLanguageHtmlEditor/MultiLanguageHtmlEditor.vue";
import CommonHelpers from "@/shared/commonHelpers";
import companyService from "@/shared/services/companyService";
import relationService from "@/shared/services/relationService";
import CartOrdersService from "@/shared/services/orderms/CartOrdersService";
import CartOrder from "@/shared/models/orderms/CartOrderModel";
import CustomerBillingAddress from "@/shared/models/orderms/CustomerBillingAddressModel";
import CustomerDeliveryAddress from "@/shared/models/orderms/CustomerDeliveryAddressModel";
import OrderCustomer from "@/shared/models/orderms/OrderCustomerModel";
import {AxiosResponse} from "axios";
import {ISearchableSelectConfig, SearchableSelectConfig} from "@/shared/models/SearchableSelectConfig";
import SearchableSelectComponent from "@/components/searchableSelect/searchableSelect.vue";
import OrderCustomersService from "@/shared/services/orderms/OrderCustomersService";
import CustomerBillingAddressesService from "@/shared/services/orderms/CustomerBillingAddressesService";

@Component({
  props: {
    order: {
      type: Object
    }
  },
  components: {
    'flat-pickr': FlatPickr,
    SearchableSelectComponent,
    MultiLangHtmlEditorComponent,
  }
})
export default class CustomerComponent extends mixins(CommonHelpers, Vue) {
  public invoiceLanguage: any;
  public orderCopy: any;
  public orderCopyBackup: any;
  public selectedLang: any;
  public startDateConfig: any;
  public startDate: any;
  public vatNumber: any;
  public vatSettings: any;
  public affiliateCode: any;
  public singleSelectConfigCountry: ISearchableSelectConfig;
  public selectedCountry: any;
  public invoiceEmailContent: any;
  public invoiceEmailSubject: any;
  public allCompanies: any;
  public cartOrderService: any;
  public relationService: any;
  public companyService: any;
  public selectedCompany: any;
  public orderCustomerService: any;
  public taxRulesJson: any;
  public customerBillingAddressService: any;

  constructor() {
    super();
    this.invoiceLanguage = null;
    this.selectedLang = null;
    this.orderCopyBackup = null;
    this.companyService = companyService.getInstance();
    this.relationService = relationService.getInstance();
    this.cartOrderService = CartOrdersService.getInstance();
    this.orderCustomerService = OrderCustomersService.getInstance();
    this.customerBillingAddressService = CustomerBillingAddressesService.getInstance()
    this.vatSettings = null;
    this.selectedCountry = null;
    this.selectedCompany = '';
    this.affiliateCode = '';
    this.taxRulesJson = ''
    this.vatNumber = '';
    this.startDate = '';
    this.invoiceEmailContent = '';
    this.invoiceEmailSubject = '';
    this.allCompanies = [];
    this.startDateConfig = {
      allowInput: false,
      altInput: true,
      dateFormat: 'Y-m-d',
      minDate: 'today'
    };
    this.orderCopy = new CartOrder(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined,
      this.$store.state.currentLanguage, undefined, undefined, undefined, undefined, undefined, new CustomerBillingAddress(), new CustomerDeliveryAddress(), undefined, new OrderCustomer(), [], []);
    this.singleSelectConfigCountry = new SearchableSelectConfig('enName',
      'labels.country', '', true,
      false, true, false, false)

  }

  @Watch('orderCopy', {immediate: true, deep: true})
  public updateOrderCopy(newVal: any) {
    if(newVal && this.orderCopyBackup === null && newVal.id) {
      let copy = JSON.parse(JSON.stringify(newVal))
      this.orderCopyBackup = Object.assign({}, copy)
    }
  }
  @Watch('order', {immediate: true, deep: true})
  public updateCart(newVal: any) {
    if (newVal && newVal.id) {
      this.orderCopy = newVal
      if(this.orderCopy.orderCustomer.taxRulesJson){
        this.taxRulesJson = JSON.parse(this.orderCopy.orderCustomer.taxRulesJson).val
      }
      if (newVal.invoice && newVal.invoice.invoiceTemplate) {
        const invoiceTemplateData = newVal.invoice.invoiceTemplate.templateDataJson;
        let detailsJson = null
        if(JSON.parse(newVal.invoice.additionalDetailsJson)){
          detailsJson = JSON.parse(newVal.invoice.additionalDetailsJson)
        }
        this.invoiceEmailContent = detailsJson.emailContent;
        this.invoiceEmailSubject = detailsJson.emailSubject;
      }
      if (newVal.orderCustomer && newVal.orderCustomer.id){
        this.retrrieveCompanies(newVal.orderCustomer.relationId);
      if (newVal.customerBillingAddress && newVal.customerBillingAddress.id) {
        let self = this
        Vue.nextTick(function () {
          self.selectedCountry = self.getCountryById(newVal.customerBillingAddress.countryId)
        })
      }
      }
    }
  }

  public mounted() {

  }

  public retrrieveCompanies(id: any) {
    this.allCompanies = [];
    /*this.companyService.getAll({
      page: 0,
      size: 10000,
      sort: 'id,asc'
    }, `relations.id=in=${id}`).then((resp: AxiosResponse) => {
      if (resp && resp.data) {
        this.allCompanies = resp.data.content;
      }
    });*/
  }

  public changeLanguage(e: any) {
    this.selectedLang = e.currentTarget.value;
  }

  public changeVat(e: any) {
    this.vatSettings = e.currentTarget.value;
  }

  public countryChanged(country: any) {
    this.selectedCountry = country;

  }

  public countryRemoved(country: any) {
    this.selectedCountry = null;
  }

  public save() {
    this.saveCustomer();
  }

  public saveCustomer() {
    let customerDto = this.orderCopy.orderCustomer;
    customerDto.taxRulesJson = JSON.stringify({val: this.taxRulesJson})
    this.orderCustomerService.put(customerDto).then((resp1: AxiosResponse) => {
      this.saveCartOrder();
    }).catch((err: any) => {
      this.setAlert('error', 'error')
    });
  }

  public saveCartOrder() {
    let cartOrderDto = new CartOrder();
    cartOrderDto.orderCustomer = undefined
    cartOrderDto.languageCode = this.selectedLang;
    cartOrderDto.id = this.orderCopy.id;
    cartOrderDto.discountAmount = this.orderCopy.discountAmount;
    cartOrderDto.currency = this.orderCopy.currency;
    cartOrderDto.version = this.orderCopy.version;
    cartOrderDto.administrationId = this.orderCopy.administrationId;
    cartOrderDto.finishedOn = this.orderCopy.finishedOn;
    cartOrderDto.euroConversionRate = this.orderCopy.euroConversionRate;
    cartOrderDto.relationId = this.orderCopy.relationId;
    cartOrderDto.nettoAmount = this.orderCopy.nettoAmount;
    cartOrderDto.paymentMethodCostAmount = this.orderCopy.paymentMethodCostAmount;
    cartOrderDto.relationRequirementJson = this.orderCopy.relationRequirementJson;
    cartOrderDto.shippingCostAmount = this.orderCopy.shippingCostAmount;
    cartOrderDto.taxAmount = this.orderCopy.taxAmount;
    cartOrderDto.totalAmount = this.orderCopy.totalAmount;
    cartOrderDto.invoice = this.orderCopy.invoice
    this.cartOrderService.put(cartOrderDto).then((resp2: AxiosResponse) => {
      this.$emit('update', resp2.data)
      this.saveCustomerBillingAddress();
    }).catch((err: any) => {
      this.setAlert(err, 'error')
    });
  }

  public saveCustomerBillingAddress() {
    let billingAddressDto = new CustomerBillingAddress();
    billingAddressDto = this.orderCopy.customerBillingAddress;
    this.customerBillingAddressService.put(billingAddressDto).then((resp3: AxiosResponse) => {
      this.orderCopy.customerBillingAddress = resp3.data;
      this.setAlert('customerUpdated', 'success')
    }).catch((err: any) => {
      this.setAlert(err, 'error')
    });
  }

  public sendMail() {
    let detailsJSON = null
    if(this.orderCopy.invoice.additionalDetailsJson){
      detailsJSON = JSON.parse(this.orderCopy.invoice.additionalDetailsJson)
      detailsJSON.emailContent = this.invoiceEmailContent
      detailsJSON.emailSubject = this.invoiceEmailSubject
    }else {
      detailsJSON = {
        emailContent: this.invoiceEmailContent,
        emailSubject: this.invoiceEmailSubject
      }
    }
    if(detailsJSON === null) return
    this.orderCopy.invoice.additionalDetailsJson = JSON.stringify(detailsJSON)
    this.saveCartOrder()
  }

  public closeDialog() {

  }
  public cancel() {
    if(this.orderCopyBackup === null) return
    Object.assign(this.orderCopy, this.orderCopyBackup);
    this.orderCopyBackup = null
  }

  public updateInvoiceEmailContent(content: any) {
    this.invoiceEmailContent = content;
  }

}
