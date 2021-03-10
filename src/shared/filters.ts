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

import Vue from 'vue'
import moment from 'moment'
import Store from "@/store";

export const DATE_FORMAT = 'DD-MM-YYYY'
export const DATE_TIME_FORMAT = 'DD-MM-YYYY HH:mm'

export const DISPLAY_DATE_TIME_FORMAT = 'D MMM YYYY, HH:mm'

export const DATE_TIME_LONG_FORMAT = "DD-MM-YYYY'T'HH:mm"
export const INSTANT_FORMAT = "YYYY-MM-DDTHH:mm:ssZ"
export const ZONED_DATE_TIME_FORMAT = "DD-MM-YYYY'T'HH:mm:ssXXXXX"


export function initFilters () {

  Vue.filter('formatDate', function (value: string) {
    const date = moment(value)
    // @ts-ignore
    if (date._i === 'Invalid date') {
      return ''
    }
    if (value !== null && value !== undefined && value !== '') {
      return moment(String(value)).format(DATE_TIME_FORMAT)
    }
    return ''
  })

  Vue.filter('formatOnlyDate', function (value: string) {
    const date = moment(value)
    // @ts-ignore
    if (date._i === 'Invalid date') {
      return ''
    }
    if (value !== null && value !== undefined && value !== '') {
      return moment(value).format(DATE_FORMAT)
    }
    return ''
  })

  Vue.filter('formatDisplayDateTime', function (value: string) {
    const date = moment(value)
    // @ts-ignore
    if (date._i === 'Invalid date') {
      return ''
    }
    if (value !== null && value !== undefined && value !== '') {
      return moment(value).format(DISPLAY_DATE_TIME_FORMAT)
    }
    return ''
  })

  Vue.filter('formatSize', function (value: any) {
    return `${value / 1000} kb`
  })

  /*
   * usage: <p v-html="$options.filters.formatAddress(someAddressJson)"></p>
   */
  Vue.filter('formatAddress', function (value: any) {
    if (!value) return ''

    // get country, assume NLD or BEL or GER
    let ctryResult = { enName: 'Netherlands', nlName: 'Nederland' }
    if (value.countryId == 21) ctryResult = { enName: 'Belgium', nlName: 'Belgie' }
    else if (value.countryId == 80) ctryResult = { enName: 'Germany', nlName: 'Duitsland' }
    else if (value.countryId != 150) {
      Store.state.allCountries.forEach((country: any) => {
        if (country.id === value.countryId) ctryResult = country
      })
    }
    let ctry = (Store.state.currentLanguage === 'nl') ? ctryResult.nlName : ctryResult.enName
    return value.street + ' ' + value.houseNumber + '<br/>' + value.postalCode
      + ' ' + value.city + '<br/>' + ctry;
  })

  Vue.filter('formatAmount', function (value: any) {
    if (!value) return Store.state.currency + ' 0,00'
    // TODO use https://github.com/openexchangerates/accounting.js
    let val = (value/1).toFixed(2).replace('.', ',')
    return Store.state.currency + ' ' + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
  })

  Vue.filter('formatBooleanAsIcon', function (value: boolean) {
    if (value) return '<span style="color:green" class="fa fa-check"></span>'
    else return '<span style="color:red" class="fa fa-times"></span>'
  })

  Vue.filter('lower', function (value: any) {
    if (!value) return ''
    value = value.toString()
    return value.toLowerCase()
  })
}
