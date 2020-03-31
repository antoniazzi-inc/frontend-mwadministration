import {mixins} from "vue-class-component";
import CommonHelpers from "@/shared/commonHelpers";
import {Component, Vue, Watch} from "vue-property-decorator";
import MjmlService from "@/shared/services/mjmlService";
import {AxiosResponse} from "axios";

@Component({
  components: {},
  props: {
    value: Object,
    active: Boolean
  }
})
export default class MjmlFullActionComponent extends mixins(Vue, CommonHelpers){
  public htmlOutput: any;
  public mjmlService: any;
  public renderOutput: any;
  public imageWidth: any;

  constructor() {
    super();
    this.mjmlService = MjmlService.getInstance();
    this.htmlOutput = '';
    this.renderOutput = ''
    this.imageWidth = 0
  }

  @Watch('value', {immediate: true, deep: true})
  public setImageWidth(){
    let self= this
    let image= new Image()
    image.onload = function(img:any){
      self.imageWidth = img.target.width
      self.init()
    }
    image.src = this.$props.value.value.imageUrl
  }

  @Watch('active', {immediate: true, deep: true})
  public init() {
    debugger
    let social:any = []
    if(this.$props.value.value.socialMedia && this.$props.value.value.socialMedia.length > 0){
      this.$props.value.value.socialMedia.forEach((item:any, index:any)=>{
        if(item.visible)
        social.push(`<mj-social-element name="${item.name.toLowerCase()}" href="${item.url}">&nbsp;&nbsp;&nbsp;&nbsp;
        </mj-social-element>`)
      })
    }
    this.htmlOutput = `<mjml>
  <mj-head>
    <mj-attributes>
      <mj-all padding="0px"></mj-all>
    </mj-attributes>
    <mj-style inline="inline">a { text-decoration: none!important; color: inherit!important; }</mj-style>
  </mj-head>
  <mj-body width="${this.imageWidth}" background-color="${this.$props.value.config.backgroundColor}">
  <mj-section full-width="full-width" padding="30px" border="2px solid ${this.$props.value.config.borderColor}">
      <mj-column margin="20px" width="100%">
        <mj-text font-style="${this.$props.value.config.header.fontStyle}"
        font-weight="${this.$props.value.config.header.fontWeight}"
        font-size="${this.$props.value.config.header.fontSize}px" color="${this.$props.value.config.header.color}"
        align="${this.$props.value.config.header.textAlign}">${this.$props.value.value.headerText}</mj-text>

        <mj-text width="100%" font-size="${this.$props.value.config.text.fontSize}px"
   align="${this.$props.value.config.text.textAlign}"
        color="${this.$props.value.config.text.color}">${this.$props.value.value.pageText[this.$store.state.currentLanguage]}</mj-text>

        <mj-button font-weight="${this.$props.value.config.buttons.fontWeight}" href="${this.$props.value.value.buttonLink}"
        background-color="${this.$props.value.config.buttons.backgroundColor}"
        border-radius="${this.$props.value.config.buttons.borderRadius}px" color="${this.$props.value.config.buttons.color}">
          ${this.$props.value.value.buttonText}
         </mj-button>

         <mj-text width="100%" font-size="${this.$props.value.config.text.fontSize}px"
   align="${this.$props.value.config.text.textAlign}"
        color="${this.$props.value.config.text.color}">${this.$props.value.value.pageText2[this.$store.state.currentLanguage]}</mj-text>

        <mj-image align="center" border="none" padding-bottom="0px" padding-left="0px" padding-right="0px" padding="0px 25px"
            src="${this.$props.value.value.imageUrl}" target="_blank" title="" width="${this.imageWidth}px"></mj-image>

   <mj-text font-size="${this.$props.value.config.text.fontSize}px" align="${this.$props.value.config.text.textAlign}"
        color="${this.$props.value.config.text.color}">${this.$props.value.value.footerText[this.$store.state.currentLanguage]}</mj-text>

        <mj-social font-size="15px" icon-size="30px" mode="horizontal">
          ${social}
        </mj-social>
      </mj-column>
   </mj-section>
  </mj-body>
</mjml>`;
    if(this.$props.active)
    this.mjmlService.renderTemplate(this.htmlOutput).then((resp: AxiosResponse) => {
      this.renderOutput = resp.data.html;
      this.$forceUpdate()
    })
  }
}
