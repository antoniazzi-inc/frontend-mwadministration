import { Component, Vue } from 'vue-property-decorator'
import CategoriesComponent from '@/entities/home/homeSettings/categories/categories.vue'
import TagsComponent from '@/entities/home/homeSettings/tags/tags.vue'
import DefaultTextsComponent from '@/entities/home/homeSettings/defaultTexts/defaultTexts.vue'
import { mixins } from 'vue-class-component'
import DeliveryMethodsComponent from '@/entities/home/homeSettings/deliveryMethods/deliveryMethods.vue'
import PaymentMethodsComponent from '@/entities/home/homeSettings/paymentMethods/paymentMethods.vue'

@Component({
  props: {
    active: {
      type: Boolean
    }
  },
  components: {
    CategoriesComponent,
    TagsComponent,
    DefaultTextsComponent,
    DeliveryMethodsComponent,
    PaymentMethodsComponent
  }
})
export default class HomeSettingsComponent extends mixins(Vue) {
  public currentTab: string;
  constructor () {
    super()
    this.currentTab = 'cat'
  }
}
