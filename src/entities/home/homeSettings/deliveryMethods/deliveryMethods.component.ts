import { Component, Vue } from 'vue-property-decorator'
import DeliveryMethodService from '@/shared/services/deliveryMethodService'
import { AxiosResponse } from 'axios'
import PaginationTableComponent from '@/components/paginationTable/paginationTable.vue'
import SimpleSearchComponent from '@/components/simpleSearch/simpleSearch.vue'
import { DeliveryMethod, DeliveryMethodType, IDeliveryMethod } from '@/shared/models/delivery-method.model'
import { IMultiLanguageConfig, MultiLanguageConfig } from '@/shared/models/MultiLanguageConfig'
import MultiLanguageComponent from '../../../../components/multiLanguage/MultiLanguage.vue'
import { mixins } from 'vue-class-component'
import CommonHelpers from '@/shared/commonHelpers'
import MultiLanguageHtmlEditorComponent
  from '../../../../components/multiLanguageHtmlEditor/MultiLanguageHtmlEditor.vue'

@Component({
  props: {
    active: Boolean
  },
  components: {
    PaginationTableComponent,
    MultiLanguageComponent,
    'simple-search': SimpleSearchComponent,
    MultiLanguageHtmlEditorComponent
  }
})
export default class DeliveryMethodsComponent extends mixins(Vue, CommonHelpers) {
  refs!: {
    paginationTable: PaginationTableComponent;
    deliveryMethodsModal: HTMLElement;
  };

  public deliveryMethodService: any;
  public digitalConfig: any;
  public inHouseConfig: any;
  public thirdPartyConfig: any;
  public deliveryMethod: IDeliveryMethod;
  public multiLangConfig: IMultiLanguageConfig;
  public multiLangConfigDigital: IMultiLanguageConfig;
  public deliveryMethodOptions: any[];
  public availableLangs: any[];

  constructor (props: any) {
    super(props)
    this.deliveryMethodService = DeliveryMethodService.getInstance()
    this.deliveryMethod = new DeliveryMethod()
    this.deliveryMethodOptions = [{
      label: DeliveryMethodType.DIGITAL,
      value: DeliveryMethodType.DIGITAL
    },
    {
      label: DeliveryMethodType.INHOUSE,
      value: DeliveryMethodType.INHOUSE
    },
    {
      label: DeliveryMethodType.OTHER_PARTY,
      value: DeliveryMethodType.OTHER_PARTY
    }]
    this.multiLangConfig = new MultiLanguageConfig(true, true,
      'labels.name', 'labels.description', false, false,
      false, true, true, false)
    this.multiLangConfigDigital = new MultiLanguageConfig(true, false,
      'labels.subject', '', false, false, false,
      true, true, false)
    this.digitalConfig = {
      subject: [],
      fromAddress: '',
      fromName: '',
      replyToAddress: '',
      replyToName: '',
      content: {}
    }
    this.inHouseConfig = {
      notifyMe: ''
    }
    this.thirdPartyConfig = {
      deliverer: 'PakjesFabriek',
      apiKey: '',
      accountName: ''
    }
    this.availableLangs = []
  }

