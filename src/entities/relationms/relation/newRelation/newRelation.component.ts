import { mixins } from 'vue-class-component'
import CommonHelpers from '@/shared/commonHelpers'
import { Component, Vue } from 'vue-property-decorator'
import { RelationEntity } from '@/shared/models/relationms/relationModel'
import { RelationProfile } from '@/shared/models/relationms/relation-profile.model'
import { IRelationGroup, RelationGroup } from '@/shared/models/relationms/relation-group.model'
import { ITagEntity } from '@/shared/models/administrationms/tagModel'
import { ICategoryEntity } from '@/shared/models/administrationms/categoryModel'
import { ISearchableSelectConfig, SearchableSelectConfig } from '@/shared/models/SearchableSelectConfig'
import SearchableSelectComponent from '../../../../components/searchableSelect/searchableSelect.vue'
import RelationService from '@/shared/services/relationService'
import { AxiosResponse } from 'axios'

@Component({
  components: {
    SearchableSelectComponent
  }
})
export default class NewRelationComponent extends mixins(Vue, CommonHelpers) {
  public relationService: any;
  public validationRegEx: any;
  public relations: RelationEntity[];
  public relationGroups: IRelationGroup[]
  public relationCategories: ICategoryEntity|any
  public relationTags: ITagEntity[]
  public searchableConfigGroups: ISearchableSelectConfig
  public searchableConfigTags: ISearchableSelectConfig
  public searchableConfigCats: ISearchableSelectConfig
  constructor () {
    super()
    this.relations = [new RelationEntity()]
    this.relations[0].relationProfile = new RelationProfile()
    this.relationGroups = []
    this.relationCategories = null
    this.validationRegEx = '^([\x00-\x7F]+)$'
    this.relationService = RelationService.getInstance()
    this.relationTags = []
    this.searchableConfigGroups = new SearchableSelectConfig('label',
      'labels.groups', '', false,
      false, true, true, false)
    this.searchableConfigTags = new SearchableSelectConfig('code',
      'labels.tags', '', false,
      false, true, true, false)
    this.searchableConfigCats = new SearchableSelectConfig('code',
      'labels.categories', '', false,
      false, true, false, false)
  }

  public onComplete (e: any) {
    const tags: any = []
    const groups: any = []
    if (this.relationTags) {
      this.relationTags.forEach(item => {
        tags.push({
          tagId: item.id
        })
      })
    }
    if (this.relationGroups) {
      this.relationGroups.forEach(item => {
        groups.push({
          id: item.id,
          version: item.version
        })
      })
    }
    this.relations.forEach((item: any, ind: number) => {
      item.relationProfile.categoryId = this.relationCategories?.id
      item.relationGrups = groups
      item.relationTags = tags
      item.username = 'default_' + Math.random()
      item.password = Math.random()
      item.tfaEnabled = false
    })
    this.relationService.createMultiple(this.relations).then((resp: AxiosResponse) => {
      if (resp) {
        this.setAlert('relationsCreated', 'success')
        this.goBack()
      } else {
        this.setAlert('relationsError', 'error')
      }
    })
  }

  public addNewRelation () {
    const newRelation = new RelationEntity()
    newRelation.relationProfile = new RelationProfile()
    this.relations.push(newRelation)
  }

  public validateStep () {
    return new Promise((resolve, reject) => {
      this.$validator.validateAll().then((valid) => {
        if (valid) {
          resolve(valid)
        } else {
          reject(valid)
        }
      })
    })
  }

  public groupsChanged (groups: any) {
    this.relationGroups = groups
  }

  public groupsRemoved (group: any) {
    let index = null
    this.relationGroups.forEach((gr: any, ind: any) => {
      if (gr.id === group.id) {
        index = ind
      }
    })
    if (index) this.relationGroups.splice(index, 1)
  }

  public categoriesChanged (cats: any) {
    this.relationCategories = cats
  }

  public categoriesRemoved (cat: any) {
    this.relationCategories = null
  }

  public tagsChanged (cats: any) {
    this.relationTags = cats
  }

  public removeRow (index: any) {
    this.relations.splice(index, 1)
  }

  public tagsRemoved (tag: any) {
    let index = null
    this.relationTags.forEach((tg: any, ind: any) => {
      if (tg.id === tag.id) {
        index = ind
      }
    })
    if (index) this.relationTags.splice(index, 1)
  }

  public goBack () {
    this.$router.go(-1)
  }
}
