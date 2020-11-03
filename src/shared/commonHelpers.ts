import {Vue, Component} from 'vue-property-decorator'
import {ILanguage, Language} from '@/shared/models/language.model'
import {columnsVisibility} from '@/shared/tabelsDefinitions'
import {Country, ICountry} from '@/shared/models/administrationms/country.model'
import axios from 'axios'
import Store from "@/store";
import {ITaxRate} from "@/shared/models/administrationms/tax-rate.model";
import { postcodeValidator, postcodeValidatorExistsForCountry } from 'postcode-validator';
@Component
export default class CommonHelpers extends Vue {
  /*
  * Name: hasAuthority
  * arg: authority -> list of authorities to be checked
  * description: Returns boolean depending on the list of authorities and the user authorities
  * Author: Nick Dam
  */
  public hasAuthority(authority: string | [], table?: any) {
    let auth: string[] = []
    let result = false
    if (typeof authority === 'string') {
      auth = [authority]
    } else {
      auth = authority
    }
    const userAuths: any = []
    if (this.$store.state.userIdentity) {
      this.$store.state.userIdentity.roles.forEach((auth: any) => {
        userAuths.push(auth.code)
      })
    }
    if (auth) {
      auth.forEach(item => {
        if (item === '*') {
          result = true
        } else if (userAuths.includes(item)) {
          result = true
        }
      })
    }
    return result
  }

  /*
  * Name: getTableVisibilityFields
  * arg: table -> table name
  * description: Returns object of columns visibility
  * Author: Nick Dam
  */
  public getTableVisibilityFields(table: string) {
    let fieldsJson: any = localStorage.getItem('tableColumns')
    if (fieldsJson) {
      fieldsJson = JSON.parse(fieldsJson)
    } else {
      fieldsJson = columnsVisibility
      localStorage.setItem('tableColumns', JSON.stringify(columnsVisibility))
    }
    if (fieldsJson && fieldsJson[table]) return fieldsJson[table]
    return null
  }
  /*
  * Name: getAllCountryTaxRates
  * arg: taxes -> all system taxes, country -> filter by countryId
  * description: Returns array of taxes filtered by country id
  * Author: Nick Dam
  */
  public getAllCountryTaxRates(taxes: ITaxRate[], country: number) {
    if(!taxes) return
    let result:ITaxRate[]  = taxes.filter((tax:ITaxRate) => tax.country && tax.country.id === country)
    return result
  }

  /*
  * Name: setTableVisibilityFields
  * arg: table -> table to be set, value -> new table config object
  * description: Sets table column visibility
  * Author: Nick Dam
  */
  public setTableVisibilityFields(table: string, value: any) {
    let fieldsJson: any = localStorage.getItem('tableColumns')
    if (fieldsJson) {
      fieldsJson = JSON.parse(fieldsJson)
    }
    fieldsJson[table] = value
    localStorage.setItem('tableColumns', JSON.stringify(fieldsJson))
  }

  /*
     * Name: changeColumnVisibility
     * arg: column -> object, table -> table name
     * description: Changes column visibility depending on given column and table and set to local storage
     * Author: Nick Dam
     */
  public changeColumnVisibility(column: any, table: string) {
    const local: any = this.getTableVisibilityFields(table)
    const newVal = !local[column.id]
    local[column.id] = newVal
    this.setTableVisibilityFields(table, local)
  }

  /*
     * Name: getClassName
     * arg: type -> string
     * description: Return a proper icon class name for custom fields depending on their type
     * Author: Nick Dam
     */
  public getClassName (type: any) {
    switch (type) {
      case 'OPTION_LIST':
        return 'fa fa-filter'
      case 'BOOLEAN':
        return 'fa fa-toggle-on'
      case 'TEXT':
        return 'fa fa-font'
    }
  }
  /*
   * Name: makeSimpleSearchQuery
   * arg: fields -> array (searchBy), query -> search string, operator -> OR/AND
   * description: Creates simple search query
   * Author: Nick Dam
   */
  public makeSimpleSearchQuery(fields: string[], query: string, operator?: string) {
    let result = ''
    fields.forEach((item, key) => {
      if (key < fields.length - 1) {
        if (operator) {
          result += `${item}==*${query}* ${operator} `
        } else result += `${item}==*${query}*&`
      } else {
        result += `${item}==*${query}*`
      }
    })
    if (operator) {
      return `(${result})`
    }
    return result
  }

