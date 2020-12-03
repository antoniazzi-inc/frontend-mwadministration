import { Component, Inject, Vue, Watch } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import CommonHelpers from '@/shared/commonHelpers'
import ProductService from '@/shared/services/productService'
import { IProduct, Product } from '@/shared/models/productms/ProductModel'
import { AxiosResponse } from 'axios'
import ToggleSwitch from '@/components/toggleSwitch/toggleSwitch.vue'
import {IMultiLanguageConfig, MultiLanguageConfig} from "@/shared/models/MultiLanguageConfig";
import MultiLanguageComponent from "@/components/multiLanguage/MultiLanguage.vue";
@Component({
  props: {
    product: Object
  },
  components: {
    'toggle-switch': ToggleSwitch,
    MultiLanguageComponent
  }
})
export default class CheckoutTabComponent extends mixins(CommonHelpers) {
    public productService: any = ProductService.getInstance()
    public tabIndex = 0;
    public productCopy: IProduct = new Product();
    public itemsPerPage = 20;
    public queryCount: any = null;
    public multiLangConfig: IMultiLanguageConfig = new MultiLanguageConfig(true, false, 'labels.linkText',
      '', false, false, false, true, true, false);
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
        companyName: {
          visible: false,
          required: false
        },
        vatNumber: {
          visible: false,
          required: false
        },
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
        linkToPrivacyStatement: '',
        privacyStatementLinkText: [],
        conditionsLinkText: []
      }
    }

    @Watch('product', { immediate: true, deep: true })
    public handleProduct (newVal: any) {
      this.termsAndConditions = newVal.termsAndConditionsJson ? newVal.termsAndConditionsJson : {
        agreeConditions: false,
        agreePrivacyStatement: false,
        linkToConditions: '',
        linkToPrivacyStatement: '',
        privacyStatementLinkText: [],
        conditionsLinkText: []
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
          companyName: {
            visible: false,
            required: false
          },
          vatNumber: {
            visible: false,
            required: false
          },
          vatCalculation: ''
        },
        freeFields: this.$store.state.lookups.freeFields
      }
    }

    public mounted () {
      this.retrieve()
    }

    public retrieve () {
      const self = this
      self.registrationSettingsJson.freeFields = []
      let fields:any = []
      $.each(this.$store.state.lookups.freeFields, function (k, v) {
        fields.push({
          value: v,
          name: v.label,
          visible: false,
          required: false,
          useInInvoice: false
        })
      })
      self.registrationSettingsJson.freeFields = fields
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
    public goBack() {
      this.$router.push('/products')
    }
    public checkForHttps (e:any, forValue:string) {
      this.termsAndConditions[forValue] = this.checkForUrlHttps(e.currentTarget.value)
    }
    public saveTermsAndConditions () {
      this.productCopy.termsAndConditionsJson = this.termsAndConditions
      const dto = JSON.parse(JSON.stringify(this.productCopy))
      dto.typeDigital = undefined
      dto.typeService = undefined
      dto.typePhysical = undefined
      dto.followupAction = undefined
      dto.paymentSchedules = undefined
      dto.typeCourse = undefined
      dto.productSubscription = undefined
      this.productService.put(dto).then((resp: AxiosResponse) => {
        this.setAlert('productUpdated', 'success')
        this.$emit('update', resp.data)
      })
    }
    public addNewConditionsLinkText(lang:any){
      const newLang: any = {
        name: '',
        description: '',
        langKey: lang
      }
      if (this.termsAndConditions && this.termsAndConditions.conditionsLinkText) {
        this.termsAndConditions.conditionsLinkText.push(newLang)
      } else {
        this.termsAndConditions.conditionsLinkText = [newLang]
      }
    }
    public changeConditionsLinkText(lang:any){
      console.log(lang)
    }
    public removeConditionsLinkText(lang:any){
      console.log(lang)
    }

    public addNewPrivacyStatementLinkText(lang:any){
      const newLang: any = {
        name: '',
        description: '',
        langKey: lang
      }
      if (this.termsAndConditions && this.termsAndConditions.privacyStatementLinkText) {
        this.termsAndConditions.privacyStatementLinkText.push(newLang)
      } else {
        this.termsAndConditions.privacyStatementLinkText = [newLang]
      }
    }
    public changePrivacyStatementLinkText(lang:any){}
    public removePrivacyStatementLinkText(lang:any){}
}
