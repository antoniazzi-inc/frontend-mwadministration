/*
 *
 *  * Copyright 2018-2021 Antoniazzi Holding BV
 *  *
 *  * This program is free software: you can redistribute it and/or modify it
 *  * under the terms of the GNU General Public License as published by
 *  * the Free Software Foundation, either version 3 of the License,
 *  * or (at your option) any later version.
 *  *
 *  * This program is distributed in the hope that it will be useful,
 *  * but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 *  * GNU General Public License for more details.
 *  *
 *  * You should have received a copy of the GNU General Public License
 *  * along with this program. If not, see <https://www.gnu.org/licenses/>.
 *
 */

import {Component, Inject, Vue, Watch} from 'vue-property-decorator'
import Trumbowyg from 'vue-trumbowyg'
import 'trumbowyg/dist/ui/trumbowyg.css'
import JhiToggleSwitch from '@/components/toggleSwitch/toggleSwitch.vue'
import UploadWidget from '@/components/uploadWidget/uploadWidget.vue'
import {mixins} from 'vue-class-component'
import MediaLibraryComponent from '@/components/mediaLibrary/mediaLibrary.vue'
import CommonHelpers from '@/shared/commonHelpers'
import ProductService from '@/shared/services/productService'
import mediasService from '@/shared/services/mediasService'
import {IProduct, Product} from '@/shared/models/productms/ProductModel'
import {IMedia, Media} from '@/shared/models/productms/MediaModel'
import {Company, ICompany} from '@/shared/models/relationms/company.model'
import BaseImage from '@/shared/baseImage'
import {AxiosResponse} from 'axios'
import SearchableSelectComponent from "@/components/searchableSelect/searchableSelect.vue";
import {ISearchableSelectConfig, SearchableSelectConfig} from "@/shared/models/SearchableSelectConfig";
import Cropper from 'cropperjs'

@Component({
  props: {
    product: Object,
    clicked: Boolean
  },
  components: {
    SearchableSelectComponent,
    trumbowyg: Trumbowyg,
    'upload-widget': UploadWidget,
    'toggle-switch': JhiToggleSwitch,
    'media-library': MediaLibraryComponent
  }
})
export default class BrandingTabComponent extends mixins(CommonHelpers) {
  $refs!: {
    editImageRef: HTMLImageElement,
    mediaLib: MediaLibraryComponent,
    editImageUploaded: HTMLElement,
    removeEntityImage: HTMLElement,
  };

  public productService = ProductService.getInstance();
  public mediaService = mediasService.getInstance();
  public salesPageUrl = '';
  public currentTab = 'general';
  public tabIndex = 0;
  public indexToRemove: any = null;
  public mediaToRemove: any = null;
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
  public allMediaFiles: any = [];
  public imagesToResize: any = [];
  public affiliateSalesInfo = '';
  public checkoutUpsell = '';
  public thankYouContent = '';
  public thankYouRedirect = '';
  public selectedImage: any = {};
  public allMedia: any;
  public imageForEdit: any = {};
  public currentEditImage: any = {};
  public editFile: any;
  public images: any[] = [];
  public backToCallingPage = false;
  public isMediaLoading = false;
  public activeLibrary = false;
  public showImageEditor = false;
  public isSaving = false;
  public imageToDelete: any = {};
  public singleSelectConfig: ISearchableSelectConfig = new SearchableSelectConfig('name',
    'labels.chooseInvoiceTemplate', '', false,
    false, true, false, false);
  public singleProductSelectConfig: ISearchableSelectConfig = new SearchableSelectConfig('label',
    'labels.chooseProduct', '', false,
    false, true, false, false);
  public allInvoiceTemplates: any[];
  public allProducts: any[];
  public selectedInvoiceTemplate: any = null;
  public uploadConfigBranding: any;

  constructor() {
    super();
    this.allMedia = [];
    this.allMediaFiles = [];
    this.allInvoiceTemplates = [];
    this.allProducts = [];
    this.uploadConfigBranding = {};
    this.editFile = {
      blob: null,
      type: null,
      show: false,
      name: '',
      cropper: ''
    }
  }

  public makeBase64(media: any) {

  }

