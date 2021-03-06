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

import { Component, Inject, Vue, Watch } from 'vue-property-decorator'

import Chrome from 'vue-color/src/components/Chrome'
import ToggleSwitch from '@/components/toggleSwitch/toggleSwitch.vue'
import ProductService from '@/shared/services/productService'
import { Fonts } from '@/shared/fonts'
import { AxiosResponse } from 'axios'
import { mixins } from 'vue-class-component'
import CommonHelpers from '@/shared/commonHelpers'
@Component({
  props: {
    product: Object
  },
  components: {
    'toggle-switch': ToggleSwitch,
    'chrome-picker': Chrome
  },
  watch: {
    product: {
      handler: function (newVal) {

      },
      deep: true
    },
    payBtn: {
      handler: function (newVal) {

      },
      deep: true
    }
  }

})
export default class PayBtnTabComponent extends mixins(CommonHelpers, Vue) {
    public productService: any = ProductService.getInstance()
    public allFonts: any = [];
    public colors: any = [];
    public selectedFont: any = null;
    public btnStyle: any = {};
    public htmlContent: any = '';
    public embedCode: any = '';

    public payBtn: any = {
      emptyCart: true,
      buttonName: '',
      shoppingCartLanguage: '',
      fontName: '',
      fontUrl: '',
      fontSize: '',
      fontColor: '',
      borderColor: '',
      borderStyle: 'none',
      backgroundColor: '',
      roundCorners: '',
      shadowSize: '',
      height: '',
      width: '',
      italic: false,
      bold: false
    };

    public allLangs: any = [];
    public created () {
      const self = this
      for (const key in this.$store.state.languages) {
        if (this.$store.state.languages.hasOwnProperty(key)) {
          this.allLangs.push({
            name: this.$store.state.languages[key].name,
            langKey: key
          })
        }
      }
      $.each(Fonts, function (k, v) {
        self.allFonts.push({
          fontName: v.name,
          fontUrl: v.url.eot
        })
      })
    }

    @Watch('product', { immediate: true, deep: true })
    public updateProd (newVal: any) {
      this.payBtn = newVal && newVal.payButtonJson && newVal.payButtonJson.buttonName && newVal.payButtonJson.width &&
      newVal.payButtonJson.height ? newVal.payButtonJson : {
          emptyCart: true,
          buttonName: 'Add To Cart!',
          shoppingCartLanguage: 'en',
          fontName: 'Montserrat-Regular',
          fontUrl: 'http://fonts.gstatic.com/s/montserrat/v12/JTUSjIg1_i6t8kCHKm459WlhzQ.woff',
          fontSize: '25',
          fontColor: '#E1DADA',
          borderColor: '#000000',
          backgroundColor: '#E80808',
          shadowColor: '#B2AAAA',
          roundCorners: '0',
          shadowSize: '-4',
          height: '50',
          width: '300',
          borderThickness: '12',
          borderStyle: 'none'
        }
      const self = this
      Vue.nextTick(function () {
        self.selectedFont = newVal.payButtonJson && newVal.payButtonJson.fontName ? newVal.payButtonJson.fontName : self.payBtn.fontName
        self.generateStyleForButton(self.payBtn)
        self.generateEmbedCode(newVal)
      })
    }

    @Watch('payBtn', { immediate: true, deep: true })
    public updatePayBtn (newVal: any) {
      this.generateStyleForButton(newVal)
    }

    public goBack() {
      this.$router.push('/products')
    }

    public save () {
      const self = this
      // @ts-ignore
      this.payBtn.fontName = this.selectedFont
      // @ts-ignore
      this.payBtn.fontUrl = this.getFontUrl()
      const dto = this.$props.product
      dto.payButtonJson = this.payBtn
      dto.typeDigital = undefined
      dto.typeService = undefined
      dto.typePhysical = undefined
      dto.typeCourse = undefined
      dto.productSubscription = undefined
      this.productService.put(dto).then((resp: AxiosResponse) => {
        self.setAlert('productUpdated', 'success')
      })
    }

    public getFontUrl () {
      const self = this
      let url = null
      $.each(this.allFonts, function (k, v) {
        if (v.name === self.selectedFont) {
          url = v.fontUrl
        }
      })
      return url
    }

