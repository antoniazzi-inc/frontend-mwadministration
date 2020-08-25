import { Component, Vue } from 'vue-property-decorator'
import { HelpContent, IHelpContent } from '@/shared/models/administrationms/help-content.model'
import SearchableSelectComponent from '@/components/searchableSelect/searchableSelect.vue'
import { HelpCategory, IHelpCategory } from '@/shared/models/administrationms/help-category.model'
import { ISearchableSelectConfig, SearchableSelectConfig } from '@/shared/models/SearchableSelectConfig'
import { AxiosResponse } from 'axios'
import { HelpTag, IHelpTag } from '@/shared/models/administrationms/help-tag.model'
import { mixins } from 'vue-class-component'
import CommonHelpers from '@/shared/commonHelpers'
import { IMultiLanguageConfig, MultiLanguageConfig } from '@/shared/models/MultiLanguageConfig'
import Chrome from 'vue-color/src/components/Chrome'
import { HelpCategoryLanguage, IHelpCategoryLanguage } from '@/shared/models/administrationms/HelpCategorylanguage.model'
import MultiLanguageComponent from '../../../../components/multiLanguage/MultiLanguage.vue'
import HelpTagService from '@/shared/services/helpTagService'
import HelpMaterialService from '@/shared/services/helpMaterialService'
import HelpCategoryService from '@/shared/services/helpCategoryService'

@Component({
  components: {
    SearchableSelectComponent,
    'multi-language-component': MultiLanguageComponent,
    'chrome-picker': Chrome
  },
  beforeRouteEnter (to, from, next) {
    next((vm: any) => {
      if (to.params.id) {
        vm.retrieveItem(to.params.id)
      }
    })
  }
})
export default class NewHelpCategoryComponent extends mixins(CommonHelpers, Vue) {
  public helpCategoryService: any
  public multiLangConfig: IMultiLanguageConfig
  public helpCategoryLanguages: any[]
  public helpTagService: any
  public colors: any;
  public parentHelpCategory: any
  public selectedHelpTag: IHelpTag
  public helpCategories: IHelpCategory[]
  public helpTags: IHelpTag[]
  public helpContent: IHelpContent
  public helpMaterialService: any
  public newHelpCategory: any
  public searchableConfig: ISearchableSelectConfig
  constructor () {
    super()
    this.helpMaterialService = HelpMaterialService.getInstance()
    this.helpCategoryService = HelpCategoryService.getInstance()
    this.helpTagService = HelpTagService.getInstance()
    this.parentHelpCategory = new HelpCategory()
    this.newHelpCategory = new HelpCategory()
    this.helpContent = new HelpContent()
    this.selectedHelpTag = new HelpTag()
    this.colors = []
    this.helpCategoryLanguages = []
    this.multiLangConfig = new MultiLanguageConfig(true, true,
      'labels.helpCategoryTitle', 'labels.helpCategoryIntro', false,
      false, false, true, true, false)
    this.helpCategories = []
    this.helpTags = []
    this.searchableConfig = new SearchableSelectConfig('label',
      'labels.selectParent', '', false,
      false, true, false, false)
  }

  public mounted () {
    this.retrieveData()
  }

  public retrieveItem (id: number) {
    this.helpCategoryService.get(id).then((resp: AxiosResponse) => {
      this.newHelpCategory = resp.data
      const langs: any = []
      resp.data.helpCategoryLanguages.forEach((lang: any) => {
        langs.push({
          id: lang.id,
          name: lang.name,
          description: lang.intro,
          langKey: lang.langKey,
          version: lang.version
        })
      })
      const name = this.getMultiLangName(resp.data.helpCategoryLanguages).name
      this.$set(this, 'parentHelpCategory', {
        label: name,
        item: resp.data.parent
      })
      this.helpCategoryLanguages = langs
    })
  }

  public retrieveData () {
    const pagination = {
      page: 0,
      size: 10000,
      sort: ['id,desc']
    }
    this.helpCategoryService.getAll(pagination, '').then((resp: AxiosResponse) => {
      const self = this
      const result: any[] = []
      resp.data.content.forEach((item: IHelpCategory) => {
        result.push({
          label: self.getMultiLangName(item.helpCategoryLanguages).name,
          item: item
        })
      })
      this.helpCategories = result
    })
    this.helpTagService.getAll(pagination, '').then((resp: AxiosResponse) => {
      const self = this
      const result: any[] = []
      resp.data.content.forEach((item: IHelpTag) => {
        result.push({
          label: self.getMultiLangName(item.helpTagLanguages).title,
          item: item
        })
      })
      this.helpTags = result
    })
  }

  public async save () {
    if (this.helpCategoryLanguages && this.helpCategoryLanguages.length > 0 && this.helpCategoryLanguages[0].name !== '') {
      const helpCatLangs: IHelpCategoryLanguage[] = []
      await this.helpCategoryLanguages.forEach(lang => {
        helpCatLangs.push(new HelpCategoryLanguage(lang.id, lang.administrationId, lang.langKey, lang.name,
          lang.description, lang.helpCategory, lang.version, lang.createdOn, lang.updatedOn))
      })
      this.newHelpCategory.helpCategoryLanguages = helpCatLangs
      if (this.parentHelpCategory && this.parentHelpCategory.item && this.parentHelpCategory.item.id) {
        this.newHelpCategory.parent = {
          id: this.parentHelpCategory.item.id,
          version: this.parentHelpCategory.item.version
        }
      } else {
        this.newHelpCategory.parent = null
      }

      if (this.newHelpCategory.id) {
        this.helpCategoryService.put(this.newHelpCategory).then((resp: AxiosResponse) => {
          if (resp) {
            this.cancel()
            this.setAlert('helpCategoryUpdated', 'success')
          } else {
            this.setAlert('helpCategoryError', 'error')
          }
        })
      } else {
        this.helpCategoryService.post(this.newHelpCategory).then((resp: AxiosResponse) => {
          if (resp) {
            this.cancel()
            this.setAlert('helpCategoryCreated', 'success')
          } else {
            this.setAlert('helpCategoryError', 'error')
          }
        })
      }
    }
  }

  public cancel () {
    this.$router.go(-1)
  }

  public updateColor (color: any) {
    this.newHelpCategory.color = color.hex
  }

  public addNewHelpCategoryLanguage (lang: string) {
    const newLang: any = {
      name: '',
      description: '',
      langKey: lang
    }
    this.helpCategoryLanguages.push(newLang)
  }

  public removeHelpCategoryLanguage (lang: any) {
    let index = null
    this.helpCategoryLanguages.forEach((language: any, ind: number) => {
      if (language.langKey === lang.langKey) {
        index = ind
      }
    })
    if (index !== null) {
      this.helpCategoryLanguages.splice(index, 1)
    }
  }

  public removeSelectedHelpCat (cat: any) {
    this.parentHelpCategory = null
  }

  public changeSelectedHelpCat (cat: any) {
    this.parentHelpCategory = cat
  }

  public selectSelectedHelpCat (cat: any) {
    this.parentHelpCategory = cat
  }

  public changeNewHelpCategoryLanguage (lang: any) {
    let index = null
    this.helpCategoryLanguages.forEach((language, i) => {
      if (language.langKey === lang.langKey) {
        index = i
      }
    })
    if (index !== null) {
      this.$set(this.helpCategoryLanguages, index, lang)
    }
  }
}
