import { Component, Inject, Vue, Watch } from 'vue-property-decorator'
import SearchableSingleSelectComponent from '@/components/searchableSelect/searchableSingleSelect.vue'
import Trumbowyg from 'vue-trumbowyg'
import 'trumbowyg/dist/ui/trumbowyg.css'
import JhiToggleSwitch from '@/components/toggleSwitch/toggleSwitch.vue'
import UploadWidget from '@/components/uploadWidget/upload-widget.vue'
import { mixins } from 'vue-class-component'
import ImageEditorComponent from '@/components/imageEditor/image-editor.vue'
import SpinnerComponent from '@/components/spinner/spinner.vue'
import MediaLibraryComponent from '@/components/mediaLibrary/mediaLibrary.vue'
import CommonHelpers from '@/shared/commonHelpers'
import ProductService from '@/shared/services/productService'
import mediasService from '@/shared/services/mediasService'
import { IProduct, Product } from '@/shared/models/ProductModel'
import { IMedia, Media } from '@/shared/models/MediaModel'
import { Company, ICompany } from '@/shared/models/company.model'
import BaseImage from '@/shared/baseImage'
import { AxiosResponse } from 'axios'
@Component({
  props: {
    product: Object,
    clicked: Boolean
  },
  components: {
    'single-select': SearchableSingleSelectComponent,
    trumbowyg: Trumbowyg,
    spinner: SpinnerComponent,
    'upload-widget': UploadWidget,
    'toggle-switch': JhiToggleSwitch,
    'image-editor': ImageEditorComponent,
    'media-library': MediaLibraryComponent
  }
})
export default class BrandingTabComponent extends mixins(CommonHelpers) {
  $refs!: {
    mediaLib: MediaLibraryComponent;
    editImageUploaded: any;
    removeEntityImage: any;
  }

    public productService = ProductService.getInstance()
    public mediaService = mediasService.getInstance()
    public salesPageUrl = '';
    public tabIndex = 0;
    public indexToRemove: any = null;
    public productCopy: IProduct = new Product();
    public media: IMedia = new Media();
    public selectedCompany: ICompany = new Company();
    public allCompanies: ICompany[] = [];
    public editorConfig: object = {};
    public upsellCart1 = '';
    public upsellCart2 = '';
    public upsellCart3 = '';
    public socialAffiliates = '';
    public resizedImages: any = [];
    public imagesToResize: any = [];
    public affiliateSalesInfo = '';
    public checkoutUpsell = '';
    public thankYouContent = '';
    public thankYouRedirect = '';
    public selectedImage: any = {};
    public allMedia: any;
    public imageForEdit: any = {};
    public currentEditImage: any = {};
    public images: any[] = [];
    public backToCallingPage = false;
    public isMediaLoading = false;
    public showImageEditor = false;
    public isSaving = false;
    public imageToDelete: any = {};
    public singleSelectConfig: object = {
      required: true,
      trackBy: 'name',
      allowEmpty: true,
      placeholder: 'chooseInvoiceTemplate',
      showDeleteModal: false
    };

    public allInvoiceTemplates: any;
    public selectedInvoiceTemplate: any = null;
    public uploadConfigBranding: any;
    constructor () {
      super()
      this.allMedia = []
      this.allInvoiceTemplates = []
      this.uploadConfigBranding = {

      }
    }

  @Watch('product', { immediate: true, deep: true })
    public populateProduct (newVal: any) {
      this.productCopy = newVal
      if (JSON.parse(newVal.upsellSettingsJson)) {
        const upsell = JSON.parse(newVal.upsellSettingsJson)
        this.upsellCart1 = upsell.upsellCart1
        this.upsellCart2 = upsell.upsellCart2
        this.upsellCart3 = upsell.upsellCart3
        this.checkoutUpsell = upsell.checkoutUpsell
        this.selectedCompany = upsell.selectedCompany
        this.affiliateSalesInfo = upsell.affiliateSalesInfo
        this.backToCallingPage = upsell.backToCallingPage
      }
      if (JSON.parse(newVal.thankYouPageSettingsJson)) {
        const thankyou = JSON.parse(newVal.thankYouPageSettingsJson)
        this.thankYouContent = thankyou.thankYouContent
        this.thankYouRedirect = thankyou.thankYouRedirect
      }
      this.salesPageUrl = newVal.salesPageUrl
      this.uploadConfigBranding = {
        msg: 'ImportImagesHere',
        extensions: '',
        accept: 'image/*',
        multiple: true,
        displayLibrary: true
      }
      this.getSelectedInvoiceTemplate()
    }

