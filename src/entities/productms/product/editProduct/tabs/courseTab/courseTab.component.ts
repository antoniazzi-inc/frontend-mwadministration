import { Component, Vue, Watch } from 'vue-property-decorator'
import { IProduct, Product } from '@/shared/models/ProductModel'
@Component({
  props: {
    product: Object,
    clicked: Boolean
  }
})
export default class CourseTabComponent extends Vue {
    public productCopy: IProduct = new Product();

    @Watch('clicked', { immediate: true, deep: true })
    public handleClicked (newVal: any) {
      this.productCopy = this.$props.product
    }
}
