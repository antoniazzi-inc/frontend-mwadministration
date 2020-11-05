import { mixins } from 'vue-class-component'
import CommonHelpers from '@/shared/commonHelpers'
import { Component, Vue, Watch } from 'vue-property-decorator'
import MjmlService from '@/shared/services/mjmlService'
import { AxiosResponse } from 'axios'

@Component({
  components: {},
  props: {
    value: Object,
    active: Boolean
  }
})
export default class MjmlActionMessageComponent extends mixins(Vue, CommonHelpers) {
  public htmlOutput: any;
  public mjmlService: any;
  public renderOutput: any;

  constructor () {
    super()
    this.mjmlService = MjmlService.getInstance()
    this.htmlOutput = ''
    this.renderOutput = ''
  }

  public getLineHeight(font: any) {
    return (font * 1.6) + 'px'
  }

  public getBtnFontSize(size: string) {
    if (size === 'small') return '12px'
    else if (size === 'medium') return '14px'
    else if (size === 'large') return '24px'
    else if (size === 'extralarge') return '40px'
    else return '14px';
  }

  @Watch('active', { immediate: true, deep: true })
  public init () {
    this.htmlOutput = `<mjml>
  <mj-head>
    <mj-attributes>
      <mj-all padding="0px"></mj-all>
    </mj-attributes>
    <mj-style inline="inline">a { text-decoration: none!important; color: inherit!important; }</mj-style>
  </mj-head>
  <mj-body width="100%" background-color="${this.$props.value.config.backgroundColor}">
  <mj-section full-width="full-width" padding="30px" border="2px solid ${this.$props.value.config.borderColor}">
      <mj-column margin="20px" width="100%">
        <mj-text font-style="${this.$props.value.config.header.fontStyle}"
        font-weight="${this.$props.value.config.header.fontWeight}"
        font-size="${this.$props.value.config.header.fontSize}px" color="${this.$props.value.config.header.color}"
        align="${this.$props.value.config.header.textAlign}">
            ${this.$props.value.value.headerText.length > 0 ? this.getMultiLangName(this.$props.value.value.headerText).name : ''}
        </mj-text>
      </mj-column>
   <mj-text width="100%" font-size="${this.$props.value.config.text.fontSize}px"
   align="${this.$props.value.config.text.textAlign}"
   line-height="${this.getLineHeight(this.$props.value.config.text.fontSize)}"
        color="${this.$props.value.config.text.color}">
${this.$props.value.value.pageText[this.$store.state.currentLanguage] ? this.$props.value.value.pageText[this.$store.state.currentLanguage] : ''}
       </mj-text>

        <mj-button font-weight="${this.$props.value.config.buttons.fontWeight}" href="${this.$props.value.value.buttonLink}"
        background-color="${this.$props.value.config.buttons.backgroundColor}"
        font-size="${this.getBtnFontSize(this.$props.value.config.buttons.buttonSize)}"
        padding-bottom="10px"
        border-radius="${this.$props.value.config.buttons.borderRadius}px" color="${this.$props.value.config.buttonForegroundColor}">
          ${this.$props.value.value.buttonText.length > 0 ? this.getMultiLangName(this.$props.value.value.buttonText).name : ''}
         </mj-button>

   <mj-text width="100%" font-size="${this.$props.value.config.text.fontSize}px"
   align="${this.$props.value.config.text.textAlign}"
   line-height="${this.getLineHeight(this.$props.value.config.text.fontSize)}"
        color="${this.$props.value.config.text.color}">
${this.$props.value.value.pageText2[this.$store.state.currentLanguage] ? this.$props.value.value.pageText2[this.$store.state.currentLanguage] : ''}
        </mj-text>

   </mj-section>
  </mj-body>
</mjml>`
    if (this.$props.active) {
      this.mjmlService.renderTemplate(this.htmlOutput).then((resp: AxiosResponse) => {
        this.renderOutput = resp.data.html
        this.$forceUpdate()
      })
    }
  }
}
