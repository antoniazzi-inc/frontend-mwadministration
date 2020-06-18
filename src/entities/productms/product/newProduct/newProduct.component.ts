import { mixins } from 'vue-class-component'
import CommonHelpers from '@/shared/commonHelpers'
import { Component, Vue, Watch } from 'vue-property-decorator'
import SearchableSelectComponent from '../../../../components/searchableSelect/searchableSelect.vue'

import { IMultiLanguageConfig, MultiLanguageConfig } from '@/shared/models/MultiLanguageConfig'
import MultiLanguageComponent from '@/components/multiLanguage/MultiLanguage.vue'
import { IMoneyConfig, MoneyConfig } from '@/shared/models/moneyConfig'
import ToggleSwitch from '@/components/toggleSwitch/toggleSwitch.vue'
import flatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'
import { ISearchableSelectConfig, SearchableSelectConfig } from '@/shared/models/SearchableSelectConfig'
import UploadWidget from '@/components/uploadWidget/uploadWidget.vue'
import { Product, productType } from '@/shared/models/ProductModel'
import { TypeDigital } from '@/shared/models/TypeDigitalModel'
import { TypeService } from '@/shared/models/TypeServiceModel'
import moment from 'moment'
import { TypeCourse } from '@/shared/models/TypeCourseModel'
import { TypePhysical } from '@/shared/models/TypePhysicalModel'
import { ProductSubscription } from '@/shared/models/ProductSubscriptionModel'
import { AxiosResponse } from 'axios'
import ProductService from '@/shared/services/productService'
import mediasService from '@/shared/services/mediasService'
import BaseImage from '@/shared/baseImage'
import Store from '@/store/index'
import { FollowupAction } from '@/shared/models/FollowupActionModel'

@Component({
  components: {
    SearchableSelectComponent,
    MultiLanguageComponent,
    flatPickr,
    'toggle-switch': ToggleSwitch,
    UploadWidget
  },
  beforeRouteEnter (to, from, next) {
    next((vm: any) => {
      if (to.query.local && to.query.local === 'true') {
        vm.loadProductFromSessionStorage()
      }
    })
  }
})
export default class NewProductComponent extends mixins(Vue, CommonHelpers) {
  public productService: any;
  public product: any;
  public selectedType: any;
  public selectedProductType: any;
  public mediaService: any;
  public validFromConfig: any;
  public isSaving: boolean;
  public isInclusive: boolean;
  public isValidatingStep2: boolean;
  public notUrl: boolean;
  public availableFrom: Date;
  public availableTo: Date | any;
  public isSubscription: boolean;
  public step: number;
  public validToConfig: any;
  public allTaxRates: any[];
  public previewImages: any[];
  public typeCourses: any[];
  public inclusivePrice: any;
  public selectedCourse: any;
  public moneyConfig: IMoneyConfig;
  public searchableConfig: ISearchableSelectConfig;
  public multiLangConfig: IMultiLanguageConfig;

  constructor () {
    super()
    this.step = 1
    this.selectedType = 'typeDigital'
    this.availableFrom = new Date()
    this.availableTo = null
    this.mediaService = mediasService.getInstance()
    this.allTaxRates = this.$store.state.lookups.taxRates
    this.typeCourses = []
    this.previewImages = []
    this.productService = ProductService.getInstance()
    this.product = new Product(undefined, undefined, undefined, undefined,
      undefined, undefined, productType.DIGITAL)
    this.searchableConfig = new SearchableSelectConfig('enName',
      'labels.country', 'labels.addNewCourse', true,
      true, false, false, false)
    this.isInclusive = false
    this.isValidatingStep2 = false
    this.isSaving = false
    this.isSubscription = false
    this.selectedCourse = null
    this.notUrl = false
    this.selectedProductType = ''
    this.inclusivePrice = 0
    this.multiLangConfig = new MultiLanguageConfig(true, true,
      'labels.productName', 'labels.productDescription', false,
      false, false, true, true, false)
    this.validFromConfig = {
      wrap: true,
      altInput: false,
      dateFormat: 'm-d-Y',
      minDate: moment().format('MM-DD-YYYY')
    }
    this.validToConfig = {
      wrap: true,
      altInput: false,
      dateFormat: 'm-d-Y',
      minDate: moment().format('MM-DD-YYYY')
    }
    this.moneyConfig = new MoneyConfig(undefined, undefined, '', Store.state.currency, 0, false)
  }

