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
export default class MjmlFullPageComponent extends mixins(Vue, CommonHelpers) {
  public htmlOutput: any;
  public mjmlService: any;
  public renderOutput: any;

  constructor () {
    super()
    this.mjmlService = MjmlService.getInstance()
    this.htmlOutput = ''
    this.renderOutput = ''
  }

  public getFont(data:any) {
    let f = {name: '', url: ''}
    let name = data.name
    if (name.indexOf('-') > 0) name = name.substr(0, name.indexOf('-'))
    f.name = name + ', Arial'
    f.url = data.url
    return f
  }

  public getLineHeight(font: any) {
    return (font * 1.6) + 'px'
  }

  @Watch('active', { immediate: true, deep: true })
  public init () {
    const social: any = []
    if (this.$props.value.value.socialMedia && this.$props.value.value.socialMedia.length > 0) {
      this.$props.value.value.socialMedia.forEach((item: any, index: any) => {
        if (item.visible) {
          social.push(`<mj-social-element name="${item.name.toLowerCase() + '-noshare'}" href="${item.url}">&nbsp;&nbsp;&nbsp;&nbsp;
</mj-social-element>`)
        }
      })
    }
    this.htmlOutput = `<mjml>
  <mj-head>
    <mj-attributes>
      <mj-all padding="0px"></mj-all>
    </mj-attributes>
    <mj-style inline="inline">{ text-decoration: none!important; color: inherit!important; }</mj-style>
    <mj-font name="${this.getFont(this.$props.value.config.font).name}" href="${this.getFont(this.$props.value.config.font).url}" />
  </mj-head>
  <mj-body width="100%" background-color="${this.$props.value.config.backgroundColor}">
  <mj-wrapper full-width="full-width" border="2px solid ${this.$props.value.config.borderColor}" padding="30px">
   <mj-column width="100%">
          <mj-text font-style="${this.$props.value.config.header.fontStyle}"
        font-weight="${this.$props.value.config.header.fontWeight}"
        font-family="${this.getFont(this.$props.value.config.font).name}"
        font-size="${this.$props.value.config.header.fontSize}px" color="${this.$props.value.config.header.color}"
        align="${this.$props.value.config.header.textAlign}">${this.getMultiLangName(this.$props.value.value.headerText).name}</mj-text>
        <mj-text font-size="${this.$props.value.config.text.fontSize}px"
   align="${this.$props.value.config.text.textAlign}"
        color="${this.$props.value.config.text.color}">${this.$props.value.value.pageText[this.$store.state.currentLanguage] ? this.$props.value.value.pageText[this.$store.state.currentLanguage] : ''}</mj-text>
        </mj-column>
    <mj-column width="100%" background-color="${this.$props.value.config.footer.backgroundColor}">
    <mj-text font-size="${this.$props.value.config.footer.fontSize}px"
    padding-left="20px" padding-right="20px"
    font-family="${this.getFont(this.$props.value.config.font).name}"
    align="${this.$props.value.config.footer.textAlign}"
        color="${this.$props.value.config.footer.color}">
${this.$props.value.value.footerText[this.$store.state.currentLanguage] ? this.$props.value.value.footerText[this.$store.state.currentLanguage] : ''}
</mj-text>
        <mj-social font-size="15px" icon-size="30px" mode="horizontal">
          ${social}
        </mj-social>
    </mj-section>
    <mj-group>
   </mj-wrapper>
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
