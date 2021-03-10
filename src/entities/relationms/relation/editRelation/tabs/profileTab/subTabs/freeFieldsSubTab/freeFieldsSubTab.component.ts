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

import { Component, Inject, Vue, Watch } from 'vue-property-decorator'

import relationFreeFieldService from '@/shared/services/relationFreeFieldService'
import relationFreeFieldOptionService from '@/shared/services/relationFreeFieldOptionService'
import { IRelationEntity, RelationEntity } from '@/shared/models/relationms/relationModel'
import { AxiosResponse } from 'axios'
import { mixins } from 'vue-class-component'
import CommonHelpers from '@/shared/commonHelpers'
import { CustomField, ICustomField } from '@/shared/models/relationms/custom-field.model'
import SearchableSelectComponent from '@/components/searchableSelect/searchableSelect.vue'
import { SearchableSelectConfig } from '@/shared/models/SearchableSelectConfig'
import { RelationCustomField } from '@/shared/models/relationms/relation-custom-field.model'
import { Language } from '@/shared/models/language.model'

@Component({
  props: {
    rel: Object,
    active: Boolean
  },
  components: {
    SearchableSelectComponent
  }
})
export default class FreeFieldSubTabComponent extends mixins(CommonHelpers, Vue) {
  refs!: {
    removeEntityFreeField: HTMLElement;
  };

  public customFieldService = relationFreeFieldService.getInstance();
  public relationCustomFieldService = relationFreeFieldService.getInstance();
  public editMode = false;
  public searchString = '';
  public addNewField = false;
  public relationCopy: IRelationEntity | null = null;
  public selectedOptionValue: any = null;
  public fieldsConfig = new SearchableSelectConfig('name',
    'labels.selectField', 'labels.createNewField', true,
    true, true, false, false);

  public selectedFields: ICustomField[] = [];
  public allCustomFields: ICustomField[] = [];
  public itemToDelete: ICustomField = {};
  public fieldToEdit = new RelationCustomField(undefined, undefined, '',
    undefined, new CustomField(undefined, undefined, '', false,
      false, false, undefined, undefined,
      [new Language(undefined, undefined, this.$store.state.currentLanguage,
        '', '', '', undefined, undefined, undefined, undefined)],
      undefined, undefined, undefined, undefined, undefined));

  public allFields: ICustomField[] = [];

  @Watch('active', { immediate: true, deep: true })
  public changeActive (newVal: any) {
    let url = window.location.href
    if(url.includes('tab=freeFields')) {
      this.editMode = true
      this.addNewField = true
    }
  }
  @Watch('rel', { immediate: true, deep: true })
  public fillRel (newVal: any) {
    this.relationCopy = JSON.parse(JSON.stringify(newVal))
  }

  @Watch('selectedOptionValue', { immediate: true, deep: true })
  public fillVal (newVal: any) {
    if (this.fieldToEdit && newVal) this.fieldToEdit.value = newVal
  }

  public created () {
    this.relationCopy = new RelationEntity()
    this.fieldToEdit = new RelationCustomField()
    this.retrieveAllCustomFields()
  }

  public mounted () {
    this.relationCopy = this.$props.rel
    this.searchString = ''
  }

  public retrieveAllCustomFields () {
    this.allCustomFields = this.$store.state.lookups.freeFields
    this.getAllFreeFields(this.$store.state.lookups.freeFields)
  }

  public closeModal () {
    console.log('TODO implement closeModal')
  }

  public removeConfirmed () {
    console.log('TODO implement removeConfirmed')
  }

  public searchFreeFields () {
    console.log('TODO implement searchFreeFields')
  }

  public editRelationField (item: any) {
    if (item.customField.customFieldType === 'OPTION_LIST') {
      this.selectedOptionValue = item.value
    }
    if (item) {
      this.fieldToEdit = item
    } else {
      this.fieldToEdit = {
        customField: new CustomField(),
        updatedOn: undefined,
        createdOn: undefined,
        value: '',
        version: undefined,
        id: undefined
      }
    }
    this.fieldToEdit.customField = item.customField
    this.editMode = true
    this.addNewField = false
  }

  @Watch('active', { immediate: true, deep: true })
  public populate (newVal: boolean) {
    if (newVal) {
      this.allFields = []
      this.getAllFreeFields(this.$store.state.lookups.freeFields)
    }
  }

