import Vue from 'vue'
import moment from 'moment'

export const DATE_FORMAT = 'YYYY-MM-DD'
export const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm'

export const DISPLAY_DATE_TIME_FORMAT = 'D MMM YYYY, HH:mm'

export const DATE_TIME_LONG_FORMAT = "YYYY-MM-DD'T'HH:mm"
export const INSTANT_FORMAT = "YYYY-MM-DD'T'HH:mm:ssZ"
export const ZONED_DATE_TIME_FORMAT = "YYYY-MM-DD'T'HH:mm:ssXXXXX"

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
  Vue.filter('lower', function (value: any) {
    if (!value) return ''
    value = value.toString()
    return value.toLowerCase()
  })
}