    public generateEmbedCode(product: any) {
      this.embedCode = '<div id="arcomplete" data-cred="' + product.administrationId + '.MTA2MDkwMA==" data-product="' + product.id + '"></div><script src="https://cdn-autorespond-nl.ams3.digitaloceanspaces.com/embedded/arcompactcart.js"></script>'
    }

    public generateStyleForButton (styleObj: any) {
      let shadow = styleObj.shadowSize + 'px ' + styleObj.shadowSize + 'px 10px ' + styleObj.shadowColor
      if (styleObj.shadowSize === '0') {
        shadow = '0px 0px 0px'
      }
      this.btnStyle = {
        'font-style': styleObj.italic ? 'italic' : 'normal',
        'font-weight': styleObj.bold ? 'bold' : 'normal',
        'font-family': this.selectedFont ? this.selectedFont : '',
        width: styleObj.width + 'px',
        height: styleObj.height + 'px',
        color: styleObj.fontColor,
        border: styleObj.borderThickness + 'px ' + styleObj.borderStyle + ' ' + styleObj.borderColor,
        background: styleObj.backgroundColor,
        'border-radius': styleObj.roundCorners + 'px',
        '-webkit-box-shadow': shadow,
        '-moz-box-shadow': shadow,
        'box-shadow': shadow,
        'text-align': 'center',
        'font-size': styleObj.fontSize + 'px'
      }
      this.generateButtonHTML()
    }

    public changeFont (event: any) {
      this.selectedFont = event.currentTarget.value
      this.generateStyleForButton(this.payBtn)
    }

    public updateFontColor (color: any) {
      this.payBtn.fontColor = color.hex
    }

    public updateBackgroundColor (color: any) {
      this.payBtn.backgroundColor = color.hex
    }

    public updateShadowColor (color: any) {
      this.payBtn.shadowColor = color.hex
    }

    public updateBorderColor (color: any) {
      this.payBtn.borderColor = color.hex
    }

    public generateButtonHTML () {
      let styl = 'font-family: ' + this.btnStyle['font-family'] + ';'
      styl += ' font-style: ' + this.btnStyle['font-style'] + ';'
      styl += ' font-weight: ' + this.btnStyle['font-weight'] + ';'
      styl += ' width: ' + this.btnStyle.width + ';'
      styl += ' height: ' + this.btnStyle.height + ';'
      styl += ' color: ' + this.btnStyle.color + ';'
      styl += ' border: ' + this.btnStyle.border + ';'
      styl += ' background: ' + this.btnStyle.background + ';'
      styl += ' border-radius: ' + this.btnStyle['border-radius'] + ';'
      styl += ' -webkit-box-shadow: ' + this.btnStyle['-webkit-box-shadow'] + ';'
      styl += ' -moz-box-shadow: ' + this.btnStyle['-moz-box-shadow'] + ';'
      styl += ' box-shadow: ' + this.btnStyle['box-shadow'] + ';'
      styl += ' font-size: ' + this.btnStyle['font-size'] + ';'
      styl += ' text-align: center'
      this.htmlContent = '<button style="' + styl + '">' + this.$t(this.payBtn.buttonName) + '</button>'
    }

    public copyHTML () {
      const range: any = document.createRange()
      range.selectNode(document.getElementById('payBtnHtml'))
      // @ts-ignore
      window.getSelection().removeAllRanges()
      // @ts-ignore
      window.getSelection().addRange(range)
      document.execCommand('copy')
      // @ts-ignore
      window.getSelection().removeAllRanges()
      // @ts-ignore
      this.$vueOnToast.pop('success', this.$t('labels.payBtnHtmlCopiedToClipboard'))
    }

  public copyEmbed () {
    const range: any = document.createRange()
    range.selectNode(document.getElementById('embedCode'))
    // @ts-ignore
    window.getSelection().removeAllRanges()
    // @ts-ignore
    window.getSelection().addRange(range)
    document.execCommand('copy')
    // @ts-ignore
    window.getSelection().removeAllRanges()
  }

  public copyCSS () {
      const range = document.createRange()
      // @ts-ignore
      range.selectNode(document.getElementById('cssRule'))
      // @ts-ignore
      window.getSelection().removeAllRanges()
      // @ts-ignore
      window.getSelection().addRange(range)
      // @ts-ignore
      document.execCommand('copy')
      // @ts-ignore
      window.getSelection().removeAllRanges()
      // @ts-ignore
      this.$vueOnToast.pop('success', this.$t('labels.CssRuleCopiedToClipboard'))
    }
}
