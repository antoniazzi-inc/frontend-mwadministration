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
import PaginationTableComponent from '@/components/paginationTable/paginationTable.vue'
import SearchableSelectComponent from '@/components/searchableSelect/searchableSelect.vue'
import { AxiosResponse } from 'axios'
import { mixins } from 'vue-class-component'
import CommonHelpers from '@/shared/commonHelpers'
import SimpleSearchComponent from '@/components/simpleSearch/simpleSearch.vue'
import { IMultiLanguageConfig, MultiLanguageConfig } from '@/shared/models/MultiLanguageConfig'
import { CustomField, CustomFieldType, ICustomField } from '@/shared/models/relationms/custom-field.model'
import FreeFieldService from '@/shared/services/freeFieldService'
import MultiLanguageComponent from '@/components/multiLanguage/MultiLanguage.vue'
import ToggleSwitch from '@/components/toggleSwitch/toggleSwitch.vue'
import { ISearchableSelectConfig, SearchableSelectConfig } from '@/shared/models/SearchableSelectConfig'
import { CategoryEntity, ICategoryEntity } from '@/shared/models/administrationms/categoryModel'
import { CustomFieldOption, ICustomFieldOption } from '@/shared/models/relationms/custom-field-option.model'
import draggable from 'vuedraggable'
import moment from 'moment'
import FreeFieldOptionService from '@/shared/services/freeFieldOptionService'

@Component({
  components: {
    PaginationTableComponent,
    SearchableSelectComponent,
    SimpleSearch: SimpleSearchComponent,
    MultiLanguageComponent,
    ToggleSwitch,
    draggable
  },
  beforeRouteEnter (to, from, next) {
    next((vm: any) => {
      if (to.query.rel) {
        vm.goBackTo = to.query.rel
      }
      if (to.params.id) {
        vm.retrieveItem(to.params.id)
      }
    })
  }
})
export default class NewRelationFreeFieldsComponent extends mixins(CommonHelpers, Vue) {
  $refs!: {
    deleteModal: HTMLElement;
  }

  public freeField: ICustomField
  public multiLangConfig: IMultiLanguageConfig;
  public multiLangConfigOption: IMultiLanguageConfig;
  public searchableConfigCat: ISearchableSelectConfig;
  public freeFieldService: any;
  public goBackTo: any;
  public freeFieldOptionService: any;
  public editMode: boolean;
  public selectedCategory: ICategoryEntity|null
  public selectedOption: ICustomFieldOption
  public optionToDelete: number|null
  public selectedOptionIndex: number|null
  public allFreeFieldsTypes = {
    text: CustomFieldType.TEXT,
    boolean: CustomFieldType.BOOLEAN,
    optionList: CustomFieldType.OPTION_LIST
  }

  constructor () {
    super()
    this.goBackTo = null
    this.freeField = new CustomField()
    this.selectedOption = new CustomFieldOption()
    this.searchableConfigCat = new SearchableSelectConfig('code',
      'labels.category', '', false,
      false, true, false, false)
    this.multiLangConfig = new MultiLanguageConfig(true, false,
      'labels.freeFieldName', '', false, false, false,
      true, true, false)
    this.multiLangConfigOption = new MultiLanguageConfig(true, false,
      'labels.freeFieldOptionName', '', false, false, false,
      true, true, false)
    this.freeFieldService = FreeFieldService.getInstance()
    this.freeFieldOptionService = FreeFieldOptionService.getInstance()
    this.selectedCategory = new CategoryEntity()
    this.editMode = false
    this.optionToDelete = null
    this.selectedOptionIndex = null
  }

  public retrieveItem (id: number) {
    this.freeFieldService.get(id).then((resp: AxiosResponse) => {
      this.freeField = resp.data
      const langs: any = []
      resp.data.customFieldLanguages.forEach((lang: any) => {
        langs.push({
          id: lang.id,
          name: lang.name,
          description: lang.intro,
          langKey: lang.langKey,
          version: lang.version
        })
      })
    }).catch((e: any) => {
      if (e) {
        this.setAlert('somethingWentWrong', 'error')
      }
    })
  }

  public addNewFreeFieldLanguage (langKey: any) {
    const lang = {
      langKey: langKey,
      name: '',
      description: ''
    }
    let index = null
    if (this.freeField.customFieldLanguages && this.freeField.customFieldLanguages.length) {
      this.freeField.customFieldLanguages.forEach((language, i) => {
        if (language.langKey === lang.langKey) {
          index = i
        }
      })
      if (index !== null) {
        this.$set(this.freeField.customFieldLanguages, index, lang)
      } else {
        this.freeField.customFieldLanguages.push(lang)
      }
    } else {
      this.freeField.customFieldLanguages = [lang]
    }
  }

