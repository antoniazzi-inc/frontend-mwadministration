import Component, { mixins } from 'vue-class-component'
import Vue from 'vue'
import UploadWidget from '../uploadWidget/uploadWidget.vue'
import { Inject, Watch } from 'vue-property-decorator'
import CommonHelpers from '@/shared/commonHelpers'
import ProductService from '@/shared/services/productService'
import { AxiosResponse } from 'axios'
import mediasService from "@/shared/services/mediasService";
import 'v-infinite-scroll/dist/v-infinite-scroll.css'
@Component({
  components: {
    'upload-widget': UploadWidget
  },
  props: {
    mediaLibraryType: String,
    active: Boolean,
  }
})
export default class MediaLibraryComponent extends mixins(CommonHelpers, Vue) {
    public productService: any = ProductService.getInstance()
    public allItems: any;
    public mediaIsLoading: boolean;
    public removeImageConfirm: boolean;
    public selected: any;
    public tabIndex: number;
    public timer: any;
    public perPage: number;
    public isLastPage: boolean;
    public mediaService:any
    public selectedItem: any;
    public mediaCategory: any;
    public page: any;
    public selectedItemBackup: any;
    public itemCaption: string;
    public searchMedia: string;
    public searchMediaType: string;
    public uploadConfig: object;
    constructor () {
      super()
      this.allItems = []
      this.mediaIsLoading = true
      this.removeImageConfirm = false
      this.selected = null
      this.mediaCategory = null
      this.timer = null
      this.tabIndex = 0
      this.isLastPage = false
      this.page = 0
      this.perPage = 21
      this.mediaService = mediasService.getInstance()
      this.selectedItem = null
      this.selectedItemBackup = null
      this.itemCaption = ''
      this.searchMedia = ''
      this.searchMediaType = 'all'
      this.uploadConfig = {
        msg: 'importThumbImg',
        extensions: '',
        accept: 'image/*',
        multiple: true,
        displayLibrary: false
      }
    }

    @Watch('active', {immediate: true, deep: true})
    public activeUpdated(newVal:any){
      if(newVal){
        this.page = parseInt((this.allItems.length / this.perPage).toString())
        this.retrieveMedia()
      }
    }

    @Watch('mediaLibraryType', {immediate: true, deep: true})
    public mediaCategoryUpdate(newVal:any){
      if(newVal){
        this.mediaCategory = newVal
      }
    }
    @Watch('selected', {immediate: true, deep: true})
    public selectedUpdate(newVal:any){
      if(newVal >= 0 && newVal !== null){
        this.selectedItem = this.allItems[newVal]
        if(this.allItems[newVal] && this.allItems[newVal].detailsJson) {
          let det = JSON.parse(this.allItems[newVal].detailsJson)
          this.itemCaption = det.caption
        }else {
          this.itemCaption = ''
        }
      }
    }


