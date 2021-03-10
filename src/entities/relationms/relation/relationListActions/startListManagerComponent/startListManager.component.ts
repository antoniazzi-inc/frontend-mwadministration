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
import { mixins } from 'vue-class-component'
import CommonHelpers from '@/shared/commonHelpers'
import { ISearchableSelectConfig, SearchableSelectConfig } from '@/shared/models/SearchableSelectConfig'
import SearchableSelectComponent from '@/components/searchableSelect/searchableSelect.vue'

@Component({
  components: {
    SearchableSelectComponent
  }
})
export default class StartListManagerComponent extends mixins(CommonHelpers, Vue) {
  public searchableSelectConfig: ISearchableSelectConfig
  public selectedValue:any
  constructor () {
    super()
    this.searchableSelectConfig = new SearchableSelectConfig('label',
      'labels.chooseListManager', '', false,
      false, true, false, false)
    this.selectedValue = null
  }
  public mounted () {
  }
  public updateValue(e:any){
    this.selectedValue = e
    this.$emit('updateCurrentAction', {value: e, type:'update'})
  }
  public removeValue(e:any){
    this.selectedValue = null
    this.$emit('updateCurrentAction', {value: null, type:'remove'})
  }
}
