import { Component, Inject, Vue, Watch } from 'vue-property-decorator'
import UploadWidget from '@/components/uploadWidget/uploadWidget.vue'
import { Money } from 'v-money'
import moment from 'moment'
import flatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'
import { IProduct, Product } from '@/shared/models/productms/ProductModel'
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
import { ProductLanguage } from '@/shared/models/productms/ProductLanguageModel'
import Store from '@/store/index'
import {ProductCategory} from "@/shared/models/productms/ProductCategoryModel";
import {DATE_FORMAT} from "@/shared/filters";
import ProductPriceComponent from "@/entities/productms/product/productPrice/productPrice.vue";
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
    SearchableSelectComponent,
    ProductPriceComponent
  }
})
export default class GeneralTabComponent extends mixins(CommonHelpers, Vue) {
    public typeServiceService: any = typeservicesService.getInstance()
    public productCategoryService: any = productcategoriesService.getInstance()
    public productService: any = ProductService.getInstance()
  public moneyFixed = {
    decimal: ',',
    thousands: '.',
    prefix: Store.state.currency,
    suffix: '',
    precision: 2,
    masked: false
  }
    public validFromConfig: any = {
      wrap: true,
      altInput: false,
      dateFormat: 'd-m-Y',
      minDate: moment().format(DATE_FORMAT)
    }

    public validToConfig: any = {
      wrap: true,
      altInput: false,
      dateFormat: 'd-m-Y',
      minDate: moment().format(DATE_FORMAT)
    }

    public voucherTimeType: any = 'hours';
    public voucherTimeVal: any = 0;
    public availableFrom: any = null;
    public availableTo: any = null;
    public productCopy: IProduct = new Product();
    public maxExceededMessage: any = [];
    public notAvailableMessage: any = [];
    public availableProductLanguages: any = {};
    public selectedCategories: any = null;
    public availableLangs: any = {};
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
      false, false, false, false, false)

    public multiLangNotAvailableConfig: IMultiLanguageConfig = new MultiLanguageConfig(false, true,
      '', 'labels.NotAvailableMessage', false,
      false, false, false, false, false)

    public isSubscription: any = false;
    public allProductsCategories: any = [];
    public multiSelectConfig: any =new SearchableSelectConfig('code',
      'labels.chooseCategory', '', false,
      false, true, true, false)

    public money: any = {
      decimal: ',',
      thousands: '.',
      prefix: Store.state.currency,
      suffix: '',
      precision: 2,
      masked: false
    };

    public allTaxRates: any = [];

    @Watch('product', { immediate: true, deep: true })
    public updateProd (newVal: any) {
      if(newVal && newVal.voucherSupport && newVal.voucherSupport === 'TIME'){
        if(newVal.voucherValue >= 60){
          this.voucherTimeType = 'hours'
          this.voucherTimeVal = newVal.voucherValue / 60
        } else {
          this.voucherTimeType = 'minutes'
          this.voucherTimeVal = newVal.voucherValue
        }
      }
      const self = this
      this.maxExceededMessage = []
      this.notAvailableMessage = []
      this.availableProductLanguages = {}
      this.selectedCategories = []
      this.productCopy = newVal
      this.availableFrom = this.$props.product.availableFrom ? moment(this.$props.product.availableFrom).format(DATE_FORMAT) : null
      this.availableTo = this.$props.product.availableTo ? moment(this.$props.product.availableTo).format(DATE_FORMAT) : null
      if(newVal.productLanguages){
      let langs:any = {}
      newVal.productLanguages.forEach((prodLang:any)=>{
        langs[prodLang.langKey] = new ProductLanguage(prodLang.createdOn, prodLang.updatedOn, prodLang.id, prodLang.version, prodLang.langKey,
          prodLang.maxExceededMessage)
      })
      this.availableLangs = langs
      }
      if (moment(this.$props.product.availableFrom).isBefore(moment())) {
        this.validFromConfig.minDate = this.availableFrom
        this.validToConfig.minDate = this.availableFrom
      }
      const selectedCat: any = []
      $.each(self.$store.state.lookups.categories, function (k, v: any) {
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
        self.availableProductLanguages[v.langKey] = self.$store.state.languages[v.langKey]
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
      let tax = this.getAllCountryTaxRates(this.$store.state.lookups.taxRates, this.$store.state.administration.country.id)
      if(tax) {
        this.allTaxRates = tax
      }
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
      this.$router.push('/products/new')
      this.closeDialog()
    }

    public closeDialog () {
      // @ts-ignore
      $(this.$refs.createNewProduct).modal('hide')
    }

    public addNewLang (lang: any) {
      this.availableLangs[lang] = new ProductLanguage()
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
      if(this.productCopy && this.productCopy.voucherSupport && this.productCopy.voucherSupport === 'TIME'){
          this.productCopy.voucherValue = this.voucherTimeVal
      } else if(this.productCopy && this.productCopy.voucherSupport && this.productCopy.voucherSupport === 'NONE'){
        this.productCopy.voucherValue = undefined
      }
      if (moment(this.availableTo).isBefore(this.availableFrom)) {
        this.availableToError = true
        return
      }
      this.productCopy.typeCourse = undefined
      // @ts-ignore
      this.productCopy.availableTo = this.productCopy.availableTo ? moment(this.productCopy.availableTo, 'YYYY-MM-DDTHH:mm')._d : null
      // @ts-ignore
      this.productCopy.availableFrom = this.productCopy.availableFrom ? moment(this.productCopy.availableFrom, 'YYYY-MM-DDTHH:mm')._d : this.$props.product.availableFrom
      this.selectedCategories.forEach((item:any,ind:any) =>{
        self.productCopy.productCategories?.push(new ProductCategory(undefined,undefined,undefined,undefined,undefined,item.id, {id: self.productCopy.id, version: self.productCopy.version},))
      })

      const dto = JSON.parse(JSON.stringify(this.productCopy))
      dto.attributes = null
      if (this.productCopy.productType === 'SERVICE') {
        this.typeServiceService.put(this.productCopy.typeService).then((resp: AxiosResponse) => {
          if(resp && resp.data){
            this.productCopy.typeService = resp.data
            this.setAlert('productUpdated', 'success')
            this.$emit('updateProductOnSocket', this.productCopy)
          }
        })
      } else {
        dto.typeDigital = undefined
        dto.followupAction = undefined
        dto.paymentSchedules = undefined
        this.productService.put(dto).then((resp:AxiosResponse) => {
          if(resp && resp.data){
            this.productCopy = resp.data
            this.setAlert('productUpdated', 'success')
          }
        })
      }
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

      const dto = {
        categoryId: category.id,
        product: {
          id: this.productCopy.id,
          version: this.productCopy.version,
        }
      }
      this.productCategoryService.post(dto).then((resp: AxiosResponse) => {
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
      this.productCategoryService.delete(idToDelete).then((resp: AxiosResponse) => {
        this.setAlert('productCategoryDeleted', 'success')
        if (index !== null && this.productCopy.productCategories) {
          this.productCopy.productCategories.splice(index, 1)
        }
      })
    }
    public goBack() {
      this.$router.push('/products')
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


  public changePrice(priceObj:any){
    this.productCopy.price = priceObj.price
    this.productCopy.priceRounding = priceObj.rounded
    this.productCopy.tax = priceObj.tax
  }
}
