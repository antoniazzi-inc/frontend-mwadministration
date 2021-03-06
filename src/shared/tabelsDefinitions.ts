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

import { ILanguage, Language } from '@/shared/models/language.model'
import Store from '../store'
import moment from 'moment'
import {DATE_FORMAT, INSTANT_FORMAT} from "@/shared/filters";
const local = localStorage.getItem('tableColumns') ? localStorage.getItem('tableColumns') : ''
const currentSettings = local ? JSON.parse(local) : {}

/*
   * Name: getCountryById
   * arg: id -> Country ID
   * description: Returns a country object
   * Author: Nick Dam
   */
function getCountryById (id: number) {
  let result = {
    enName: ''
  }
  Store.state.allCountries.forEach((country: any) => {
    if (country.id === id) {
      result = country
    }
  })
  return result
}
function getAmount(value: any) {
  if (!value) return Store.state.currency + ' 0,00'
  let val = (value/1).toFixed(2).replace('.', ',')
  return Store.state.currency + ' ' + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
}
/*
   * Name: getDiscount
   * arg: discount -> IDiscount
   * description: Returns promotion discount
   * Author: Nick Dam
   */
function getDiscount (promotionType: any) {
  let result = null
  if(!promotionType || !promotionType.discount){
    return ''
  }
  if(promotionType.discount.percentage !== undefined && promotionType.discount.percentage !== null){
    result = `${promotionType.discount.percentage}%`
  } else if(promotionType.discount.fixed !== undefined && promotionType.discount.fixed !== null){
    result = getAmount(promotionType.discount.fixed)
  } else if(promotionType.discount.noShipping){
    result = 'noShipping'
  } else {
    result = 'freeItems'
  }
  return result
}
/*
   * Name: getMultiLangName
   * arg: langs -> array of all languages
   * description: Returns a language object depending of the administration default language
   * Author: Nick Dam
   */
function getMultiLangName (langs: ILanguage[] | undefined | null) {
  if (langs && langs.length > 0) {
    let result = null
    langs.forEach(lang => {
      if (lang.langKey === Store.state.currentLanguage) {
        result = lang
      }
    })
    if (result) {
      return result
    } else {
      return new Language()
    }
  } else {
    return new Language()
  }
}

export const category = {
  actions: {
    copy: true,
    edit: true,
    delete: true,
    info: false
  },
  itemsPerPage: 10,
  cols: [
    {
      name: 'labels.administrationId',
      field: 'administrationId',
      authorities: ['ROLE_SUPER_ADMIN'],
      subField: null,
      type: '',
      sort: false
    },
    {
      name: 'labels.id',
      field: 'id',
      authorities: ['*'],
      subField: null,
      type: '',
      sort: false,
      method: null
    },
    {
      name: 'labels.code',
      field: 'code',
      authorities: ['*'],
      subField: null,
      type: '',
      sort: false,
      method: null
    },
    {
      name: 'labels.color',
      field: 'color',
      subField: null,
      type: 'color',
      authorities: ['*'],
      sort: false,
      method: null
    },
    {
      name: 'labels.createdOn',
      field: 'createdOn',
      subField: null,
      type: 'date',
      authorities: ['*'],
      sort: false,
      method: null
    }
  ]
}
export const group = {
  actions: {
    copy: true,
    edit: true,
    delete: true,
    info: false
  },
  itemsPerPage: 10,
  cols: [
    {
      name: 'labels.administrationId',
      field: 'administrationId',
      authorities: ['ROLE_SUPER_ADMIN'],
      subField: null,
      type: '',
      sort: false
    },
    {
      name: 'labels.id',
      field: 'id',
      authorities: ['*'],
      subField: null,
      type: '',
      sort: false,
      method: null
    },
    {
      name: 'labels.label',
      field: 'label',
      authorities: ['*'],
      subField: null,
      type: null,
      sort: false,
      method: null
    },
    {
      name: 'labels.category',
      field: 'category',
      subField: null,
      type: null,
      authorities: ['*'],
      sort: false,
      method: function (item: any) {
        let name = ''
        Store.state.lookups.categories.forEach((cat: any) => {
          if (cat.id === item.categoryId) {
            name = cat.code
          }
        })
        return name
      }
    },
    {
      name: 'labels.createdOn',
      field: 'createdOn',
      subField: null,
      type: 'date',
      authorities: ['*'],
      sort: false,
      method: null
    }
  ]
}
export const workflow = {
  actions: {
    copy: true,
    edit: true,
    delete: true,
    info: false
  },
  itemsPerPage: 10,
  cols: [
    {
      name: 'labels.id',
      field: 'id',
      authorities: ['*'],
      subField: null,
      type: '',
      sort: false,
      method: null
    },
    {
      name: 'labels.label',
      field: 'name',
      authorities: ['*'],
      subField: null,
      type: null,
      sort: false,
      method: null
    },
    {
      name: 'labels.description',
      field: 'description',
      authorities: ['*'],
      subField: null,
      type: null,
      sort: false,
      method: null
    },
    {
      name: 'labels.status',
      field: 'status',
      authorities: ['*'],
      subField: null,
      type: null,
      sort: false,
      method: null
    },
    {
      name: 'labels.category',
      field: 'category',
      subField: null,
      type: null,
      authorities: ['*'],
      sort: false,
      method: function (item: any) {
        let name = ''
        Store.state.lookups.categories.forEach((cat: any) => {
          if (cat.id === item.categoryId) {
            name = cat.code
          }
        })
        return name
      }
    },
    {
      name: 'labels.createdOn',
      field: 'createdOn',
      subField: null,
      type: 'date',
      authorities: ['*'],
      sort: false,
      method: null
    }
  ]
}
export const tag = {
  actions: {
    copy: true,
    edit: true,
    delete: true,
    info: false
  },
  itemsPerPage: 10,
  cols: [
    {
      name: 'labels.administrationId',
      field: 'administrationId',
      subField: null,
      type: '',
      authorities: ['ROLE_SUPER_ADMIN'],
      sort: false
    },
    {
      name: 'labels.id',
      field: 'id',
      subField: null,
      type: '',
      authorities: ['*'],
      sort: false,
      method: null
    },
    {
      name: 'labels.code',
      field: 'code',
      subField: null,
      type: '',
      authorities: ['*'],
      sort: false,
      method: null
    }, {
      name: 'labels.points',
      field: 'points',
      subField: null,
      type: '',
      authorities: ['*'],
      sort: false,
      method: null
    },
    {
      name: 'labels.createdOn',
      field: 'createdOn',
      subField: null,
      type: 'date',
      authorities: ['*'],
      sort: false,
      method: null
    }
  ]
}

