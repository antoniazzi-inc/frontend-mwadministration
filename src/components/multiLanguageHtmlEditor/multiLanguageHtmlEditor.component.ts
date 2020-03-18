import { Component, Vue, Watch } from 'vue-property-decorator'
import Trumbowyg from 'vue-trumbowyg'
import 'trumbowyg/dist/ui/trumbowyg.css'
@Component({
  components: {
    trumbowyg: Trumbowyg
  },
  props: {
    content: {
      type: [Object, String]
    },
    availableLangs: {
      type: Array
    }
  }

})
export default class MultiLanguageHtmlEditorComponent extends Vue {
  public selectedLang = {
    langKey: '',
    name: ''
  };

  public langToDelete: any = {};
  public selectedContent = '';
  public allContent: any = {};
  public editorConfig: any = {};
  public selectedLangBackup = {};
  public allLangs: Array<any> = [];
  public allAvailableLanguages: Array<any> = [];
  constructor () {
    super()
    for (const key in this.$store.state.languages) {
      if (this.$store.state.languages.hasOwnProperty(key)) {
        this.allAvailableLanguages.push({
          name: this.$store.state.languages[key].name,
          langKey: key
        })
        if (key === this.$store.state.currentLanguage) {
          this.selectedLang = {
            name: this.$store.state.languages[key].name,
            langKey: key
          }
        }
      }
    }
    this.selectedLang = {
      langKey: this.$store.state.currentLanguage,
      name: this.$store.state.languages[this.$store.state.currentLanguage].name
    }
  }

  public mounted () {
    this.allContent = this.$props.content
    this.selectedContent = this.$props.content[this.$store.state.currentLanguage]
  }

  @Watch('content', { immediate: true, deep: true })
  public contentChanged (newVal: any) {
    if (newVal) {
      this.allContent = newVal
      this.selectedContent = newVal[this.selectedLang.langKey]
    }
  }

  @Watch('availableLangs', { immediate: true, deep: true })
  public availableLanguages (newVal: any) {
    if (newVal.length) {
      this.allAvailableLanguages = newVal
    }
  }

  @Watch('selectedContent', { immediate: true, deep: true })
  public selectedCont (newVal: any) {
    if (newVal) {
      this.allContent[this.selectedLang.langKey] = JSON.parse(JSON.stringify(newVal))
      this.$emit('contentChanged', this.allContent)
    } else {
      this.$emit('contentChanged', this.allContent[this.selectedLang.langKey] = '')
    }
  }

  public remove () {
    this.langToDelete = this.selectedLang;
    (<any> this.$refs.removeEntity).show()
  }

  public changeLang (lang: any) {
    this.allContent[this.selectedLang.langKey] = JSON.parse(JSON.stringify(this.selectedContent))
    this.selectedLang = lang
    if (this.allContent[lang.langKey] !== undefined) {
      this.selectedContent = this.allContent[lang.langKey]
    } else {
      this.selectedContent = ''
    }
    this.$emit('contentChanged', this.allContent)
  }

  public checkIfHasValue () {
    return true
  }

  public removeLang () {
    let index = null
    const self = this
    $.each(this.allAvailableLanguages, function (k, v) {
      // @ts-ignore
      if (self.langToDelete.langKey === v.langKey) {
        index = k
      }
    })

    if (index !== null) {
      this.allContent[this.allAvailableLanguages[index].langKey] = ''
      this.selectedContent = ''
    }
    this.changeLang(this.allAvailableLanguages[0])
  }
}
