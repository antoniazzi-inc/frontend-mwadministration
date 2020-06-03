import { Component, Inject, Vue, Watch } from 'vue-property-decorator'
import ToggleSwitch from '@/components/toggleSwitch/toggleSwitch.vue'
import { mixins } from 'vue-class-component'
import { Money } from 'v-money'
import draggable from 'vuedraggable'
import CommonHelpers from '@/shared/commonHelpers'
import attributesService from '@/shared/services/attributesService'
import attributevaluesService from '@/shared/services/attribute-valuesService'
import { IProduct, Product } from '@/shared/models/ProductModel'
import { Attribute, IAttribute } from '@/shared/models/AttributeModel'
import { AttributeValue, IAttributeValue } from '@/shared/models/AttributeValueModel'
import { AttributeLanguage } from '@/shared/models/AttributeLanguageModel'
import { AxiosResponse } from 'axios'
import MultiLanguageComponent from '@/components/multiLanguage/MultiLanguage.vue'
import { IMultiLanguageConfig, MultiLanguageConfig } from '@/shared/models/MultiLanguageConfig'
import { Language } from '@/shared/models/language.model'
@Component({
  props: {
    product: Object,
    clicked: Boolean
  },
  components: {
    MultiLanguageComponent,
    'toggle-switch': ToggleSwitch,
    money: Money,
    draggable
  },
  computed: {
    dragOptions () {
      return {
        sort: true,
        animation: 200,
        group: 'orderIndex',
        disabled: false,
        ghostClass: 'ghost'
      }
    }
  }
})
export default class FeaturesTabComponent extends mixins(CommonHelpers, Vue) {
    public attributeService: any = attributesService.getInstance()
    public attributeValueService: any = attributevaluesService.getInstance()
    public productCopy: IProduct = new Product();
    public productBackup: IProduct|null = null;
    public selectedProductFeature: IAttribute = new Attribute();
    public selectedAttributeValue: IAttributeValue = new AttributeValue();
    public editMode = false;
    public enabled = true;
    public dragging = false;
    public isInit = false;
    public editAttributeValue = false;
    public isSaveDisabled = true;
    public editOptionIndex = undefined;
    public enabledSaveAttr = true;
    public editModeAttribute = false;
    public droppedOnIndex = null;
    public draggingIndex = null;
    public allOptions: any = [];
    public selectedOption: any = {};
    public attributeToDelete: IAttribute = new Attribute();
    public attributeOptionToDelete: IAttributeValue = new AttributeValue();
    public money = {
      decimal: ',',
      thousands: '.',
      prefix: '€',
      suffix: '',
      precision: 2,
      masked: false
    }

    public multiLangConfig: IMultiLanguageConfig = new MultiLanguageConfig(true, false,
      'labels.featureName', '', false, false, false,
      true, true, false)

    public multiLangConfigOption: IMultiLanguageConfig =
      new MultiLanguageConfig(true, false,
        'labels.featureOptionName', '', false, false, false,
        true, true, false)

    @Watch('product', { immediate: true, deep: true })
    public updateProd (newVal: any) {
      this.productCopy = newVal
      if (this.productBackup === null) {
        this.productBackup = JSON.parse(JSON.stringify(newVal))
      }
      this.checkIfSaveIsEnabled()
    }

    @Watch('clicked', { immediate: true, deep: true })
    public updateClicked (newVal: any) {
      this.isInit = newVal
    }

    public addNewAttributeOption () {
      const newAttributeOption = new AttributeValue()
      newAttributeOption.administrationId = this.$store.state.userIdentity.administrationId
      newAttributeOption.version = this.$store.state.userIdentity.version
      newAttributeOption.price = 0
      newAttributeOption.stock = 0
      newAttributeOption.orderIndex = this.selectedProductFeature.attributeValues ? this.selectedProductFeature.attributeValues.length + 1 : 1
      if (this.selectedProductFeature.attributeValues) {
        this.selectedProductFeature.attributeValues.push(newAttributeOption)
      } else {
        this.selectedProductFeature.attributeValues = [newAttributeOption]
      }
      this.selectedAttributeValue = newAttributeOption
      Vue.nextTick(function () {
        // @ts-ignore
        document.getElementsByClassName('scrollable')[0].scrollTop += $('.scrollable').height() + 300
      })
      this.editAttributeOption(newAttributeOption, this.selectedProductFeature.attributeValues.length - 1)
    }

