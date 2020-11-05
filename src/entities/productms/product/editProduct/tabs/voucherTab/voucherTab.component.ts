import { Component, Vue, Watch } from 'vue-property-decorator'
import { Money } from 'v-money'
import { mixins } from 'vue-class-component'
import ToggleSwitch from '@/components/toggleSwitch/toggleSwitch.vue'
import CommonHelpers from '@/shared/commonHelpers'
import { IProduct, Product } from '@/shared/models/productms/ProductModel'
import { IRegion } from '@/shared/models/administrationms/region.model'
import { ProductDeliveryMethod } from '@/shared/models/productms/ProductDeliveryMethodModel'
import { ITypePhysical, TypePhysical } from '@/shared/models/productms/TypePhysicalModel'
import typephysicalsService from '@/shared/services/type-physicalsService'
import productdeliverymethodsService from '@/shared/services/product-delivery-methodsService'
import { AxiosResponse } from 'axios'
import SearchableSelectComponent from '@/components/searchableSelect/searchableSelect.vue'
import { SearchableSelectConfig } from '@/shared/models/SearchableSelectConfig'
import Store from '@/store/index'

@Component({
  props: {
    product: Object,
    clicked: Boolean
  },
  components: {
    SearchableSelectComponent,
    'toggle-switch': ToggleSwitch,
    money: Money
  }
})
export default class VoucherTabComponent extends mixins(Vue, CommonHelpers) {
    public voucherSettings:any
    public multiSelectConfig: SearchableSelectConfig = new SearchableSelectConfig('name',
      'labels.chooseOption', '', false,
      false, true, true, false)

    public singleSelectConfig: SearchableSelectConfig = new SearchableSelectConfig('label',
      'labels.chooseShippingMethod', '', false,
      false, true, false, false)

    public singleSelectRegionConfig: SearchableSelectConfig = new SearchableSelectConfig('name',
      'labels.chooseRegion', '', false,
      false, true, false, false)

    public money = {
      decimal: ',',
      thousands: '.',
      prefix: Store.state.currency,
      suffix: '',
      precision: 2,
      masked: false
    };
    constructor() {
      super();
      this.voucherSettings = {
        type: 'money',
        numberOfMinutes: 0,
        numberOfPoints: 0,
        daysValid: 0
      }
    }

    public goBack(){}
    public cancel(){}
    public save(){}
}