export const product = {
  actions: {
    copy: false,
    edit: true,
    delete: true,
    info: false
  },
  itemsPerPage: 10,
  cols: [
    {
      name: 'labels.administrationId',
      field: 'administrationId',
      subField: null,
      type: '',
      authorities: ['ROLE_SUPER_ADMIN'],
      sort: false
    },
    {
      name: 'labels.id',
      field: 'id',
      subField: null,
      type: '',
      authorities: ['*'],
      sort: false,
      method: null
    },
    {
      name: 'labels.price',
      field: 'price',
      subField: null,
      type: '',
      authorities: ['*'],
      sort: false,
      method: function (item: any) {
        return getAmount(item.price)
      }
    },
    /*{ TODO: RETURNS AND HTML CODE to the table
      name: 'labels.price',
      field: 'price',
      subField: null,
      type: 'html',
      authorities: ['*'],
      sort: false,
      method: function (item: any) {
        return '<h1>HELLOOWW</h1>'
      }
    },*/ {
      name: 'labels.name',
      field: 'name',
      subField: null,
      type: '',
      authorities: ['*'],
      sort: false,
      method: function (item: any) {
        return getMultiLangName(item.productLanguages).name
      }
    },
    {
      name: 'labels.createdOn',
      field: 'createdOn',
      subField: null,
      type: 'date',
      authorities: ['*'],
      sort: false,
      method: null
    }, {
      name: 'labels.productCategory',
      field: 'productCategory',
      subField: null,
      type: '',
      authorities: ['*'],
      sort: false,
      method: function (item: any) {
        let result:any = []
        Store.state.lookups.categories.forEach((cat:any)=>{
          item.productCategories.forEach((prodCat:any)=>{
            if(cat.id === prodCat.categoryId){
              result.push(cat.code)
            }
          })
        })
        return result.join(', ')
      }
    }, {
      name: 'labels.productType',
      field: 'productType',
      subField: null,
      type: '',
      authorities: ['*'],
      sort: false,
      method: null
    }
  ]
}
export const invoiceTemplate = {
  actions: {
    copy: false,
    edit: true,
    delete: true,
    info: false
  },
  itemsPerPage: 10,
  cols: [
    {
      name: 'labels.administrationId',
      field: 'administrationId',
      subField: null,
      type: '',
      authorities: ['ROLE_SUPER_ADMIN'],
      sort: false
    },
    {
      name: 'labels.id',
      field: 'id',
      subField: null,
      type: '',
      authorities: ['*'],
      sort: false,
      method: null
    },
    {
      name: 'labels.name',
      field: 'name',
      subField: null,
      type: '',
      authorities: ['*'],
      sort: false,
      method: null
    }, {
      name: 'labels.description',
      field: 'description',
      subField: null,
      type: '',
      authorities: ['*'],
      sort: false,
      method: null
    },
    {
      name: 'labels.createdOn',
      field: 'createdOn',
      subField: null,
      type: 'date',
      authorities: ['*'],
      sort: false,
      method: null
    }
  ]
}

export const order = {
  actions: {
    copy: false,
    edit: true,
    info: true,
    delete: true
  },
  itemsPerPage: 10,
  cols: [
    {
      name: 'labels.administrationId',
      field: 'administrationId',
      subField: null,
      type: '',
      authorities: ['ROLE_SUPER_ADMIN'],
      sort: false
    },
    {
      name: 'labels.id',
      field: 'id',
      subField: null,
      type: '',
      authorities: ['*'],
      sort: false,
      method: null
    },
    {
      name: 'labels.createdOn',
      field: 'createdOn',
      subField: null,
      type: 'date',
      authorities: ['*'],
      sort: false,
      method: null
    }, {
      name: 'labels.customer',
      field: 'customer',
      subField: null,
      type: '',
      authorities: ['*'],
      sort: false,
      method: function (item: any) {
        return `${item.orderCustomer && item.orderCustomer.title ? item.orderCustomer.title : ''} ${item.orderCustomer ? item.orderCustomer.fullName : ''}`
      }
    }, {
      name: 'labels.description',
      field: 'description',
      subField: null,
      type: '',
      authorities: ['*'],
      sort: false,
      method: null
    },{
      name: 'labels.productFeatures',
      field: 'productFeatures',
      subField: null,
      type: '',
      authorities: ['*'],
      sort: false,
      method: function (item: any) {
        let result:any = []
        item.orderLines.forEach((orderLine:any) => {
          if(orderLine.orderProduct.orderProductAttributeValues) {
            orderLine.orderProduct.orderProductAttributeValues.forEach((attrVal:any) => {
              result.push(`${attrVal.attributeName} - ${attrVal.attributeValueName}`)
            })
          }
        })
        return result.join(',')
      }
    },{
      name: 'labels.nettoAmount',
      field: 'nettoAmount',
      subField: null,
      type: '',
      authorities: ['*'],
      sort: false,
      method: function (item: any) {
        return `${Store.state.currency} ${item.nettoAmount}`
      }
    },{
      name: 'labels.invoiceNumber',
      field: 'invoiceNumber',
      subField: null,
      type: '',
      authorities: ['*'],
      sort: false,
      method: function (item: any) {
        return item.invoice && item.invoice.invoiceNumber ? item.invoice.invoiceNumber : ''
      }
    },{
      name: 'labels.paymentStatus',
      field: 'paymentStatus',
      subField: null,
      type: 'boolean',
      authorities: ['*'],
      sort: false,
      method: function (item: any) {
        if(item.invoice) {
          return item.invoice.paid
        } else {
          return false
        }
      }
    }
  ]
}