  public resetProductTypes () {
    return new Promise(resolve => {
      this.product.typeService = null
      this.product.typePhysical = null
      this.product.typeCourse = null
      this.product.typeDigital = null
      resolve()
    })
  }

  public created () {
    this.product.typeDigital = new TypeDigital()
    this.product.productSubscription = new ProductSubscription()
  }

  @Watch('notUrl', { immediate: false, deep: true })
  public updateNotUrl (newVal: any) {
    if (newVal) {
      this.product.typeDigital.url = null
    } else {
      this.product.typeDigital.body = null
      this.product.typeDigital.bodyContentType = null
      this.product.typeDigital.bodyName = null
    }
  }

  @Watch('product.price', { immediate: true, deep: true })
  public updateInclusivePrice (newVal: any) {
    this.calculateInclusive(false)
  }

  @Watch('availableFrom', { immediate: true, deep: true })
  public changeAvailableToMin (newVal: any) {
    this.validToConfig.minDate = moment(newVal).format('MM-DD-YYYY')
  }

  public changeProductType (type: string) {
    this.product.productType = type
    this.resetProductTypes().then(() => {
      switch (type) {
        case 'DIGITAL':
          this.product.typeDigital = new TypeDigital()
          this.product.productSubscription = new ProductSubscription()
          this.selectedType = 'typeDigital'
          this.product.typeDigital.url = ''
          break
        case 'COURSE':
          this.product.typeCourse = new TypeCourse()
          this.product.productSubscription = new ProductSubscription()
          this.selectedType = 'typeCourse'
          break
        case 'PHYSICAL':
          this.product.typePhysical = new TypePhysical()
          this.product.productSubscription = new ProductSubscription()
          this.selectedType = 'typePhysical'
          break
        case 'SERVICE':
          this.product.typeService = new TypeService()
          this.product.productSubscription = new ProductSubscription()
          this.selectedType = 'typeService'
          break
        case 'VOUCHER':
          // this.product. = new TypeVoucher();
          break
        case 'default':
          this.product.typeDigital = new TypeDigital()
          this.product.productSubscription = new ProductSubscription()
          this.selectedType = 'typeDigital'
          break
      }
    })
  }

  public resizeImages () {
    const self = this
    const images: any = []
    return new Promise(resolve => {
      $.each(self.previewImages, function (k, v) {
        images.push(v.resizeAll())
      })
      resolve(images)
    })
  }

  public validateAvailableTo (e: any) {
    if (this.availableTo === null) {
      return true
    }
    if (this.availableTo) {
      if (moment(moment(this.availableTo)).isAfter(this.availableFrom)) {
        return true
      } else {
        return false
      }
    } else {
      return false
    }
  }

  public onComplete (e: any) {
    const self = this
    const pagination: any = {
      page: 0,
      size: 1,
      sort: ['id,desc']
    }
    this.productService.getAll(pagination, 'payButtonJson=null=false').then((lastCreated: AxiosResponse) => {
      this.product.payButtonJson = lastCreated && lastCreated.data.content.length > 0 ? lastCreated.data.content[0].payButtonJson : {}
      this.isSaving = true
      this.product.userDefinedPrice = false
      this.product.archived = false
      this.product.availableForAffiliates = false
      this.product.quickCheckout = false
      this.prepareDto().then(dto => {
        this.product.availableFrom = moment(this.availableFrom, 'YYYY-MM-DDTHH:mm')
        this.product.availableTo = moment(this.availableTo, 'YYYY-MM-DDTHH:mm')
        this.productService.post(dto).then((resp: AxiosResponse) => {
          if (resp) {
            if (this.previewImages.length > 0) {
              const dtoImages: any = []
              this.resizeImages().then((images: any) => {
                $.each(images, function (k, v) {
                  dtoImages.push({
                    name: v.name,
                    images: v.images,
                    bodyContentType: v.contentType
                  })
                  const toSend = {
                    id: resp.data.id,
                    params: dtoImages
                  }
                  self.productService.createOnBucket(toSend).then((resp: AxiosResponse) => {
                    if (resp) {
                      self.isSaving = false
                      self.setAlert('productCreated', 'success')
                      self.goBack()
                    } else {
                      self.isSaving = false
                      this.setAlert('errorUploadingImage', 'error')
                    }
                  })
                })
              })
            } else {
              this.isSaving = false
              this.setAlert('productCreated', 'success')
              this.goBack()
            }
          } else {
            this.setAlert('productCreateError', 'error')
          }
        })
      })
    })
  }

