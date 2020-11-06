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
export default class MjmlSimplePageComponent extends mixins(Vue, CommonHelpers) {
  public htmlOutput: any;
  public mjmlService: any;
  public renderOutput: any;

  constructor () {
    super()
    this.mjmlService = MjmlService.getInstance()
    this.htmlOutput = ''
    this.renderOutput = ''
  }

  public getFont(fdata:any) {
    let f = {name: '', url: ''}
    let name = fdata.name
    if (name.indexOf('-') > 0) name = name.substr(0, name.indexOf('-'))
    f.name = name + ', Arial'
    f.url = fdata.url
    return f
  }

  @Watch('active', { immediate: true, deep: true })
  public init () {
    this.htmlOutput = `<mjml owa="desktop">
  <mj-head>
    <mj-attributes>
      <mj-all padding="0px"></mj-all>
    </mj-attributes>
    <mj-style inline="inline">a { text-decoration: none!important; color: inherit!important; }</mj-style>
    <mj-font name="${this.getFont(this.$props.value.config.font).name}" href="${this.getFont(this.$props.value.config.font).url}" />
  </mj-head>
  <mj-body width="100%" background-color="${this.$props.value.config.backgroundColor}">
  <mj-section full-width="full-width" padding="30px" border="2px solid ${this.$props.value.config.borderColor}">
      <mj-column width="100%">
        <mj-text font-style="${this.$props.value.config.header.fontStyle}"
        font-weight="${this.$props.value.config.header.fontWeight}"
        font-size="${this.$props.value.config.header.fontSize}px" color="${this.$props.value.config.header.color}"
        align="${this.$props.value.config.header.textAlign}">${this.getMultiLangName(this.$props.value.value.headerText).name}</mj-text>
        <mj-text font-size="${this.$props.value.config.text.fontSize}px"
   align="${this.$props.value.config.text.textAlign}"
        color="${this.$props.value.config.text.color}">
        KUT
${this.$props.value.value.pageText[this.$store.state.currentLanguage] ? this.$props.value.value.pageText[this.$store.state.currentLanguage] : ''}
</mj-text>
      </mj-column>
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