  @Watch('product', {immediate: true, deep: true})
  public populateProduct(newVal: any) {
    let self= this
    this.productCopy = newVal;
    if (newVal.upsellSettingsJson && JSON.parse(newVal.upsellSettingsJson)) {
      const upsell = JSON.parse(newVal.upsellSettingsJson);
      this.upsellCart1 = upsell.upsellCart1;
      this.upsellCart2 = upsell.upsellCart2;
      this.upsellCart3 = upsell.upsellCart3;
      this.checkoutUpsell = upsell.checkoutUpsell;
      this.selectedCompany = upsell.selectedCompany;
      this.affiliateSalesInfo = upsell.affiliateSalesInfo;
      this.backToCallingPage = upsell.backToCallingPage
    }
    if (newVal.thankYouPageSettingsJson && JSON.parse(newVal.thankYouPageSettingsJson)) {
      const thankyou = JSON.parse(newVal.thankYouPageSettingsJson);
      this.thankYouContent = thankyou.thankYouContent;
      this.thankYouRedirect = thankyou.thankYouRedirect
    }
    if (newVal.media && newVal.media.length) {
      let currMedia:any = {};
      newVal.media.forEach((media: IMedia, k: any) => {
        let alreadyLoaded = self.allMediaFiles.findIndex((e:any)=>e.mediaId === media.id)
        if(alreadyLoaded === -1 && self.allMediaFiles.length !== newVal.media.length)
        this.loadProperImage(media).then(resp=>{
          let blobEl = this.b64toBlob(resp, media.bodyContentType)
          let mediaId = media && media.id ? media.id : null
          let isFeatured = self.productCopy.featuredImageId === mediaId ? true : false
          currMedia = {
            "mediaId": media && media.id ? media.id : undefined,
            "fileObject": true,
            "size": 38252,
            "name": media.name,
            "type": media.bodyContentType,
            "active": false,
            "error": "",
            "success": false,
            "isFeatured": isFeatured,
            "putAction": "/upload/put",
            "postAction": "/upload/post",
            "timeout": 0,
            "file": new File([blobEl], media.name ? media.name : ''),
            "response": {},
            "progress": "0.00",
            "speed": 0,
            "data": {"_csrf_token": "xxxxxx"},
            "headers": {"X-Csrf-Token": "xxxx"},
            "id": "ngpbwnosreb" + k,
            "blob": URL.createObjectURL(blobEl),
            "thumb": URL.createObjectURL(blobEl)
          }
          self.allMediaFiles.push(currMedia)
        })
      })
    }
    this.salesPageUrl = newVal.salesPageUrl;
    this.uploadConfigBranding = {
      msg: 'ImportImagesHere',
      extensions: '',
      accept: 'image/*',
      multiple: true,
      displayLibrary: true
    };
    this.getSelectedInvoiceTemplate()
  }

  public mounted() {
    this.retrieve();
    this.editFile.cropper = new Cropper(new Image(), {
      autoCrop: false
    });
    $(this.$refs.editImageUploaded).on('shown.bs.modal', this.editImageShow)
  }

  public editImageShow() {
    let self = this;
    setTimeout(function () {
      const cropper = new Cropper(self.$refs.editImageRef, {
        autoCrop: false
      });
      self.$set(self.editFile, 'cropper', cropper)
    }, 50)
  }
  public goBack() {
    this.$router.push('/products')
  }
  public retrieve() {
    this.allCompanies = this.$store.state.lookups.companies;
    this.allInvoiceTemplates = this.$store.state.lookups.invoiceTemplates;
    this.allProducts = this.$store.state.lookups.products; // TODO remove 'this' product
    this.getSelectedInvoiceTemplate()
  }

  public getSelectedInvoiceTemplate() {
    const self = this;
    if (self.productCopy.invoiceTemplateId) {
      let template: any = null;
      $.each(self.allInvoiceTemplates, function (k, v) {
        if (v.id === self.productCopy.invoiceTemplateId) {
          template = k
        }
      });
      if (template !== null) {
        Vue.nextTick(function () {
          self.selectedInvoiceTemplate = self.allInvoiceTemplates[template]
        })
      }
    }
  }

  public uploadImgGallery(images: any) {
    const self = this;
    self.imagesToResize = [];
    $.each(images, function (k, v) {
      self.imagesToResize.push(new BaseImage(v.blob, v.type, v.name))
    })
  }

  public removeInvoiceTemplate() {
    this.selectedInvoiceTemplate = {}
  }

  public addInvoiceTemplate(template: any) {
    this.selectedInvoiceTemplate = template
  }

  public updateProduct() {
    if (this.productCopy.id) {
      this.productService.get(this.productCopy.id).then(resp => {
        this.$emit('update', resp.data);
        this.imagesToResize = []
      })
    }
  }

  public checkForHttp() {
    this.salesPageUrl = this.checkForUrlHttps(this.salesPageUrl)
  }

  public saveMedia() {
    const self = this;
    const dtoCreate: any = [];
    const dtoEdit: any = [];
    this.isSaving = true;
    this.resizeImages().then(resp => {
      $.each(resp, function (k, v: any) {
        // @ts-ignore
        if (v.id) {
          // @ts-ignore
          dtoEdit.push({id: v.id})
        } else {
          dtoCreate.push({
            name: v.name,
            images: v.images,
            bodyContentType: v.contentType
          })
        }
      });
      const toSend = {
        id: self.productCopy.id,
        params: dtoCreate
      };
      if (dtoEdit.length > 0) {
        this.isSaving = false;
      }
      if (dtoCreate.length > 0) {
        this.productService.createOnBucket(toSend).then((resp: AxiosResponse) => {
              this.setAlert('productImagesUploaded', 'success');
              this.isSaving = false;
              this.updateProduct()
        })
      }
    })
  }

