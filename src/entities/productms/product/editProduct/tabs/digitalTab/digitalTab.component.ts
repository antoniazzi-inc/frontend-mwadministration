import { Component, Inject, Vue, Watch } from 'vue-property-decorator'
import UploadWidget from '@/components/uploadWidget/uploadWidget.vue'
import Trumbowyg from 'vue-trumbowyg'
import 'trumbowyg/dist/ui/trumbowyg.css'

import { mixins } from 'vue-class-component'
import { ITypeDigital, TypeDigital } from '@/shared/models/TypeDigitalModel'
import ToggleSwitch from '@/components/toggleSwitch/toggleSwitch.vue'
import CommonHelpers from '@/shared/commonHelpers'
import { IProduct, Product } from '@/shared/models/ProductModel'
import MultiLanguageHtmlEditorComponent from '@/components/multiLanguageHtmlEditor/MultiLanguageHtmlEditor.vue'
import { AxiosResponse } from 'axios'
import typedigitalsService from '@/shared/services/type-digitalsService'

@Component({
  props: {
    product: Object,
    clicked: Boolean
  },
  components: {
    'upload-widget': UploadWidget,
    trumbowyg: Trumbowyg,
    'toggle-switch': ToggleSwitch,
    MultiLangHtmlEditorComponent: MultiLanguageHtmlEditorComponent
  }
})
export default class DigitalTabComponent extends mixins(CommonHelpers, Vue) {
    public digitalType: ITypeDigital;
    public productCopy: IProduct;
    public productCopyBackup: any;
    public typeDigitalService: any;
    public digitalEmail: any ={
      subject: '',
      content: {},
      sendFromName: '',
      sendFromAddress: '',
      sendToAddress: ''
    };

    public errorDigitalContent: boolean;
    public isSaving: boolean;
    public uploadNewFile: boolean;

    constructor () {
      super()
      this.digitalType = new TypeDigital()
      this.typeDigitalService = typedigitalsService.getInstance()
      this.productCopy = new Product()
      this.productCopyBackup = null
      this.isSaving = false
      this.uploadNewFile = false
      this.errorDigitalContent = false
    }

  @Watch('product', { immediate: true, deep: true })
    public handleProduct (newVal: any) {}

  @Watch('clicked', { immediate: true, deep: true })
  public handleClicked (newVal: any) {
    this.productCopy = this.$props.product
    this.digitalType = this.$props.product.typeDigital ? this.$props.product.typeDigital : new TypeDigital()
    if (this.productCopyBackup === null) {
      this.productCopyBackup = JSON.parse(JSON.stringify(this.productCopy))
    }

    if (this.digitalType.email !== null) {
      this.digitalEmail = {
        subject: this.digitalType.email ? this.digitalType.email.subject : '',
        content: this.digitalType.email && this.digitalType.email.content ? JSON.parse(this.digitalType.email.content) : {},
        sendFromName: this.digitalType.email ? this.digitalType.email.sendFromName : '',
        sendToAddress: this.digitalType.email ? this.digitalType.email.sendToAddress : '',
        sendFromAddress: this.digitalType.email ? this.digitalType.email.sendFromAddress : ''
      }
    }
  }

  @Watch('digitalEmail', { immediate: true, deep: true })
  public handleDigitalMail (newVal: any) {
    if (newVal.content === '') {
      this.errorDigitalContent = false
    }
  }

    public uploadConfig = {
      msg: 'UploadFilesHere',
      extensions: '',
      accept: '*/*'
    };

    public editorConfig = {

    };

    public uploadFile (file: any) {

    }

    public checkForHttp () {
      if (this.productCopy.typeDigital && this.productCopy.typeDigital.url) { this.productCopy.typeDigital.url = this.checkForUrlHttps(this.productCopy.typeDigital.url) }
    }

    public updateEmailContent (content: any) {
      this.errorDigitalContent = false
      this.digitalEmail.content = content
      for (const property in content) {
        if (content[property] == '') {
          this.errorDigitalContent = false
          return
        }
        if (content.hasOwnProperty(property)) {
          if (content[property].length < 2) {
            this.errorDigitalContent = true
          }
        }
      }
    }

    public cancel () {
      const backup = JSON.parse(JSON.stringify(this.productCopyBackup))
      this.productCopyBackup = null
      this.$emit('updateProduct', backup)
    }

    public save () {
      const self = this
      this.digitalType.email = {
        subject: this.digitalEmail.subject,
        content: JSON.stringify(this.digitalEmail.content),
        sendFromName: this.digitalEmail.sendFromName,
        sendToAddress: this.digitalEmail.sendToAddress,
        sendFromAddress: this.digitalEmail.sendFromAddress
      }
      this.typeDigitalService.put(this.digitalType).then((resp: AxiosResponse) => {
        this.setAlert('productUpdated', 'success')
        if (this.productCopy.typeDigital) {
          this.productCopy.typeDigital = resp.data
        }
        this.productCopyBackup = JSON.parse(JSON.stringify(self.productCopy))
        this.uploadNewFile = false
      })
    }
}
