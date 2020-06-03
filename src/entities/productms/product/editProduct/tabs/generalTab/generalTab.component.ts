import { Component, Inject, Vue, Watch } from 'vue-property-decorator'
import UploadWidget from '@/components/uploadWidget/uploadWidget.vue'
import { Money } from 'v-money'
import moment from 'moment'
import flatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'
import { IProduct, Product } from '@/shared/models/ProductModel'
import { AxiosResponse } from 'axios'
import { mixins } from 'vue-class-component'
import CommonHelpers from '@/shared/commonHelpers'
import typeservicesService from '@/shared/services/type-servicesService'
import ProductService from '@/shared/services/productService'
import productcategoriesService from '@/shared/services/product-categoriesService'
import MultiLanguageComponent from '@/components/multiLanguage/MultiLanguage.vue'
import { IMultiLanguageConfig, MultiLanguageConfig } from '@/shared/models/MultiLanguageConfig'
import { SearchableSelectConfig } from '@/shared/models/SearchableSelectConfig'
import ToggleSwitch from '@/components/toggleSwitch/toggleSwitch.vue'
import SearchableSelectComponent from '@/components/searchableSelect/searchableSelect.vue'
import { ProductLanguage } from '@/shared/models/ProductLanguageModel'
@Component({
  props: {
    product: Object
  },
  components: {
    flatPickr,
    MultiLanguageComponent,
    money: Money,
    'toggle-switch': ToggleSwitch,
    'upload-widget': UploadWidget,
    SearchableSelectComponent
  }
})
export default class GeneralTabComponent extends mixins(CommonHelpers, Vue) {
    public typeServiceService: any = typeservicesService.getInstance()
    public productCategoryService: any = productcategoriesService.getInstance()
    public productService: any = ProductService.getInstance()
    public validFromConfig: any = {
      wrap: true,
      altInput: false,
      dateFormat: 'm-d-Y',
      minDate: moment().format('MM-DD-YYYY')
    }

    public validToConfig: any = {
      wrap: true,
      altInput: false,
      dateFormat: 'm-d-Y',
      minDate: moment().format('MM-DD-YYYY')
    }

    public availableFrom: any = null;
    public availableTo: any = null;
    public productCopy: IProduct = new Product();
    public maxExceededMessage: any = [];
    public notAvailableMessage: any = [];
    public AvailableProductLanguages: any = [];
    public selectedCategories: any = null;
    public availableFromError: any = false;
    public isSaveDisabled: any = false;
    public availableToError: any = false;
    public isInclusive: any = false;
    public inclusivePrice: any = 0;
    public multiLangConfig: IMultiLanguageConfig = new MultiLanguageConfig(true, true,
      'labels.productName', 'labels.productDescription', false,
      false, false, true, true, false)

    public multiLangMaxExceedConfig: IMultiLanguageConfig = new MultiLanguageConfig(false, true,
      '', 'labels.MaxExceedMessage', false,
      true, false, false, false, false)

    public multiLangNotAvailableConfig: IMultiLanguageConfig = new MultiLanguageConfig(false, true,
      '', 'labels.NotAvailableMessage', false,
      true, false, false, false, false)

    public isSubscription: any = false;
    public allProductsCategories: any = [];
    public multiSelectConfig: any =new SearchableSelectConfig('code',
      'labels.chooseCategory', '', false,
      false, true, true, false)

    public money: any = {
      decimal: ',',
      thousands: '.',
      prefix: '€',
      suffix: '',
      precision: 2,
      masked: false
    };

    public allTaxRates: any = [
      {
        value: 0,
        title: 'vrijgesteld 0%'
      }, {
        value: 21,
        title: 'high 21%'
      }, {
        value: 9,
        title: 'low 9%'
      }
    ];

