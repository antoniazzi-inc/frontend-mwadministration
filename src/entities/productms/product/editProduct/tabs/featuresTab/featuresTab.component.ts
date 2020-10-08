import { Component, Inject, Vue, Watch } from 'vue-property-decorator'
import ToggleSwitch from '@/components/toggleSwitch/toggleSwitch.vue'
import { mixins } from 'vue-class-component'
import { Money } from 'v-money'
import draggable from 'vuedraggable'
import CommonHelpers from '@/shared/commonHelpers'
import attributesService from '@/shared/services/attributesService'
import attributevaluesService from '@/shared/services/attribute-valuesService'
import { IProduct, Product } from '@/shared/models/productms/ProductModel'
import { Attribute, IAttribute } from '@/shared/models/productms/AttributeModel'
import { AttributeValue, IAttributeValue } from '@/shared/models/productms/AttributeValueModel'
import { AttributeLanguage } from '@/shared/models/productms/AttributeLanguageModel'
import { AxiosResponse } from 'axios'
import MultiLanguageComponent from '@/components/multiLanguage/MultiLanguage.vue'
import { IMultiLanguageConfig, MultiLanguageConfig } from '@/shared/models/MultiLanguageConfig'
import { AttributeValueLanguage } from '@/shared/models/productms/AttributeValueLanguageModel'
import Store from '@/store/index'

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
  public attributeService: any = attributesService.getInstance();
  public attributeValueService: any = attributevaluesService.getInstance();
  public productCopy: IProduct = new Product();
  public productBackup: IProduct | null = null;
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
    prefix: Store.state.currency,
    suffix: '',
    precision: 2,
    masked: false
  };

  public multiLangConfig: IMultiLanguageConfig = new MultiLanguageConfig(true, false,
    'labels.featureName', '', false, false, false,
    true, true, false);

  public multiLangConfigOption: IMultiLanguageConfig =
    new MultiLanguageConfig(true, false,
      'labels.featureOptionName', '', false, false, false,
      true, true, false);

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
    const self = this
    const newFeature = new Attribute()
    newFeature.attributeLanguages = [new AttributeValueLanguage(undefined,undefined,undefined,undefined, this.$store.state.currentLanguage, '')]
    newFeature.attributeLanguages[0].langKey = this.$store.state.currentLanguage
    Vue.nextTick(function () {
      self.selectedProductFeature = newFeature
      self.allOptions = []
    })
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
    // @ts-ignore
    $(this.$refs.removeEntityAttribute).modal('hide')
    // @ts-ignore
    $(this.$refs.removeEntityAttributeOption).modal('hide')
  }

  public goBack() {
    this.$router.push('/products')
  }

  public saveOptionField (event: any) {
    if (!this.selectedOption.id && this.selectedProductFeature.id) {
      this.selectedOption.stock = parseInt(this.selectedOption.stock)
      const dto = this.selectedOption
      dto.attribute = {
        id: this.selectedProductFeature.id,
        version: this.selectedProductFeature.version
      }
      this.attributeValueService.post(dto).then((resp: AxiosResponse) => {
        if (resp) {
          this.editModeAttribute = false
          this.setAlert('featureOptionAdded', 'success')
          this.$emit('update')
        }
      })
    } else if (this.selectedOption.id && this.selectedProductFeature.id) {
      const dto = this.selectedOption
      dto.attribute = {
        id: this.selectedProductFeature.id,
        version: this.selectedProductFeature.version
      }
      this.attributeValueService.put(dto).then((resp: AxiosResponse) => {
        if (resp) {
          this.$emit('update')
          this.editModeAttribute = false
          this.setAlert('featureOptionEdited', 'success')
        }
      })
    } else if (!this.selectedOption.id && !this.selectedProductFeature.id) {
      this.editModeAttribute = false
    }
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
    if(this.selectedProductFeature.id)
    this.attributeValueService.updateMultiple(this.allOptions).then((resp: AxiosResponse) => {
      if (resp) {
        let options:any = []
        resp.data.forEach((option:any)=>{
          option.attribute = undefined
          options.push(option)
        })
        this.allOptions = options
        this.resetIndexes(resp.data)
        this.setAlert('attributeIndexChanged', 'success')
        this.$emit('update')
      }
    })
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

  public prepareDelete (option: any) {
  }

  public updateLang (lang: any) {
  }

  public checkIfSaveIsEnabled () {
    if (this.selectedProductFeature.attributeLanguages && this.selectedProductFeature.attributeLanguages.length && this.selectedProductFeature.attributeLanguages[0].name !== '') {
      this.isSaveDisabled = false
    } else {
      this.isSaveDisabled = true
    }
  }

  public addNewLang (lang: any) {
  }

  public save () {
    const self = this
    const product = {
      id: this.productCopy.id,
      version: this.productCopy.version
    }
    this.selectedProductFeature.visible = this.selectedProductFeature.visibleInFrontEnd
    this.selectedProductFeature.product = product
    if (this.selectedProductFeature.id) {
      const dto = JSON.parse(JSON.stringify(self.selectedProductFeature))
      dto.attributeValues = undefined
      this.attributeService.put(dto).then((resp: AxiosResponse) => {
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
      this.selectedProductFeature.attributeValues = this.allOptions
      this.attributeService.post(self.selectedProductFeature).then((resp: AxiosResponse) => {
        Vue.nextTick(function () {
          self.productCopy.attributes ? self.productCopy.attributes.push(resp.data) : self.productCopy.attributes = [resp.data]
          self.$emit('update', self.productCopy)
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

  public getSortedAttributes (attribute: any) {
    return attribute.sort(function (a: any, b: any) {
      return a.orderIndex - b.orderIndex
    })
  }

  public editAttribute (attribute: any) {
    const self = this
    this.editMode = true
    const sortedOptions = attribute.attributeValues.sort(function (a: any, b: any) {
      return a.orderIndex - b.orderIndex
    })
    this.allOptions = sortedOptions
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
      this.attributeValueService.delete(this.attributeOptionToDelete.id).then((resp: AxiosResponse) => {
        self.setAlert('attributeOptionDeleted', 'success')
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
      self.setAlert('attributeOptionDeleted', 'success')
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
    this.attributeService.delete(this.attributeToDelete.id).then((resp: AxiosResponse) => {
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

  public removeFeatureLang (lang: any) {
  }

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
    const lng = new AttributeValueLanguage(undefined, undefined, undefined, undefined, lang, '')
    if (this.selectedProductFeature.attributeLanguages) {
      this.selectedProductFeature.attributeLanguages.push(lng)
    } else {
      this.selectedProductFeature.attributeLanguages = [lng]
    }
  }

  public removeFeatureOptionLang (lang: any) {
  }

  public updateFeatureOptionLang (lang: any) {
    let index = null
    $.each(this.selectedOption.attributeValueLanguages, function (k, v: any) {
      if (v.langKey === lang.langKey) {
        index = k
      }
    })
    if (index !== null && this.selectedOption.attributeValueLanguages) {
      this.selectedOption.attributeValueLanguages[index] = lang
      if(!this.selectedOption.attributeValueLanguages[index].id) this.selectedOption.value = this.selectedOption.attributeValueLanguages &&
      this.selectedOption.attributeValueLanguages[0] && this.selectedOption.attributeValueLanguages[0].name ?
        this.selectedOption.attributeValueLanguages[0].name.replace(/[^a-zA-Z0-9_]/g, '') : this.selectedOption.value
    } else {
      this.addNewFeatureOptionLang(lang.langKey)
    }
  }

  public addNewFeatureOptionLang (lang: any) {
    let index = null
    $.each(this.selectedOption.attributeValueLanguages, function (k, v: any) {
      if (v.langKey === lang) {
        index = k
      }
    })
    if (index !== null && this.selectedOption.attributeValueLanguages) {
      this.selectedOption.attributeValueLanguages[index] = lang
    }else {
      const lng = new AttributeValueLanguage(undefined, undefined, undefined, undefined, lang, '')
      if (this.selectedOption.attributeValueLanguages) {
        this.selectedOption.attributeValueLanguages.push(lng)
      } else {
        this.selectedOption.attributeValueLanguages = [lng]
      }
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