  public getAllFreeFields (allFields: any) {
    const self = this
    const all: any = []
    $.each(allFields, function (k, v) {
      let toSkip = false
      if (self.relationCopy) {
        $.each(self.relationCopy.relationCustomFields, function (key, val: any) {
          if (val.customField.id === v.value.id) {
            toSkip = true
          }
        })
      }
      if (!toSkip) {
        all.push({
          label: self.getMultiLangName(v.value.customFieldLanguages).name,
          code: v.value.code,
          customFieldLanguages: v.value.customFieldLanguages,
          customFieldOptions: v.value.customFieldOptions,
          createdOn: v.value.createdOn,
          updatedOn: v.value.updatedOn,
          customFieldType: v.value.customFieldType,
          id: v.value.id,
          gdprSpecialField: v.value.gdprSpecialField,
          version: v.value.version,
          administrationId: v.value.administrationId,
          userEditable: v.value.userEditable,
          userVisible: v.value.userVisible,
          name: self.getMultiLangName(v.value.customFieldLanguages).name
        })
      }
    })
    Vue.nextTick(function () {
      self.allFields = all
    })
  }

  public deleteRelationField (item: any) {
    // @ts-ignore
    $(this.$refs.deleteModal).modal('show')
    this.itemToDelete = item
  }

  public removeField () {
    if (this.itemToDelete.id) {
      this.relationCustomFieldService.delete(this.itemToDelete.id).then((resp: AxiosResponse) => {
        this.$emit('updateRel')
        this.setAlert(this.$t('toastMessages.customFieldDeleted'), 'success')
        this.closeDialog()
        this.getAllFreeFields(this.$store.state.lookups.freeFields)
      })
    }
  }

  public closeDialog () {
    // @ts-ignore
    $(this.$refs.deleteModal).modal('hide')
    this.itemToDelete = {}
    this.$emit('retrieveRelation', this.relationCopy)
  }

  public getName (langs: any) {
    if (!langs) return ''
    let lang = ''
    const self = this
    $.each(langs, function (k, v) {
      if (v.langKey === self.$store.state.currentLanguage) {
        lang = v.name
      }
    })
    if (lang !== '') {
      return lang
    } else {
      return langs[0] ? langs[0].name : ''
    }
  }

  public newField () {
    this.editMode = true
    this.addNewField = true
    this.getAllFreeFields(this.$store.state.lookups.freeFields)
  }

  public navigateToFieds () {
    if (this.relationCopy) this.$router.push('/relations-free-fields/new?rel=' + this.relationCopy.id)
  }

  public addField (field: any) {
    if (field) {
      this.fieldToEdit = {
        customField: field,
        value: '',
        id: undefined,
        createdOn: undefined,
        updatedOn: undefined,
        version: undefined
      }
    } else {
      this.fieldToEdit = {
        customField: new CustomField(),
        updatedOn: undefined,
        createdOn: undefined,
        value: '',
        version: undefined,
        id: undefined
      }
    }
    this.addNewField = true
    this.editMode = true
    this.getAllFreeFields(this.$store.state.lookups.freeFields)
  }

  public saveFreeField () {
    const self = this
    if (this.relationCopy) {
      this.fieldToEdit.relation = { id: this.relationCopy.id, version: this.relationCopy.version }
      if (this.fieldToEdit && this.fieldToEdit.customField && this.fieldToEdit.customField.customFieldType === 'OPTION_LIST') {
        this.fieldToEdit.value = this.selectedOptionValue
      }
      if (this.fieldToEdit.id) {
        this.relationCustomFieldService.put(this.fieldToEdit).then((resp: AxiosResponse) => {
          if(!resp) {
            this.setAlert(this.$t('toastMessages.relationCustomFieldUpdateError'), 'error')
            return
          }
          this.setAlert(this.$t('toastMessages.relationCustomFieldUpdated'), 'success')
          this.cancelFreeField()
          self.$emit('updateRel', self.relationCopy)
        })
      } else {
        this.relationCustomFieldService.post(this.fieldToEdit).then((resp: AxiosResponse) => {
          if(!resp) {
            this.setAlert(this.$t('toastMessages.relationCustomFieldCreateError'), 'error')
            return
          }
          this.setAlert(this.$t('toastMessages.relationCustomFieldCreated'), 'success')
          this.cancelFreeField()
          self.$emit('updateRel', self.relationCopy)
        })
      }
    }
  }

  public cancelFreeField () {
    this.editMode = false
    this.addNewField = false
    this.fieldToEdit = new RelationCustomField()
    this.$emit('retrieveRelation', this.relationCopy)
  }
}
