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
    dto.customer = this.customer
    dto.customer.defaultPaymentMethodId = this.selectedPaymentMethod ? this.selectedPaymentMethod.value.id : undefined
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
