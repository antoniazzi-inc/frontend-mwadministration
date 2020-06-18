import { Vue, Component } from 'vue-property-decorator'
import { ILanguage, Language } from '@/shared/models/language.model'
import { columnsVisibility } from '@/shared/tabelsDefinitions'
import { Country } from '@/shared/models/country.model'
import axios from 'axios'
@Component
export default class CommonHelpers extends Vue {
  /*
  * Name: hasAuthority
  * arg: authority -> list of authorities to be checked
  * description: Returns boolean depending on the list of authorities and the user authorities
  * Author: Nick Dam
  */
  public hasAuthority (authority: string | [], table?: any) {
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
  public getTableVisibilityFields (table: string) {
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
  * Name: setTableVisibilityFields
  * arg: table -> table to be set, value -> new table config object
  * description: Sets table column visibility
  * Author: Nick Dam
  */
  public setTableVisibilityFields (table: string, value: any) {
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
  public changeColumnVisibility (column: any, table: string) {
    const local: any = this.getTableVisibilityFields(table)
    const newVal = !local[column.id]
    local[column.id] = newVal
    this.setTableVisibilityFields(table, local)
  }

  /*
   * Name: makeSimpleSearchQuery
   * arg: fields -> array (searchBy), query -> search string, operator -> OR/AND
   * description: Creates simple search query
   * Author: Nick Dam
   */
  public makeSimpleSearchQuery (fields: string[], query: string, operator?: string) {
    let result = ''
    fields.forEach((item, key) => {
      if (key < fields.length - 1) {
        if (operator) {
          result += `${item}==*${query}*${operator} `
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
  public queryBuilder (queryArray: any[]) {
    let finalQuery = ''
    queryArray.forEach((query, index) => {
      if (index === 0) {
        finalQuery += '('
      } else {
        finalQuery += ' ('
      }
      query.children.forEach((children: any) => {
        children.value = children.value.replace(/\*/g, '')
        children.value = children.value.replace(/%/g, '')
        const valueToSearch = children.exactSearch || children.inBetweenOperator === '=in=' || children.inBetweenOperator === '=out=' || children.inBetweenOperator === '=null=' || children.inBetweenOperator === '=empty=' ? children.value : '*' + children.value + '*'
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

  public queryArrayToQueryString (queryArray: any) {
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
        } else
        if (obj.query.value) {
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
        if (!operator) { operator = '==' }
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
  public getMultiLangName (langs: ILanguage[] | undefined | null) {
    const self = this
    if (langs && langs.length > 0) {
      let result = null
      langs.forEach(lang => {
        if (lang.langKey === self.$store.state.currentLanguage) {
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

  public getQueryVal (value: any) {
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
  public getCountryById (id: number) {
    let result = {
      enName: ''
    }
    this.$store.state.allCountries.forEach((country: any) => {
      if (country.id === id) {
        result = country
      }
    })
    return result
  }

  /*
   * Name: getCountryByName
   * arg: name -> Country Name
   * description: Returns a country id
   * Author: Nick Dam
   */
  public getCountryByName (name: number) {
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
  public getCountryByIso (iso: string) {
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
  public getRelationFullName (relation: any) {
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
  public checkForUrlHttps (url: string) {
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
        resolve(e.currentTarget.result.replace(/^data:(image|application|video)\/(png|jpeg|jpg|pdf|doc|docx|avi|mp4);base64,/, ''))
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
  public extractAddress (addresses: any[]) {
    let street = ''
    let number = ''
    let city = ''
    let postal = ''
    let country = ''
    if (addresses && addresses.length) {
      street = addresses[0].street
      number = addresses[0].houseNumber
      city = addresses[0].city
      postal = addresses[0].postalCode
      country = this.getCountryById(addresses[0].postalCode).enName
    }
    return { label: `${street} ${number}, ${city} ${postal} ${country} `, type: addresses[0].addressType }
  }

  /*
   * Name: setAlert
   * arg: message -> String, type -> String( error, success, waring, info)
   * description: Display toast message
   * Author: Nick Dam
   */
  public setAlert (message: any, type: string) {
    // @ts-ignore
    this.$vueOnToast.pop(type, '', this.$t('toastMessages.' + message))
  }

  /*
   * Name: preselectCountry
   * arg: id -> country ID
   * description: Preselect country
   * Author: Nick Dam
   */
  public preselectCountry (id?: number) {
    let country = new Country()
    if (!id) {
      id = 150
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
  public relationFields () {
    const result = [
      {
        value: 'title',
        label: this.$t('labels.title')
      },
      {
        value: 'firstName',
        label: this.$t('labels.firstName')
      }, {
        value: 'middleName',
        label: this.$t('labels.middleName')
      },
      {
        value: 'lastName',
        label: this.$t('labels.lastName')
      },
      {
        value: 'email',
        label: this.$t('labels.email')
      }, {
        value: 'birthDate',
        label: this.$t('labels.birthDate')
      }, {
        value: 'phoneHome',
        label: this.$t('labels.phoneHome')
      }, {
        value: 'phoneWork',
        label: this.$t('labels.phoneWork')
      }, {
        value: 'mobile',
        label: this.$t('labels.mobile')
      }, {
        value: 'city',
        label: this.$t('labels.city')
      },
      {
        value: 'postalCode',
        label: this.$t('labels.postalCode')
      },
      {
        value: 'street',
        label: this.$t('labels.street')
      }, {
        value: 'houseNumber',
        label: this.$t('labels.houseNumber')
      }, {
        value: 'country',
        label: this.$t('labels.country')
      }, {
        value: 'address_extra',
        label: this.$t('labels.additionalAddressInfo')
      },
      {
        value: 'gender',
        label: this.$t('labels.gender')
      }, {
        value: 'companyName',
        label: this.$t('labels.company')
      },
      {
        value: 'website',
        label: this.$t('labels.website')
      }, {
        value: 'description',
        label: this.$t('labels.description')
      }, {
        value: 'categoryId',
        label: this.$t('labels.category')
      }, {
        value: 'dnassign',
        label: this.$t('labels.doNotAssign')
      }]
    return result
  }

  public ifUserCanUpload4k () {
    return false
  }

  public loadProperImage (image: any) {
    const self = this
    return new Promise<any>(resolve => {
      let url = ''
      const preUrl = image.url.replace('https://storage.googleapis.com', '/getFromCloud')
      if (this.ifUserCanUpload4k()) {
        url = preUrl + '_4K'
      } else {
        url = preUrl + '_1K'
      }
      axios.get(url + '?' + Math.random(), { responseType: 'arraybuffer' }).then(function (res) {
        if (!res || res.status === 404) {
          url = preUrl + '/' + image.name.replace(/(\.[\w\d_-]+)$/i, '_720p$1')
          axios.get(url + '?' + Math.random(), { responseType: 'arraybuffer' }).then(function (res1) {
            if (!res || res.status === 404) {
              url = preUrl + '_360p?' + Math.random()
              axios.get(url, { responseType: 'arraybuffer' }).then(function (res2) {
                if (!res || res.status === 404) {
                  url = preUrl + '_thumb'
                  axios.get(url + '?' + Math.random(), { responseType: 'arraybuffer' }).then(function (res3) {
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
  public arrayBufferToBase64(buffer:any) {
    let binary = '';
    let bytes = new Uint8Array(buffer);
    let len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }
  validateEmail (email: any) {
    const re = /\S+@\S+\.\S+/
    return re.test(email)
  }
}
