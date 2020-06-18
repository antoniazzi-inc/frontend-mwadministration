import { Component, Inject, Vue, Watch } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import CommonHelpers from '@/shared/commonHelpers'
import ProductService from '@/shared/services/productService'
import { IProduct, Product } from '@/shared/models/ProductModel'
import { AxiosResponse } from 'axios'
import ToggleSwitch from '@/components/toggleSwitch/toggleSwitch.vue'
@Component({
  props: {
    product: Object
  },
  components: {
    'toggle-switch': ToggleSwitch
  }
})
export default class CheckoutTabComponent extends mixins(CommonHelpers) {
    public productService: any = ProductService.getInstance()
    public tabIndex = 0;
    public productCopy: IProduct = new Product();
    public itemsPerPage = 20;
    public queryCount: any = null;
    public page = 1;
    public previousPage: any = null;
    public totalItems = 0;
    public termsAndConditions: Record<string, any>;
    public registrationSettingsJson: any = {
      billingAddress: [
        { name: 'street', visible: false, required: false },
        { name: 'houseNumber', visible: false, required: false },
        { name: 'additionalInfo', visible: false, required: false },
        { name: 'postalCode', visible: false, required: false },
        { name: 'city', visible: false, required: false },
        { name: 'country', visible: false, required: false }
      ],
      deliveryAddress: [
        { name: 'street', visible: false, required: false },
        { name: 'houseNumber', visible: false, required: false },
        { name: 'additionalInfo', visible: false, required: false },
        { name: 'postalCode', visible: false, required: false },
        { name: 'city', visible: false, required: false },
        { name: 'country', visible: false, required: false }
      ],
      relationFields: [
        { name: 'title', visible: false, required: false },
        { name: 'gender', visible: false, required: false },
        { name: 'firstname', visible: false, required: false },
        { name: 'middleName', visible: false, required: false },
        { name: 'lastName', visible: false, required: false },
        { name: 'phone', visible: false, required: false },
        { name: 'birthDate', visible: false, required: false }
      ],
      companyAndTaxes: {
        orderAsCompany: false,
        companyName: '',
        vatNumber: '',
        vatCalculation: ''
      },
      freeFields: []
    };

    constructor () {
      super()
      this.termsAndConditions = {
        agreeConditions: false,
        agreePrivacyStatement: false,
        linkToConditions: '',
        linkText: '',
        privacyStatement: ''
      }
    }

    @Watch('product', { immediate: true, deep: true })
    public handleProduct (newVal: any) {
      this.termsAndConditions = newVal.termsAndConditionsJson ? newVal.termsAndConditionsJson : {
        agreeConditions: false,
        agreePrivacyStatement: false,
        linkToConditions: '',
        linkText: '',
        privacyStatement: ''
      }
      this.productCopy = newVal
      this.registrationSettingsJson = newVal.registrationSettingsJson ? JSON.parse(newVal.registrationSettingsJson) : {
        billingAddress: [
          { name: 'street', visible: false, required: false },
          { name: 'houseNumber', visible: false, required: false },
          { name: 'additionalInfo', visible: false, required: false },
          { name: 'postalCode', visible: false, required: false },
          { name: 'city', visible: false, required: false },
          { name: 'country', visible: false, required: false }
        ],
        deliveryAddress: [
          { name: 'street', visible: false, required: false },
          { name: 'houseNumber', visible: false, required: false },
          { name: 'additionalInfo', visible: false, required: false },
          { name: 'postalCode', visible: false, required: false },
          { name: 'city', visible: false, required: false },
          { name: 'country', visible: false, required: false }
        ],
        relationFields: [
          { name: 'title', visible: false, required: false, useInInvoice: false },
          { name: 'gender', visible: false, required: false, useInInvoice: false },
          { name: 'firstname', visible: false, required: false, useInInvoice: false },
          { name: 'middleName', visible: false, required: false, useInInvoice: false },
          { name: 'lastName', visible: false, required: false, useInInvoice: false },
          { name: 'phone', visible: false, required: false, useInInvoice: false },
          { name: 'birthDate', visible: false, required: false, useInInvoice: false }
        ],
        companyAndTaxes: {
          orderAsCompany: false,
          companyName: '',
          vatNumber: '',
          vatCalculation: ''
        },
        freeFields: []
      }
    }

    public mounted () {
      this.retrieve()
    }

    public retrieve () {
      const self = this
      self.registrationSettingsJson.freeFields = []

      $.each(this.$store.state.lookups.freeFields, function (k, v) {
        self.registrationSettingsJson.freeFields.push({
          field: v,
          required: false,
          visible: false
        })
      })
      self.totalItems = this.$store.state.lookups.freeFields.length
      self.queryCount = this.totalItems
    }

    public loadPage (page: number): void {
      if (page !== this.previousPage) {
        this.previousPage = page
        this.retrieve()
      }
    }

    public getName (lang: any) {
      return this.getMultiLangName(lang).name
    }

    public save () {
      this.productCopy.registrationSettingsJson = JSON.stringify(this.registrationSettingsJson)
      const dto = JSON.parse(JSON.stringify(this.productCopy))
      dto.typeDigital = undefined
      dto.typeService = undefined
      dto.typePhysical = undefined
      dto.productSubscription = undefined
      this.productService.put(dto).then((resp: AxiosResponse) => {
        this.setAlert('productUpdated', 'success')
        this.$emit('update', resp.data)
      })
    }

    public checkForHttps () {
      this.termsAndConditions.linkToConditions = this.checkForUrlHttps(this.termsAndConditions.linkToConditions)
    }
    public saveTermsAndConditions () {
      this.productCopy.termsAndConditionsJson = this.termsAndConditions
      const dto = JSON.parse(JSON.stringify(this.productCopy))
      dto.typeDigital = undefined
      dto.typeService = undefined
      dto.typePhysical = undefined
      dto.productSubscription = undefined
      this.productService.put(dto).then((resp: AxiosResponse) => {
        this.setAlert('productUpdated', 'success')
        this.$emit('update', resp.data)
      })
    }
}
