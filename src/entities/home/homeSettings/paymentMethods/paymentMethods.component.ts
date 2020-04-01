import { Component, Vue } from 'vue-property-decorator'
import PaginationTableComponent from '@/components/paginationTable/paginationTable.vue'
import MultiLanguageComponent from '@/components/multiLanguage/MultiLanguage.vue'
import SimpleSearchComponent from '@/components/simpleSearch/simpleSearch.vue'
import MultiLanguageHtmlEditorComponent from '@/components/multiLanguageHtmlEditor/MultiLanguageHtmlEditor.vue'
import ToggleSwitch from '@/components/toggleSwitch/toggleSwitch.vue'
import {
  IPaymentMethod,
  PaymentMethod,
  PaymentMethodAvailability,
  PaymentMethodType
} from '@/shared/models/payment-method.model'
import { IMoneyConfig, MoneyConfig } from '@/shared/models/moneyConfig'
import { IMultiLanguageConfig, MultiLanguageConfig } from '@/shared/models/MultiLanguageConfig'
import PaymentMethodService from '@/shared/services/paymentMethodService'
import { AxiosResponse } from 'axios'
import { mixins } from 'vue-class-component'
import CommonHelpers from '@/shared/commonHelpers'
@Component({
  props: {
    active: Boolean
  },
  components: {
    PaginationTableComponent,
    MultiLanguageComponent,
    'simple-search': SimpleSearchComponent,
    MultiLanguageHtmlEditorComponent,
    ToggleSwitch
  }
})
export default class PaymentMethodsComponent extends mixins(Vue, CommonHelpers) {
  $refs!: {
    PaymentMethodModal: HTMLElement;
    paginationTable: PaginationTableComponent;
  }

  public paymentMethod: IPaymentMethod
  public moneyConfig: IMoneyConfig
  public deliveryMethodService: any
  public multiLangConfig: IMultiLanguageConfig
  public PaymentMethodOptions: any[]
  public PaymentMethodAvailability: any[]
  public paymentConfigJson: {}
  constructor () {
    super()
    this.moneyConfig = new MoneyConfig()
    this.paymentConfigJson = {
      liveKey: '',
      user: '',
      signature: '',
      password: '',
      merchantID: '',
      merchantKey: ''
    }
    this.paymentMethod = new PaymentMethod()
    this.deliveryMethodService = PaymentMethodService.getInstance()
    this.multiLangConfig = new MultiLanguageConfig(true, true,
      'labels.name', 'labels.description', false, false, false, true, true, false)
    this.PaymentMethodAvailability = [{
      label: PaymentMethodAvailability.DISABLED,
      value: PaymentMethodAvailability.DISABLED
    }, {
      label: PaymentMethodAvailability.PRODUCTION_MODE,
      value: PaymentMethodAvailability.PRODUCTION_MODE
    }, {
      label: PaymentMethodAvailability.TEST_MODE,
      value: PaymentMethodAvailability.TEST_MODE
    }]
    this.PaymentMethodOptions = [{
      label: PaymentMethodType.APPLE_PAY,
      value: PaymentMethodType.APPLE_PAY,
      provider: 'mollie'
    }, {
      label: PaymentMethodType.BANCONTACT,
      value: PaymentMethodType.BANCONTACT,
      provider: 'mollie'
    }, {
      label: PaymentMethodType.BANCONTACT_SISOW,
      value: PaymentMethodType.BANCONTACT_SISOW,
      provider: 'sisow'
    }, {
      label: PaymentMethodType.BANK_TRANSFER,
      value: PaymentMethodType.BANK_TRANSFER,
      provider: 'mollie'
    }, {
      label: PaymentMethodType.BELFIUS,
      value: PaymentMethodType.BELFIUS,
      provider: 'mollie'
    }, {
      label: PaymentMethodType.CREDIT_CARD,
      value: PaymentMethodType.CREDIT_CARD,
      provider: 'mollie'
    }, {
      label: PaymentMethodType.IDEAL,
      value: PaymentMethodType.IDEAL,
      provider: 'mollie'
    }, {
      label: PaymentMethodType.IDEAL_SISOW,
      value: PaymentMethodType.IDEAL_SISOW,
      provider: 'sisow'
    }, {
      label: PaymentMethodType.KBC,
      value: PaymentMethodType.KBC,
      provider: 'mollie'
    }, {
      label: PaymentMethodType.ONETIME_INCASSO,
      value: PaymentMethodType.ONETIME_INCASSO,
      provider: 'mollie'
    }, {
      label: PaymentMethodType.PAYPAL,
      value: PaymentMethodType.PAYPAL,
      provider: 'mollie'
    }, {
      label: PaymentMethodType.PAYPAL_NATIVE,
      value: PaymentMethodType.PAYPAL_NATIVE,
      provider: 'internal'
    }, {
      label: PaymentMethodType.RECURRENT_INCASSO,
      value: PaymentMethodType.RECURRENT_INCASSO,
      provider: 'mollie'
    }, {
      label: PaymentMethodType.SOFORT,
      value: PaymentMethodType.SOFORT,
      provider: 'mollie'
    }]
  }

