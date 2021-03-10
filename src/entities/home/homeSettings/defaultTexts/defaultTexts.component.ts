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
import { DefaultTextsConfig, HtmlPageTemplates, EmailTemplates, EmailTextConfig, HtmlPage, HtmlFragmentText } from '@/shared/defaultTextsConfig'
import AdministrationSettingsService from '@/shared/services/administrationSettingsService'
import { AxiosResponse } from 'axios'
import MultiLanguageHtmlEditorComponent from '../../../../components/multiLanguageHtmlEditor/MultiLanguageHtmlEditor.vue'
import { AdministrationSettings } from '@/shared/models/administrationms/administrationSettingsModel'
import { MultiLanguageConfig } from '@/shared/models/MultiLanguageConfig'
import MultiLanguageComponent from '../../../../components/multiLanguage/MultiLanguage.vue'
import { ISearchableSelectConfig, SearchableSelectConfig } from '@/shared/models/SearchableSelectConfig'
import SearchableSelectComponent from '@/components/searchableSelect/searchableSelect.vue'
import SimpleHtmlEditorComponent from '@/components/simpleHtmlEditor/simpleHtmlEditor.vue'
import MjmlSimpleMessageComponent
  from '@/shared/templates/defaultTextsEmailTemplates/mjmlSimpleMessage/mjmlSimpleMessage.vue'

import DefaultTextSettingsComponent from '@/entities/home/homeSettings/defaultTexts/defaultTextSettings.vue'
import { mixins } from 'vue-class-component'
import CommonHelpers from '@/shared/commonHelpers'
import MjmlActionMessageComponent
  from '@/shared/templates/defaultTextsEmailTemplates/mjmlActionMessage/mjmlActionMessage.vue'
import MjmlFullMessageComponent
  from '@/shared/templates/defaultTextsEmailTemplates/mjmlFullMessage/mjmlFullMessage.vue'
import MjmlFullActionComponent
  from '@/shared/templates/defaultTextsEmailTemplates/mjmlFullAction/mjmlFullAction.vue'
import DefaultTextsSocialComponent from '@/entities/home/homeSettings/defaultTexts/defaultTextsSocial.vue'
import MjmlSimplePageComponent
  from '@/shared/templates/defaultTextsEmailTemplates/mjmlSimplePage/mjmlSimplePage.vue'
import MjmlFullPageComponent from '@/shared/templates/defaultTextsEmailTemplates/mjmlFullPage/mjmlFullPage.vue'
@Component({
  components: {
    MultiLanguageHtmlEditorComponent,
    MultiLanguageComponent,
    SearchableSelectComponent,
    SimpleHtmlEditorComponent,
    DefaultTextSettingsComponent,
    DefaultTextsSocialComponent,
    MjmlSimpleMessageComponent,
    MjmlActionMessageComponent,
    MjmlFullMessageComponent,
    MjmlFullActionComponent,
    MjmlFullPageComponent,
    MjmlSimplePageComponent
  }
})
export default class DefaultTextsComponent extends mixins(Vue, CommonHelpers) {
  public administrationSettingsService: any
  public defaultTexts: any
  public emailTemplates: any
  public htmlPageTemplates: any
  public clickedTab: any
  public searchableConfig: ISearchableSelectConfig
  public searchableConfigHtml: ISearchableSelectConfig
  public currentTab: any
  public selectedText: any
  public copiedConfiguration: any
  public emailText: any
  public htmlPage: any
  public multiLangConfig: any
  public multiLangConfigText: any
  public selectedTextValuesBackup: any
  public availableLangs: any[]
  public selectedTextValues: any
  public htmlFragmentText: any
  public selectedEmailTemplate: any
  public selectedHtmlPageTemplate: any
  constructor () {
    super()
    this.defaultTexts = DefaultTextsConfig
    this.emailTemplates = []
    this.htmlPageTemplates = []

    this.selectedEmailTemplate = null
    this.selectedHtmlPageTemplate = null
    this.searchableConfig = new SearchableSelectConfig('name',
      'labels.emailTemplate', '', true,
      false, false, false, false, false, true)
    this.searchableConfigHtml = new SearchableSelectConfig('name',
      'labels.htmlPageTemplate', '', true,
      false, false, false, false, false, true)

    this.clickedTab = ''
    this.currentTab = 'values'
    this.selectedText = null
    this.copiedConfiguration = null
    this.emailText = JSON.parse(JSON.stringify(EmailTextConfig))
    this.htmlPage = JSON.parse(JSON.stringify(HtmlPage))
    this.selectedTextValuesBackup = null
    this.htmlFragmentText = HtmlFragmentText
    this.multiLangConfig = new MultiLanguageConfig(true, false,
      'labels.subject', '', false,
      false, false, true, true, false)
    this.multiLangConfigText = new MultiLanguageConfig(true, false,
      '', '', false,
      false, false, true, true, false)
    this.availableLangs = []
    this.administrationSettingsService = AdministrationSettingsService.getInstance()
  }

