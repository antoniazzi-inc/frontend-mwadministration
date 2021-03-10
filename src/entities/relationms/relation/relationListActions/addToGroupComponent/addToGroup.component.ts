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

import {Component, Vue, Watch} from 'vue-property-decorator'
import RelationService from '@/shared/services/relationService'
import PaginationTableComponent from '@/components/paginationTable/paginationTable.vue'
import { AxiosResponse } from 'axios'
import { mixins } from 'vue-class-component'
import CommonHelpers from '@/shared/commonHelpers'
import SimpleSearchComponent from '@/components/simpleSearch/simpleSearch.vue'
import { ISearchableSelectConfig, SearchableSelectConfig } from '@/shared/models/SearchableSelectConfig'
import SearchableSelectComponent from '@/components/searchableSelect/searchableSelect.vue'
import complexSearchComponent from '@/entities/relationms/relation/complexSearch/complexSearch.vue'
import { EventBus } from '@/shared/eventBus'
import ComplexSearchComponent from "@/components/complexSearchWidget/complexSearch.vue";

@Component({
  components: {
    SearchableSelectComponent
  }
})
export default class AddToGroupComponent extends mixins(CommonHelpers, Vue) {
  public groupsSelectConfig: ISearchableSelectConfig
  public selectedGroup:any
  public newGroupName:any
  public addNewGroup:Boolean
  constructor () {
    super()
this.groupsSelectConfig = new SearchableSelectConfig('label',
  'labels.chooseGroup', 'buttons.addNew', false,
  true, true, false, false)
    this.selectedGroup = null
    this.addNewGroup = false
    this.newGroupName = ''
  }
  @Watch('newGroupName', {immediate: true, deep: true})
  public updateNewGroupName (e:any) {
    if(e){
      this.$emit('updateCurrentAction', {value: e, type:'create'})
    }
  }
  public mounted () {
  }

  public createNewGroup(){
    this.addNewGroup = true
  }
  public updateGroup(e:any){
    this.selectedGroup = e
    this.$emit('updateCurrentAction', {value: e, type:'update'})
  }
  public removeGroup(e:any){
    this.selectedGroup = null
    this.$emit('updateCurrentAction', {value: null, type:'remove'})
  }

  public cancelNewGroup(){
    this.addNewGroup = false
    this.newGroupName = ''
    this.$emit('updateCurrentAction', {value: null, type:'remove'})
  }

}