  public validateStep () {
    const self = this
    return new Promise((resolve, reject) => {
      if (this.step === 1) {
        resolve(true)
      } else if (this.step === 2) {
        this.$validator.validateAll({
          'Start Date': this.product.productSubscription.startDate,
          period: this.product.productSubscription.period,
          'Subscription Max Terms': this.product.productSubscription.maxTimes,
          tax: this.product.tax
        }).then(valid => {
          if (valid) {
            self.isValidatingStep2 = true
            if (self.product.productLanguages && self.product.productLanguages.length && self.product.productLanguages[0].name) {
              self.isValidatingStep2 = false
            } else {
              self.isValidatingStep2 = true
              resolve(false)
              return
            }
            if (self.product.price > 0.01) {
              self.isValidatingStep2 = false
            } else {
              self.isValidatingStep2 = true
              resolve(false)
              return
            }
            if (self.availableTo && moment(moment(self.availableTo)).isAfter(moment(self.availableFrom))) {
              self.isValidatingStep2 = false
            } else {
              if (!self.availableTo) {
              } else {
                self.isValidatingStep2 = true
                resolve(false)
                return
              }
            }
            if (self.isValidatingStep2) {
              resolve(false)
            } else {
              resolve(true)
            }
          } else {
            resolve(false)
          }
        })
      } else if (this.step === 3) {
        resolve(true)
      } else if (this.step === 4) {
        if (this.product.productType === 'COURSE') {
          if (this.selectedCourse) {
            resolve(true)
          } else {
            resolve(false)
          }
        } else {
          if (this.product.productType === 'COURSE') {
            this.$validator.validateAll({
              url: this.product.typeDigital.url
            }).then(valid => {
              if (valid) {
                resolve(true)
              } else {
                resolve(false)
              }
            })
          } else {
            resolve(true)
          }
        }
      }
    })
  }

  public inclusive () {
    let price = 0
    if (this.product.tax > -1) {
      price = this.product.price + ((this.product.price / 100) * this.product.tax)
    }
    let newPrice = null
    if (!this.isInclusive) {
      newPrice = parseFloat(price.toString()).toFixed(3)
    } else {
      newPrice = this.inclusivePrice
    }
    if (this.product.priceRounding) {
      return Math.round(newPrice)
    } else {
      return newPrice
    }
  }

  public imageUploadError (img: any) {}
  public imageLoaded (img: any) {
    this.convertFileToBase64(img.file).then(resp => {
      this.previewImages.push(new BaseImage(resp, img.file.type, img.file.name))
    })
  }

  public onImageRemove (img: any) {

  }

  public addProductLang (lang: any) {
    let index = null
    if (this.product.productLanguages) {
      this.product.productLanguages.forEach((currLang: any, i: any) => {
        if (currLang.langKey === lang) {
          index = i
        }
      })
    }
    const newLang: any = {
      name: '',
      description: '',
      langKey: lang
    }
    if (index === null) {
      this.product.productLanguages ? this.product.productLanguages.push(newLang) : this.product.productLanguages = [newLang]
    }
  }

  public tabChanged (old: any, newIndex: any) {
    if (newIndex < old) {
      this.step = newIndex - 1
      this.$validator.reset()
    } else {
      this.step = newIndex + 1
    }
  }

  public changeProductLang (lang: any) {
    let index = null
    if (this.product.productLanguages && this.product.productLanguages.length > 0) {
      $.each(this.product.productLanguages, function (k, v) {
        if (v.langKey === lang.langKey) {
          index = k
        }
      })
      if (index !== null) {
        this.product.productLanguages[index] = lang
      } else {
        this.product.productLanguages.push(lang)
      }
    } else {
      this.product.productLanguages.push(lang)
    }
  }

  public removeProductLang (lang: any) {
    let index = null
    if (this.product.productLanguages && this.product.productLanguages.length > 0) {
      $.each(this.product.productLanguages, function (k, v) {
        if (v.langKey === lang.langKey) {
          index = k
        }
      })
      if (index !== null) {
        this.product.productLanguages.splice(index, 1)
      }
    }
  }