  public mounted () {
    for (const key in this.$store.state.languages) {
      if (this.$store.state.languages.hasOwnProperty(key)) {
        this.availableLangs.push({
          label: this.$store.state.languages[key].name,
          langKey: key
        })
      }
    }
    EmailTemplates.forEach(item => {
      this.emailTemplates.push({
        ...item,
        name: this.$t(item.name)
      })
    })
    HtmlPageTemplates.forEach(item => {
      this.htmlPageTemplates.push({
        ...item,
        name: this.$t(item.name)
      })
    })
  }

  public updateCopiedConfiguration (config: any) {
    this.copiedConfiguration = config
  }
  public chooseText (text: any) {
    this.selectedText = text
    const pagination: any = {
      page: 0,
      size: 20,
      sort: ['id,desc']
    }
    this.administrationSettingsService.getAll(pagination, 'settingKey==' + text.settingsKey).then((resp: AxiosResponse) => {
      if (resp && resp.data.content && resp.data.content.length > 0) {
        this.selectedTextValuesBackup = JSON.parse(JSON.stringify(resp.data.content[0]))
        this.selectedTextValues = resp.data.content[0]
        this.populateLocalTextValues()
      } else {
        let settingValueJson
        if (text.type === 'email') {
          this.emailText = JSON.parse(JSON.stringify(EmailTextConfig))
          settingValueJson = JSON.parse(JSON.stringify(EmailTextConfig))
          this.selectedHtmlPageTemplate = this.emailTemplates[0]
          this.htmlFragmentText = JSON.parse(JSON.stringify(HtmlFragmentText))
          this.htmlPage = JSON.parse(JSON.stringify(HtmlPage))
        }
        if (text.type === 'htmlEditor') {
          this.htmlPage = JSON.parse(JSON.stringify(HtmlPage))
          settingValueJson = JSON.parse(JSON.stringify(HtmlPage))
          this.selectedHtmlPageTemplate = this.htmlPageTemplates[0]
          this.htmlFragmentText = JSON.parse(JSON.stringify(HtmlFragmentText))
          this.emailText = JSON.parse(JSON.stringify(EmailTextConfig))
        }
        if (text.type === 'htmlFragment') {
          this.htmlFragmentText = HtmlFragmentText
          settingValueJson = this.htmlFragmentText
          this.htmlPage = JSON.parse(JSON.stringify(HtmlPage))
          this.emailText = JSON.parse(JSON.stringify(EmailTextConfig))
        }
        this.selectedTextValues = new AdministrationSettings(undefined, undefined, text.settingsKey,
          settingValueJson, undefined, undefined, undefined)
        this.$forceUpdate()
      }
      this.currentTab = 'values'
    })
  }

  public htmlFragmentTextChanged (text: any) {
    this.htmlFragmentText = text
  }

