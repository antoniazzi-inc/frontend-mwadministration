import { mixins } from 'vue-class-component'
import CommonHelpers from '@/shared/commonHelpers'
import { Component, Vue, Watch } from 'vue-property-decorator'
import { ISearchableSelectConfig, SearchableSelectConfig } from '@/shared/models/SearchableSelectConfig'
import { Fonts } from '@/shared/fonts'
import Chrome from 'vue-color/src/components/Chrome'
import SearchableSelectComponent from '@/components/searchableSelect/searchableSelect.vue'
@Component({
  components: {
    'chrome-picker': Chrome,
    SearchableSelectComponent
  },
  props: {
    configuration: Object,
    active: Boolean
  }
})
export default class DefaultTextSettingsComponent extends mixins(Vue, CommonHelpers) {
  public config: any
  public allFonts: any[]
  public colors: any[] = []
  public searchableConfigFonts: ISearchableSelectConfig
  constructor () {
    super()
    this.config = null
    this.searchableConfigFonts = new SearchableSelectConfig('name',
      'labels.fonts', '', false,
      false, true, false, false)
    this.allFonts = Fonts
  }

  public updateBackgroundColor (color: any) {
    this.config.backgroundColor = color.hex
  }

  public fontChanged (font: any) {
    this.config.font = font
  }

  public fontRemoved (font: any) {
    this.config.font = ''
  }

  public updateBorderColor (e: any) {
    this.config.borderColor = e.hex
  }

  public updateButtonsBackgroundColor (e: any) {
    this.config.buttons.backgroundColor = e.hex
  }

  public updateHeaderFontColor (e: any) {
    this.config.header.color = e.hex
  }

  public updateTextFontColor (e: any) {
    this.config.text.color = e.hex
  }

  public updateFooterFontColor (e: any) {
    this.config.footer.color = e.hex
  }

  public updateFooterBackgroundColor (e: any) {
    this.config.footer.backgroundColor = e.hex
  }

  @Watch('active', { immediate: true, deep: true })
  public populateConfig () {
    this.config = this.$props.configuration
  }

  @Watch('config', { immediate: true, deep: true })
  public emitChange (config: any) {
    this.$emit('onUpdate', config)
  }
}
