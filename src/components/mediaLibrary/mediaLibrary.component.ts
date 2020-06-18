import Component, { mixins } from 'vue-class-component'
import Vue from 'vue'
import UploadWidget from '../uploadWidget/uploadWidget.vue'
import { Inject, Watch } from 'vue-property-decorator'
import CommonHelpers from '@/shared/commonHelpers'
import ProductService from '@/shared/services/productService'
import { AxiosResponse } from 'axios'
@Component({
  components: {
    'upload-widget': UploadWidget
  },
  props: {
    items: {
      type: Array,
      default: function () {
        return []
      }
    },
    mediaLibraryType: String,
    isLoading: Boolean
  }
})
export default class MediaLibraryComponent extends mixins(CommonHelpers, Vue) {
    public productService: any = ProductService.getInstance()
    public allItems: any;
    public mediaIsLoading: boolean;
    public removeImageConfirm: boolean;
    public selected: any;
    public tabIndex: number;
    public selectedItem: any;
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
      this.tabIndex = 0
      this.selectedItem = null
      this.selectedItemBackup = null
      this.itemCaption = ''
      this.searchMedia = ''
      this.searchMediaType = 'image'
      this.uploadConfig = {
        msg: 'importThumbImg',
        extensions: '',
        accept: 'image/*',
        multiple: true,
        displayLibrary: false
      }
    }

    public searchMediaByName (searchName: any) {

    }

    @Watch('tabIndex', { immediate: true, deep: true })
    public updateTabIndex (newVal: any) {
      if (newVal === 1) {
        this.$emit('retrieveItems')
      }
    }

    @Watch('selected', { immediate: true, deep: true })
    public updateSelected (newVal: any) {
      if (newVal !== null) {
        this.selectedItem = this.allItems[newVal]
        const detailsJSON = JSON.parse(this.allItems[newVal].detailsJson)
        if (detailsJSON) {
          this.itemCaption = detailsJSON.caption
        } else {
          this.itemCaption = ''
        }
        this.selectedItemBackup = JSON.parse(JSON.stringify(this.allItems[newVal]))
      } else {
        if (this.allItems.length === 1) this.allItems = []
      }
    }

    @Watch('isLoading', { immediate: true, deep: true })
    public updateIsLoading (newVal: any) {
      this.mediaIsLoading = newVal
    }

    @Watch('items', { immediate: true, deep: true })
    public updateItems (newVal: any) {
      const self = this
      if (newVal.length) {
        self.allItems = []
        if (this.$props.mediaLibraryType === 'images') {
          $.each(newVal, function (k, v) {
            self.allItems.push(v)
          })
        }
      } else {
        self.allItems = []
      }
    }

    public openMediaLibrary () {
      //@ts-ignore
      $(this.$refs.mediaLibrary).modal('show')
    }

    public closeMediaLibrary () {
      //@ts-ignore
      $(this.$refs.mediaLibrary).modal('hide')
    }

    public removeImage () {
      const item = JSON.parse(JSON.stringify(this.selectedItem))
      this.selectedItem = null
      this.selected = null
      this.$emit('onRemove', item)
      this.removeImageConfirm = false
    }

    public filterMedia () {
      this.$emit('onFilter', this.searchMediaType)
    }

    public searchName (event: any) {
      this.$emit('onSearch', this.searchMedia)
    }

    public upload (images: any) {
      this.allItems = images
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
        // @ts-ignore
        bodyContentType: this.selectedItem.bodyContentType,
        // @ts-ignore
        detailsJson: this.selectedItem.detailsJson,
        // @ts-ignore
        id: this.selectedItem.id,
        // @ts-ignore
        name: this.selectedItem.name,
        // @ts-ignore
        createdOn: this.selectedItem.createdOn,
        // @ts-ignore
        updatedOn: this.selectedItem.updatedOn,
        // @ts-ignore
        version: this.selectedItem.version
      }
      this.productService().updateOnBucket(dto).then((resp: AxiosResponse) => {
      })
    }

    public getImageUrl (item: any) {
      if (item) return item.url + '_thumb'
      return ''
    }
}