  public populateLocalTextValues () {
    if (this.selectedText && this.selectedText.type) {
      switch (this.selectedText.type) {
        case 'htmlFragment':
          this.htmlFragmentText = JSON.parse(this.selectedTextValues.settingValueJson)
          this.htmlPage = JSON.parse(JSON.stringify(HtmlPage))
          this.emailText = JSON.parse(JSON.stringify(EmailTextConfig))
          break
        case 'email':
          this.emailText = JSON.parse(this.selectedTextValues.settingValueJson)
          this.emailTemplates.forEach((template: any) => {
            if (template.id === this.emailText.value.selectedTemplate) {
              this.selectedEmailTemplate = template
            }
          })
          this.htmlFragmentText = JSON.parse(JSON.stringify(HtmlFragmentText))
          this.htmlPage = JSON.parse(JSON.stringify(HtmlPage))
          break
        case 'htmlPage':
          this.htmlPage = JSON.parse(this.selectedTextValues.settingValueJson)
          this.htmlPageTemplates.forEach((template: any) => {
            if (template.id === this.htmlPage.value.selectedTemplate) {
              this.selectedHtmlPageTemplate = template
            }
          })
          this.htmlFragmentText = JSON.parse(JSON.stringify(HtmlFragmentText))
          this.emailText = JSON.parse(JSON.stringify(EmailTextConfig))
          break
      }
    }
    this.$forceUpdate()
  }

  public emailTextTemplateChanged (id: any, template: any) {
    this.emailText.value[id] = template
  }

  public htmlPageTextTemplateChanged (id: any, template: any) {
    this.htmlPage.value[id] = template
  }

  public addNewEmailSubject (langKey: any) {
    const newLang = {
      langKey: langKey,
      name: '',
      description: ''
    }
    this.emailText.subject.push(newLang)
  }

  public changeNewEmailSubject (subject: any) {
    let index = null
    this.emailText.subject.forEach((item: any, ind: number) => {
      if (item.langKey === subject.langKey) {
        index = ind
      }
    })
    if (index !== null) {
      this.emailText.subject[index] = subject
    }
  }

  public removeNewEmailSubject (subject: any) {
    let index = null
    this.emailText.subject.forEach((item: any, ind: number) => {
      if (item.langKey === subject.langKey) {
        index = ind
      }
    })
    if (index !== null) {
      this.emailText.subject.splice(index, 1)
    }
  }
  public addNewButtonOrHeaderText (langKey: any, item:any, itemId:any) {
    if(!langKey) return
    const newLang = {
      langKey: langKey,
      name: '',
      description: ''
    }
    if(item === 'htmlText'){
      this.htmlPage.value[itemId].push(newLang)
    } else {
      this.emailText.value[itemId].push(newLang)
    }
  }

  public changeNewButtonOrHeaderText (lang: any, item:any, itemId:any) {
    if(!lang) return
    if(item === 'htmlText'){
      //this.htmlPage.value[itemId].push(lang)
    } else {
      //this.emailText.value[itemId] = lang
    }
  }

  public removeNewButtonOrHeaderText (lang: any, item:any, itemId:any) {
    if(!lang) return
  }

  public addNewHtmlPageSubject (langKey: any) {
    if(!langKey) return
    const newLang = {
      langKey: langKey,
      name: '',
      description: ''
    }
    this.htmlPage.subject.push(newLang)
  }

  public changeNewHtmlPageSubject (subject: any) {
    if(!subject) return
    let index = null
    this.htmlPage.subject.forEach((item: any, ind: number) => {
      if (item.langKey === subject.langKey) {
        index = ind
      }
    })
    if (index !== null) {
      this.htmlPage.subject[index] = subject
    }
  }

  public updateSocialMedia (obj: any) {
    if(!obj) return
    this.emailText.value.socialMedia = obj
  }

  public updateHtmlSocialMedia (obj: any) {
    if(!obj) return
    this.htmlPage.value.socialMedia = obj
  }

  public removeNewHtmlPageSubject (subject: any) {
    if(!subject) return
    let index = null
    this.htmlPage.subject.forEach((item: any, ind: number) => {
      if (item.langKey === subject.langKey) {
        index = ind
      }
    })
    if (index !== null) {
      this.htmlPage.subject.splice(index, 1)
    }
  }

