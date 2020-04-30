import { mixins } from 'vue-class-component'
import CommonHelpers from '@/shared/commonHelpers'
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Customer, ICustomer } from '@/shared/models/customer.model'
import ToggleSwitch from '@/components/toggleSwitch/toggleSwitch.vue'
import { ISearchableSelectConfig, SearchableSelectConfig } from '@/shared/models/SearchableSelectConfig'
import { AxiosResponse } from 'axios'
import RelationService from '@/shared/services/relationService'
import SearchableSelectComponent from '@/components/searchableSelect/searchableSelect.vue'

@Component({
  components: {
    SearchableSelectComponent,
    'toggle-switch': ToggleSwitch
  },
  props: {
    rel: Object,
    active: Boolean
  }
})
export default class CustomerSubTabComponent extends mixins(Vue, CommonHelpers) {
  public searchableConfigFrom: ISearchableSelectConfig
  public customer: ICustomer
  public selectedPaymentMethod: any
  public relationService: any
  constructor () {
    super()
    this.relationService = RelationService.getInstance()
    this.searchableConfigFrom = new SearchableSelectConfig('label',
      'labels.defaultPaymentMethod', '', false,
      false, true, false, false)
    this.customer = new Customer()
    this.selectedPaymentMethod = null
  }

  @Watch('active', { immediate: true, deep: true })
  @Watch('rel', { immediate: true, deep: true })
  public init (newVal: any) {
    if (newVal && newVal.relationCustomer) {
      this.customer = newVal.relationCustomer
    }
  }

  public save () {
    const dto = this.$props.rel
    dto.relationCustomer = this.customer
    dto.relationCustomer.defaultPaymentMethodId = this.selectedPaymentMethod ? this.selectedPaymentMethod.value.id : undefined
    this.relationService.put(dto).then((resp: AxiosResponse) => {
      if (resp) {
        this.setAlert('relationUpdated', 'success')
      } else {
        this.setAlert('relationUpdateError', 'error')
      }
    })
  }

  public cancel () {
    this.customer = this.$props.rel.relationCustomer
    let method = null
    this.$store.state.lookups.paymentMethods.forEach((payment: any) => {
      if (payment.value.id === this.customer.defaultPaymentMethodId) {
        method = payment
      }
    })
    this.selectedPaymentMethod = method
  }

  public paymentMethodChanged (method: any) {
    this.selectedPaymentMethod = method
  }

  public removePaymentMethod (method: any) {
    this.selectedPaymentMethod = null
  }
}
