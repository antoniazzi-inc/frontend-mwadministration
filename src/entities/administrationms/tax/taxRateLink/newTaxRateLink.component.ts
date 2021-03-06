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

import { Component, Vue } from 'vue-property-decorator'
import SearchableSelectComponent from '@/components/searchableSelect/searchableSelect.vue'
import { mixins } from 'vue-class-component'
import CommonHelpers from '@/shared/commonHelpers'
import flatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'
import moment from 'moment'
import { SearchableSelectConfig } from '@/shared/models/SearchableSelectConfig'
import { AxiosResponse } from 'axios'
import { ITaxRateLink, TaxRateLink } from '@/shared/models/administrationms/tax-rate-link.model'
import TaxRateLinkService from '@/shared/services/taxRateLinkService'
import {DATE_FORMAT} from "@/shared/filters";

@Component({
  components: {
    SearchableSelectComponent,
    flatPickr
  },
  beforeRouteEnter (to, from, next) {
    next((vm: any) => {
      if (to.params.id) {
        vm.retrieveItem(to.params.id)
      }
    })
  }
})
export default class NewTaxRateLinkComponent extends mixins(CommonHelpers, Vue) {
  public taxRateLink: ITaxRateLink;
  public validFromConfig: any;
  public validToConfig: any;
  public validFromDate: any;
  public validToDate: any;
  public searchableConfigFrom: any;
  public searchableConfigTo: any;
  public taxRateServiceLink: any;

  constructor () {
    super()
    this.taxRateLink = new TaxRateLink()
    this.taxRateServiceLink = TaxRateLinkService.getInstance()
    this.validFromConfig = {
      wrap: true,
      altInput: false,
      dateFormat: 'd-m-Y'
    }
    this.validToConfig = {
      wrap: true,
      altInput: false,
      dateFormat: 'd-m-Y',
      minDate: ''
    }
    this.searchableConfigFrom = new SearchableSelectConfig('rate',
      'labels.fromTaxRate', '', true,
      false, true, false, false)
    this.searchableConfigTo = new SearchableSelectConfig('rate',
      'labels.fromTaxRate', '', true,
      false, true, false, false)
    this.validFromDate = new Date()
    this.validToDate = new Date(moment(new Date()).add(1, 'day').format(DATE_FORMAT))
  }

  public mounted () {
    // this.validToConfig.min = this.validFromDate
  }

  public retrieveItem (id: number) {
    this.taxRateServiceLink.get(id).then((resp: AxiosResponse) => {
      this.taxRateLink = resp.data

      this.validFromDate = resp.data.validFrom
      this.validToDate = resp.data.validTo
    })
  }

  public cancel () {
    this.$router.go(-1)
  }

  public async save () {
    if (this.taxRateLink.fromTaxRate?.id && this.taxRateLink.toTaxRate?.id) {
      // @ts-ignore
      this.taxRateLink.validFrom = moment(this.validFromDate)
      // @ts-ignore
      this.taxRateLink.validTo = moment(this.validToDate)
      const fromLink = {
        id: this.taxRateLink.fromTaxRate?.id,
        version: this.taxRateLink.fromTaxRate?.id
      }
      const toLink = {
        id: this.taxRateLink.toTaxRate?.id,
        version: this.taxRateLink.toTaxRate?.id
      }
      this.taxRateLink.fromTaxRate = fromLink
      this.taxRateLink.toTaxRate = toLink
      if (this.taxRateLink.id) {
        this.taxRateServiceLink.put(this.taxRateLink).then((resp: AxiosResponse) => {
          if (resp) {
            this.cancel()
            this.setAlert('taxRateUpdated', 'success')
          } else {
            this.setAlert('taxRateError', 'error')
          }
        })
      } else {
        this.taxRateServiceLink.post(this.taxRateLink).then((resp: AxiosResponse) => {
          if (resp) {
            this.cancel()
            this.setAlert('taxRateCreated', 'success')
          } else {
            this.setAlert('taxRateError', 'error')
          }
        })
      }
    } else {
      this.setAlert('fillRequiredFields', 'error')
    }
  }

  public fromTaxLinkChanged (tax: any) {
    this.taxRateLink.fromTaxRate = tax
  }

  public fromTaxLinkRemoved (tax: any) {
    this.taxRateLink.fromTaxRate = undefined
  }

  public toTaxLinkChanged (tax: any) {
    this.taxRateLink.toTaxRate = tax
  }

  public toTaxLinkRemoved (tax: any) {
    this.taxRateLink.toTaxRate = undefined
  }
}
