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
import { SearchableSelectConfig } from '@/shared/models/SearchableSelectConfig'
import Multiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.min.css'
@Component({
  components: {
    Multiselect
  },
  props: {
    config: SearchableSelectConfig,
    options: [Array, Set],
    value: [Object, Array, Set]
  }
})
export default class SearchableSelectComponent extends Vue {
  public val: []|object;
  constructor () {
    super()
    this.val = []
  }

  public mounted () {
    this.val = this.$props.value
  }

  @Watch('value', { immediate: true, deep: true })
  public fillValue (changeVal: any) {
    this.val = changeVal
  }

  @Watch('active', { immediate: true, deep: true })
  public valueChanged (changeVal: object) {
    this.$emit('onChange', changeVal)
  }

  public valueAdded (addedVal: object) {
    this.$emit('onSelected', addedVal)
  }

  public valueRemoved (removeVal: object) {
    if(this.$props.config.allowEmpty){
      this.$emit('onDelete', removeVal)
    }
  }

  public search (query: string) {
    this.$emit('onSearch', query)
  }

  public createNew () {
    this.$emit('onCreate')
  }
}