  public calculateInclusive (toChange?: any) {
    if (toChange === false) {
      return
    }
    if (this.product.tax > -1) {
      this.inclusivePrice = this.product.price + ((this.product.price / 100) * this.product.tax)
      if (!this.isInclusive) {
      }
    } else {
      this.inclusivePrice = this.product.price
    }
  }

  public changeIsInclusive () {
    this.isInclusive = !this.isInclusive
  }

  public calculateExclusive () {
    const price = (this.inclusivePrice / (1 + (this.product.tax / 100)))
    const decimals = price.toString().split('.')
    if (decimals[1] && decimals[1].length > 3) {
      this.product.priceRounding = true
    } else {
      this.product.priceRounding = false
    }
    this.product.price = price
  }

  public calculateTax () {
    if (this.product.tax > -1) {
      this.product.price = this.inclusivePrice - ((this.inclusivePrice / 100) * this.product.tax)
    } else {
      this.product.price = JSON.parse(JSON.stringify(this.inclusivePrice))
    }
  }

  public prepareDto () {
    const self = this
    return new Promise(resolve => {
      if (this.isSubscription) {
        this.product.productSubscription.startDate = this.product.productSubscription.startDate
      } else {
        this.product.productSubscription = undefined
      }
      const dto: any = {
        productLanguages: self.product.productLanguages,
        productType: self.product.productType,
        availableFrom: moment(this.availableFrom),
        availableTo: moment(this.availableTo),
        price: self.product.price,
        tax: self.product.tax,
        media: self.product.media,
        archived: false,
        followupAction: new FollowupAction(),
        availableForAffiliates: false,
        quickCheckout: false,
        userDefinedPrice: false,
        productSubscription: self.product.productSubscription,
        payButtonJson: self.product.payButtonJson,
        priceRounding: self.product.priceRounding
      }
      switch (this.product.productType) {
        case 'DIGITAL':
          dto.typeDigital = self.product.typeDigital
          dto.typeDigital.notPaidDownload = false
          break
        case 'COURSE':
          dto.typeCourse = self.product.typeCourse
          break
        case 'PHYSICAL':
          dto.typePhysical = self.product.typePhysical
          break
        case 'SERVICE':
          dto.typeService = self.product.typeService
          break
        case 'VOUCHER':

          break
      }
      resolve(dto)
    })
  }

  public addNewCourse () {
    this.prepareDto().then(resp => {
      sessionStorage.setItem('tempProduct', JSON.stringify(resp))
      // @ts-ignore
      this.$router.push({
        path: '/entity/course/new?backToProducts=true'
      })
    })
  }

  public updateCourse (course: any) {
    this.selectedCourse = course
    this.product.typeCourse.courses = [course.value]
  }

  public removeCourse () {
    this.product.typeCourse.courses = []
    this.selectedCourse = null
  }

  public loadProductFromSessionStorage () {
    const self = this
    const prod: any = sessionStorage.getItem('tempProduct')
    const product: any = JSON.parse(prod)
    if (product) {
      this.changeProductType('COURSE')
      this.calculateInclusive()
      this.step = 1
      Vue.nextTick(function () {
        self.product.productLanguages = product.productLanguages
        self.availableTo = product.availableTo
        self.product.productType = product.productType
        self.availableFrom = product.availableFrom
        self.product.price = product.price
        self.product.tax = product.tax
        self.product.priceRounding = product.priceRounding
        self.product.typeCourse = product.typeCourse
        self.isSubscription = product.productSubscription !== null
        self.product.productSubscription = product.productSubscription
        self.product.media = product.media
        self.selectedCourse = self.typeCourses[self.typeCourses.length - 1]
        sessionStorage.setItem('tempProduct', '')
      })
      sessionStorage.removeItem('tempProduct')
    }
  }

  public checkForHttp () {
    this.product.typeDigital.url = this.checkForUrlHttps(this.product.typeDigital.url)
  }

  public digitalUploadError (obj:any) {}
  public digitalLoaded (obj:any) {
    this.uploadDigitalFile(obj)
  }
  public digitalRemove (obj:any) {}

  public goBack () {
    this.$router.push('/products')
  }

  public uploadDigitalFile (file: any) {
    const self = this
    if (file) {
      self.convertFileToBase64(file.file).then(resp => {
        self.product.typeDigital.body = resp
        self.product.typeDigital.bodyContentType = file.type
        self.product.typeDigital.bodyName = file.name

      })
    }
  }
}