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
import { ITagEntity, TagEntity } from '@/shared/models/administrationms/tagModel'
import TagService from '@/shared/services/tagService'
import PaginationTableComponent from '@/components/paginationTable/paginationTable.vue'
import SimpleSearchComponent from '@/components/simpleSearch/simpleSearch.vue'
import { CategoryEntity } from '@/shared/models/administrationms/categoryModel'
import { mixins } from 'vue-class-component'
import CommonHelpers from '@/shared/commonHelpers'

@Component({
  props: {
    active: Boolean
  },
  components: {
    PaginationTableComponent,
    'simple-search': SimpleSearchComponent
  }
})
export default class TagsComponent extends mixins(CommonHelpers, Vue) {
    $refs!: {
        paginationTable: PaginationTableComponent;
        tagModal: HTMLElement;
    };

    public tag: ITagEntity;
    public tagService: any;

    constructor (props: any) {
      super(props)
      this.tag = new TagEntity()
      this.tagService = TagService.getInstance()
    }

    public mounted () {
      const self = this
      $(this.$refs.tagModal).on('shown.bs.modal', function (e: any) {
        self.doFocus()
      })
    }

    public doFocus () {
      const self = this
      setTimeout(function () {
        // @ts-ignore
        self.$refs.tagCode.focus()
      }, 200)
    }

    public saveTag () {
      this.$validator.validateAll().then(success => {
        if (success) {
          if (this.tag.code !== '') {
            if (this.tag.id) {
              this.tagService.put(this.tag).then((resp: any) => {
                if (resp) {
                  this.setAlert('tagUpdated', 'success')
                } else {
                  this.setAlert('defaultTextsError', 'error')
                }
                this.closeModal()
              })
            } else {
              this.tagService.post(this.tag).then((resp: any) => {
                if (resp) {
                  this.setAlert('tagSaved', 'success')
                } else {
                  this.setAlert('tagError', 'error')
                }
                this.closeModal()
              })
            }
          }
        } else {
          this.setAlert('fillRequiredFields', 'error')
        }
      })
    }

    public resetTag () {
      this.tag = new TagEntity()
    }

    public searchTag (query: string) {
      const fields: string[] = ['code']
      const q: string = this.makeSimpleSearchQuery(fields, query)
      // @ts-ignore
      this.$refs.paginationTable.retrieveData('api/administrationms/api/tags', undefined, q)
    }

    public editTag (tag: any) {
      this.tag = tag
      this.showModal()
    }

    public copyTag (tag: any) {
      this.tag = tag
      this.tag.id = undefined
      this.tag.code = tag.code + ' ' + this.$t('labels.copy')
      this.saveTag()
    }

    public deleteTag (tag: any) {
      if (tag.id) {
        this.tagService.deleteTag(tag.id).then((resp: any) => {
          if (resp) {
            this.setAlert('tagDeleted', 'success')
          } else {
            this.setAlert('tagError', 'error')
          }
          // @ts-ignore
          this.$refs.paginationTable.retrieveData()
        })
      }
    }

    public closeModal () {
      // @ts-ignore
      this.$refs.paginationTable.retrieveData()
      // @ts-ignore
      $(this.$refs.tagModal).modal('hide')
    }

    public showModal () {
      // @ts-ignore
      $(this.$refs.tagModal).modal('show')
    }
}
