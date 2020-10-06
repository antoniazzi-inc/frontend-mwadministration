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
  Vue.filter('formatAmount', function (value: any) {
    if (!value) return Store.state.currency + ' 0,00'
    //return Store.state.currency + ' ' + value // TODO use https://github.com/openexchangerates/accounting.js
    let val = (value/1).toFixed(2).replace('.', ',')
    return Store.state.currency + ' ' + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
  })
  Vue.filter('lower', function (value: any) {
    if (!value) return ''
    value = value.toString()
    return value.toLowerCase()
  })
}
