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

import {mixins} from "vue-class-component";
import CommonHelpers from "@/shared/commonHelpers";
import {Component, Vue} from "vue-property-decorator";
import {ISearchableSelectConfig, SearchableSelectConfig} from "@/shared/models/SearchableSelectConfig";
import SearchableSelectComponent from "@/components/searchableSelect/searchableSelect.vue";
@Component({
  components:{
    SearchableSelectComponent
  }, props: {
    query: [Object,Array,String]
  }
})
export default class RegionsComplexSearchComponent extends mixins(CommonHelpers, Vue) {
  public regionsSingleSelectConfig: ISearchableSelectConfig
  public selectedOperator: any
  public selectedRegion: any
  constructor() {
    super();
    this.regionsSingleSelectConfig =  new SearchableSelectConfig('name',
      'labels.selectRegion', '', false,
      false, false, false, false)
    this.selectedRegion = null
  }

  public addRegion(e:any){
    this.$emit('input', e)
  }
  public removeRegion(e:any){
    this.$emit('input', e)
  }
}
