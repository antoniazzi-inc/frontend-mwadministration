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
  public selectedLang: any;
  public startDateConfig: any;
  public startDate: any;
  public vatNumber: any;
  public vatSettings: any;
  public affiliateCode: any;
  public multiSelectConfigCountry: ISearchableSelectConfig;
  public selectedCountry: any;
  public invoiceEmailContent: any;
  public invoiceEmailSubject: any;
  public multiSelectConfigCompany: any;
  public allCompanies: any;
  public cartOrderService: any;
  public relationService: any;
  public companyService: any;
  public selectedCompany: any;
  public orderCustomerService: any;
  public customerBillingAddressService: any;

  constructor() {
    super();
    this.invoiceLanguage = null;
    this.selectedLang = null;
    this.companyService = companyService.getInstance();
    this.relationService = relationService.getInstance();
    this.cartOrderService = CartOrdersService.getInstance();
    this.orderCustomerService = OrderCustomersService.getInstance();
    this.customerBillingAddressService = CustomerBillingAddressesService.getInstance()
    this.vatSettings = null;
    this.selectedCountry = null;
    this.selectedCompany = null;
    this.affiliateCode = '';
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
    this.multiSelectConfigCountry = new SearchableSelectConfig('enName',
      'labels.country', '', false,
      false, true, true, false)

    this.multiSelectConfigCompany = new SearchableSelectConfig('name',
      'labels.createNewCompany', '', false,
      false, true, false, false)
  }

  @Watch('order', {immediate: true, deep: true})
  public updateCart(newVal: any) {
    if (newVal) {
      this.orderCopy = newVal
      if (newVal.invoice && newVal.invoice.invoiceTemplate) {
        const invoiceTemplateData = JSON.parse(newVal.invoice.invoiceTemplate.templateDataJson);
        this.invoiceEmailContent = invoiceTemplateData.invoiceEmailContent;
        this.invoiceEmailSubject = invoiceTemplateData.invoiceEmailSubject;
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
    this.companyService.getAll({
      page: 0,
      size: 10000,
      sort: 'id,asc'
    }, `relations.id=in=${id}`).then((resp: AxiosResponse) => {
      if (resp && resp.data) {
        this.allCompanies = resp.data.content;
      }
    });
  }

  public changeLangauge(e: any) {
    this.selectedLang = e.currentTarget.value;
  }

  public changeVat(e: any) {
    this.vatSettings = e.value;
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
    this.orderCustomerService.put(customerDto).then((resp1: AxiosResponse) => {
      this.orderCopy.orderCustomer = resp1.data;
      this.saveCartOrder();
    }).catch((err: any) => {
      this.setAlert('error', 'error')
    });
  }

  public saveCartOrder() {
    let cartOrderDto = new CartOrder();
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
    this.cartOrderService.put(cartOrderDto).then((resp2: AxiosResponse) => {
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
    this.closeDialog();
  }

  public closeDialog() {
    (<any>this.$refs.sendMail).hide();
  }

  public updateInvoiceEmailContent(content: any) {
    this.invoiceEmailContent = content;
  }

  public addCompany(company: any) {
    this.selectedCompany = company;
  }

  public removeCompany() {
    this.selectedCompany = null;
  }
}