  public resetPaymentMethod () {
    this.paymentMethod = new PaymentMethod()
  }

  public searchPaymentMethod (q: any) {

  }

  public save () {
    this.$validator.validateAll().then(success => {
      if (success) {
        if (this.paymentMethod.paymentMethodLanguages && this.paymentMethod.paymentMethodLanguages?.length > 0) {
          if (this.paymentMethod.paymentMethodLanguages[0].name === '') {
            return false
          }
        } else {
          return false
        }
        this.paymentMethod.configJson = JSON.stringify(this.paymentConfigJson)
        if (this.paymentMethod.id) {
          this.deliveryMethodService.put(this.paymentMethod).then((resp: AxiosResponse) => {
            if (resp) {
              this.setAlert('paymentMethodUpdated', 'success')
            } else {
              this.setAlert('paymentMethodError', 'error')
            }
            this.closeModal()
          })
        } else {
          this.deliveryMethodService.post(this.paymentMethod).then((resp: AxiosResponse) => {
            if (resp) {
              this.setAlert('paymentMethodCreated', 'success')
            } else {
              this.setAlert('paymentMethodError', 'error')
            }
            this.closeModal()
          })
        }
      } else {
        this.setAlert('fillRequiredFields', 'error')
      }
    })
  }

  public closeModal () {
    // @ts-ignore
    this.$refs.paginationTable.retrieveData()
    // @ts-ignore
    $(this.$refs.PaymentMethodModal).modal('hide')
  }

  public editPaymentMethod (method: any) {
    this.paymentMethod = method
    this.paymentConfigJson = JSON.parse(method.configJson)
    // @ts-ignore
    $(this.$refs.PaymentMethodModal).modal('show')
  }

  public removePaymentMethod (method: any) {
    if (method.id) {
      this.deliveryMethodService.delete(method.id).then((resp: AxiosResponse) => {
        if (resp) {
          // @ts-ignore
          this.$vueOnToast.pop('success', '', this.$t('toastMessages.paymentMethodDeleted'))
        } else {
          // @ts-ignore
          this.$vueOnToast.pop('error', this.$t('toastMessages.error'), this.$t('toastMessages.paymentMethodError'))
        }
        // @ts-ignore
        this.$refs.paginationTable.retrieveData()
      })
    }
  }

  public addNewPaymentMethodLanguages (lang: any) {
    const newLang: any = {
      name: '',
      description: '',
      langKey: lang
    }
    this.paymentMethod.paymentMethodLanguages ? this.paymentMethod.paymentMethodLanguages.push(newLang)
      : this.paymentMethod.paymentMethodLanguages = [newLang]
  }

  public changeNewPaymentMethodLanguages (lang: any) {
    let index = null
    if (this.paymentMethod.paymentMethodLanguages) {
      this.paymentMethod.paymentMethodLanguages.forEach((language, i) => {
        if (language.langKey === lang.langKey) {
          index = i
        }
      })
    }
    if (index !== null && this.paymentMethod.paymentMethodLanguages) {
      this.$set(this.paymentMethod.paymentMethodLanguages, index, lang)
    }
  }

  public removePaymentMethodLanguages (lang: any) {
    let index = null
    if (this.paymentMethod.paymentMethodLanguages) {
      this.paymentMethod.paymentMethodLanguages.forEach((language: any, ind: number) => {
        if (language.langKey === lang.langKey) {
          index = ind
        }
      })
    }
    if (index !== null && this.paymentMethod.paymentMethodLanguages) {
      this.paymentMethod.paymentMethodLanguages.splice(index, 1)
    }
  }

  public checkProvider (methodType: any) {
    let result = ''
    this.PaymentMethodOptions.forEach(method => {
      if (method.label === methodType) {
        result = method.provider
      }
    })
    return result
  }
}