  public save () {
    this.$validator.validateAll().then(success => {
      if (success && this.deliveryMethod.deliveryMethodLanguages && this.deliveryMethod.deliveryMethodLanguages?.length > 0) {
        if (this.deliveryMethod.deliveryMethodLanguages[0].name !== '') {
          if (this.deliveryMethod.deliveryMethodType === DeliveryMethodType.DIGITAL) {
            if (this.digitalConfig.subject.length === 0 || this.digitalConfig.subject[0].name === '') return false
          }
          switch (this.deliveryMethod.deliveryMethodType) {
            case DeliveryMethodType.DIGITAL:
              this.deliveryMethod.configJson = JSON.stringify(this.digitalConfig)
              break
            case DeliveryMethodType.INHOUSE:
              this.deliveryMethod.configJson = JSON.stringify(this.inHouseConfig)
              break
            case DeliveryMethodType.OTHER_PARTY:
              this.deliveryMethod.configJson = JSON.stringify(this.thirdPartyConfig)
              break
          }
          if (this.deliveryMethod.id) {
            this.deliveryMethodService.put(this.deliveryMethod).then((resp: AxiosResponse) => {
              if (resp) {
                this.setAlert('deliveryMethodUpdated', 'success')
              } else {
                this.setAlert('deliveryMethodError', 'error')
              }
              this.closeModal()
            })
          } else {
            this.deliveryMethodService.post(this.deliveryMethod).then((resp: AxiosResponse) => {
              if (resp) {
                this.setAlert('deliveryMethodCreated', 'success')
              } else {
                this.setAlert('deliveryMethodError', 'error')
              }
              this.closeModal()
            })
          }
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
    $(this.$refs.deliveryMethodsModal).modal('hide')
  }

  public resetDeliveryMethod () {
    this.deliveryMethod = new DeliveryMethod()
    this.digitalConfig = {
      subject: [],
      fromAddress: '',
      fromName: '',
      replyToAddress: '',
      replyToName: '',
      content: {}
    }
    this.inHouseConfig = {
      notifyMe: ''
    }
    this.thirdPartyConfig = {
      deliverer: 'PakjesFabriek',
      apiKey: '',
      accountName: ''
    }
    this.availableLangs = []
  }

  public watchDigitalLangs () {
    const self = this
    self.availableLangs = []
    if (this.digitalConfig.subject.length) {
      $.each(self.digitalConfig.subject, function (k: any, v: any) {
        self.availableLangs.push({
          langKey: v.langKey,
          name: self.getLangName(v.langKey)
        })
      })
    } else {
      self.availableLangs = [{
        langKey: 'en',
        name: 'English'
      }]
    }
  }

  public getLangName (key: any) {
    for (const lang in this.$store.state.languages) {
      if (this.$store.state.languages.hasOwnProperty(lang)) {
        if (lang === key) {
          return this.$store.state.languages[lang].name
        }
      }
    }
  }

  public searchDeliveryMethod (query: any) {
    let fields:string[] = ['deliveryMethodLanguages.name']
    let q:string = this.makeSimpleSearchQuery(fields ,query)
    // @ts-ignore
    this.$refs.paginationTable.retrieveData('api/administrationms/api/delivery-methods', undefined, q);
  }

  public editDeliveryMethod (method: any) {
    this.deliveryMethod = method
    switch (method.deliveryMethodType) {
      case DeliveryMethodType.OTHER_PARTY:
        this.thirdPartyConfig = JSON.parse(method.configJson)
        break
      case DeliveryMethodType.INHOUSE:
        this.inHouseConfig = JSON.parse(method.configJson)
        break
      case DeliveryMethodType.DIGITAL:
        this.digitalConfig = JSON.parse(method.configJson)
        break
    }
    // @ts-ignore
    $(this.$refs.deliveryMethodsModal).modal('show')
  }

  public removeDeliveryMethod (method: any) {
    if (method.id) {
      this.deliveryMethodService.delete(method.id).then((resp: AxiosResponse) => {
        if (resp) {
          this.setAlert('deliveryMethodDeleted', 'success')
        } else {
          this.setAlert('deliveryMethodError', 'error')
        }
        // @ts-ignore
        this.$refs.paginationTable.retrieveData()
      })
    }
  }

  public addNewDeliveryMethodLang (lang: any) {
    const newLang: any = {
      name: '',
      description: '',
      langKey: lang
    }
    this.deliveryMethod.deliveryMethodLanguages ? this.deliveryMethod.deliveryMethodLanguages.push(newLang)
      : this.deliveryMethod.deliveryMethodLanguages = [newLang]
  }

  public changeNewDeliveryMethodLang (lang: any) {
    let index = null
    if (this.deliveryMethod.deliveryMethodLanguages) {
      this.deliveryMethod.deliveryMethodLanguages.forEach((language, i) => {
        if (language.langKey === lang.langKey) {
          index = i
        }
      })
    }
    if (index !== null && this.deliveryMethod.deliveryMethodLanguages) {
      this.$set(this.deliveryMethod.deliveryMethodLanguages, index, lang)
    }
  }

  public removeDeliveryMethodLang (lang: any) {
    let index = null
    if (this.deliveryMethod.deliveryMethodLanguages) {
      this.deliveryMethod.deliveryMethodLanguages.forEach((language: any, ind: number) => {
        if (language.langKey === lang.langKey) {
          index = ind
        }
      })
    }
    if (index !== null && this.deliveryMethod.deliveryMethodLanguages) {
      this.deliveryMethod.deliveryMethodLanguages.splice(index, 1)
    }
  }

  public addNewDigitalSubject (lang: any) {
    const newLang: any = {
      name: '',
      description: '',
      langKey: lang
    }
    this.digitalConfig.subject ? this.digitalConfig.subject.push(newLang)
      : this.digitalConfig.subject = [newLang]
    this.watchDigitalLangs()
  }

  public changeNewDigitalSubject (lang: any) {
    let index = null
    this.digitalConfig.subject.forEach((language: any, i: number) => {
      if (language.langKey === lang.langKey) {
        index = i
      }
    })
    if (index !== null && this.digitalConfig.subject) {
      this.$set(this.digitalConfig.subject, index, lang)
    }
  }

  public removeDigitalSubject (lang: any) {
    let index = null
    if (this.digitalConfig.subject) {
      this.digitalConfig.subject.forEach((language: any, ind: number) => {
        if (language.langKey === lang.langKey) {
          index = ind
        }
      })
    }
    if (index !== null && this.digitalConfig.subject) {
      this.digitalConfig.subject.splice(index, 1)
    }
  }

  public updateDigitalContent (content: any) {
    this.digitalConfig.content = content
  }
}
