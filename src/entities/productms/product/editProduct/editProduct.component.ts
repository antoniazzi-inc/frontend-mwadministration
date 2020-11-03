import { mixins } from 'vue-class-component'
import CommonHelpers from '@/shared/commonHelpers'
import { Component, Vue } from 'vue-property-decorator'
import { AxiosResponse } from 'axios'
import ProductEditTabsComponent from '@/entities/productms/product/editProduct/tabs/productEditTabs.vue'
import ProductService from '@/shared/services/productService'
import { IProduct, Product } from '@/shared/models/productms/ProductModel'

@Component({
  components: {
    ProductEditTabsComponent
  },
  beforeRouteEnter (to, from, next) {
    next((vm: any) => {
      if (to.params.id) {
        vm.retrieveItem(to.params.id)
      }
    })
  },
  props: {
    asd: [Promise, Number, String, Boolean]
  }
})
export default class EditProductComponent extends mixins(Vue, CommonHelpers) {
  public product: IProduct;
  public productService: any;

  constructor () {
    super()
    this.product = new Product()
    this.productService = ProductService.getInstance()
  }

  public retrieveItem (id: any) {
    this.productService.get(id).then((resp: AxiosResponse) => {
      this.product = resp.data
    })
  }

  public updateProduct (prod: IProduct) {
    if (prod && prod.id) {
      this.retrieveItem(prod.id)
    } else {
      this.retrieveItem(this.product.id)
    }
  }
  /*
  * This function is called when product needs to be updated trough socket connection
  */
  public updateProductForSocket(prod: any){
    if(prod && prod.id){
      prod.typeDigital = undefined
      prod.followupAction = undefined
      prod.paymentSchedules = undefined
      this.productService.put(prod).then((resp:AxiosResponse) => {
        if(resp && resp.data) {
          this.product = resp.data
        }
      })
    }
  }
  public getProductName () {
    return this.getMultiLangName(this.product.productLanguages).name
  }

  public editRelationProfile () {
    // @ts-ignore
    this.$refs.editTabs.changeTabs('profile', 'general')
  }

  public editRelationGroups () {
    // @ts-ignore
    this.$refs.editTabs.changeTabs('profile', 'groups')
  }
}
