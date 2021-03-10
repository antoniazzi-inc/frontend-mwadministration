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
