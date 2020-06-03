import { Component, Vue, Watch } from 'vue-property-decorator'
import { MultiLanguageConfig } from '@/shared/models/MultiLanguageConfig'
@Component({
  props: {
    config: MultiLanguageConfig,
    value: {
      type: Array
    },
    isValidating: Boolean
  }
})
export default class MultiLanguageComponent extends Vue {
  selectedLanguage: string
  selectedValue: any
  constructor () {
    super()
    this.selectedLanguage = ''
    this.selectedValue = {
      name: '',
      description: '',
      langKey: ''
    }
  }

  public mounted () {
    this.selectedLanguage = this.$store.state.currentLanguage
    this.getSelectedLanguage()
  }

  @Watch('selectedValue', { immediate: true, deep: true })
  public onChangeVal () {
    this.$validator.validateAll().then(success => {
      if (success) this.$emit('onChange', this.selectedValue)
    })
  }

  @Watch('value', { immediate: true, deep: true })
  public getSelectedLanguage () {
    let selectedLang: any = null
    let selectedLangIndex = null
    const self = this
    if (this.$props.value) {
      this.$props.value.forEach((lang: any, index: number) => {
        if (lang.langKey === self.selectedLanguage) {
          selectedLang = lang
          selectedLangIndex = index
        }
      })
    }
    if (selectedLang) {
      this.selectedValue = selectedLang
      this.selectedLanguage = selectedLang.langKey
    } else {
      if (this.$props.value && this.$props.value[0]) {
        this.selectedLanguage = this.$props.value[0].langKey
        this.selectedValue = this.$props.value[0]
      } else {
        this.selectedValue = {
          name: '',
          description: '',
          langKey: this.$store.state.currentLanguage
        }
        this.$emit('onAdd', this.selectedValue.langKey)
      }
    }
  }

  public changeLanguage (lang: string) {
    let selectedLang: any = null
    this.selectedLanguage = lang
    this.$props.value.forEach((l: any, index: number) => {
      if (l.langKey === lang) {
        selectedLang = l
      }
    })
    if (selectedLang) {
      this.selectedValue = selectedLang
    } else {
      this.$emit('onAdd', lang)
    }
  }

  public checkIfHasValue (lang: any) {
    let hasVal = false
    $.each(this.$props.value, function (k, v) {
      if (v.langKey === lang) {
        if ((v.name && v.name !== '') || (v.description && v.description !== '')) {
          hasVal = true
        }
      }
    })
    return hasVal
  }

  public removeLanguage () {
    this.$emit('onRemove', this.selectedValue)
  }
}