    public addNewFeature () {
      const newFeature = new Attribute()
      newFeature.attributeLanguages = [new AttributeLanguage()]
      newFeature.attributeLanguages[0].langKey = this.$store.state.currentLanguage
      this.selectedProductFeature = newFeature
      this.editMode = true
    }

    public cancel () {
      const backup = JSON.parse(JSON.stringify(this.$props.product))
      this.editMode = false
      this.editAttributeValue = false
      this.productBackup = null
      this.$emit('update', backup)
      this.closeDialog()
    }

    public closeDialog () {
      (<any> this.$refs.removeEntityAttribute).hide();
      (<any> this.$refs.removeEntityAttributeOption).hide()
    }

    public saveOptionField (event: any) {
      // this.allOptions.push(this.selectedOption);
      this.editModeAttribute = false
    }

    public backToViewMode (event: any) {
      this.editModeAttribute = false
    }

    public changeIndex (event: any) {
      this.dragging = false
      const newIndex = JSON.parse(JSON.stringify(this.allOptions[event.newDraggableIndex].orderIndex))
      const oldIndex = JSON.parse(JSON.stringify(this.allOptions[event.oldDraggableIndex].orderIndex))
      this.allOptions[event.newDraggableIndex].orderIndex = oldIndex
      this.allOptions[event.oldDraggableIndex].orderIndex = newIndex
      this.resetIndexes(this.allOptions)
    }

    public resetIndexes (toSort: any) {
      const self = this
      self.allOptions = []
      for (let i = 1; i <= toSort.length; i++) {
        toSort[i - 1].orderIndex = i
      }
      const sortedOptions = toSort.sort(function (a: any, b: any) {
        return a.orderIndex - b.orderIndex
      })
      Vue.nextTick(function () {
        self.allOptions = sortedOptions
      })
    }

    public prepareDelete (option: any) {}
    public updateLang (lang: any) {
    }

    public checkIfSaveIsEnabled () {
      if (this.selectedProductFeature.attributeLanguages && this.selectedProductFeature.attributeLanguages.length && this.selectedProductFeature.attributeLanguages[0].name !== '') {
        this.isSaveDisabled = false
      } else {
        this.isSaveDisabled = true
      }
    }