export const promotion = {
  actions: {
    copy: false,
    edit: true,
    delete: true,
    info: false
  },
  itemsPerPage: 10,
  cols: [
    {
      name: 'labels.administrationId',
      field: 'administrationId',
      subField: null,
      type: '',
      authorities: ['ROLE_SUPER_ADMIN'],
      sort: false
    },
    {
      name: 'labels.id',
      field: 'id',
      subField: null,
      type: '',
      authorities: ['*'],
      sort: false,
      method: null
    },
    {
      name: 'labels.available',
      field: 'available',
      subField: null,
      type: '',
      authorities: ['*'],
      sort: false,
      method: function (item: any) {
        console.log(item.availableTo)
        const from = moment(item.availableFrom).format(DATE_FORMAT)
        const to = item.availableTo ? moment(item.availableTo).format(DATE_FORMAT) : null
        if(to){
          return `${from} - ${to}`
        }
        return from
      }
    }, {
      name: 'labels.name',
      field: 'name',
      subField: null,
      type: '',
      authorities: ['*'],
      sort: false,
      method: function (item: any) {
        return getMultiLangName(item.promotionLanguages).name
      }
    },
    {
      name: 'labels.promotionType',
      field: 'promotionType',
      subField: null,
      type: '',
      authorities: ['*'],
      sort: false,
      method: null
    },
    {
      name: 'labels.discount',
      field: 'discount',
      subField: null,
      type: '',
      authorities: ['*'],
      sort: false,
      method: function (item: any) {
        let result:any = ''
        switch (item.promotionType) {
          case 'TIME':
            result = getDiscount(item.typeTimeBased)
            break;
          case 'AFFILIATE':
            result = getDiscount(item.typeAffiliateBased)
            break;
          case 'BUNDLE':
            result = getDiscount(item.typeBundleBaseds[0])
            break;
          case 'COUPON':
            result = getDiscount(item.typeCouponBased)
            break;
          case 'LOYALTY':
            result = getDiscount(item.typeLoyaltyBased)
            break;
          case 'PERSONAL_COUPON':
            result = getDiscount(item.typePersonalCouponBased)
            break;
          case 'PRICE':
            result = getDiscount(item.typePriceBaseds[0])
            break;
          case 'QUANTITY':
            result = getDiscount(item.typeQuantityBaseds[0])
            break;
          case 'TEMPORARY_COUPON':
            result = getDiscount(item.typePersonalCouponBased)
            break;
        }
        return result
      }
    }, {
      name: 'labels.promotionProducts',
      field: 'products',
      subField: null,
      type: '',
      authorities: ['*'],
      sort: false,
      method: function (item: any) {
        let result = ''
        item.products.forEach((product:any, ind:number) => {
          result += getMultiLangName(product.productLanguages).name
          if(ind < item.products.length-1) {
            result += ', '
          }
        })
        return result
      }
    }
  ]
}
export const course = {
  actions: {
    copy: true,
    edit: true,
    delete: true,
    info: false
  },
  itemsPerPage: 10,
  cols: [
    {
      name: 'labels.administrationId',
      field: 'administrationId',
      authorities: ['ROLE_SUPER_ADMIN'],
      subField: null,
      type: '',
      sort: false
    },
    {
      name: 'labels.id',
      field: 'id',
      authorities: ['*'],
      subField: null,
      type: '',
      sort: false
    },
    {
      name: 'labels.name',
      field: 'name',
      subField: null,
      type: '',
      authorities: ['*'],
      sort: false,
      method: function (newVal: any) {
        return getMultiLangName(newVal.courseLanguages).name
      }
    },
    {
      name: 'labels.description',
      field: 'description',
      subField: null,
      type: '',
      authorities: ['*'],
      sort: false,
      method: function (newVal: any) {
        return getMultiLangName(newVal.courseLanguages).description
      }
    },{
      name: 'labels.eventDates',
      field: 'eventDates',
      subField: null,
      type: 'date',
      authorities: ['*'],
      sort: false,
      method: function (newVal: any) {
        let result = ''
        if(newVal && newVal.events && newVal.events.length){
          let minEvent = newVal.events.reduce((a:any, b:any) => a.eventStart <= b.eventStart ? a : b)
          let maxEvent = newVal.events.reduce((e:any, c:any) => e.eventEnd >= c.eventEnd ? e : c)
          result = `${moment(minEvent.eventStart, INSTANT_FORMAT).format(DATE_FORMAT)} - ${moment(maxEvent.eventEnd, INSTANT_FORMAT).format(DATE_FORMAT)} (${newVal.events.length} events)`
        }
        return result
      }
    }]
}
export const roles = {
  actions: {
    copy: true,
    edit: true,
    delete: true,
    info: false
  },
  itemsPerPage: 10,
  cols: [
    {
      name: 'labels.administrationId',
      field: 'administrationId',
      authorities: ['ROLE_SUPER_ADMIN'],
      subField: null,
      type: '',
      sort: false
    },
    {
      name: 'labels.id',
      field: 'id',
      subField: null,
      type: '',
      authorities: ['*'],
      sort: false,
      method: null
    },
    {
      name: 'labels.name',
      field: 'name',
      subField: null,
      type: '',
      authorities: ['*'],
      sort: false,
      method: null
    },
    {
      name: 'labels.code',
      field: 'code',
      subField: null,
      type: '',
      authorities: ['*'],
      sort: false,
      method: null
    },
    {
      name: 'labels.description',
      field: 'description',
      subField: null,
      type: '',
      authorities: ['*'],
      sort: false,
      method: null
    },
    {
      name: 'labels.updatedOn',
      field: 'updatedOn',
      subField: null,
      type: 'date',
      authorities: ['*'],
      sort: false,
      method: null
    }
  ]
}
export const users = {
  actions: {
    copy: false,
    edit: true,
    delete: true,
    info: false
  },
  itemsPerPage: 10,
  cols: [
    {
      name: 'labels.administrationId',
      field: 'administrationId',
      subField: null,
      type: '',
      authorities: ['ROLE_SUPER_ADMIN'],
      sort: false
    },
    {
      name: 'labels.id',
      field: 'id',
      subField: null,
      type: '',
      authorities: ['*'],
      sort: false,
      method: null
    },
    {
      name: 'labels.name',
      field: 'name',
      subField: null,
      type: '',
      authorities: ['*'],
      sort: false,
      method: function (newVal: any) {
        if (newVal && newVal.relationProfile) {
          const fName = newVal.relationProfile.firstName ? newVal.relationProfile.firstName : ''
          const mName = newVal.relationProfile.middleName ? newVal.relationProfile.middleName : ''
          const lName = newVal.relationProfile.lastName ? newVal.relationProfile.lastName : ''
          return `${fName} ${mName} ${lName}`
        }
      }
    },
    {
      name: 'labels.username',
      field: 'username',
      subField: null,
      type: '',
      authorities: ['*'],
      sort: false,
      method: null
    },
    {
      name: 'labels.enabled',
      field: 'enabled',
      subField: null,
      type: 'boolean',
      authorities: ['*'],
      sort: false,
      method: null
    },
    {
      name: 'labels.lastLogin',
      field: 'lastLogin',
      subField: null,
      type: '',
      authorities: ['*'],
      sort: false,
      method: null
    },
    {
      name: 'labels.roles',
      field: 'roles',
      subField: null,
      type: '',
      authorities: ['*'],
      sort: false,
      method: function (newVal: any) {
        let result:any = []
        if (newVal && newVal.roles) {
          newVal.roles.forEach((role: any, ind: number) => {
            if (ind < newVal.roles?.length - 1 && role.code !== 'ROLE_USER'&& role.code !== 'ROLE_ADMIN') {
              result.push(role.name)
            } else {
              if(role.code !== 'ROLE_USER' && role.code !== 'ROLE_ADMIN') result.push(role.name)
            }
          })
        }
        return result.join()
      }
    }
  ]
}

