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
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
import {mixins} from 'vue-class-component'
import CommonHelpers from '@/shared/commonHelpers'
import {ISearchableSelectConfig, SearchableSelectConfig} from "@/shared/models/SearchableSelectConfig";
import SearchableSelectComponent from "@/components/searchableSelect/searchableSelect.vue";
import ToggleSwitch from "@/components/toggleSwitch/toggleSwitch.vue";

@Component({
  props: {
    importFields: {
      type: Array
    },
    data: {
      type: Array
    },
    headerRow: {
      type: Array
    }
  },
  components: {
    SearchableSelectComponent,
    ToggleSwitch: ToggleSwitch
  }
})
export default class Step2Component extends mixins(CommonHelpers, Vue) {
  public isProcessing: boolean
  public overwrite: boolean
  public insertEmptyValues: boolean
  public newGroup: string
  public selectedGroup: any
  public selectedFieldValue: any
  public mappings: any[]
  public searchableConfig: ISearchableSelectConfig
  public searchableConfigGroups: ISearchableSelectConfig

  constructor() {
    super()
    this.selectedGroup = {}
    this.selectedFieldValue = {}
    this.newGroup = ''
    this.isProcessing = false
    this.insertEmptyValues = false
    this.overwrite = false
    this.mappings = []
    this.searchableConfig = new SearchableSelectConfig('label',
      'labels.field', '', false,
      false, false, false, false, true)
    this.searchableConfigGroups = new SearchableSelectConfig('label',
      'labels.selectGroup', '', false,
      false, false, false, false)
  }

  public mounted() {
    this.selectedFieldValue = {
      label: this.$t('labels.doNotAssign'),
      value: 'dnassign'
    }
    this.selectedGroup = {
      label: this.$t('labels.defaultGroup'),
      value: 'default'
    }
  }

  public assignImportField(field: any, index: any) {
    if (!field) return
    let toUpdate = this.mappings.find((e, ind) => {
      if (ind === index && field.value === e.fieldName) {
        return ind
      }
    })
    let newField: any = {}
    if (typeof field.value === "object") {
      newField.model = 'customFields'
      newField.value = field
      newField.fieldName = ''
      newField.rowIndex = index
      this.mappings.push(newField)
      return;
    }
    if (toUpdate >= 0) {
      this.mappings[toUpdate] = {
        fieldName: field.value,
        rowIndex: index,
        model: field.model
      }
    } else {
      this.mappings.push({fieldName: field.value, rowIndex: index, model: field.model})
    }
    this.$emit('onUpdateMappings', this.mappings)
  }

  @Watch('newGroup', {immediate: true, deep: true})
  public changeNewGroup(newVal: any) {
    this.$emit('changeNewGroup', newVal)
  }

  @Watch('overwrite', {immediate: true, deep: true})
  public changeOverwrite(newVal: any) {
    this.$emit('changeOverwrite', newVal)
  }

  @Watch('insertEmptyValues', {immediate: true, deep: true})
  public changeInsertEmptyValues(newVal: any) {
    this.$emit('changeInsertEmptyValues', newVal)
  }

  public removeImportField(field: any, index: any) {
    if (!field) return
    let toRemove = this.mappings.find((e, ind) => {
      if (ind === index && field.value === e.fieldName) {
        return ind
      }
    })
    if (toRemove >= 0) {
      this.mappings.splice(toRemove, 1)
    }
    this.$emit('onUpdateMappings', this.mappings)
  }

  public changeGroup(group: any) {
    this.selectedGroup = group
    this.$emit('groupChanged', group)
  }

  public removeGroup(group: any) {
    this.selectedGroup = null
    this.$emit('groupChanged', null)
  }
}