  public prepareRemoveImage(item: any, index: any) {
    this.indexToRemove = index;
    this.imageToDelete = item
  }

  public createImageUrl(image: any) {
    if (image.base64) {
      return 'data:' + image.contentType + ';base64,' + image.base64
    } else {
      return image.url + '_thumb?t=' + Math.random()
    }
  }

  public removeImage(image: any) {
    this.imageToDelete = image.url ? image : this.imageToDelete;
    const self = this;
    let index: any = null;
    if (self.imageToDelete.id) {
      this.productService.deleteFromBucket(self.imageToDelete.id).then((resp: AxiosResponse) => {
        if (resp.status === 200) {
          $.each(this.productCopy.media, function (k: any, v: any) {
            if (v.id === self.imageToDelete.id) {
              index = k
            }
          });
          if (index !== null && this.productCopy.media) {
            this.productCopy.media.splice(index, 1)
          }
          this.setAlert('ImageDeleted', 'success');
          self.loadImageGallery(true);
          self.updateProduct()
        } else {
          this.setAlert(resp, 'success')
        }
        self.closeDialog()
      })
    } else {
      this.imagesToResize.splice(this.indexToRemove, 1);
      this.setAlert('ImageDeleted', 'success');
      this.closeDialog()
    }
  }

  public closeDialog() {
    (<any>this.$refs.removeEntityImage).hide()
  }



  public editImage(image: any, index: any) {
    /*const self = this;
    this.loadProperImage(image).then((resp: string) => {

      Vue.nextTick(function () {
        self.selectedImage = new BaseImage(resp, image.bodyContentType, image.name, image.id);
        self.editFile.blob = URL.createObjectURL(self.b64toBlob(resp, image.bodyContentType));
        self.editFile.name = image.name;
        self.editFile.type = image.bodyContentType;
        self.imageForEdit = index;
        self.showImageEditor = true;
        self.editFile.file =
          //@ts-ignore
          $(self.$refs.editImageUploaded).modal('show')
      })
    })*/
  }

  public rotateLeft() {
    this.editFile.cropper.rotate(-90)
  }

  public rotateRight() {
    this.editFile.cropper.rotate(90)
  }

  public crop() {
    this.editFile.cropper.crop()
  }

  public clear() {
    this.editFile.cropper.clear()
  }

  public cancelEditImage() {
    //@ts-ignore
    $(this.$refs.editImageUploaded).modal('hide');
    this.updateProduct()
  }

  public saveEditedImage() {
    const data = {
      name: this.editFile.name,
      file: {
        size: 0
      },
      size: 0
    };
    if (this.editFile.cropper) {
      const binStr = atob(this.editFile.cropper.getCroppedCanvas().toDataURL(this.editFile.type).split(',')[1]);
      const arr = new Uint8Array(binStr.length);
      for (let i = 0; i < binStr.length; i++) {
        arr[i] = binStr.charCodeAt(i)
      }
      data.file = new File([arr], data.name, {type: this.editFile.type});
      data.size = data.file.size
    }
    //TODO save edited image
    /* this.productService.updateOnBucket(data).then(resp => {
       this.setAlert('imageEdited', 'success')
       this.cancelEditImage()
     })
     this.$forceUpdate()*/
    //@ts-ignore
    $(this.$refs.editImageUploaded).modal('hide');
    return
  }

  public save() {
    this.productCopy.salesPageUrl = this.salesPageUrl;
    const thankYouPageSettingsJson = {
      thankYouContent: this.thankYouContent,
      thankYouRedirect: this.thankYouRedirect
    };
    const upsellSettingsJson = {
      upsellCart1: this.upsellCart1,
      upsellCart2: this.upsellCart2,
      upsellCart3: this.upsellCart3,
      affiliateSalesInfo: this.affiliateSalesInfo,
      checkoutUpsell: this.checkoutUpsell,
      backToCallingPage: this.backToCallingPage,
      selectedCompany: this.selectedCompany
    };
    this.productCopy.invoiceTemplateId = this.selectedInvoiceTemplate.id;
    this.productCopy.thankYouPageSettingsJson = JSON.stringify(thankYouPageSettingsJson);
    this.productCopy.upsellSettingsJson = JSON.stringify(upsellSettingsJson);
    this.productService.put(this.productCopy).then(resp => {
      this.setAlert('productUpdated', 'success')
    })
  }