export const helpMaterials = {
  actions: {
    copy: true,
    edit: true,
    delete: true,
    info: false
  },
  itemsPerPage: 10,
  cols: [
    {
      name: 'labels.id',
      field: 'id',
      authorities: ['*'],
      subField: null,
      type: '',
      sort: false,
      method: null
    },
    {
      name: 'labels.helpType',
      field: 'helpType',
      authorities: ['*'],
      subField: null,
      type: '',
      sort: false,
      method: null
    },
    {
      name: 'labels.title',
      field: 'title',
      authorities: ['*'],
      subField: null,
      type: null,
      sort: false,
      method: function (item: any) {
        return getMultiLangName(item.helpContentLanguages).name
      }
    },
    {
      name: 'labels.tag',
      field: 'tags',
      authorities: ['*'],
      subField: null,
      type: null,
      sort: false,
      method: function (item: any) {
        const result: any = []
        item.tags.forEach((tag: any) => {
          result.push(getMultiLangName(tag.helpTagLanguages).name)
        })
        return result.join(', ')
      }
    },
    {
      name: 'labels.category',
      field: 'categories',
      authorities: ['*'],
      subField: 'helpCategoryLanguages',
      type: 'multiLang',
      sort: false,
      method: function (item: any) {
        const result: any = []
        item.categories.forEach((cat: any) => {
          result.push(getMultiLangName(cat.helpCategoryLanguages).name)
        })
        return result.join(', ')
      }
    },
    {
      name: 'labels.fieldCode',
      field: 'fieldCode',
      authorities: ['*'],
      subField: null,
      type: '',
      sort: false,
      method: null
    },
    {
      name: 'labels.screenCode',
      field: 'screenCode',
      authorities: ['*'],
      subField: null,
      type: '',
      sort: false,
      method: null
    },
    {
      name: 'labels.tabCode',
      field: 'tabCode',
      authorities: ['*'],
      subField: null,
      type: '',
      sort: false,
      method: null
    },
    {
      name: 'labels.popupCode',
      field: 'popupCode',
      authorities: ['*'],
      subField: null,
      type: '',
      sort: false,
      method: null
    }
  ]
}

export const helpCategory = {
  actions: {
    copy: false,
    edit: true,
    delete: true,
    info: false
  },
  itemsPerPage: 10,
  cols: [
    {
      name: 'labels.id',
      field: 'id',
      authorities: ['*'],
      subField: null,
      type: '',
      sort: false,
      method: null
    },
    {
      name: 'labels.title',
      field: 'title',
      authorities: ['*'],
      subField: null,
      type: null,
      sort: false,
      method: function (item: any) {
        return getMultiLangName(item.helpCategoryLanguages).name
      }
    },
    {
      name: 'labels.color',
      field: 'color',
      authorities: ['*'],
      type: 'color',
      subField: null,
      sort: false,
      method: null
    },
    {
      name: 'labels.createdOn',
      field: 'createdOn',
      type: 'date',
      authorities: ['*'],
      subField: null,
      sort: false,
      method: null

    },
    {
      name: 'labels.updatedOn',
      field: 'updatedOn',
      subField: null,
      type: 'date',
      authorities: ['*'],
      sort: false,
      method: null

    },
    {
      name: 'labels.children',
      field: 'children',
      subField: 'helpCategoryLanguages',
      type: 'multiLang',
      authorities: ['*'],
      sort: false,
      method: function (item: any) {
        const result: any = []
        if (item.children.length) {
          item.children.forEach((cat: any) => {
            result.push(getMultiLangName(cat.helpCategoryLanguages).name)
          })
        }
        return result.length ? result.join(', ') : '-'
      }

    },
    {
      name: 'labels.parent',
      field: 'parent',
      subField: null,
      type: null,
      authorities: ['*'],
      sort: false,
      method: function (item: any) {
        if (item.parent) return getMultiLangName(item.parent.helpCategoryLanguages).name
        return '-'
      }

    }
  ]
}


