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

import { Component, Vue, Watch } from 'vue-property-decorator'
import { MultiLanguageConfig } from '@/shared/models/MultiLanguageConfig'
import Store from '@/store/index'
@Component({
  props: {
    config: MultiLanguageConfig,
    value: {
      type: Array
    },
    isValidating: Boolean,
    availableLangs: Object
  }
})
export default class MultiLanguageComponent extends Vue {
  public selectedLanguage: string
  public selectedValue: any
  public allAvailableLanguages: any
  constructor () {
    super()
    this.selectedLanguage = ''
    this.allAvailableLanguages = Store.state.languages
    this.selectedValue = {
      name: '',
      description: '',
      langKey: ''
    }
  }

  public mounted () {
    this.selectedLanguage = this.$store.state.currentLanguage
    this.getSelectedLanguage()
  }

  @Watch('selectedValue', { immediate: true, deep: true })
  public onChangeVal () {
    this.$validator.validateAll().then(success => {
      if (success) this.$emit('onChange', this.selectedValue)
    })
  }

  @Watch('value', { immediate: true, deep: true })
  public getSelectedLanguage () {
    let selectedLang: any = null
    let selectedLangIndex = null
    const self = this
    if (this.$props.value) {
      this.$props.value.forEach((lang: any, index: number) => {
        if (lang.langKey === self.selectedLanguage) {
          selectedLang = lang
          selectedLangIndex = index
        }
      })
    }
    if (selectedLang) {
      this.selectedValue = selectedLang
      this.selectedLanguage = selectedLang.langKey
    } else {
      if (this.$props.value && this.$props.value[0]) {
        this.selectedLanguage = this.$props.value[0].langKey
        this.selectedValue = this.$props.value[0]
      } else {
        this.selectedValue = {
          name: '',
          description: '',
          langKey: this.$store.state.currentLanguage
        }
        this.$emit('onAdd', this.selectedValue.langKey)
      }
    }
  }

  public changeLanguage (lang: string) {
    let selectedLang: any = null
    this.selectedLanguage = lang
    this.$props.value.forEach((l: any, index: number) => {
      if (l.langKey === lang) {
        selectedLang = l
      }
    })
    if (selectedLang) {
      this.selectedValue = selectedLang
    } else {
      this.$emit('onAdd', lang)
    }
  }

  public checkIfHasValue (lang: any) {
    let hasVal = false
    $.each(this.$props.value, function (k, v) {
      if (v.langKey === lang) {
        if ((v.name && v.name !== '') || (v.description && v.description !== '')) {
          hasVal = true
        }
      }
    })
    return hasVal
  }

  public removeLanguage () {
    this.$emit('onRemove', this.selectedValue)
  }
}
