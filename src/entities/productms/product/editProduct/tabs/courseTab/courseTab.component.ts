import { Component, Vue, Watch } from 'vue-property-decorator'
import { IProduct, Product } from '@/shared/models/productms/ProductModel'
import NewCourseComponent from "@/entities/productms/course/newCourse/newCourse.vue";
@Component({
  props: {
    product: Object,
    clicked: Boolean
  },
  components:{
    NewCourseComponent
  }
})
export default class CourseTabComponent extends Vue {
    public productCopy: IProduct
    public courseId: number|null
    constructor() {
      super();
      this.productCopy = new Product()
      this.courseId = null
    }
    @Watch('clicked', { immediate: true, deep: true })
    public handleClicked (newVal: any) {
      if(this.$props.product && this.$props.product.id){
        this.productCopy = this.$props.product
        if(this.$props.product.typeCourse.course){
          this.courseId = this.$props.product.typeCourse.course.id
        }
      }
    }
    @Watch('product', { immediate: true, deep: true })
    public handleProduct (newVal: any) {
      if(newVal && newVal.id){
        this.productCopy = newVal
        if(newVal && newVal.typeCourse && newVal.typeCourse.course){
          this.courseId = newVal.typeCourse.course.id
        }
      }
    }
  public courseSaved(){

  }
}
