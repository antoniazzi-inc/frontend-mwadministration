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
import { ITaxRate, TaxRate } from '@/shared/models/administrationms/tax-rate.model'
import moment from 'moment'
import { SearchableSelectConfig } from '@/shared/models/SearchableSelectConfig'
import TaxRateService from '@/shared/services/taxRateService'
import { AxiosResponse } from 'axios'
import { IMoneyConfig, MoneyConfig } from '@/shared/models/moneyConfig'
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
export default class NewTaxRateComponent extends mixins(CommonHelpers, Vue) {
  public taxRate: ITaxRate;
  public moneyConfig: IMoneyConfig;
  public validFromConfig: any;
  public validToConfig: any;
  public validFromDate: any;
  public validToDate: any;
  public searchableConfig: any;
  public taxRateService: any;

  constructor () {
    super()
    this.taxRate = new TaxRate()
    this.taxRateService = TaxRateService.getInstance()
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
    this.moneyConfig = new MoneyConfig(undefined, undefined, '', '%', 0, false)
    this.searchableConfig = new SearchableSelectConfig('enName',
      'labels.country', '', true,
      false, true, false, false)
    this.validFromDate = new Date()
    this.validToDate = new Date(moment(new Date()).add(1, 'day').format(DATE_FORMAT))
  }

  public mounted () {
    // this.validToConfig.min = this.validFromDate
  }

  public retrieveItem (id: number) {
    this.taxRateService.get(id).then((resp: AxiosResponse) => {
      this.taxRate = resp.data

      this.validFromDate = resp.data.validFrom
      this.validToDate = resp.data.validTo
    })
  }

  public cancel () {
    this.$router.go(-1)
  }

  public async save () {
    this.$validator.validateAll().then(success => {
      if (success && this.taxRate.country && this.taxRate.country.id) {
        // @ts-ignore
        this.taxRate.validFrom = moment(this.validFromDate)._d
        // @ts-ignore
        this.taxRate.validTo = moment(this.validToDate)._d
        const country = {
          id: this.taxRate.country ? this.taxRate.country.id : undefined,
          version: this.taxRate.country
            ? this.taxRate.country.version : undefined
        }
        this.taxRate.country = country
        if (this.taxRate.id) {
          this.taxRateService.put(this.taxRate).then((resp: AxiosResponse) => {
            if (resp) {
              this.cancel()
              this.setAlert('taxRateUpdated', 'success')
            } else {
              this.setAlert('taxRateError', 'error')
            }
          })
        } else {
          this.taxRateService.post(this.taxRate).then((resp: AxiosResponse) => {
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
    })
  }

  public async countryChanged (country: any) {
    this.taxRate.country = country
  }

  public async removeCountry (country: any) {
    this.taxRate.country = undefined
  }
}
