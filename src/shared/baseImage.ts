// These constants are injected via webpack environment variables.
// You can add more variables in webpack.common.js or in profile specific webpack.<dev|prod>.js files.
// If you change the values in the webpack config files, you need to re run webpack to update the application

import { Vue } from 'vue-property-decorator'

export default class BaseImage extends Vue {
    public static size4 = 2160;
    public static size3 = 1080;
    public static size2 = 720;
    public static size1 = 360;
    public static size0 = 240;
    public static sizeT = 150;
    private _width: number;
    private _height: number;
    private _base64: string;
    private _orientation: string;
    private _aspectRatio: any;
    private _contentType: string;
    private _name: string;
    private _image: any;
    private _id: any;

    constructor (base64: any, contentType: any, name: any, id?: any) {
      super()
      this.setDimensions(base64, contentType)
      this._base64 = base64
      this._contentType = contentType
      this._name = name
      this._id = id || undefined
      this._width = 0
      this._height = 0
      this._orientation = ''
      this._aspectRatio = 0
    }

    get id (): number {
      return this._id
    }

    set id (value: number) {
      this._id = value
    }

    get width (): number {
      return this._width
    }

    set width (value: number) {
      this._width = value
    }

    get height (): number {
      return this._height
    }

    set height (value: number) {
      this._height = value
    }

    get base64 (): string {
      return this._base64
    }

    set base64 (value: string) {
      this._base64 = value
    }

    get orientation (): string {
      return this._orientation
    }

    set orientation (value: string) {
      this._orientation = value
    }

    get aspectRation (): number {
      return this._aspectRatio
    }

    set aspectRation (value: number) {
      this._aspectRatio = value
    }

    get contentType (): string {
      return this._contentType
    }

    set contentType (value: string) {
      this._contentType = value
    }

    get name (): string {
      return this._name
    }

    set name (value: string) {
      this._name = value
    }

    get image (): any {
      return this._image
    }

    set image (value: any) {
      this._image = value
    }

    public static checkOrientation (width: any, height: any) {
      if (width > height) {
        return 'landscape'
      } else if (width < height) {
        return 'portrait'
      } else {
        return 'square'
      }
    }

    public static checkAspectRation (width: any, height: any, orientation: any) {
      switch (orientation) {
        case 'landscape':
          return width / height
          break
        case 'portrait':
          return height / width
          break
        case 'square':
          return 1
          break
      }
    }

    public setDimensions (base64: any, contentType: any) {
      const self = this
      const promise = new Promise(resolve => {
        const dim = {
          width: 0,
          height: 0
        }
        const selectedImage = 'data:' + contentType + ';base64,' + base64
        this.image = new Image()
        this.image.src = selectedImage
        this.image.onload = function () {
          dim.width = self.image.naturalWidth
          dim.height = self.image.naturalHeight
          resolve(dim)
        }
      })
      promise.then(resp => {
        // @ts-ignore
        this._width = resp.width
        // @ts-ignore
        this._height = resp.height
        this._orientation = BaseImage.checkOrientation(this._width, this._height)
        this._aspectRatio = BaseImage.checkAspectRation(this._width, this._height, this._orientation)
      })
    }

    public checkSide () {
      let side: any = null
      const resizeTo = []
      switch (this._orientation) {
        case 'landscape':
          side = this._height
          break
        case 'portrait':
          side = this._width
          break
        case 'square':
          side = this._height
          break
      }

      const adminHQ = false

      if (side >= 2160 && adminHQ) {
        // resize to 4k
        resizeTo.push({ size: BaseImage.size4, quality: 0.73, name: '_4K' })
      }
      resizeTo.push({ size: BaseImage.size3, quality: 0.73, name: '1K' })
      resizeTo.push({ size: BaseImage.size2, quality: 0.63, name: '720p' })
      resizeTo.push({ size: BaseImage.size1, quality: 0.60, name: '360p' })
      resizeTo.push({ size: BaseImage.sizeT, quality: 0.53, name: 'thumb' })
      return resizeTo
    }

    public resizeAll () {
      const self = this
      const resizedImages: any = []
      const sides = this.checkSide()
      $.each(sides, function (k, v) {
        resizedImages.push(self.resize(v))
      })
      return { name: this.name.replace(/ /g, '_'), images: resizedImages, contentType: this.contentType }
    }

    public resize (sizeToResize: any) {
      const canvas = document.createElement('canvas')
      // @ts-ignore
      const ctx: any = canvas.getContext('2d')
      let width = 0
      let height = 0
      switch (this._orientation) {
        case 'landscape':
          width = sizeToResize.size * this._aspectRatio
          height = sizeToResize.size
          break
        case 'portrait':
          width = sizeToResize.size
          height = sizeToResize.size * this._aspectRatio
          break
        case 'square':
          width = sizeToResize.size
          height = sizeToResize.size
          break
      }
      // @ts-ignore
      canvas.width = width
      // @ts-ignore
      canvas.height = height
      ctx.drawImage(this.image, 0, 0, width, height)

      if (this.contentType !== 'image/jpeg' && this.contentType !== 'image/jpg') {
        const img = canvas.toDataURL(this.contentType).replace(/^data:image\/[a-z]+;base64,/, '')
        return { name: sizeToResize.name, body: img }
      }
      const img = canvas.toDataURL(this.contentType, sizeToResize.quality).replace(/^data:image\/[a-z]+;base64,/, '')
      return { name: sizeToResize.name, body: img }
    }
}