  /*
   * Name: queryBuilder
   * arg: queryArray -> array (),
   * description: Creates search query
   * Author: Nick Dam
   */
  public queryBuilder(queryArray: any[]) {
    let finalQuery = ''
    queryArray.forEach((query, index) => {
      if (index === 0) {
        finalQuery += '('
      } else {
        finalQuery += ' ('
      }
      query.children.forEach((children: any) => {
        try {
        children.value = children.value.replace(/\*/g, '')
        children.value = children.value.replace(/%/g, '')
        }catch (e) {

        }
        const valueToSearch = children.exactSearch || children.inBetweenOperator === '=in=' || children.inBetweenOperator === '=out=' || children.inBetweenOperator === '=null=' || children.inBetweenOperator === '=empty=' ? `${children.value}` : '"*' + children.value + '*"'
        finalQuery += children.key + children.inBetweenOperator + (children.inBetweenOperator === '=in=' ? ('(' + valueToSearch + ')') : valueToSearch) + (index < query.children.length - 1 ? (' ' + children.afterOperator + ' ') : '')
      })
      if (index === queryArray.length - 1) {
        finalQuery += ')' + (index < queryArray.length - 1 ? query.mainOperator : '&')
      } else {
        finalQuery += ') ' + (index < queryArray.length - 1 ? query.mainOperator : '&')
      }
    })
    return finalQuery
  }

  public queryArrayToQueryString(queryArray: any) {
    let finalQuery = ''
    const logicalOperator = queryArray.operator ? queryArray.operator.toLowerCase() : queryArray.logicalOperator ? queryArray.logicalOperator.toLowerCase() : null
    queryArray.children.forEach((obj: any, ind: any) => {
      console.log(obj.type)
      let currentQuery = ''
      if (obj.type === 'rule') {
        let operator = ''
        let condition = ''
        let value = ''
        if (obj.query.op && obj.query.op.value && obj.query.op.value.id) {
          operator = obj.query.op.value.id
        }
        if (obj.query.op === null && obj.query.value && obj.query.value.value) {
          if (obj.query.value.value.id) {
            operator = obj.query.value.value.id
          }
        } else if (obj.query.value) {
          value = this.getQueryVal(obj.query.value)
        }
        if (!value && obj.query.op === null && obj.query.value.operator === null && obj.query.value.value.value) {
          value = obj.query.value.value.value.id
        }
        if (obj.query.condition && obj.query.condition.searchQuery) {
          condition = obj.query.condition.searchQuery
        } else if (obj.query.ruleObj && obj.query.ruleObj.searchQuery) {
          condition = obj.query.ruleObj.searchQuery
        }
        if (condition.match('conditionId')) {
          condition.replace('{conditionId}', obj.query.condition.value)
        }
        if (!operator) {
          operator = '=='
        }
        if (operator.match('{k}')) {
          operator = operator.replace('{k}', value)
          currentQuery += condition + operator
        } else {
          if (operator.toLowerCase().match('empty')) {
            currentQuery += condition + operator
          } else {
            currentQuery += condition + operator + value
          }
        }

        if (ind < queryArray.children.length - 1) {
          finalQuery += '(' + currentQuery + ') ' + logicalOperator + ' '
        } else {
          finalQuery += currentQuery
        }
      } else if (obj.type === 'group-component') {
        const finalGroupQuery = this.queryArrayToQueryString(obj.query)
        if (ind < queryArray.children.length - 1) {
          finalQuery += '(' + finalGroupQuery + ') ' + logicalOperator + ' '
        } else {
          finalQuery += finalGroupQuery
        }
      }
    })
    return finalQuery
  }