  public changeNewFreeFieldLanguage (lang: any) {
    let index = null
    if (this.freeField.customFieldLanguages) {
      this.freeField.customFieldLanguages.forEach((language, i) => {
        if (language.langKey === lang.langKey) {
          index = i
        }
      })
      if (index !== null) {
        this.$set(this.freeField.customFieldLanguages, index, lang)
      }
    }
  }

  public removeFreeFieldLanguage (lang: any) {
    let index = null
    if (this.freeField.customFieldLanguages) {
      this.freeField.customFieldLanguages.forEach((language: any, ind: number) => {
        if (language.langKey === lang.langKey) {
          index = ind
        }
      })
      if (index !== null) {
        this.freeField.customFieldLanguages.splice(index, 1)
      }
    }
  }

  public addNewFreeFieldOptionLanguage (langKey: any) {
    const lang = {
      langKey: langKey,
      name: '',
      description: ''
    }
    let index = null
    if (this.selectedOption.customFieldOptionLanguages && this.selectedOption.customFieldOptionLanguages.length) {
      this.selectedOption.customFieldOptionLanguages.forEach((language, i) => {
        if (language.langKey === lang.langKey) {
          index = i
        }
      })
      if (index !== null) {
        this.$set(this.selectedOption.customFieldOptionLanguages, index, lang)
      } else {
        this.selectedOption.customFieldOptionLanguages.push(lang)
      }
    } else {
      this.selectedOption.customFieldOptionLanguages = [lang]
    }
  }

  public changeNewFreeFieldOptionLanguage (lang: any) {
    let index = null
    if (this.selectedOption.customFieldOptionLanguages) {
      this.selectedOption.customFieldOptionLanguages.forEach((language, i) => {
        if (language.langKey === lang.langKey) {
          index = i
        }
      })
      if (index !== null) {
        this.$set(this.selectedOption.customFieldOptionLanguages, index, lang)
      }
      this.selectedOption.value = this.selectedOption.customFieldOptionLanguages
        ? this.selectedOption.customFieldOptionLanguages[0].name : lang.name
    }
  }

  public removeFreeFieldOptionLanguage (lang: any) {
    let index = null
    if (this.selectedOption.customFieldOptionLanguages) {
      this.selectedOption.customFieldOptionLanguages.forEach((language: any, ind: number) => {
        if (language.langKey === lang.langKey) {
          index = ind
        }
      })
      if (index !== null) {
        this.selectedOption.customFieldOptionLanguages.splice(index, 1)
      }
    }
  }

  public saveOptionField (e: any) {
    const self = this
    this.$validator.validateAll().then(resp => {
      if (resp) {
        self.selectedOption.customFieldOptionLanguages && self.selectedOption.customFieldOptionLanguages[0].name
          ? self.selectedOption.code = self.selectedOption.customFieldOptionLanguages[0].name.replace(/\s/g, '_')
          : self.selectedOption.code = ''
        self.selectedOption.customField = {
          id: self.freeField.id,
          version: self.freeField.version
        }
        if (self.selectedOption.id) {
          this.freeFieldOptionService.put(this.selectedOption).then((resp: AxiosResponse) => {
            if (resp) {
              if (this.selectedOptionIndex !== null && this.freeField.customFieldOptions) {
                this.freeField.customFieldOptions[this.selectedOptionIndex] = resp.data
              }
              this.setAlert('freeFieldOptionUpdated', 'success')
              this.editMode = false
            } else {
              this.setAlert('freeFieldOptionUpdateError', 'error')
            }
          })
        } else {
          if(self.freeField.id){
            this.freeFieldOptionService.post(this.selectedOption).then((resp: AxiosResponse) => {
              if (resp) {
                if (this.selectedOptionIndex !== null && this.freeField.customFieldOptions) {
                  this.freeField.customFieldOptions[this.selectedOptionIndex] = resp.data
                } else {
                  this.freeField.customFieldOptions?.push(resp.data)
                }
                this.setAlert('freeFieldOptionCreated', 'success')
                this.editMode = false
              } else {
                this.setAlert('freeFieldOptionCreateError', 'error')
              }
            })
          } else {
            this.editMode = false
          }
        }
      }
    })
  }

  public cancelOptionField (e: any) {
    this.editMode = false
    if (!this.selectedOption.id && this.selectedOptionIndex !== null) {
      this.freeField.customFieldOptions?.splice(this.selectedOptionIndex, 1)
      this.selectedOptionIndex = null
    }
  }

