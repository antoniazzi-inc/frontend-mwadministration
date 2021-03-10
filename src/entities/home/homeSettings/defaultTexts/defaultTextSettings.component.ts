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

import { mixins } from 'vue-class-component'
import CommonHelpers from '@/shared/commonHelpers'
import { Component, Vue, Watch } from 'vue-property-decorator'
import { ISearchableSelectConfig, SearchableSelectConfig } from '@/shared/models/SearchableSelectConfig'
import { MjmlFonts } from '@/shared/fonts'
import Chrome from 'vue-color/src/components/Chrome'
import SearchableSelectComponent from '@/components/searchableSelect/searchableSelect.vue'
@Component({
  components: {
    'chrome-picker': Chrome,
    SearchableSelectComponent
  },
  props: {
    configuration: Object,
    active: Boolean,
    'copied-config': Object
  }
})
export default class DefaultTextSettingsComponent extends mixins(Vue, CommonHelpers) {
  public config: any
  public allFonts: any[]
  public colors: any[] = []
  public searchableConfigFonts: ISearchableSelectConfig
  constructor () {
    super()
    this.config = null
    this.searchableConfigFonts = new SearchableSelectConfig('name',
      'labels.fonts', '', false,
      false, true, false, false)
    this.allFonts = MjmlFonts //Fonts
  }

  public updateBackgroundColor (color: any) {
    this.config.backgroundColor = color.hex
  }

  public fontChanged (font: any) {
    this.config.font = font
  }

  public fontRemoved (font: any) {
    this.config.font = ''
  }
  public copyConfig () {
    this.$emit('onCopy', this.config)
  }
  public pasteConfig () {
    if(this.$props.copiedConfig){
      this.config = this.$props.copiedConfig
    }
  }

  public updateBorderColor (e: any) {
    this.config.buttonForegroundColor = e.hex
  }

  public updateButtonsBackgroundColor (e: any) {
    this.config.buttons.backgroundColor = e.hex
  }

  public updateHeaderFontColor (e: any) {
    this.config.header.color = e.hex
  }

  public updateTextFontColor (e: any) {
    this.config.text.color = e.hex
  }

  public updateFooterFontColor (e: any) {
    this.config.footer.color = e.hex
  }

  public updateFooterBackgroundColor (e: any) {
    this.config.footer.backgroundColor = e.hex
  }

  @Watch('active', { immediate: true, deep: true })
  public populateConfig () {
    this.config = this.$props.configuration
  }

  @Watch('config', { immediate: true, deep: true })
  public emitChange (config: any) {
    this.$emit('onUpdate', config)
  }
}
