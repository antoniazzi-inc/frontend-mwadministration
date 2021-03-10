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
import { ITagEntity } from '@/shared/models/administrationms/tagModel'
import { ISearchableSelectConfig, SearchableSelectConfig } from '@/shared/models/SearchableSelectConfig'
import SearchableSelectComponent from '@/components/searchableSelect/searchableSelect.vue'
import { AxiosResponse } from 'axios'
import { IRelationEntity, RelationEntity } from '@/shared/models/relationms/relationModel'
import RelationService from '@/shared/services/relationService'
import RelationTagService from '@/shared/services/relationTagService'

@Component({
  components: {
    SearchableSelectComponent
  },
  props: {
    rel: Object
  }
})
export default class TagsSubTabComponent extends mixins(Vue, CommonHelpers) {
  public searchableConfig: ISearchableSelectConfig
  public currentTab: string
  public relationCopy: IRelationEntity
  public relationService: any
  public relationTagService: any
  public selectedTags: ITagEntity[]
  constructor () {
    super()
    this.currentTab = 'profile'
    this.selectedTags = []
    this.relationService = RelationService.getInstance()
    this.relationTagService = RelationTagService.getInstance()
    this.relationCopy = new RelationEntity()
    this.searchableConfig = new SearchableSelectConfig('code',
      'labels.tags', '', false,
      false, true, true, false)
  }

  @Watch('rel', { immediate: true, deep: true })
  public populateTags (newVal: any) {
    this.relationCopy = newVal
    const allTags: any = []
    const self = this
    if (newVal && newVal.relationTags) {
      this.$store.state.lookups.tags.forEach((tag: any) => {
        newVal.relationTags.forEach((relTag: any) => {
          if (tag.id === relTag.tagId) {
            allTags.push(tag)
          }
        })
      })
      Vue.nextTick(function () {
        self.selectedTags = allTags
      })
    }
  }

  public addTag (tag: any) {
    if (tag) {
      const dto: any = {
        tagId: tag.id,
        relation: {
          id: this.$props.rel.id,
          version: this.$props.rel.version
        }
      }
      this.relationTagService.post(dto).then((resp: AxiosResponse) => {
        if (resp) {
          tag.item = resp.data
          this.selectedTags.push(tag)
          this.$emit('updateRel')
          this.setAlert('relationTagsUpdated', 'success')
        } else {
          this.setAlert('relationTagsUpdateError', 'error')
        }
      })
    }
  }

  public removeTag (tag: any) {

    if (tag && tag.id && this.relationCopy.relationTags) {
      let ind = this.relationCopy.relationTags.findIndex((e:any) => tag.id === e.tagId)
      if(ind > -1)
      this.relationTagService.delete(this.relationCopy.relationTags[ind].id).then((resp: AxiosResponse) => {
        if (resp) {
          this.$emit('updateRel')
          this.setAlert('relationTagsRemoved', 'success')
        } else {
          this.setAlert('relationTagsUpdateError', 'error')
        }
      })
    }
  }
}
