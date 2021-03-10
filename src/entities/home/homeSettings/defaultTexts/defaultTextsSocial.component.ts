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
import ToggleSwitch from '@/components/toggleSwitch/toggleSwitch.vue'
import { mixins } from 'vue-class-component'
import CommonHelpers from '@/shared/commonHelpers'
import { SocialMediaConfig } from '@/shared/defaultTextsConfig'
@Component({
  components: {
    ToggleSwitch
  },
  props: {
    value: Object
  }
})
export default class DefaultTextsSocialComponent extends mixins(Vue, CommonHelpers) {
  public social: any[]
  constructor () {
    super()
    this.social = JSON.parse(JSON.stringify(SocialMediaConfig))
  }

  public mounted () {

  }

  @Watch('social', { immediate: false, deep: true })
  public updateValue (newVal: any) {
    this.$emit('onUpdate', newVal)
  }

  @Watch('value', { immediate: true, deep: true })
  public updateVal (newVal: any) {
    const copySocial = JSON.parse(JSON.stringify(SocialMediaConfig))
    this.social = []
    this.social = newVal && newVal.value && newVal.value.socialMedia && newVal.value.socialMedia.length
      ? newVal.value.socialMedia : copySocial
  }

  public validateUrl (index: number, fieldName: string) {
    if (this.social[index].url && !this.$validator.errors.has(fieldName)) { this.social[index].url = this.checkForUrlHttps(this.social[index].url) }
  }
}
