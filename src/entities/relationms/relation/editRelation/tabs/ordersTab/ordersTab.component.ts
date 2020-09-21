import {mixins} from 'vue-class-component'
import CommonHelpers from '@/shared/commonHelpers'
import {Component, Vue, Watch} from 'vue-property-decorator'
import CartOrdersService from "@/shared/services/orderms/CartOrdersService";
import PaginationTableComponent from "@/components/paginationTable/paginationTable.vue";
import {RelationEntity} from "@/shared/models/relationms/relationModel";
import {ISearchableSelectConfig, SearchableSelectConfig} from "@/shared/models/SearchableSelectConfig";

@Component({
  components: {
    PaginationTableComponent
  },
  props: {
    relation: Object,
    active: Boolean
  }
})
export default class OrdersTabComponent extends mixins(Vue, CommonHelpers) {
  public allOrders: any[]
  public cartOrderService: any
  public query: any
  public relationCopy: any
  public selectedPaymentMethod: any
  public searchableConfig: ISearchableSelectConfig

  constructor() {
    super()
    this.allOrders = []
    this.cartOrderService = CartOrdersService.getInstance()
    this.query = ''
    this.selectedPaymentMethod = null
    this.relationCopy = new RelationEntity()
    this.searchableConfig = new SearchableSelectConfig('label',
      'labels.selectPaymentMethod', '', true,
      false, false, false, false)
  }

  @Watch('relation', {immediate: true, deep: true})
  public populateOrders(newVal: any) {
    if (newVal && newVal.id) {
      this.relationCopy = newVal
      this.query = `orderCustomer.relationId==${newVal.id}`
    }
  }

  public paymentMethodChanged(method: any) {
    this.selectedPaymentMethod = method
  }
  public paymentMethodRemoved(method: any) {
    this.selectedPaymentMethod = null
  }
  public editOrder(order: any) {
    if (order && order.id)
      this.$router.push(`/orders/edit/${order.id}`)
  }

  public save(){
    //TODO Save Customer
  }
}