    public addNewLang (lang: any) {}
    public save () {
      const self = this
      const product = {
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
      this.selectedProductFeature.product = product
      if (this.selectedProductFeature.id) {
        this.attributeService.put(self.selectedProductFeature).then((resp: AxiosResponse) => {
          self.selectedProductFeature = resp.data
          let index = null
          $.each(self.productCopy.attributes, function (k: any, v: any) {
            if (v.id === resp.data.id) {
              index = k
            }
          })
          if (index !== null && self.productCopy.attributes) {
            self.productCopy.attributes[index] = resp.data
          }
          self.setAlert('productUpdated', 'success')
          self.editAttributeValue = false
          self.editMode = false
          self.$emit('update', self.productCopy)
          self.productBackup = JSON.parse(JSON.stringify(this.productCopy))
        })
      } else {
        this.attributeService().create(self.selectedProductFeature).then((resp: AxiosResponse) => {
          Vue.nextTick(function () {
            // self.selectedProductFeature = resp;
            // self.productBackup.attributes.push(resp);
            self.productCopy.attributes ? self.productCopy.attributes.push(resp.data) : self.productCopy.attributes = [resp.data]
            self.$emit('update', self.productCopy)
            // self.productBackup = JSON.parse(JSON.stringify(self.productCopy));
          })
          self.setAlert('productUpdated', 'success')
          self.editAttributeValue = false
          self.editMode = false
        })
      }
    }

    public saveAttributeOption () {
      this.editAttributeValue = false
    }

    public editAttributeOption (option: any, index: any) {
      this.editOptionIndex = index
      this.selectedOption = option
      this.editAttribute(this.selectedProductFeature)
      this.editModeAttribute = true
    }

    public editAttribute (attribute: any) {
      const self = this
      this.editMode = true
      this.allOptions = attribute.attributeValues
      this.selectedProductFeature = new Attribute()
      Vue.nextTick(function () {
        self.selectedProductFeature = attribute
        self.$forceUpdate()
      })
    }

    public prepareRemoveAttribute (attribute: any) {
      this.attributeToDelete = attribute
    }

    public prepareRemoveAttributeOption (attributeOption: any) {
      this.attributeOptionToDelete = attributeOption
    }

    public RemoveAttributeOption () {
      const self = this
      let index: any = null
      if (this.attributeOptionToDelete.id) {
        this.attributeValueService().delete(this.attributeOptionToDelete.id).then((resp: AxiosResponse) => {
          self.setAlert('attributeOptionDeleted', 'success')
          // @ts-ignore
          this.$vueOnToast.pop('success', this.$t('attributeOptionDeleted'))
          this.closeDialog()
          $.each(this.selectedProductFeature.attributeValues, function (k: any, v: any) {
            if (v.id === self.attributeOptionToDelete.id) {
              index = k
            }
          })
          if (index !== null && self.selectedProductFeature.attributeValues) {
            let productAttrIndex = null
            self.selectedProductFeature.attributeValues.splice(index, 1)
            $.each(self.productCopy.attributes, function (k: any, l: any) {
              if (self.selectedProductFeature.id === l.id) {
                productAttrIndex = k
              }
            })
            if (productAttrIndex !== index && self.productCopy.attributes) {
              self.productCopy.attributes[index] = self.selectedProductFeature
            }
          }
          this.$emit('update', this.productCopy)
        })
      } else {
        // @ts-ignore
        this.$vueOnToast.pop('success', this.$t('attributeOptionDeleted'))
        this.closeDialog()
        $.each(this.selectedProductFeature.attributeValues, function (k, v: any) {
          if (v.id === self.attributeOptionToDelete.id) {
            index = k
          }
        })
        if (index !== null && self.selectedProductFeature.attributeValues) {
          self.selectedProductFeature.attributeValues.splice(index, 1)
        }
        this.$emit('update')
      }
    }

    public removeAttribute () {
      const self = this
      let index: any = null
      this.attributeService().delete(this.attributeToDelete.id).then((resp: AxiosResponse) => {
        // @ts-ignore
        this.setAlert('attributeDeleted', 'success')
        $.each(this.productCopy.attributes, function (k, v: any) {
          if (v.id === self.attributeToDelete.id) {
            index = k
          }
        })
        if (index !== null && self.productCopy.attributes) {
          self.productCopy.attributes.splice(index, 1)
        }
        this.closeDialog()
        this.$emit('update', self.productCopy)
      })
    }

    public removeFeatureLang (lang: any) {}
    public updateFeatureLang (lang: any) {
      let index = null
      $.each(this.selectedProductFeature.attributeLanguages, function (k, v: any) {
        if (v.langKey === lang.langKey) {
          index = k
        }
      })
      if (index !== null && this.selectedProductFeature.attributeLanguages) {
        this.selectedProductFeature.attributeLanguages[index] = lang
      } else {
        this.addNewFeatureLang(lang)
      }
    }

    public addNewFeatureLang (lang: any) {
      const lng = new Language(undefined, undefined, lang, '')
      if (this.selectedProductFeature.attributeLanguages) {
        this.selectedProductFeature.attributeLanguages.push(lng)
      } else {
        this.selectedProductFeature.attributeLanguages = [lng]
      }
    }

    public removeFeatureOptionLang (lang: any) {}
    public updateFeatureOptionLang (lang: any) {
      let index = null
      $.each(this.selectedAttributeValue.attributeValueLanguages, function (k, v: any) {
        if (v.langKey === lang.langKey) {
          index = k
        }
      })
      if (index !== null && this.selectedAttributeValue.attributeValueLanguages) {
        this.selectedAttributeValue.attributeValueLanguages[index] = lang
      } else {
        this.addNewFeatureOptionLang(lang)
      }
      this.selectedOption.value = this.selectedAttributeValue.attributeValueLanguages &&
        this.selectedAttributeValue.attributeValueLanguages[0].name
        ? this.selectedAttributeValue.attributeValueLanguages[0].name.replace(/[^a-zA-Z0-9_]/g, '') : ''
    }

    public addNewFeatureOptionLang (lang: any) {
      const lng = new Language(undefined, undefined, lang, '')
      if (this.selectedAttributeValue.attributeValueLanguages) {
        this.selectedAttributeValue.attributeValueLanguages.push(lng)
      } else {
        this.selectedAttributeValue.attributeValueLanguages = [lng]
      }
    }

    public getAttributeName (lang: any) {
      if (lang) {
        return this.getMultiLangName(lang) ? this.getMultiLangName(lang).name : ''
      } else {
        return ''
      }
    }

    public removeAttributeOption (option: any) {

    }
}