    @Watch('product', { immediate: true, deep: true })
    public updateProd (newVal: any) {
      const self = this
      this.maxExceededMessage = []
      this.notAvailableMessage = []
      this.AvailableProductLanguages = []
      this.selectedCategories = []
      this.productCopy = newVal
      this.availableFrom = this.$props.product.availableFrom ? moment(this.$props.product.availableFrom).format('MM-DD-YYYY') : null
      this.availableTo = this.$props.product.availableTo ? moment(this.$props.product.availableTo).format('MM-DD-YYYY') : null
      if (moment(this.$props.product.availableFrom).isBefore(moment())) {
        this.validFromConfig.minDate = this.availableFrom
        this.validToConfig.minDate = this.availableFrom
      }
      const selectedCat: any = []
      $.each(self.allProductsCategories, function (k, v: any) {
        $.each(self.productCopy.productCategories, function (i, j: any) {
          if (v.id === j.categoryId) {
            selectedCat.push(v)
          }
        })
      })
      self.selectedCategories = selectedCat
      $.each(newVal.productLanguages, function (k, v) {
        self.maxExceededMessage.push({
          langKey: v.langKey,
          description: v.maxExceededMessage
        })
        self.notAvailableMessage.push({
          langKey: v.langKey,
          description: v.notAvailableMessage
        })
        self.AvailableProductLanguages.push({
          langKey: v.langKey,
          name: v.langKey
        })
      })
      this.calculateInclusivePrice()
    }

    @Watch('productCopy', { immediate: true, deep: true })
    public updateProdCopy (newVal: any) {
      this.calculateInclusive()
    }

    @Watch('inclusivePrice', { immediate: true, deep: true })
    public updateInclusivePrice (newVal: any) {
      this.calculateExclusive()
    }

    public mounted () {
      this.allProductsCategories = this.$store.state.lookups.categories
      this.allTaxRates = this.$store.state.lookups.taxRates
    }

    public removeLang (lang: any) {}
    public updateLang (lang: any) {
      let index = null
      if (this.productCopy.productLanguages && this.productCopy.productLanguages.length) {
        $.each(this.productCopy.productLanguages, function (k, v) {
          if (v.langKey === lang.langKey) {
            index = k
          }
        })
        if (index !== null) {
          this.productCopy.productLanguages[index] = lang
        } else {
          this.productCopy.productLanguages.push(lang)
        }
      }
    }

    public goToNewProduct () {
      this.$router.push('/entity/product/new')
      this.closeDialog()
    }

    public closeDialog () {
      (<any> this.$refs.createNewProduct).hide()
    }

    public addNewLang (lang: any) {
      const lng = new ProductLanguage(undefined, undefined, undefined, undefined, lang,
        '', '', '', '')
      this.productCopy.productLanguages ? this.productCopy.productLanguages.push(lng) : this.productCopy.productLanguages = [lng]
    }

    public calculateInclusivePrice () {
      if (this.productCopy && this.productCopy.tax && this.productCopy.price) { this.inclusivePrice = (this.productCopy.tax > -1) ? this.productCopy.price + ((this.productCopy.price / 100) * this.productCopy.tax) : 0 }
    }

    public inclusive () {
      if (this.productCopy && this.productCopy.tax && this.productCopy.price) {
        const price = (this.productCopy.tax > -1) ? this.productCopy.price + ((this.productCopy.price / 100) * this.productCopy.tax) : 0
        return price.toFixed(2)
      }
    }

    public calculateInclusive () {
      if (this.productCopy && this.productCopy.tax && this.productCopy.price) { this.inclusivePrice = (this.productCopy.tax > -1) ? this.productCopy.price + ((this.productCopy.price / 100) * this.productCopy.tax) : 0 }
    }

    public calculateExclusive () {
      if (this.productCopy && this.productCopy.tax) { this.productCopy.price = (this.inclusivePrice / (1 + (this.productCopy.tax / 100))) }
    }

    public updateMaxExceedLang (lang: any) {
      let index: any = null
      if (this.productCopy.productLanguages && this.productCopy.productLanguages.length) {
        $.each(this.productCopy.productLanguages, function (k, v) {
          if (v.langKey === lang.langKey) {
            index = k
          }
        })
        if (index !== null && this.productCopy.productLanguages && this.productCopy.productLanguages[index]) {
          this.productCopy.productLanguages[index].maxExceededMessage = lang.description
        }
      }
    }

