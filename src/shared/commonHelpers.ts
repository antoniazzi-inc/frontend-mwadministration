import {Vue, Component} from 'vue-property-decorator'
import {ILanguage, Language} from '@/shared/models/language.model'
import {columnsVisibility} from '@/shared/tabelsDefinitions'
import {Country} from "@/shared/models/country.model";

@Component
export default class CommonHelpers extends Vue {
  /*
  * Name: hasAuthority
  * arg: authority -> list of authorities to be checked
  * description: Returns boolean depending on the list of authorities and the user authorities
  * Author: Nick Dam
  */
  public hasAuthority(authority: string | [], table?: any) {
    let auth: string[] = [];
    let result = false;
    if (typeof authority === 'string') {
      auth = [authority]
    } else {
      auth = authority
    }
    const userAuths: any = [];
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
    let fieldsJson: any = localStorage.getItem('tableColumns');
    if (fieldsJson) {
      fieldsJson = JSON.parse(fieldsJson)
    } else {
      fieldsJson = columnsVisibility;
      localStorage.setItem('tableColumns', JSON.stringify(columnsVisibility))
    }
    if (fieldsJson && fieldsJson[table]) return fieldsJson[table];
    return null
  }

  /*
  * Name: setTableVisibilityFields
  * arg: table -> table to be set, value -> new table config object
  * description: Sets table column visibility
  * Author: Nick Dam
  */
  public setTableVisibilityFields(table: string, value: any) {
    let fieldsJson: any = localStorage.getItem('tableColumns');
    if (fieldsJson) {
      fieldsJson = JSON.parse(fieldsJson)
    }
    fieldsJson[table] = value;
    localStorage.setItem('tableColumns', JSON.stringify(fieldsJson))
  }

  /*
     * Name: changeColumnVisibility
     * arg: column -> object, table -> table name
     * description: Changes column visibility depending on given column and table and set to local storage
     * Author: Nick Dam
     */
  public changeColumnVisibility(column: any, table: string) {
    const local: any = this.getTableVisibilityFields(table);
    const newVal = !local[column.id];
    local[column.id] = newVal;
    this.setTableVisibilityFields(table, local)
  }

  /*
   * Name: makeSimpleSearchQuery
   * arg: fields -> array (searchBy), query -> search string
   * description: Creates simple search query
   * Author: Nick Dam
   */
  public makeSimpleSearchQuery(fields: string[], query: string) {
    let result = '';
    fields.forEach((item, key) => {
      if (key < fields.length - 1) {
        result += `${item}==*${query}*&`
      } else {
        result += `${item}==*${query}*`
      }
    });
    return result
  }

  /*
   * Name: getMultiLangName
   * arg: langs -> array of all languages
   * description: Returns a language object depending of the administration default language
   * Author: Nick Dam
   */
  public getMultiLangName(langs: ILanguage[] | undefined | null) {
    const self = this;
    if (langs && langs.length > 0) {
      let result = null;
      langs.forEach(lang => {
        if (lang.langKey === self.$store.state.currentLanguage) {
          result = lang
        }
      });
      if (result) {
        return result
      } else {
        return new Language()
      }
    } else {
      return new Language()
    }
  }

  /*
   * Name: getCountryById
   * arg: id -> Country ID
   * description: Returns a country object
   * Author: Nick Dam
   */
  public getCountryById(id: number) {
    let result = {
      enName: ''
    };
    this.$store.state.allCountries.forEach((country: any) => {
      if (country.id === id) {
        result = country
      }
    });
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
    };
    this.$store.state.allCountries.forEach((country: any) => {
      if (country.enName === name) {
        result = country.id
      }
    });
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
      ? relation.relationProfile.title : '';
    const firstName = relation.relationProfile && relation.relationProfile.firstName
      ? relation.relationProfile.firstName : '';
    const middleName = relation.relationProfile && relation.relationProfile.middleName
      ? relation.relationProfile.middleName : '';
    const lastName = relation.relationProfile && relation.relationProfile.lastName
      ? relation.relationProfile.lastName : '';
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
   * Name: extractAddress
   * arg: addresses:[] -> Array Of addresses
   * description: Extract address from given array and returns address label and address type
   * Author: Nick Dam
   */
  public extractAddress(addresses: any[]) {
    let street = '';
    let number = '';
    let city = '';
    let postal = '';
    let country = '';
    if (addresses && addresses.length) {
      street = addresses[0].street;
      number = addresses[0].houseNumber;
      city = addresses[0].city;
      postal = addresses[0].postalCode;
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
   * Name: preselectCountry
   * arg: id -> country ID
   * description: Preselect country
   * Author: Nick Dam
   */
  public preselectCountry(id?: number) {
    let country = new Country();
    if (!id) {
      id = 150
    }
    this.$store.state.allCountries.forEach((cntr: any) => {
      if (cntr.id === id) {
        country = cntr
      }
    });
    return country
  }

  /**
   * @return list of fixed relation fields
   */
  public relationFields() {
    return [
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
      }];
  }
}
