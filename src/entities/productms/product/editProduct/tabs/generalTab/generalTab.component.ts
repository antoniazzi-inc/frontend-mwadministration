import { Component, Inject, Vue, Watch } from 'vue-property-decorator'
import JhiMultiLanguageComponent from '@/components/multiLanguage/multiLanguage.vue'
import JhiToggleSwitch from '@/components/toggleSwitch/toggleSwitch.vue'
import UploadWidget from '@/components/uploadWidget/upload-widget.vue'
import SearchableSingleSelectComponent from '@/components/searchableSelect/searchableSingleSelect.vue'
import { Money } from 'v-money'
import SearchableMultiSelectComponent from '@/components/searchableSelect/searchableMultiSelect.vue'
import DatePickerComponent from '@/components/dateComponent/DatePickerComponent.vue'
import moment from 'moment'
import { IProduct, Product } from '@/shared/models/ProductModel'
import { AxiosResponse } from 'axios'
import { mixins } from 'vue-class-component'
import CommonHelpers from '@/shared/commonHelpers'
import typeservicesService from '@/shared/services/type-servicesService'
import ProductService from '@/shared/services/productService'
import productcategoriesService from '@/shared/services/product-categoriesService'
@Component({
  props: {
    product: Object
  },
  components: {
    'jhi-multi-language': JhiMultiLanguageComponent,
    money: Money,
    'toggle-switch': JhiToggleSwitch,
    'upload-widget': UploadWidget,
    'single-select': SearchableSingleSelectComponent,
    'multi-select': SearchableMultiSelectComponent,
    'date-picker-component': DatePickerComponent
  }
})
export default class GeneralTabComponent extends mixins(CommonHelpers, Vue) {
    public typeServiceService: any = typeservicesService.getInstance()
    public productCategoryService: any = productcategoriesService.getInstance()
    public productService: any = ProductService.getInstance()

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
    public multiLangConfig: any = {
      showName: true,
      showDescription: true,
      nameLabel: 'vueadminApp.productmsProduct.productName',
      descriptionLabel: 'vueadminApp.productmsProduct.productDesc',
      requiredName: true,
      requiredDescription: false,
      enableUndoBtn: false,
      enableRemoveBtn: true,
      enableSaveBtn: false,
      showLangs: true
    };

    public multiLangMaxExceedConfig: any = {
      showName: false,
      showDescription: true,
      nameLabel: '',
      descriptionLabel: 'vueadminApp.productmsProduct.MaxExceedMessage', // this.$t('vueadminApp.productmsProduct.MaxExceedMessage'),
      requiredName: false,
      requiredDescription: false,
      enableUndoBtn: false,
      enableRemoveBtn: true,
      enableSaveBtn: false,
      showLangs: false
    };

    public multiLangNotAvailableConfig: any = {
      showName: false,
      showDescription: true,
      nameLabel: '',
      descriptionLabel: 'vueadminApp.productmsProduct.NotAvailableMessage',
      requiredName: true,
      requiredDescription: false,
      enableUndoBtn: false,
      enableRemoveBtn: true,
      enableSaveBtn: false,
      showLangs: false
    };

    public isSubscription: any = false;
    public allProductsCategories: any = [];
    public multiSelectConfig: any = {
      required: false,
      trackBy: 'code',
      allowEmpty: true
    };

    public money: any = {
      decimal: ',',
      thousands: '.',
      prefix: '€',
      suffix: '',
      precision: 2,
      masked: false
    };

    public availableFromConfig: any = {
    };

    public availableToConfig: any = {
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
      this.availableFrom = this.$props.product.availableFrom ? this.$props.product.availableFrom : null
      this.availableTo = this.$props.product.availableTo ? this.$props.product.availableTo : null
      if (moment(this.availableFrom).isBefore(moment())) {
        this.availableFromConfig.minDate = this.availableFrom
        this.availableToConfig.minDate = this.availableFrom
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
      this.validateSave()
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
      this.availableFromConfig = {
        allowInput: false,
        altInput: true,
        dateFormat: 'Y-m-d',
        minDate: 'today',
        calendarLabel: 'vueadminApp.productmsProduct.availableFrom',
        showClearBtn: false
      }
      this.availableToConfig = {
        allowInput: false,
        altInput: true,
        dateFormat: 'Y-m-d',
        // @ts-ignore
        minDate: new Date().fp_incr(1),
        calendarLabel: 'vueadminApp.productmsProduct.availableTo',
        showClearBtn: true
      }
    }

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
      this.productCopy.productLanguages ? this.productCopy.productLanguages.push(lang) : this.productCopy.productLanguages = [lang]
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
      this.productService().update(dto).then((resp: AxiosResponse) => {
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