  public mounted () {
    this.retrieve()
  }

  public retrieve () {
    this.allCompanies = this.$store.state.lookups.companies
    this.allInvoiceTemplates = this.$store.state.lookups.invoiceTemplates
    this.getSelectedInvoiceTemplate()
  }

  public getSelectedInvoiceTemplate () {
    const self = this
    if (self.productCopy.invoiceTemplateId) {
      let template: any = null
      $.each(self.allInvoiceTemplates, function (k, v) {
        if (v.id === self.productCopy.invoiceTemplateId) {
          template = k
        }
      })
      if (template !== null) {
        Vue.nextTick(function () {
          self.selectedInvoiceTemplate = self.allInvoiceTemplates[template]
        })
      }
    }
  }

  public uploadImgGallery (images: any) {
    const self = this
    self.imagesToResize = []
    $.each(images, function (k, v) {
      self.convertFileToBase64(v.file).then(resp => {
        self.imagesToResize.push(new BaseImage(resp, v.type, v.name))
      })
    })
  }

  public removeInvoiceTemplate () {
    this.selectedInvoiceTemplate = {}
  }

  public addInvoiceTemplate (template: any) {
    this.selectedInvoiceTemplate = template
  }

  public updateProduct () {
    if (this.productCopy.id) {
      this.productService.get(this.productCopy.id).then(resp => {
        this.$emit('update', resp)
        this.imagesToResize = []
      })
    }
  }

  public checkForHttp () {
    this.salesPageUrl = this.checkForUrlHttps(this.salesPageUrl)
  }

  public saveMedia () {
    const self = this
    const dtoCreate: any = []
    const dtoEdit: any = []
    this.isSaving = true
    this.resizeImages().then(resp => {
      $.each(resp, function (k, v:any) {
        // @ts-ignore
        if (v.id && v.id > 0) {
          // @ts-ignore
          dtoEdit.push({ id: v.id })
        } else {
          dtoCreate.push({
            name: v.name,
            images: v.images,
            bodyContentType: v.contentType
          })
        }
      })
      const toSend = {
        id: this.productCopy.id,
        params: dtoCreate
      }
      if (dtoEdit.length > 0) {
        $.each(dtoEdit, function (k, v) {
          if (self.productCopy.media) { self.productCopy.media.push(v) } else {
            self.productCopy.media = [v]
          }
        })
        this.productService.put(self.productCopy).then(resp => {
          this.setAlert('productImagesUpdated', 'success')
          this.isSaving = false
          this.closeDialog()
          this.updateProduct()
        })
      }
      if (dtoCreate.length > 0) {
        this.productService.createOnBucket(toSend).then((resp: AxiosResponse) => {
          this.setAlert('productImagesUpdated', 'success')
          this.isSaving = false
          this.closeDialog()
          this.updateProduct()
        })
      }
    })
  }

  public prepareRemoveImage (item: any, index: any) {
    this.indexToRemove = index
    this.imageToDelete = item
  }

  public createImageUrl (image: any) {
    if (image.base64) {
      return 'data:' + image.contentType + ';base64,' + image.base64
    } else {
      return image.url + '_thumb?t=' + Math.random()
    }
  }

  public removeImage (image: any) {
    this.imageToDelete = image.url ? image : this.imageToDelete
    const self = this
    let index: any = null
    if (self.imageToDelete.id) {
      this.productService.deleteFromBucket(self.imageToDelete.id).then((resp: AxiosResponse) => {
        if (resp.status === 200) {
          $.each(this.productCopy.media, function (k: any, v: any) {
            if (v.id === self.imageToDelete.id) {
              index = k
            }
          })
          if (index !== null && this.productCopy.media) {
            this.productCopy.media.splice(index, 1)
          }
          this.setAlert('ImageDeleted', 'success')
          self.loadImageGallery(true)
          self.updateProduct()
        } else {
          this.setAlert(resp, 'success')
        }
        self.closeDialog()
      })
    } else {
      this.imagesToResize.splice(this.indexToRemove, 1)
      this.setAlert('ImageDeleted', 'success')
      this.closeDialog()
    }
  }

