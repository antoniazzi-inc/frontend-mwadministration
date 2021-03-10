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
import Chrome from 'vue-color/src/components/Chrome'
import MultiLanguageComponent from '../../../../components/multiLanguage/MultiLanguage.vue'
import { IMultiLanguageConfig, MultiLanguageConfig } from '@/shared/models/MultiLanguageConfig'
import { HelpTag, IHelpTag } from '@/shared/models/administrationms/help-tag.model'
import { HelpTagLanguage, IHelpTagLanguage } from '@/shared/models/administrationms/HelpTaglanguage.model'
import { AxiosResponse } from 'axios'
import HelpTagService from '@/shared/services/helpTagService'
@Component({
  components: {
    SearchableSelectComponent,
    'multi-language-component': MultiLanguageComponent,
    'chrome-picker': Chrome
  },
  beforeRouteEnter (to, from, next) {
    next((vm: any) => {
      if (to.params.id) {
        vm.retrieveItem(to.params.id)
      }
    })
  }
})
export default class NewHelpTagComponent extends mixins(CommonHelpers, Vue) {
  public helpTag: IHelpTag
  public helpTagService: any
  public multiLangConfig: IMultiLanguageConfig
  public helpTagLanguages: any[]
  public colors: any[]
  constructor () {
    super()
    this.multiLangConfig = new MultiLanguageConfig(true, true, 'labels.name',
      'labels.description', false,
      false, false, true, true, false)
    this.helpTagLanguages = []
    this.colors = []
    this.helpTag = new HelpTag()
    this.helpTagService = HelpTagService.getInstance()
  }

  public mounted () {

  }

  public retrieveItem (id: number) {
    this.helpTagService.get(id).then((resp: AxiosResponse) => {
      this.helpTag = resp.data
      const langs: any = []
      resp.data.helpTagLanguages.forEach((lang: any) => {
        langs.push({
          id: lang.id,
          name: lang.name,
          description: lang.intro,
          langKey: lang.langKey,
          version: lang.version
        })
      })
      this.helpTagLanguages = langs
    })
  }

  public cancel () {
    this.$router.go(-1)
  }

  public async save () {
    if (this.helpTagLanguages && this.helpTagLanguages.length > 0 && this.helpTagLanguages[0].name !== '') {
      const helpTagLangs: IHelpTagLanguage[] = []
      await this.helpTagLanguages.forEach(lang => {
        const langToAdd = new HelpTagLanguage(lang.id, lang.administrationId, lang.version, lang.createdOn,
          lang.updatedOn, lang.langKey, lang.name, lang.description, lang.helpCategory)
        helpTagLangs.push(langToAdd)
      })
      this.helpTag.helpTagLanguages = helpTagLangs
      if (this.helpTag.id) {
        this.helpTagService.put(this.helpTag).then((resp: AxiosResponse) => {
          if (resp) {
            this.cancel()
            this.setAlert('helpTagUpdated', 'success')
          } else {
            this.setAlert('helpTagError', 'error')
          }
        })
      } else {
        this.helpTagService.post(this.helpTag).then((resp: AxiosResponse) => {
          if (resp) {
            this.cancel()
            this.setAlert('helpTagUpdated', 'success')
          } else {
            this.setAlert('helpTagError', 'error')
          }
        })
      }
    }
  }

  public changeNewHelpTagLanguage (lang: any) {
    let index = null
    this.helpTagLanguages.forEach((language, i) => {
      if (language.langKey === lang.langKey) {
        index = i
      }
    })
    if (index !== null) {
      this.$set(this.helpTagLanguages, index, lang)
    }
  }

  public addNewHelpTagLanguage (lang: string) {
    const newLang: any = {
      name: '',
      description: '',
      langKey: lang
    }
    this.helpTagLanguages.push(newLang)
  }

  public removeHelpTagLanguage (lang: any) {
    let index = null
    this.helpTagLanguages.forEach((language: any, ind: number) => {
      if (language.langKey === lang.langKey) {
        index = ind
      }
    })
    if (index !== null) {
      this.helpTagLanguages.splice(index, 1)
    }
  }

  public updateColor (color: any) {
    this.helpTag.color = color.hex
  }
}