  public resizeImages() {
    const self = this;
    return new Promise(async resolve => {
      let index:any = 0
      let resizedImgs:any = []
      await $.each(self.allMediaFiles, async function (k, v) {
        if (v.mediaId === undefined) {
           new BaseImage(v.blob, v.file.type, v.file.name, undefined, function (image:any) {
             let dtoImg =  image.resizeAll()
             resizedImgs.push(dtoImg)
             index = k
             if(k === self.allMediaFiles.length - 1) {
               self.resizedImages = resizedImgs
               resolve(resizedImgs)
             }
           })
        } else {
          index = k
          resizedImgs.push({id: v.mediaId})
          if(index === self.allMediaFiles.length - 1)  {
            self.resizedImages = resizedImgs
            resolve(resizedImgs)
          }
        }
      });
    })
  }

  public searchMedia(search: any) {
    this.allMedia = [];
    this.productService.getAll({page: 0, size: 100000, sort: {}}, 'name.contains=' + search).then(resp => {
      this.allMedia = resp.data
    })
  }

  public filterMedia(filter: any) {
    this.allMedia = [];
    if (filter === '*') {
      this.productService.searchMedia('', {page: 0, size: 100000, sort: {}}).then((resp: AxiosResponse) => {
        this.allMedia = resp.data
      })
    } else {
      this.productService.searchMedia('bodyContentType.contains=' + filter, {
        page: 0,
        size: 100000,
        sort: {}
      }).then((resp: AxiosResponse) => {
        this.allMedia = resp.data
      })
    }
  }

  public uploadFromGallery(image: any) {
    this.imagesToResize.push(image)
  }

  public loadImageGallery(toAvoid?: any) {
    // @ts-ignore
    this.$refs.mediaLib.openMediaLibrary()
    this.activeLibrary = true
  }

  public resetFeatureImage() {
    let self = this
    return new Promise(resolve => {
      for(let i=0;i<self.allMediaFiles.length;i++){
        self.$set(self.allMediaFiles[i], "isFeatured", false)
      }
      resolve()
    })
  }
  public changeFeaturedImage(e: any) {
    let self = this
    if(e.isFeatured){
      this.resetFeatureImage().then(()=>{
        let dto = self.productCopy
        dto.featuredImageId = self.allMediaFiles[e.index].mediaId
        this.productService.put(dto).then((resp2:AxiosResponse)=>{
          if(resp2 && resp2.data){
            self.$set(self.allMediaFiles[e.index], "isFeatured", true)
            this.$emit('update', resp2.data)
          }
        })
      })
    } else {
      this.resetFeatureImage().then(()=>{
        self.$set(self.allMediaFiles[e.index], "isFeatured", true)
      })
    }
  }
  public updateMedia(e: any) {
    //TODO
  }
  public imageUploadError(e: any) {
  }

  public imageLoaded(e: any) {
    if(!e || e.error === "") return
    let self = this
    if(e.error === 'edit'){
      if(e.mediaId) {
        this.updateMedia(e)
      }
    }
  }
  public imageUploaded(e:any){
    let self = this
    new BaseImage(e.blob, e.file.type, e.file.name, undefined, function (image:any) {
      let dtoImg =  image.resizeAll()
      let dtoCreate = [{
        name: dtoImg.name,
        images: dtoImg.images,
        bodyContentType: dtoImg.contentType
      }]
      const toSend = {
        id: self.productCopy.id,
        params: dtoCreate
      };
      self.isSaving = true
      self.productService.createOnBucket(toSend).then((resp: AxiosResponse) => {
        self.setAlert('productImagesUploaded', 'success');
        self.allMedia = resp.data
        self.isSaving = false;
        self.updateProduct()
      })
    })
  }
  public onImageRemove(e: any) {
    //@ts-ignore
    $(this.$refs.deleteImage).modal('show')
    this.mediaToRemove = e.mediaId
  }
  public deleteImageConfirmed() {
    //@ts-ignore
    $(this.$refs.deleteImage).modal('hide')
    this.mediaService.delete(this.mediaToRemove).then((resp:AxiosResponse)=>{
      if(resp){
        let ind = this.allMediaFiles.findIndex((obj:any)=>obj.mediaId === this.mediaToRemove)
        if(ind > -1){
          this.allMediaFiles.splice(ind, 1)
          this.setAlert('imageRemoved', 'success');
          this.mediaToRemove = null
        }
      }
    })
  }

  public onProgress(e:any) {
  }
  public loadFileLibrary() {
    this.isMediaLoading = true;
    this.productService.loadAllMedia({page: 0, size: 100000, sort: {}}).then(resp => {
      this.isMediaLoading = false;
      this.allMedia = resp
    })
  }
}
