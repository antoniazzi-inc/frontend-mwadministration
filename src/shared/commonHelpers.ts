import { Vue, Component } from 'vue-property-decorator'
import { ILanguage, Language } from '@/shared/models/language.model'

@Component
export default class CommonHelpers extends Vue {
  /*
  * Name: hasAuthority
  * arg: authority -> list of authorities to be checked
  * description: Returns boolean depending on the list of authorities and the user authorities
  * Author: Nick Dam
  */
  public hasAuthority (authority: string|[]) {
    let auth: string[] = []
    let result = false
    if (typeof authority === 'string') {
      auth = [authority]
    } else {
      auth = authority
    }

    auth.forEach(item => {
      if (item === '*') {
        result = true
      } else if (auth.includes(item)) {
        result = true
      }
    })
    return result
    // TODO implement when you have user authorities in store
  }

  /*
   * Name: makeSimpleSearchQuery
   * arg: fields -> array (searchBy), query -> search string
   * description: Creates simple search query
   * Author: Nick Dam
   */
  public makeSimpleSearchQuery (fields: string[], query: string) {
    let result = ''
    fields.forEach((item, key) => {
      if (key < fields.length - 1) {
        result += `${item}==*${query}*&`
      } else {
        result += `${item}==*${query}*`
      }
    })
    return result
  }

  /*
   * Name: changeColumnVisibility
   * arg: column -> object, table -> table name
   * description: Changes column visibility depending on given column and table and set to local storage
   * Author: Nick Dam
   */
  public changeColumnVisibility (column: any, table: string, visibility: boolean) {
    const local = localStorage.getItem('tableColumns') ? localStorage.getItem('tableColumns') : ''
    const currentSettings = local ? JSON.parse(local) : {}
    if (currentSettings[table]) {
      currentSettings[table][column.id] = visibility
      localStorage.setItem('tableColumns', JSON.stringify(currentSettings))
    }
  }

  /*
   * Name: getMultiLangName
   * arg: langs -> array of all languages
   * description: Returns a language object depending of the administration default language
   * Author: Nick Dam
   */
  public getMultiLangName (langs: ILanguage[]|undefined|null) {
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
}