  public closeDialog () {
    (<any> this.$refs.removeEntityImage).hide()
  }

  public editImage (image: any, index: any) {
    const self = this
    this.loadProperImage(image).then(resp => {
      Vue.nextTick(function () {
        self.selectedImage = new BaseImage(resp, image.bodyContentType, image.name, image.id)
        self.imageForEdit = index
        self.showImageEditor = true
      })
    })
  }

  public editImages (images: any) {
    this.imagesToResize = images
  }

  public cancelEditImage () {
    (<any> this.$refs.editImageUploaded).hide()
    this.updateProduct()
  }

  public saveEditedImage () {
    const dto = this.currentEditImage.resizeAll()
    dto.id = this.currentEditImage.id
    const dto1 = {
      id: dto.id,
      name: dto.name,
      body: dto.base64,
      bodyContentType: dto.contentType,
      detailsJson: this.productCopy.media ? this.productCopy.media[this.imageForEdit].detailsJson : undefined,
      images: dto.images
    }
    this.productService.updateOnBucket(dto1).then(resp => {
      this.setAlert('imageEdited', 'success')
      this.cancelEditImage()
    })
    this.$forceUpdate()
  }

  public updateEdited (base64: any) {
    const imgSrc = base64.replace(/^data:image\/[a-z]+;base64,/, '')
    this.currentEditImage = new BaseImage(imgSrc, this.selectedImage.contentType, this.selectedImage.name, this.selectedImage.id)
  }

  public loadImage (item: any) {
    const image = this.loadProperImage(item)
    return image
  }

  public save () {
    this.productCopy.salesPageUrl = this.salesPageUrl
    const thankYouPageSettingsJson = {
      thankYouContent: this.thankYouContent,
      thankYouRedirect: this.thankYouRedirect
    }
    const upsellSettingsJson = {
      upsellCart1: this.upsellCart1,
      upsellCart2: this.upsellCart2,
      upsellCart3: this.upsellCart3,
      affiliateSalesInfo: this.affiliateSalesInfo,
      checkoutUpsell: this.checkoutUpsell,
      backToCallingPage: this.backToCallingPage,
      selectedCompany: this.selectedCompany
    }
    this.productCopy.invoiceTemplateId = this.selectedInvoiceTemplate.id
    this.productCopy.thankYouPageSettingsJson = JSON.stringify(thankYouPageSettingsJson)
    this.productCopy.upsellSettingsJson = JSON.stringify(upsellSettingsJson)
    this.productService.put(this.productCopy).then(resp => {
      this.setAlert('productUpdated', 'success')
    })
  }

  public resizeImages () {
    const self = this
    return new Promise(resolve => {
      $.each(self.imagesToResize, function (k, v) {
        if (v.id === undefined) {
          self.resizedImages.push(v.resizeAll())
        } else {
          self.resizedImages.push({ id: v.id })
        }
      })
      resolve(self.resizedImages)
    })
  }

  public searchMedia (search: any) {
    this.allMedia = []
    this.productService.getAll({ page: 0, size: 100000, sort: {} }, 'name.contains=' + search).then(resp => {
      this.allMedia = resp.data
    })
  }

  public filterMedia (filter: any) {
    this.allMedia = []
    if (filter === '*') {
      this.productService.searchMedia('', { page: 0, size: 100000, sort: {} }).then((resp: AxiosResponse) => {
        this.allMedia = resp.data
      })
    } else {
      this.productService.searchMedia('bodyContentType.contains=' + filter, { page: 0, size: 100000, sort: {} }).then((resp: AxiosResponse) => {
        this.allMedia = resp.data
      })
    }
  }

  public uploadFromGallery (image: any) {
    this.imagesToResize.push(image)
  }

  public loadImageGallery (toAvoid?: any) {
    const self = this
    this.isMediaLoading = true
    this.productService.loadAllMedia({ page: 0, size: 100000, sort: {} }).then(resp => {
      this.isMediaLoading = false
      this.allMedia = resp
      if (!toAvoid) {
        // @ts-ignore
        self.$refs.mediaLib.openMediaLibrary()
      }
    })
  }

  public loadFileLibrary () {
    this.isMediaLoading = true
    this.productService.loadAllMedia({ page: 0, size: 100000, sort: {} }).then(resp => {
      this.isMediaLoading = false
      this.allMedia = resp
    })
  }
}