export const masterTemplate = {
  actions: {
    copy: false,
    edit: true,
    delete: true,
    info: false
  },
  itemsPerPage: 10,
  cols: [
    {
      name: 'labels.id',
      field: 'id',
      authorities: ['*'],
      type: '',
      subField: null,
      sort: false,
      method: null

    },
    {
      name: 'labels.name',
      field: 'name',
      authorities: ['*'],
      type: '',
      subField: null,
      sort: false,
      method: null

    },
    {
      name: 'labels.default',
      field: 'isDefault',
      authorities: ['*'],
      type: 'boolean',
      subField: null,
      sort: false,
      method: null
    },
    {
      name: 'labels.premium',
      field: 'isPremium',
      authorities: ['*'],
      type: 'boolean',
      subField: null,
      sort: false,
      method: null
    },
    {
      name: 'labels.createdOn',
      field: 'createdOn',
      authorities: ['*'],
      type: 'date',
      subField: null,
      sort: false,
      method: null

    },
    {
      name: 'labels.updatedOn',
      field: 'updatedOn',
      authorities: ['*'],
      type: 'date',
      subField: null,
      sort: false,
      method: null

    }
  ]
}


export const helpTag = {
  actions: {
    copy: true,
    edit: true,
    delete: true,
    info: false
  },
  itemsPerPage: 10,
  cols: [
    {
      name: 'labels.id',
      field: 'id',
      authorities: ['*'],
      type: '',
      subField: null,
      sort: false,
      method: null

    },
    {
      name: 'labels.title',
      field: 'title',
      authorities: ['*'],
      type: null,
      subField: null,
      sort: false,
      method: function (item: any) {
        return getMultiLangName(item.helpTagLanguages).name
      }

    },
    {
      name: 'labels.color',
      field: 'color',
      authorities: ['*'],
      type: 'color',
      subField: null,
      sort: false,
      method: null

    },
    {
      name: 'labels.createdOn',
      field: 'createdOn',
      authorities: ['*'],
      type: 'date',
      subField: null,
      sort: false,
      method: null

    },
    {
      name: 'labels.updatedOn',
      field: 'updatedOn',
      authorities: ['*'],
      type: 'date',
      subField: null,
      sort: false,
      method: null

    }
  ]
}
export const taxRate = {
  actions: {
    copy: false,
    edit: true,
    delete: true,
    info: false
  },
  itemsPerPage: 20,
  cols: [
    {
      name: 'labels.administrationId',
      field: 'administrationId',
      authorities: ['ROLE_SUPER_ADMIN'],
      type: '',
      subField: null,
      sort: false
    },
    {
      name: 'labels.id',
      field: 'id',
      authorities: ['*'],
      type: '',
      subField: null,
      sort: false,
      method: null

    },
    {
      name: 'labels.level',
      field: 'level',
      authorities: ['*'],
      type: '',
      subField: null,
      sort: false,
      method: null

    },
    {
      name: 'labels.rate',
      field: 'rate',
      authorities: ['*'],
      type: 'percentage',
      subField: null,
      sort: false,
      method: null

    },
    {
      name: 'labels.validFrom',
      field: 'validFrom',
      authorities: ['*'],
      type: 'date',
      subField: null,
      sort: false,
      method: null

    },
    {
      name: 'labels.validTo',
      field: 'validTo',
      authorities: ['*'],
      type: 'date',
      subField: null,
      sort: false,
      method: null

    },
    {
      name: 'labels.createdOn',
      field: 'createdOn',
      authorities: ['*'],
      type: 'date',
      subField: null,
      sort: false,
      method: null

    },
    {
      name: 'labels.country',
      field: 'country',
      authorities: ['*'],
      type: '',
      subField: null,
      sort: false,
      method: function (item: any) {
        return item.country ? item.country.enName : ''
      }

    }
  ]
}
export const taxRateLink = {
  actions: {
    copy: false,
    edit: true,
    delete: true,
    info: false
  },
  itemsPerPage: 20,
  cols: [
    {
      name: 'labels.administrationId',
      field: 'administrationId',
      authorities: ['ROLE_SUPER_ADMIN'],
      type: '',
      subField: null,
      sort: false
    },
    {
      name: 'labels.fromTaxRate',
      field: 'fromTaxRate',
      authorities: ['*'],
      type: '',
      method: function (item: any) {
        const level = item.fromTaxRate.level
        const taxRate = item.fromTaxRate.rate
        const country = item.fromTaxRate.country.enName
        const validFrom = moment(item.fromTaxRate.validFrom).format('MM/YYYY')
        const validTo = moment(item.fromTaxRate.validTo).format('MM/YYYY')
        return `Level ${level}, Rate ${taxRate}%, Country ${country}, Validity ${validFrom} - ${validTo}`
      },
      subField: 'rate',
      sort: false

    },
    {
      name: 'labels.toTaxRate',
      field: 'toTaxRate',
      authorities: ['*'],
      type: '',
      subField: 'rate',
      sort: false,
      method: function (item: any) {
        const level = item.toTaxRate.level
        const taxRate = item.toTaxRate.rate
        const country = item.toTaxRate.country.enName
        const validFrom = moment(item.toTaxRate.validFrom).format('MM/YYYY')
        const validTo = moment(item.toTaxRate.validTo).format('MM/YYYY')
        return `Level ${level}, Rate ${taxRate}%, Country ${country}, Validity ${validFrom} - ${validTo}`
      }

    }
  ]
}
export const taxRule = {
  actions: {
    copy: false,
    edit: true,
    delete: true,
    info: false
  },
  itemsPerPage: 20,
  cols: [
    {
      name: 'labels.administrationId',
      field: 'administrationId',
      authorities: ['ROLE_SUPER_ADMIN'],
      type: '',
      subField: null,
      sort: false
    },
    {
      name: 'labels.id',
      field: 'id',
      authorities: ['*'],
      type: '',
      subField: null,
      sort: false,
      method: null

    },
    {
      name: 'labels.customerType',
      field: 'customerType',
      authorities: ['*'],
      type: '',
      subField: null,
      sort: false,
      method: null

    },
    {
      name: 'labels.customerRegion',
      field: 'customerRegion',
      authorities: ['*'],
      type: '',
      subField: null,
      sort: false,
      method: null

    },
    {
      name: 'labels.ruleType',
      field: 'ruleType',
      authorities: ['*'],
      type: '',
      subField: null,
      sort: false,
      method: null

    },
    {
      name: 'labels.createdOn',
      field: 'createdOn',
      authorities: ['*'],
      type: 'date',
      subField: null,
      sort: false,
      method: null

    },
    {
      name: 'labels.country',
      field: 'country',
      authorities: ['*'],
      type: '',
      subField: 'enName',
      sort: false,
      method: function (item: any) {
        if (item && item.country) {
          return item.country.enName
        }
      }

    }
  ]
}
export const regions = {
  actions: {
    copy: false,
    edit: true,
    delete: true,
    info: false
  },
  itemsPerPage: 20,
  cols: [
    {
      name: 'labels.id',
      field: 'id',
      authorities: ['*'],
      type: '',
      subField: null,
      sort: false,
      method: null

    },
    {
      name: 'labels.name',
      field: 'name',
      authorities: ['*'],
      type: '',
      subField: null,
      sort: false,
      method: null

    },
    {
      name: 'labels.home',
      field: 'home',
      authorities: ['*'],
      type: 'boolean',
      subField: null,
      sort: false,
      method: null

    },
    {
      name: 'labels.abroad',
      field: 'abroad',
      authorities: ['*'],
      type: 'boolean',
      subField: null,
      sort: false,
      method: null

    },
    {
      name: 'labels.insideEu',
      field: 'insideEu',
      authorities: ['*'],
      type: 'boolean',
      subField: null,
      sort: false,
      method: null

    },
    {
      name: 'labels.outsideEu',
      field: 'outsideEu',
      authorities: ['*'],
      type: 'boolean',
      subField: 'enName',
      sort: false,
      method: null

    },
    {
      name: 'labels.createdOn',
      field: 'createdOn',
      authorities: ['*'],
      type: 'date',
      subField: 'enName',
      sort: false,
      method: null

    }
  ]
}

