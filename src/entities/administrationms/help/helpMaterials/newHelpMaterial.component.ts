import { Component, Vue, Watch } from 'vue-property-decorator'
import { HelpContent, IHelpContent } from '@/shared/models/help-content.model'
import SearchableSelectComponent from '@/components/searchableSelect/searchableSelect.vue'
import { HelpCategory, IHelpCategory } from '@/shared/models/help-category.model'
import { ISearchableSelectConfig, SearchableSelectConfig } from '@/shared/models/SearchableSelectConfig'
import { AxiosResponse } from 'axios'
import { HelpTag, IHelpTag } from '@/shared/models/help-tag.model'
import { mixins } from 'vue-class-component'
import CommonHelpers from '@/shared/commonHelpers'
import { IMultiLanguageConfig, MultiLanguageConfig } from '@/shared/models/MultiLanguageConfig'
import MultiLanguageComponent from '../../../../components/multiLanguage/MultiLanguage.vue'
import MultiLanguageHtmlEditorComponent
  from '../../../../components/multiLanguageHtmlEditor/MultiLanguageHtmlEditor.vue'
import HelpTagService from '@/shared/services/helpTagService'
import HelpMaterialService from '@/shared/services/helpMaterialService'
import HelpCategoryService from '@/shared/services/helpCategoryService'

@Component({
  components: {
    SearchableSelectComponent,
    'multi-language-component': MultiLanguageComponent,
    MultiLanguageHtmlEditorComponent
  },
  beforeRouteEnter (to, from, next) {
    next((vm: any) => {
      if (to.params.id) {
        vm.retrieveItem(to.params.id)
      }
    })
  }
})
export default class NewHelpMaterialComponent extends mixins(CommonHelpers, Vue) {
  public availableLangs: any[];
  public helpCategoryService: any;
  public multiLangConfig: IMultiLanguageConfig;
  public helpTagService: any;
  public selectedHelpCategory: any[];
  public selectedHelpTag: any[];
  public helpCategories: IHelpCategory[];
  public helpTags: IHelpTag[];
  public helpContent: IHelpContent;
  public helpMaterialService: any;
  public searchableConfig: ISearchableSelectConfig;
  public searchableConfigTags: ISearchableSelectConfig;
  public helpContentText: any;

  constructor () {
    super()
    this.helpMaterialService = HelpMaterialService.getInstance()
    this.helpCategoryService = HelpCategoryService.getInstance()
    this.helpTagService = HelpTagService.getInstance()
    this.selectedHelpCategory = []
    this.helpContent = new HelpContent()
    this.selectedHelpTag = []
    this.helpCategories = []
    this.availableLangs = []
    this.helpTags = []
    this.helpContentText = {}
    this.multiLangConfig = new MultiLanguageConfig(true, true, 'labels.title',
      'labels.intro', false, true, false, true)
    this.searchableConfig = new SearchableSelectConfig('label',
      'labels.selectCategory', '', true,
      false, true, true, false)
    this.searchableConfigTags = new SearchableSelectConfig('label',
      'labels.selectTag', '', true,
      false, true, true, false)
  }

  public mounted () {
    this.retrieveData()
  }