  public emailTemplateChanged (template: any) {
    if(!template) return
    this.selectedEmailTemplate = template
   /* this.emailText.value = {
      selectedTemplate: template && template.id ? template.id : null,
      headerText: this.htmlPage.value.headerText ? this.htmlPage.value.headerText : [],
      pageText: this.htmlPage.value.pageText ? this.htmlPage.value.pageText : {},
      pageText2: this.htmlPage.value.pageText2 ? this.htmlPage.value.pageText2 : {},
      buttonText: this.htmlPage.value.buttonText ? this.htmlPage.value.buttonText : [],
      buttonLink: this.htmlPage.value.buttonLink ? this.htmlPage.value.buttonLink : '',
      imageUrl: this.htmlPage.value.imageUrl ? this.htmlPage.value.imageUrl : '',
      footerText: this.htmlPage.value.footerText ? this.htmlPage.value.footerText : {},
      socialMedia: this.htmlPage.value.socialMedia ? this.htmlPage.value.socialMedia : ''
    }
    this.htmlPage.subject = this.htmlPage.subject ? this.htmlPage.subject : []*/
  }

  public emailTemplateRemoved (template: any) {
    if(!template) return
    this.selectedEmailTemplate = null
  }

  public htmlPageTemplateChanged (template: any) {
    if(!template) return
    this.selectedHtmlPageTemplate = template
    /*this.htmlPage.value = {
      selectedTemplate: template && template.id ? template.id : null,
      headerText: this.htmlPage.value.headerText ? this.htmlPage.value.headerText : [],
      pageText: this.htmlPage.value.pageText ? this.htmlPage.value.pageText : {},
      pageText2: this.htmlPage.value.pageText2 ? this.htmlPage.value.pageText2 : {},
      buttonText: this.htmlPage.value.buttonText ? this.htmlPage.value.buttonText : [],
      buttonLink: this.htmlPage.value.buttonLink ? this.htmlPage.value.buttonLink : '',
      imageUrl: this.htmlPage.value.imageUrl ? this.htmlPage.value.imageUrl : '',
      footerText: this.htmlPage.value.footerText ? this.htmlPage.value.footerText : {},
      socialMedia: this.htmlPage.value.socialMedia ? this.htmlPage.value.socialMedia : ''
    }
    this.htmlPage.subject = this.htmlPage.subject ? this.htmlPage.subject : []*/
  }

  public htmlPageTemplateRemoved (template: any) {
    if(!template) return
    this.selectedHtmlPageTemplate = null
  }

  public updateEmailTextConfig (config: any) {
    if(!config) return
    this.emailText.config = config
  }

  public updateHtmlPageTextConfig (config: any) {
    if(!config) return
    this.htmlPage.config = config
  }

  public resetText () {
    this.selectedTextValuesBackup ? this.selectedTextValues = this.selectedTextValuesBackup
      : new AdministrationSettings(undefined, undefined, this.selectedText.settingsKey,
        '', undefined, undefined, undefined)
  }

  public saveText () {
    const dto: any = {
      id: this.selectedTextValues?.id,
      version: this.selectedTextValues?.version,
      settingKey: this.selectedTextValues && this.selectedTextValues.settingKey ? this.selectedTextValues.settingKey
        : this.selectedText && this.selectedText.settingKey ? this.selectedText.settingKey : undefined,
      settingValueJson: null
    }
    switch (this.selectedText.type) {
      case 'htmlFragment':
        dto.settingValueJson = JSON.stringify(this.htmlFragmentText)
        break
      case 'email':
        dto.settingValueJson = JSON.stringify(this.emailText)
        break
      case 'htmlPage':
        dto.settingValueJson = JSON.stringify(this.htmlPage)
        break
    }
    if (dto.id) {
      this.administrationSettingsService.put(dto).then((resp: AxiosResponse) => {
        if (resp) {
          this.selectedTextValues = resp.data
          this.selectedTextValuesBackup = JSON.parse(JSON.stringify(resp.data))
          this.setAlert('defaultTextsUpdated', 'success')
        } else {
          this.setAlert('defaultTextsError', 'success')
        }
      })
    } else {
      this.administrationSettingsService.post(dto).then((resp: AxiosResponse) => {
        if (resp) {
          this.setAlert('defaultTextsCreated', 'success')
        } else {
          this.setAlert('defaultTextsError', 'success')
        }
      })
    }
  }
}