export const administration = {
  actions: {
    copy: false,
    edit: true,
    delete: true,
    info: false
  },
  itemsPerPage: 20,
  cols: [
    {
      name: 'labels.id',
      field: 'id',
      authorities: ['*'],
      type: '',
      subField: null,
      sort: false,
      method: null

    },
    {
      name: 'labels.accessCode',
      field: 'accessCode',
      authorities: ['*'],
      type: '',
      subField: null,
      sort: false,
      method: null

    },
    {
      name: 'labels.name',
      field: 'name',
      authorities: ['*'],
      type: '',
      subField: null,
      sort: false,
      method: null

    },
    {
      name: 'labels.validFrom',
      field: 'validFrom',
      authorities: ['*'],
      type: 'date',
      subField: null,
      sort: false,
      method: null

    },
    {
      name: 'labels.validTo',
      field: 'validTo',
      authorities: ['*'],
      type: 'date',
      subField: null,
      sort: false,
      method: null

    },
    {
      name: 'labels.email',
      field: 'email',
      authorities: ['*'],
      type: '',
      subField: null,
      sort: false,
      method: null

    },
    {
      name: 'labels.lastLogin',
      field: 'lastLogin',
      authorities: ['*'],
      type: 'date',
      subField: null,
      sort: false,
      method: null

    },
    {
      name: 'labels.relationsLimit',
      field: 'relationsLimit',
      authorities: ['*'],
      type: '',
      subField: null,
      sort: false,
      method: null

    },
    {
      name: 'labels.trial',
      field: 'trial',
      authorities: ['*'],
      type: 'boolean',
      subField: null,
      sort: false,
      method: null

    },
    {
      name: 'labels.useShop',
      field: 'useShop',
      authorities: ['*'],
      type: 'boolean',
      subField: null,
      sort: false,
      method: null

    },
    {
      name: 'labels.useAutomation',
      field: 'useAutomation',
      authorities: ['*'],
      type: 'boolean',
      subField: null,
      sort: false,
      method: null

    }
  ]
}
export const deliveryMethod = {
  actions: {
    copy: false,
    edit: true,
    delete: true,
    info: false
  },
  itemsPerPage: 20,
  cols: [
    {
      name: 'labels.id',
      field: 'id',
      authorities: ['*'],
      type: '',
      subField: null,
      sort: false,
      method: null

    },
    {
      name: 'labels.name',
      field: 'name',
      authorities: ['*'],
      type: null,
      subField: null,
      sort: false,
      method: function (item: any) {
        // @ts-ignore
        const lang = getMultiLangName(item.deliveryMethodLanguages).name
        return lang
      }

    },
    {
      name: 'labels.description',
      field: 'description',
      authorities: ['*'],
      type: null,
      subField: null,
      sort: false,
      method: function (item: any) {
        // @ts-ignore
        const lang = getMultiLangName(item.deliveryMethodLanguages).description
        return lang
      }

    },
    {
      name: 'labels.type',
      field: 'deliveryMethodType',
      authorities: ['*'],
      type: '',
      subField: null,
      sort: false,
      method: null

    },
    {
      name: 'labels.createdOn',
      field: 'createdOn',
      authorities: ['*'],
      type: 'date',
      subField: null,
      sort: false,
      method: null

    }
  ]
}
export const paymentMethod = {
  actions: {
    copy: false,
    edit: true,
    delete: true,
    info: false
  },
  itemsPerPage: 20,
  cols: [
    {
      name: 'labels.id',
      field: 'id',
      authorities: ['*'],
      type: '',
      subField: null,
      sort: false,
      method: null

    },
    {
      name: 'labels.name',
      field: 'name',
      authorities: ['*'],
      type: 'multiLang',
      subField: null,
      sort: false,
      method: function (item: any) {
        // @ts-ignore
        const lang = getMultiLangName(item.paymentMethodLanguages).name
        return lang
      }

    },
    {
      name: 'labels.administrationCosts',
      field: 'administrativeCostsFixed',
      authorities: ['*'],
      type: 'money',
      subField: null,
      sort: false,
      method: null

    },
    {
      name: 'labels.available',
      field: 'availability',
      authorities: ['*'],
      type: '',
      subField: null,
      sort: false,
      method: null

    },
    {
      name: 'labels.createdOn',
      field: 'createdOn',
      authorities: ['*'],
      type: 'date',
      subField: null,
      sort: false,
      method: null

    }
  ]
}