  public retrieveItem (id: number) {
    this.helpMaterialService.get(id).then((resp: AxiosResponse) => {
      this.helpContent = resp.data
      const contentTexts: any = {}
      const langs: any = []
      const cats: any = []
      $.each(this.helpCategories, function (v: any, helpCat: any) {
        $.each(resp.data.categories, function (j: any, selectedCat: any) {
          if (helpCat.item.id === selectedCat.id) {
            cats.push(helpCat)
          }
        })
      })
      const tags: any = []
      $.each(this.helpTags, function (v: any, helpTag: any) {
        $.each(resp.data.tags, function (j: any, selectedTag: any) {
          if (helpTag.item.id === selectedTag.id) {
            tags.push(helpTag)
          }
        })
      })
      this.selectedHelpCategory = cats
      this.selectedHelpTag = tags
      this.$set(this.helpContent, 'categories', [])
      $.each(resp.data.helpContentLanguages, function (k: any, v: any) {
        contentTexts[v.langKey] = v.content
        langs.push({
          id: v.id,
          name: v.name,
          langKey: v.langKey,
          description: v.intro,
          version: v.version
        })
      })

      this.helpContentText = contentTexts
      this.helpContent.helpContentLanguages = langs
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
        const name = self.getMultiLangName(item.helpCategoryLanguages).name
        result.push({
          label: name,
          item: item
        })
      })
      this.helpCategories = result
    })
    this.helpTagService.getAll(pagination, '').then((resp: AxiosResponse) => {
      const self = this
      const result: any[] = []
      resp.data.content.forEach((item: IHelpTag) => {
        const name = self.getMultiLangName(item.helpTagLanguages).name
        result.push({
          label: name,
          item: item
        })
      })
      this.helpTags = result
    })
  }

  public save () {
    this.$validator.validateAll().then(success => {
      if (success) {
        const tags: any = []
        const categories: any = []
        const contentLangs: any = []
        const self = this
        this.selectedHelpTag.forEach((tag) => {
          tags.push({
            id: tag.item.id,
            version: tag.item.version
          })
        })
        this.selectedHelpCategory.forEach((cat) => {
          categories.push({
            id: cat.item.id,
            version: cat.item.version
          })
        })
        this.helpContent.categories = categories
        this.helpContent.tags = tags
        $.each(this.helpContent.helpContentLanguages, function (k: any, v: any) {
          contentLangs.push({
            id: v.id,
            version: v.version,
            createdOn: v.createdOn,
            updatedOn: v.updatedOn,
            name: v.name,
            intro: v.description,
            content: self.helpContentText[v.langKey],
            langKey: v.langKey
          })
        })
        this.helpContent.helpContentLanguages = contentLangs
        if (this.helpContent.id) {
          this.helpMaterialService.put(this.helpContent).then((resp: AxiosResponse) => {
            if (resp) {
              this.setAlert('helpMaterialUpdated', 'success')
            } else {
              this.setAlert('helpMaterialError', 'error')
            }
          })
        } else {
          this.helpMaterialService.post(this.helpContent).then((resp: AxiosResponse) => {
            if (resp) {
              this.setAlert('helpMaterialCreated', 'success')
            } else {
              this.setAlert('helpMaterialError', 'error')
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

  @Watch('helpContent', { immediate: true, deep: true })
  public watchHelpLangs () {
    const self = this
    self.availableLangs = []
    $.each(self.helpContent.helpContentLanguages, function (k: any, v: any) {
      self.availableLangs.push({
        langKey: v.langKey,
        name: self.getLangName(v.langKey)
      })
    })
  }

  public getLangName (key: any) {
    for (const lang in this.$store.state.languages) {
      if (this.$store.state.languages.hasOwnProperty(lang)) {
        if (lang === key) {
          return this.$store.state.languages[lang].name
        }
      }
    }
  }

  public updateHelpContent (lang: any) {
    this.helpContentText = lang
  }

  public addHelpCategory (category: any) {
    if (category) {
      this.selectedHelpCategory = category
    }
  }

  public removeHelpCategory (category: any) {
    let index = null
    this.selectedHelpCategory.forEach((cat: any, ind) => {
      if (category.item.id === cat.item.id) {
        index = ind
      }
    })
    if (index !== null) {
      this.selectedHelpCategory.splice(index, 1)
    }
  }

  public addHelpTag (tag: any) {
    if (tag) {
      this.selectedHelpTag = tag
    }
  }

  public removeHelpTag (tag: any) {
    let index = null
    this.selectedHelpTag.forEach((t: any, ind) => {
      if (tag.item.id === t.item.id) {
        index = ind
      }
    })
    if (index !== null) {
      this.selectedHelpTag.splice(index, 1)
    }
  }

  public changeNewHelpMaterialLanguage (lang: any) {
    let index = null
    if (this.helpContent.helpContentLanguages) {
      this.helpContent.helpContentLanguages.forEach((language: any, ind: number) => {
        if (language.langKey === lang.langKey) {
          index = ind
        }
      })
    }
    if (index !== null && this.helpContent.helpContentLanguages) {
      this.$set(this.helpContent.helpContentLanguages, index, lang)
    }
  }

  public addNewHelpMaterialLanguage (lang: any) {
    const newLang: any = {
      name: '',
      description: '',
      langKey: lang
    }
    let index = null
    if (this.helpContent.helpContentLanguages) {
      this.helpContent.helpContentLanguages.forEach((language: any, ind: number) => {
        if (language.langKey === lang) {
          index = ind
        }
      })
    }
    if (index !== null && this.helpContent.helpContentLanguages) {
      this.helpContent.helpContentLanguages.splice(index, 1)
    }
    if (index === null) {
      if (this.helpContent.helpContentLanguages) {
        this.helpContent.helpContentLanguages.push(newLang)
      } else {
        this.helpContent.helpContentLanguages = [newLang]
      }
    }
  }

  public removeHelpMaterialLanguage (lang: any) {
    let index = null
    if (this.helpContent.helpContentLanguages) {
      this.helpContent.helpContentLanguages.forEach((language: any, ind: number) => {
        if (language.langKey === lang.langKey) {
          index = ind
        }
      })
    }
    if (index !== null && this.helpContent.helpContentLanguages) {
      this.helpContent.helpContentLanguages.splice(index, 1)
    }
  }
}
