import {Component, Vue, Watch} from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import CommonHelpers from '@/shared/commonHelpers'
import {ISearchableSelectConfig, SearchableSelectConfig} from "@/shared/models/SearchableSelectConfig";
import CartOrder from "@/shared/models/orderms/CartOrderModel";
import SearchableSelectComponent from "@/components/searchableSelect/searchableSelect.vue";
import InvoicePreviewComponent from "@/entities/orderms/order/newOrder/invoicePreview/invoicePreview.vue";
import OrderPaymentMethod from "@/shared/models/orderms/OrderPaymentMethodModel";

@Component({
  components: {
    SearchableSelectComponent,
    InvoicePreviewComponent
  },
  props: {
    cartOrder: Object,
    active: Boolean
  }
})
export default class Step3Component extends mixins(CommonHelpers, Vue) {
  public singleSelectConfigDeliveryMethod: ISearchableSelectConfig
  public selectedPaymentMethod: any
  public cartOrderCopy: any
  constructor () {
    super()
    this.singleSelectConfigDeliveryMethod = new SearchableSelectConfig('label',
      'labels.choosePaymentMethod', '', false,
      false, true, false, false, false, true)
    this.selectedPaymentMethod = null
    this.cartOrderCopy = new CartOrder()
  }
  @Watch('cartOrder', {immediate: true, deep: true})
  public cartOrderUpdate (newVal:any) {
    if(!newVal) return false
    this.cartOrderCopy = newVal
  }

  public mounted () {}

  public changePaymentMethod(method:any){
    if(!method) return false
    this.selectedPaymentMethod = method
    let payload = new OrderPaymentMethod(undefined, undefined, undefined, undefined, undefined, this.cartOrderCopy.orderCustomer?.relationId,
      this.selectedPaymentMethod.value.id, this.selectedPaymentMethod.value.administrativeCostsPercentage, this.selectedPaymentMethod.value.administrativeCostsFixed,
      this.selectedPaymentMethod.label, this.selectedPaymentMethod.value.detailsJson)
    this.$emit('onUpdate', {field: 'orderPaymentMethod', payload: payload})
  }
  public removePaymentMethod(method:any){
    this.selectedPaymentMethod = null
    this.$emit('onUpdate', {field: 'orderPaymentMethod', payload: undefined})
  }
  public validateStep(){
    return new Promise(resolve => {
      if(this.selectedPaymentMethod !== null) {
        resolve({status: true, msg: ''})
      } else {
        resolve({status: false, msg: this.$t('labels.pleaseSelectPaymentMethod')})
      }
    })
  }
}