  public categoryUpdated (cat: any) {
    this.selectedCategory = cat
  }

  public categoryRemoved (cat: any) {
    this.selectedCategory = null
  }

  public saveFreeField () {
    const self = this
    this.$validator.validateAll().then(resp => {
      if (resp && this.freeField.customFieldLanguages && this.freeField.customFieldLanguages.length &&
        this.freeField.customFieldLanguages[0].name !== '') {
        self.freeField.customFieldLanguages && self.freeField.customFieldLanguages[0].name
          ? self.freeField.code = self.freeField.customFieldLanguages[0].name.replace(/\s/g, '_')
          : self.freeField.code = ''
        this.freeField.categoryId = this.selectedCategory?.id
        this.freeField.relationCustomFields = undefined
        if (this.freeField.id) {
          const dto = JSON.parse(JSON.stringify(this.freeField))
          dto.customFieldOptions = undefined
          this.freeFieldService.put(dto).then((resp: AxiosResponse) => {
            if (resp) {
              this.setAlert('freeFieldUpdated', 'success')
              this.cancel()
            } else {
              this.setAlert('freeFieldUpdateError', 'error')
            }
          })
        } else {
          this.freeFieldService.post(this.freeField).then((resp: AxiosResponse) => {
            if (resp) {
              this.setAlert('freeFieldCreated', 'success')
              if (this.goBackTo !== null) {
                this.$router.push(`/relations/edit/${this.goBackTo}?tab=freeFields`)
              } else {
                this.cancel()
              }
            } else {
              this.setAlert('freeFieldCreateError', 'error')
            }
          })
        }
      } else {
        this.setAlert('fillRequiredFields', 'error')
      }
    })
  }

  public cancel () {
    this.$router.go(-1)
  }

  public addNewFreeFieldOption () {
    const newOption = new CustomFieldOption()
    newOption.createdOn = moment()
    newOption.updatedOn = moment()
    if (this.freeField.customFieldOptions && this.freeField.customFieldOptions.length) {
      newOption.customFieldIndex = this.freeField.customFieldOptions.length + 1
      this.freeField.customFieldOptions.push(newOption)
    } else {
      newOption.customFieldIndex = 1
      this.freeField.customFieldOptions = [newOption]
    }
    this.editOption(newOption, this.freeField.customFieldOptions.length - 1)
  }

  public editOption (option: any, index: number) {
    this.selectedOption = option
    this.selectedOptionIndex = index
    this.editMode = true
  }

  public prepareDeleteOption (index: number) {
    this.optionToDelete = index
  }

  public changeType (e: any) {
    this.freeField = new CustomField()
    this.freeField.customFieldType = e.currentTarget.value
  }

  public removeOptionConfirmed () {
    if (this.selectedOption.id) {
      this.freeFieldOptionService.delete(this.selectedOption.id).then((resp: AxiosResponse) => {
        if (resp) {
          if (this.optionToDelete !== null && this.freeField.customFieldOptions) { this.freeField.customFieldOptions.splice(this.optionToDelete, 1) }
          this.optionToDelete = null
          this.setAlert('freeFieldOptionRemoved', 'success')
        } else {
          this.setAlert('freeFieldOptionRemoveError', 'success')
        }
      })
    } else {
      if (this.optionToDelete !== null && this.freeField.customFieldOptions) {
        this.freeField.customFieldOptions.splice(this.optionToDelete, 1)
        this.setAlert('freeFieldOptionRemoved', 'success')
        this.optionToDelete = null
      }
    }
    this.closeModal()
  }

  public closeModal () {
    // @ts-ignore
    $(this.$refs.deleteModal).modal('hide')
  }

  public changeIndex (event: any) {
    if (this.freeField.customFieldOptions) {
      const oldIndex = this.freeField.customFieldOptions[event.oldIndex].customFieldIndex
      const newIndex = this.freeField.customFieldOptions[event.newIndex].customFieldIndex
      this.freeField.customFieldOptions[event.oldIndex].customFieldIndex = newIndex
      this.freeField.customFieldOptions[event.newIndex].customFieldIndex = oldIndex
      this.resetIndexes(this.freeField.customFieldOptions)
    }
  }

  public resetIndexes (toSort: any) {
    const self = this
    for (let i = 1; i <= toSort.length; i++) {
      toSort[i - 1].customFieldIndex = i
    }
    const sortedOptions = toSort.sort(function (a: any, b: any) {
      return a.customFieldIndex - b.customFieldIndex
    })
    this.$set(self.freeField, 'customFieldOptions', sortedOptions)
  }
}