    public updateNotAvailableLang (lang: any) {
      let index = null
      if (this.productCopy.productLanguages && this.productCopy.productLanguages.length) {
        $.each(this.productCopy.productLanguages, function (k, v) {
          if (v.langKey === lang.langKey) {
            index = k
          }
        })
        if (index !== null) {
          this.productCopy.productLanguages[index].notAvailableMessage = lang.description
        }
      }
    }

    public save () {
      const self = this
      if (moment(this.availableTo).isBefore(this.availableFrom)) {
        this.availableToError = true
        return
      }
      // @ts-ignore
      this.productCopy.availableTo = this.productCopy.availableTo ? moment(this.productCopy.availableTo, 'YYYY-MM-DDTHH:mm')._d : null
      // @ts-ignore
      this.productCopy.availableFrom = this.productCopy.availableFrom ? moment(this.productCopy.availableFrom, 'YYYY-MM-DDTHH:mm')._d : this.$props.product.availableFrom
      const dto = JSON.parse(JSON.stringify(this.productCopy))
      dto.productCategories = null
      dto.attributes = null
      if (this.productCopy.productType === 'SERVICE') {
        this.typeServiceService.put(this.productCopy.typeService).then((resp: AxiosResponse) => {})
      }
      this.productService.put(dto).then((resp: AxiosResponse) => {
        self.setAlert('productUpdated', 'success')
        self.$emit('updateProduct', resp)
      })
    }

    public changeAvailableFromDate (date: any) {
      if (!date) {
        return
      }
      this.productCopy.availableFrom = moment(date, 'YYYY-MM-DDTHH:mm:ssZ')
      // @ts-ignore
      const newDate = new Date(date).fp_incr(1)
      // @ts-ignore
      this.$set(this.availableToConfig, 'minDate', newDate)
    }

    public changeAvailableToDate (date: any) {
      this.productCopy.availableTo = moment(date, 'YYYY-MM-DDTHH:mm:ssZ')
    }

    public addNewCategory (category: any) {
      this.save()
      const dto = {
        categoryId: category.id,
        product: {
          id: this.productCopy.id,
          administrationId: this.productCopy.administrationId,
          version: this.productCopy.version,
          createdOn: this.productCopy.createdOn,
          updatedOn: this.productCopy.updatedOn,
          availableTo: this.productCopy.availableTo,
          availableFrom: this.productCopy.availableFrom,
          price: this.productCopy.price,
          tax: this.productCopy.tax,
          productType: this.productCopy.productType
        }
      }
      this.productCategoryService().create(dto).then((resp: AxiosResponse) => {
        this.setAlert('productCategoryUpdated', 'success')
        this.productCopy.productCategories ? this.productCopy.productCategories.push(resp.data) : this.productCopy.productCategories = [resp.data]
      })
    }

    public removeCategory (category: any) {
      let index: any = null
      let idToDelete = null
      $.each(this.productCopy.productCategories, function (k, v: any) {
        if (v.categoryId === category.id) {
          index = k
          idToDelete = v.id
        }
      })
      this.productCategoryService().delete(idToDelete).then((resp: AxiosResponse) => {
        this.setAlert('productCategoryDeleted', 'success')
        if (index !== null && this.productCopy.productCategories) {
          this.productCopy.productCategories.splice(index, 1)
        }
      })
    }

    public validateSave () {
      const self = this
      let haveError = false
      let errorMsg = ''
      $.each(this.productCopy.productLanguages, function (k, v: any) {
        if (v.name === '') {
          haveError = true
          errorMsg = self.$t('labels.errorInLang').toString() + v.langKey
        }
      })
      if (this.productCopy.price && this.productCopy.price <= 0) {
        haveError = true
        errorMsg = self.$t('labels.priceBiggerThan0').toString()
      }
      if (haveError) {
        this.isSaveDisabled = true
        this.setAlert(errorMsg, 'error')
      } else {
        this.isSaveDisabled = false
      }
    }
}