    public changeMediaCategory (e: any) {

    }
    public searchMediaByName () {
      let queryArray = []
      if(this.searchMedia){
      queryArray.push({
        mainOperator: 'and',
        children: [{
          key: 'name',
          value: this.searchMedia,
          inBetweenOperator: '==',
          afterOperator: 'or',
          exactSearch: false
        }]
      })
      }
      const finalQ = this.queryBuilder(queryArray)
      if (this.timer) clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.retrieveMedia(finalQ)
      }, 500);
    }
    public retrieveMedia(query?:any){
      let pagination = {
        page: query ? 0 : this.page,
        size: query ? 100000 : this.perPage,
        sort: 'createdOn,desc'
      }
      this.mediaIsLoading = true
      if(query) this.allItems = []
      this.mediaService.getAll(pagination, query).then((resp1:AxiosResponse) => {
      let currentMedia:any={}
        if(resp1 && resp1.data && resp1.data.content){
          if(resp1.data.length === 0) this.mediaIsLoading = false
          resp1.data.content.forEach((media:any, k:number)=>{
            let alreadyLoaded = this.allItems.findIndex((e:any)=>e.mediaId === media.id)
            if(alreadyLoaded === -1 && this.allItems.length !== resp1.data.length)
              this.loadProperImage(media).then(resp=>{
                let blobEl = this.b64toBlob(resp, media.bodyContentType)
                currentMedia = {
                  "mediaId": media && media.id ? media.id : undefined,
                  "fileObject": true,
                  "size": 38252,
                  "name": media.name,
                  "type": media.bodyContentType,
                  "url": media.url,
                  "detailsJson": media.detailsJson,
                  "active": false,
                  "error": "",
                  "updatedOn": media.updatedOn,
                  "createdOn": media.createdOn,
                  "success": false,
                  "isFeatured": false,
                  "putAction": "/upload/put",
                  "postAction": "/upload/post",
                  "timeout": 0,
                  "file": new File([blobEl], media.name ? media.name : ''),
                  "response": {},
                  "progress": "0.00",
                  "speed": 0,
                  "data": {"_csrf_token": "xxxxxx"},
                  "headers": {"X-Csrf-Token": "xxxx"},
                  "id": "ngpbwnosreb" + Math.random(),
                  "blob": URL.createObjectURL(blobEl),
                  "thumb": URL.createObjectURL(blobEl)
                }
                this.allItems.push(currentMedia)
                this.mediaIsLoading = false
                this.isLastPage = resp1.data.last
              })
          })
        } else {
          this.mediaIsLoading = false
          this.isLastPage = resp1.data.last
        }
      })
    }

    public closeMediaLibrary () {
      //@ts-ignore
      $(this.$refs.mediaLibrary).modal('hide')
      this.$emit('close')
    }
  public openMediaLibrary () {
    //@ts-ignore
    $(this.$refs.mediaLibrary).modal('show')
  }
    public removeImage () {
      const item = JSON.parse(JSON.stringify(this.selectedItem))
      this.selectedItem = null
      this.selected = null
      this.$emit('onRemove', item)
      this.removeImageConfirm = false
    }

    public filterMedia () {

    }

    public searchName (event: any) {

    }

    public upload (images: any) {

    }

    public uploadThumbnail () {
      if (this.tabIndex === 0) {
        this.$emit('onUpload', this.allItems)
      } else {
        this.$emit('onUploadGallery', this.selectedItem)
      }
      this.closeMediaLibrary()
    }

    public edit (image: any) {

    }

    public cancelUpdateImage () {
      this.selectedItem = JSON.parse(JSON.stringify(this.selectedItemBackup))
      this.selectedItemBackup = null
    }

    public updateImage () {
      // @ts-ignore
      this.selectedItem.detailsJson = JSON.stringify({
        caption: this.itemCaption
      })
      const dto = {
        bodyContentType: this.selectedItem.bodyContentType,
        detailsJson: this.selectedItem.detailsJson,
        id: this.selectedItem.mediaId,
        name: this.selectedItem.name,
        createdOn: this.selectedItem.createdOn,
        updatedOn: this.selectedItem.updatedOn,
        version: this.selectedItem.version,
        url: this.selectedItem.url
      }
      this.mediaService.put(dto).then((resp: AxiosResponse) => {
        if(resp && resp.data){
          this.selectedItem = {
            ...this.selectedItem,
            ...resp.data
          }
          let ind = this.allItems.findIndex((e:any) => e.mediaId === resp.data.id)
          if(ind>-1) this.allItems[ind] = this.selectedItem
          this.setAlert('imageUpdated','success')
        }
      })
    }

    public getImageUrl (item: any) {
      if (item) return item.thumb
      return ''
    }

    public prevPage(e:any){
      if(this.page > 0) {
        --this.page
        this.retrieveMedia()
      }
    }
    public nextPage(e:any){
      ++this.page
      this.retrieveMedia()
    }
}