  /*
   * Name: getMultiLangName
   * arg: langs -> array of all languages
   * description: Returns a language object depending of the administration default language
   * Author: Nick Dam
   */
  public getMultiLangName(langs: ILanguage[] | undefined | null) {
    const self = this
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

  public getQueryVal(value: any) {
    let val = null
    if (typeof value.value === 'string') {
      val = value.value
    } else if (value.value.length) {
      let finalVal = ''
      value.value.forEach((val: any, ind: any) => {
        if (ind < value.value.length - 1) {
          if (val.id) {
            finalVal += val.id + ','
          } else if (val.value.id) {
            finalVal += val.value.id + ','
          }
        } else {
          if (val.id) {
            finalVal += val.id
          } else if (val.value.id) {
            finalVal += val.value.id
          }
        }
      })
      val = finalVal
    } else if (typeof value.value === 'object') {
      if (value.value.labelValue) {
        val = value.value.labelValue
      } else if (value.value.value.id) {
        val = value.value.value.id
      } else if (value.value.value.value.id) {
        val = value.value.value.value.id
      }
    }
    return val
  }

  /*
   * Name: getCountryById
   * arg: id -> Country ID
   * description: Returns a country object
   * Author: Nick Dam
   */
  public getCountryById(id: number) {
    let result:ICountry = {
      enName: ''
    }
    let ind = this.$store.state.allCountries.findIndex((e:any) => e.id === id)
    if(ind > -1) {
      result = this.$store.state.allCountries[ind]
    }
    return result
  }

  /*
   * Name: getCountryByName
   * arg: name -> Country Name
   * description: Returns a country id
   * Author: Nick Dam
   */
  public getCountryByName(name: number) {
    let result = {
      enName: ''
    }
    this.$store.state.allCountries.forEach((country: any) => {
      if (country.enName === name) {
        result = country.id
      }
    })
    return result
  }

  /*
   * Name: getCountryByIso
   * arg: name -> Country Iso
   * description: Returns a country id
   * Author: Nick Dam
   */
  public getCountryByIso(iso: string) {
    let result = {
      enName: ''
    }
    this.$store.state.allCountries.forEach((country: any) => {
      if (country.iso3.toLowerCase() === iso.toLowerCase()) {
        result = country.id
      }
    })
    return result
  }

  /*
   * Name: getRelationFullName
   * arg: relation -> IRelationEntity
   * description: Returns full name of a give relation
   * Author: Nick Dam
   */
  public getRelationFullName(relation: any) {
    const title = relation.relationProfile && relation.relationProfile.title
      ? relation.relationProfile.title : ''
    const firstName = relation.relationProfile && relation.relationProfile.firstName
      ? relation.relationProfile.firstName : ''
    const middleName = relation.relationProfile && relation.relationProfile.middleName
      ? relation.relationProfile.middleName : ''
    const lastName = relation.relationProfile && relation.relationProfile.lastName
      ? relation.relationProfile.lastName : ''
    return `${title} ${firstName} ${middleName} ${lastName} `
  }

  /*
   * Name: checkForUrlHttps
   * arg: url -> String
   * description: Checks if url has http/https included,
   *              if not adds http:// to the url and returns the new url
   * Author: Nick Dam
   */
  public checkForUrlHttps(url: string) {
    if (url.match('http')) {
      return url
    } else {
      return `https://${url}`
    }
  }

  /*
   * Name: convertFileToBase64
   * arg: file -> File
   * description: converts file to base64 string
   * Author: Nick Dam
   */
  public convertFileToBase64 = (file: any) => new Promise((resolve, reject) => {
    const self = this
    const reader = new FileReader()
    reader.onload = (function (theFile) {
      return function (e: any) {
        resolve(e.currentTarget.result.replace(/^data:(image|application|video)\/(png|jpeg|json|jpg|pdf|doc|docx|avi|mp4);base64,/, ''))
      }
    })(file)
    reader.readAsDataURL(file)
  });

  /*
   * Name: extractAddress
   * arg: addresses:[] -> Array Of addresses
   * description: Extract address from given array and returns address label and address type
   * Author: Nick Dam
   */
  public extractAddress(addresses: any[]) {
    let street = ''
    let number = ''
    let city = ''
    let postal = ''
    let country:any = ''
    if (addresses && addresses.length) {
      street = addresses[0].street
      number = addresses[0].houseNumber
      city = addresses[0].city
      postal = addresses[0].postalCode
      country = this.getCountryById(addresses[0].postalCode).enName
    }
    return {label: `${street} ${number}, ${city} ${postal} ${country} `, type: addresses[0].addressType}
  }

  /*
   * Name: setAlert
   * arg: message -> String, type -> String( error, success, waring, info)
   * description: Display toast message
   * Author: Nick Dam
   */
  public setAlert(message: any, type: string) {
    // @ts-ignore
    this.$vueOnToast.pop(type, '', this.$t('toastMessages.' + message))
  }
  /*
   * Name: setErrorAlert
   * arg: message -> String
   * description: Display toast error message to show server error
   * Author: Nick Dam
   */
  public setErrorAlert(message: any) {
    // @ts-ignore
    this.$vueOnToast.pop('error', message.title, message.content)
  }

  /*
   * Name: generateRandom
   * arg: /
   * description: Generate number text string
   * Author: Nick Dam
   */
  public generateRandom() {
    let text = ''
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_'
    for (let i = 0; i < 6; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
  }

  /*
   * Name: validateAddress
   * arg: address
   * description: Address validation
   * Author: Nick Dam
   */
  public validateAddress(address:any) {
    let result:any = {
      status: true,
      msg: ''
    }
   if(!address.street) {
     result.msg = this.$t('labels.enterValidStreet')
     result.status = false
   } else if(!address.houseNumber) {
     result.msg = this.$t('labels.enterValidHouseNumber')
     result.status = false
   }
   else if(!address.countryId) {
       result.msg = this.$t('labels.enterValidCountry')
       result.status = false
   } else if(!address.postalCode) {
     result.msg = this.$t('labels.enterPostalCode')
     result.status = true
   }else if(address.postalCode){
     let country:any =  this.getCountryById(address.countryId)
     let isCountrySupported = postcodeValidatorExistsForCountry(country.iso)
     if(!isCountrySupported) {
       result.msg = ''
       result.status = true
     }else if(!postcodeValidator(address.postalCode, country.iso)) {
       result.msg = this.$t('labels.enterValidPostalCode')
       result.status = false
     }
   } else if(!address.city) {
     result.msg = this.$t('labels.enterValidCity')
     result.status = false
   }
   return result
  }

  /*
   * Name: preselectCountry
   * arg: id -> country ID
   * description: Preselect country
   * Author: Nick Dam
   */
  public preselectCountry(id?: number) {
    let country = new Country()
    if (!id) {
      id = this.$store.state.administration.country.id
    }
    this.$store.state.allCountries.forEach((cntr: any) => {
      if (cntr.id === id) {
        country = cntr
      }
    })
    return country
  }

  /**
   * @return list of fixed relation fields
   */
  public relationFields() {
    const freeFields: any = []
    this.$store.state.lookups.freeFields.forEach((freeField: any) => {
      freeFields.push({
        label: this.getMultiLangName(freeField.customFieldLanguages).name,
        value: freeField
      })
    })
    const result = [
      {
        groupLabel: this.$t('labels.doNotAssign'),
        groupValues: [
          {
            value: 'dnassign',
            label: this.$t('labels.doNotAssign')
          }]
      },
      {
        groupLabel: this.$t('labels.relationFields'),
        groupValues: [
          {
            value: 'title',
            label: this.$t('labels.title'),
            model: 'relationProfile'
          },
          {
            value: 'firstName',
            label: this.$t('labels.firstName'),
            model: 'relationProfile'
          }, {
            value: 'middleName',
            label: this.$t('labels.middleName'),
            model: 'relationProfile'
          },
          {
            value: 'lastName',
            label: this.$t('labels.lastName'),
            model: 'relationProfile'
          },
          {
            value: 'email',
            label: this.$t('labels.email'),
            model: 'relation'
          }, {
            value: 'birthDate',
            label: this.$t('labels.birthDate'),
            model: 'relationProfile'
          }, {
            value: 'phoneHome',
            label: this.$t('labels.phoneHome'),
            model: 'phones'
          }, {
            value: 'phoneWork',
            label: this.$t('labels.phoneWork'),
            model: 'phones'
          }, {
            value: 'mobile',
            label: this.$t('labels.mobile'),
            model: 'phones'
          }, {
            value: 'city',
            label: this.$t('labels.city'),
            model: 'addresses'
          },
          {
            value: 'postalCode',
            label: this.$t('labels.postalCode'),
            model: 'addresses'
          },
          {
            value: 'street',
            label: this.$t('labels.street'),
            model: 'addresses'
          }, {
            value: 'houseNumber',
            label: this.$t('labels.houseNumber'),
            model: 'addresses'
          }, {
            value: 'countryId',
            label: this.$t('labels.country'),
            model: 'addresses'
          }, {
            value: 'description',
            label: this.$t('labels.additionalAddressInfo'),
            model: 'addresses'
          },
          {
            value: 'gender',
            label: this.$t('labels.gender'),
            model: 'relationProfile'
          }, {
            value: 'companyName',
            label: this.$t('labels.company'),
            model: 'company'
          },
          {
            value: 'website',
            label: this.$t('labels.website'),
            model: 'relationProfile'
          }, {
            value: 'description',
            label: this.$t('labels.description'),
            model: 'relationProfile'
          }, {
            value: 'categoryId',
            label: this.$t('labels.category'),
            model: 'relation'
          }
        ]
      },
      {
        groupLabel: this.$t('labels.freeFields'),
        groupValues: freeFields,
        model: 'customFields'
      }
    ]
    return result
  }

  public ifUserCanUpload4k() {
    return false
  }

  public loadProperImage(image: any) {
    const self = this
    return new Promise<any>(resolve => {
      let url = ''
      const preUrl = image.url.replace('https://storage.googleapis.com', '/getFromCloud')
      if (this.ifUserCanUpload4k()) {
        url = preUrl + '_4K'
      } else {
        url = preUrl + '_1K'
      }
      axios.get(url + '?' + Math.random(), {responseType: 'arraybuffer'}).then(function (res) {
        if (!res || res.status === 404) {
          url = preUrl + '/' + image.name.replace(/(\.[\w\d_-]+)$/i, '_720p$1')
          axios.get(url + '?' + Math.random(), {responseType: 'arraybuffer'}).then(function (res1) {
            if (!res || res.status === 404) {
              url = preUrl + '_360p?' + Math.random()
              axios.get(url, {responseType: 'arraybuffer'}).then(function (res2) {
                if (!res || res.status === 404) {
                  url = preUrl + '_thumb'
                  axios.get(url + '?' + Math.random(), {responseType: 'arraybuffer'}).then(function (res3) {
                    if (!res || res.status === 404) {
                      resolve(null)
                    } else {
                      // @ts-ignore
                      const base64String = self.arrayBufferToBase64(res3.data)
                      resolve(base64String)
                    }
                  })
                } else {
                  const blob = new Blob([new Uint8Array(res.data)])
                  // @ts-ignore
                  const base64String = self.arrayBufferToBase64(res2.data)
                  resolve(base64String)
                }
              })
            } else {
              const blob = new Blob([new Uint8Array(res.data)])
              // @ts-ignore
              const base64String = self.arrayBufferToBase64(res1.data)
              resolve(base64String)
            }
          })
        } else {
          const blob = new Blob([new Uint8Array(res.data)])
          // @ts-ignore
          const base64String = self.arrayBufferToBase64(res.data)
          resolve(base64String)
        }
      })
    })
  }

  public arrayBufferToBase64(buffer: any) {
    let binary = '';
    let bytes = new Uint8Array(buffer);
    let len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

  validateEmail(email: any) {
    const re = /\S+@\S+\.\S+/
    return re.test(email)
  }

  /*
   * Name: getDiscount
   * arg: discount -> IDiscount
   * description: Returns promotion discount
   * Author: Nick Dam
   */
  public getDiscount(promotion: any) {
    let result = null
    let promotionType = null
    switch (promotion.promotionType) {
      case 'TIME':
        promotionType = promotion.typeTimeBased
        break;
      case 'AFFILIATE':
        promotionType = promotion.typeAffiliateBased
        break;
      case 'BUNDLE':
        promotionType = promotion.typeBundleBaseds[0]
        break;
      case 'COUPON':
        promotionType = promotion.typeCouponBased
        break;
      case 'LOYALTY':
        promotionType = promotion.typeLoyaltyBased
        break;
      case 'PERSONAL_COUPON':
        promotionType = promotion.typePersonalCouponBased
        break;
      case 'PRICE':
        promotionType = promotion.typePriceBaseds[0]
        break;
      case 'QUANTITY':
        promotionType = promotion.typeQuantityBaseds[0]
        break;
      case 'TEMPORARY_COUPON':
        promotionType = promotion.typePersonalCouponBased
        break;
    }
    if (!promotionType || !promotionType.discount) {
      return ''
    }
    if (promotionType.discount.percentage) {
      result = `${promotionType.discount.percentage}%`
    } else if (promotionType.discount.fixed) {
      result = `${promotionType.discount.fixed}${Store.state.currency}`
    } else if (promotionType.discount.noShipping) {
      result = 'noShipping'
    } else {
      result = 'freeItems'
    }
    return result
  }

  /*
   * Name: getDiscountType
   * arg: promotion -> IPromotion
   * description: Returns promotion discount type
   * Author: Nick Dam
   */
  public getDiscountType(promotion: any) {
    let result:any = {}
    let value:any = {}
    let type = ''
    switch (promotion.promotionType) {
      case 'TIME':
        result = this.getDiscountTypeString(promotion.typeTimeBased)
        type = 'typeTimeBased'
        value = promotion.typeTimeBased
        break;
      case 'AFFILIATE':
        result = this.getDiscountTypeString(promotion.typeAffiliateBased)
        type = 'typeAffiliateBased'
        value = promotion.typeAffiliateBased
        break;
      case 'BUNDLE':
        result = this.getDiscountTypeString(promotion.typeBundleBaseds[0])
        type = 'typeBundleBaseds'
        value = promotion.typeBundleBaseds[0]
        break;
      case 'COUPON':
        result = this.getDiscountTypeString(promotion.typeCouponBased)
        type = 'typeCouponBased'
        value = promotion.typeCouponBased
        break;
      case 'LOYALTY':
        result = this.getDiscountTypeString(promotion.typeLoyaltyBased)
        type = 'typeLoyaltyBased'
        value = promotion.typeLoyaltyBased
        break;
      case 'PERSONAL_COUPON':
        result = this.getDiscountTypeString(promotion.typePersonalCouponBased)
        type = 'typePersonalCouponBased'
        value = promotion.typePersonalCouponBased
        break;
      case 'PRICE':
        result = this.getDiscountTypeString(promotion.typePriceBaseds[0])
        type = 'typePriceBaseds'
        value = promotion.typePriceBaseds[0]
        break;
      case 'QUANTITY':
        result = this.getDiscountTypeString(promotion.typeQuantityBaseds[0])
        type = 'typeQuantityBaseds'
        value = promotion.typeQuantityBaseds[0]
        break;
      case 'TEMPORARY_COUPON':
        result = this.getDiscountTypeString(promotion.typePersonalCouponBased)
        type = 'typePersonalCouponBased'
        value = promotion.typePersonalCouponBased
        break;
    }
    return {discount: result, type: type, value: value}
  }

  public getDiscountTypeString(promotionType: any) {
    let result = null
    if (!promotionType || !promotionType.discount) {
      return ''
    }
    if (promotionType.discount.percentage) {
      result = {
        id: 1,
        name: 'percentage',
        label: 'percentage',
        value: promotionType.discount.percentage
      }
    } else if (promotionType.discount.fixed) {
      result = {
        id: 2,
        name: 'fixed',
        label: 'fixedAmount',
        value: promotionType.discount.fixed
      }
    } else if (promotionType.discount.noShipping) {
      result = {
        id: 3,
        name: 'noShipping',
        label: 'noShipping',
        value: promotionType.discount.noShipping
      }
    } else {
      result = {
        id: 4,
        name: 'freeItems',
        label: 'freeItems',
        value: promotionType.discount.freeItems
      }
    }
    return result
  }


    /*
     * Name: updateSimpleSearchQuery
     * arg: entity -> (relation, order, product, promotion...), queryArray -> actual simpleSearch values
     * description: Update SimpleSearch query and save to localStorage
     * Author: Nick Dam
     */
    public updateSimpleSearchQuery(entity: any, queryArray:any[]){
      let queryLocalStorage = localStorage.getItem('simpleSearchQueries')
      if(queryLocalStorage) {
        let simpleSearchQuery = JSON.parse(queryLocalStorage)
        simpleSearchQuery[entity] = queryArray
        localStorage.setItem('simpleSearchQueries', JSON.stringify(simpleSearchQuery))
        localStorage.removeItem('complexSearchQueries')
        localStorage.setItem('activeSearch', 'simple')
      } else {
        let simpleSearchQuery:any = {}
        simpleSearchQuery[entity] = queryArray
        localStorage.setItem('simpleSearchQueries', JSON.stringify(simpleSearchQuery))
        localStorage.removeItem('complexSearchQueries')
        localStorage.setItem('activeSearch', 'simple')
      }
    }

    /*
    * Name: reverseSimpleSearchQuery
    * arg: entity -> (relation, order, product, promotion...)
    * description: Read from localStorage and return the values in order to populate the search
    * Author: Nick Dam
    */
    public reverseSimpleSearchQuery(entity: any){
      let queryLocalStorage = localStorage.getItem('simpleSearchQueries')
      if(queryLocalStorage) {
        let simpleSearchQuery = JSON.parse(queryLocalStorage)
        if(simpleSearchQuery[entity]){
          return simpleSearchQuery[entity]
        }
        return []
      } else {
        return []
      }
    }

      /*
       * Name: updateComplexSearchQuery
       * arg: entity -> (relation, order, product, promotion...), queryArray -> actual simpleSearch values
       * description: Update SimpleSearch query and save to localStorage
       * Author: Nick Dam
       */
      public updateComplexSearchQuery(entity: any, queryArray:any[]){
        let queryLocalStorage = localStorage.getItem('complexSearchQueries')
        if(queryLocalStorage) {
          let complexSearchQuery = JSON.parse(queryLocalStorage)
          complexSearchQuery[entity] = queryArray
          localStorage.setItem('complexSearchQueries', JSON.stringify(complexSearchQuery))
          localStorage.removeItem('simpleSearchQueries')
          localStorage.setItem('activeSearch', 'complex')
        } else {
          let complexSearchQuery:any = {}
          complexSearchQuery[entity] = queryArray
          localStorage.setItem('complexSearchQueries', JSON.stringify(complexSearchQuery))
          localStorage.removeItem('simpleSearchQueries')
          localStorage.setItem('activeSearch', 'complex')
        }
      }

      /*
      * Name: reverseSimpleSearchQuery
      * arg: entity -> (relation, order, product, promotion...)
      * description: Read from localStorage and return the values in order to populate the search
      * Author: Nick Dam
      */
      public reverseComplexSearchQuery(entity: any){
        let queryLocalStorage = localStorage.getItem('complexSearchQueries')
        if(queryLocalStorage) {
          let complexSearchQuery = JSON.parse(queryLocalStorage)
          if(complexSearchQuery[entity]){
            return complexSearchQuery[entity]
          }
          return []
        } else {
          return []
        }
      }

  /*
  * Name: removeSimpleSearchQuery
  * arg: entity -> (relation, order, product, promotion...)
  * description: Remove simpleSearch query from localStorage (when user clicks on clear button on simple search)
  * Author: Nick Dam
  */
  public removeSimpleSearchQuery(entity: any){
    let queryLocalStorage = localStorage.getItem('simpleSearchQueries')
    if(queryLocalStorage) {
      let simpleSearchQuery = JSON.parse(queryLocalStorage)
      if(simpleSearchQuery[entity]){
        simpleSearchQuery[entity] = undefined
        localStorage.setItem('simpleSearchQueries', JSON.stringify(simpleSearchQuery))
      }
    }
  }
  /*
  * Name: checkIfRuleExists
  * arg: ruleId -> (id of search rule that needs to be checked), query -> (actual search query)
  * description: Find if there is an rule defined into a complex search query
  * Author: Nick Dam
  */
  public checkIfRuleExists(ruleId: any, query:any) {
    let index = query.children.findIndex((e:any)=> e.identifier === ruleId)
    if(index > -1) {
      return query.children[index]
    } else return null
  }

  public updateRecentItemsAfterRead(an_id: number, a_label: string, a_type: string,) {
    let item = {
      label: a_label,
      id: an_id,
      type: a_type,
    }
    let items = this.$store.state.recentItems
      if (items.length >= 20) items.shift()
      items.push(item)
      this.$store.commit('recentItems', items)
    }

}