export const customField = {
  actions: {
    copy: false,
    edit: true,
    delete: true,
    info: false
  },
  itemsPerPage: 20,
  cols: [
    {
      name: 'labels.administrationId',
      field: 'administrationId',
      authorities: ['ROLE_SUPER_ADMIN'],
      type: '',
      subField: null,
      sort: false,
      method: null

    }, {
      name: 'labels.id',
      field: 'id',
      authorities: ['*'],
      type: '',
      subField: null,
      sort: false,
      method: null
    },
    {
      name: 'labels.code',
      field: 'code',
      authorities: ['*'],
      type: '',
      subField: null,
      sort: false,
      method: null

    },
    {
      name: 'labels.userVisible',
      field: 'userVisible',
      authorities: ['*'],
      type: 'boolean',
      subField: null,
      sort: false,
      method: null

    },
    {
      name: 'labels.userEditable',
      field: 'userEditable',
      authorities: ['*'],
      type: 'boolean',
      subField: null,
      sort: false,
      method: null

    },
    {
      name: 'labels.gdprSpecialField',
      field: 'gdprSpecialField',
      authorities: ['*'],
      type: 'boolean',
      subField: null,
      sort: false,
      method: null

    },
    {
      name: 'labels.customFieldType',
      field: 'customFieldType',
      authorities: ['*'],
      type: '',
      subField: null,
      sort: false,
      method: null

    },
    {
      name: 'labels.createdOn',
      field: 'createdOn',
      authorities: ['*'],
      type: 'date',
      subField: null,
      sort: false,
      method: null

    },
    {
      name: 'labels.updatedOn',
      field: 'updatedOn',
      authorities: ['*'],
      type: 'date',
      subField: null,
      sort: false,
      method: null

    }
  ]
}
export const relationOrders = {
  actions: {
    copy: false,
    edit: true,
    delete: false,
    info: false
  },
  itemsPerPage: 20,
  cols: [
    {
      name: 'labels.date',
      field: 'createdOn',
      authorities: ['*'],
      type: 'date',
      subField: null,
      sort: false,
      method: null
    }, {
      name: 'labels.invoiceNumber',
      field: 'invoice',
      authorities: ['*'],
      type: 'subField',
      subField: 'invoiceNumber',
      sort: false,
      method: null
    },
    {
      name: 'labels.amount',
      field: 'nettoAmount',
      authorities: ['*'],
      type: '',
      subField: null,
      sort: false,
      method: null

    },
    {
      name: 'labels.productName',
      field: '',
      authorities: ['*'],
      type: '',
      subField: null,
      sort: false,
      method: function (item:any) {
        let productNames:any = []
        item.orderLines.forEach((item:any)=>{
          if(item.orderProduct && item.orderProduct.productName)
            productNames.push(item.orderProduct.productName)
        })
        return productNames.join()
      }
    }
  ]
}
export const emailTexts = {
  actions: {
    copy: false,
    edit: true,
    delete: false,
    info: false
  },
  itemsPerPage: 20,
  cols: [
    {
      name: 'labels.date',
      field: 'createdOn',
      authorities: ['*'],
      type: 'date',
      subField: null,
      sort: false,
      method: null
    }, {
      name: 'labels.invoiceNumber',
      field: 'invoice',
      authorities: ['*'],
      type: 'subField',
      subField: 'invoiceNumber',
      sort: false,
      method: null
    },
    {
      name: 'labels.amount',
      field: 'nettoAmount',
      authorities: ['*'],
      type: '',
      subField: null,
      sort: false,
      method: null

    },
    {
      name: 'labels.productName',
      field: '',
      authorities: ['*'],
      type: '',
      subField: null,
      sort: false,
      method: function (item:any) {
        let productNames:any = []
        item.orderLines.forEach((item:any)=>{
          if(item.orderProduct && item.orderProduct.productName)
            productNames.push(item.orderProduct.productName)
        })
        return productNames.join()
      }
    }
  ]
}
export const relation = {
  actions: {
    copy: false,
    edit: true,
    delete: true,
    info: false
  },
  itemsPerPage: 20,
  cols: [
    {
      name: 'labels.id',
      field: 'id',
      authorities: ['*'],
      type: '',
      subField: null,
      sort: false,
      method: null

    },
    {
      name: 'labels.name',
      field: 'name',
      authorities: ['*'],
      type: 'multiLang',
      subField: null,
      sort: false,
      method: function (item: any) {
        const title = item.relationProfile && item.relationProfile.title ? item.relationProfile.title : ''
        const firstName = item.relationProfile && item.relationProfile.firstName ? item.relationProfile.firstName : ''
        const lastName = item.relationProfile && item.relationProfile.lastName ? item.relationProfile.lastName : ''
        const middleName = item.relationProfile && item.relationProfile.middleName ? item.relationProfile.middleName : ''
        return `${title} ${firstName} ${middleName} ${lastName} `
      }

    },
    {
      name: 'labels.email',
      field: 'email',
      authorities: ['*'],
      type: null,
      subField: null,
      sort: false,
      method: null

    },
    {
      name: 'labels.createdOn',
      field: 'createdOn',
      authorities: ['*'],
      type: 'date',
      subField: null,
      sort: false,
      method: null

    },
    {
      name: 'labels.postalCode',
      field: 'postalCode',
      authorities: ['*'],
      type: null,
      subField: null,
      sort: false,
      method: function (item: any) {
        if (item.relationAddresses && item.relationAddresses.length > 0) {
          return item.relationAddresses[0].postalCode
        }
        return '-'
      }
    },
    {
      name: 'labels.city',
      field: 'city',
      authorities: ['*'],
      type: null,
      subField: null,
      sort: false,
      method: function (item: any) {
        if (item.relationAddresses && item.relationAddresses.length > 0) {
          return item.relationAddresses[0].city
        }
        return '-'
      }
    },
    {
      name: 'labels.country',
      field: 'country',
      authorities: ['*'],
      type: null,
      subField: null,
      sort: false,
      method: function (item: any) {
        if (item.relationAddresses && item.relationAddresses.length > 0) {
          return getCountryById(item.relationAddresses[0].countryId).enName
        }
        return '-'
      }
    },
    {
      name: 'labels.company',
      field: 'company',
      authorities: ['*'],
      type: null,
      subField: null,
      sort: false,
      method: function (item: any) {
        if (item.relationProfile && item.relationProfile.companyName) {
          return item.relationProfile.companyName
        }
        return '-'
      }
    },
    {
      name: 'labels.points',
      field: 'points',
      authorities: ['*'],
      type: null,
      subField: null,
      sort: false,
      method: function (item: any) {
        if (item.relationProfile) {
          return item.relationProfile.points
        }
        return '-'
      }
    },
    {
      name: 'labels.relationType',
      field: 'relationType',
      authorities: ['*'],
      type: null,
      subField: null,
      sort: false,
      method: function (item: any) {
        let result = '-'
        if (item.relationProfile && item.relationProfile.categoryId) {
          Store.state.lookups.categories.forEach((cat: any) => {
            if (cat.id === item.relationProfile.categoryId) {
              result = cat.code
            }
          })
          return result
        } else {
          return '-'
        }
      }
    },
    {
      name: 'labels.tags',
      field: 'tags',
      authorities: ['*'],
      type: null,
      subField: null,
      sort: false,
      method: function (item: any) {
        const result: any = []
        if (item.relationTags && item.relationTags.length > 0) {
          Store.state.lookups.tags.forEach((localTag: any) => {
            item.relationTags.forEach((tag: any) => {
              if (localTag.id === tag.tagId) result.push(localTag.code)
            })
          })
          return result.join(', ')
        } else {
          return '-'
        }
      }
    },
    {
      name: 'labels.relationGroups',
      field: 'relationGroups',
      authorities: ['*'],
      type: null,
      subField: null,
      sort: false,
      method: function (item: any) {
        const result: any = []
        if (item.relationGroups && item.relationGroups.length > 0) {
          item.relationGroups.forEach((group: any) => {
            result.push(group.label)
          })
          return result.join(', ')
        } else {
          return '-'
        }
      }
    }
  ]
}

export const columnsVisibility = {
  relation: {
    id: true,
    name: true,
    createdOn: false,
    postalCode: false,
    city: false,
    country: false,
    tags: true,
    relationGroups: true,
    company: false,
    points: false,
    relationType: false,
    email: true,
    itemsPerPage: 20
  },
  masterTemplate:{
    itemsPerPage: 20,
    id: true,
    name: true,
    isDefault: true,
    isPremium: true,
    createdOn: true,
    updatedOn: true
  },
  order: {
    id: true,
    createdOn: true,
    customer: true,
    description: true,
    productFeatures: true,
    nettoAmount: true,
    invoiceNumber: true,
    paymentStatus: true,
    itemsPerPage: 20
  },
  helpTag: {
    id: true,
    title: true,
    color: true,
    createdOn: true,
    updatedOn: true,
    itemsPerPage: 20
  },
  helpCategory: {
    id: true,
    title: true,
    color: true,
    createdOn: true,
    updatedOn: true,
    children: true,
    parent: true,
    itemsPerPage: 20
  },
  helpMaterials: {
    id: true,
    helpType: true,
    title: true,
    tags: true,
    categories: true,
    fieldCode: true,
    screenCode: true,
    tabCode: true,
    popupCode: true,
    itemsPerPage: 20
  },
  category: {
    id: true,
    code: true,
    createdOn: true,
    color: true,
    itemsPerPage: 20
  },
  promotion:{
    id: true,
    available: true,
    name: true,
    promotionType: true,
    discount: true,
    products: true,
    itemsPerPage: 20
  },
  tag: {
    id: true,
    code: true,
    points: true,
    createdOn: true,
    itemsPerPage: 20
  },
  roles: {
    id: true,
    code: true,
    name: true,
    updatedOn: true,
    description: true,
    itemsPerPage: 20
  },
  users: {
    id: true,
    username: true,
    name: true,
    enabled: true,
    lastLogin: true,
    roles: true,
    itemsPerPage: 20
  },
  customField: {
    id: true,
    code: true,
    userVisible: true,
    userEditable: true,
    gdprSpecialField: true,
    customFieldType: true,
    createdOn: true,
    updatedOn: true,
    showing: 20
  },
  group: {
    id: true,
    label: true,
    createdOn: true,
    category: true,
    itemsPerPage: 20
  },
  taxRate: {
    id: true,
    level: true,
    rate: true,
    validFrom: true,
    validTo: true,
    createdOn: true,
    country: true,
    itemsPerPage: 20
  },
  taxRateLink: {
    id: true,
    validFrom: true,
    validTo: true,
    createdOn: true,
    fromTaxRate: true,
    toTaxRate: true,
    itemsPerPage: 20
  },
  taxRule: {
    id: true,
    customerType: true,
    customerRegion: true,
    ruleType: true,
    createdOn: true,
    country: true,
    itemsPerPage: 20
  },
  product: {
    id: true,
    price: true,
    name: true,
    createdOn: true,
    productCategory: true,
    productType: true,
    itemsPerPage: 20
  },
  regions: {
    id: true,
    name: true,
    home: true,
    abroad: true,
    insideEu: true,
    outsideEu: true,
    createdOn: true,
    itemsPerPage: 20
  },
  deliveryMethod: {
    id: true,
    name: true,
    description: true,
    deliveryMethodType: true,
    createdOn: true,
    itemsPerPage: 20
  },
  course: {
    id: true,
    name: true,
    description: true,
    eventDates: true,
    itemsPerPage: 20
  },
  paymentMethod: {
    id: true,
    name: true,
    administrativeCostsFixed: true,
    availability: true,
    createdOn: true,
    itemsPerPage: 20
  },
  administration: {
    id: true,
    accessCode: true,
    name: true,
    validFrom: true,
    validTo: true,
    email: true,
    lastLogin: true,
    relationsLimit: true,
    trial: true,
    useShop: true,
    useAutomation: true,
    itemsPerPage: 20
  },
  invoiceTemplate: {
    id: true,
    name: true,
    description: true,
    createdOn: true,
    itemsPerPage: 20
  },
  relationOrders: {
    itemsPerPage: 10
  },
  workflow: {
    id: true,
    name: true,
    description: true,
    status: true,
    category: true,
    createdOn: true,
    itemsPerPage: 10
  },
  emailTexts: {
    id: true,
    name: true,
    description: true,
    status: true,
    category: true,
    createdOn: true,
    itemsPerPage: 10
  }

}
