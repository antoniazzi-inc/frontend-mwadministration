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

import {Component, Vue, Watch} from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import CommonHelpers from '@/shared/commonHelpers'
import {ISearchableSelectConfig, SearchableSelectConfig} from "@/shared/models/SearchableSelectConfig";
import CartOrder from "@/shared/models/orderms/CartOrderModel";
import SearchableSelectComponent from "@/components/searchableSelect/searchableSelect.vue";
import moment from "moment";
import flatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'
import ToggleSwitch from "@/components/toggleSwitch/toggleSwitch.vue";
import MultiLanguageHtmlEditorComponent from "@/components/multiLanguageHtmlEditor/MultiLanguageHtmlEditor.vue";
import InvoicePreviewComponent from "@/entities/orderms/order/newOrder/invoicePreview/invoicePreview.vue";
import {DATE_FORMAT} from "@/shared/filters";
import MultiLanguageComponent from '@/components/multiLanguage/MultiLanguage.vue'
import {IMultiLanguageConfig, MultiLanguageConfig} from "@/shared/models/MultiLanguageConfig";

@Component({
  components: {
    SearchableSelectComponent,
    flatPickr,
    ToggleSwitch,
    MultiLanguageHtmlEditorComponent,
    InvoicePreviewComponent,
    MultiLanguageComponent
  },
  props: {
    cartOrder: Object,
    active: Boolean
  }
})
export default class Step4Component extends mixins(CommonHelpers, Vue) {
  public singleSelectConfigInvoiceTemplate: ISearchableSelectConfig
  public selectedInvoiceTemplate: any
  public invoiceAdditionalDetails: any
  public cartOrderCopy: any
  public dateConfig: any
  public invoiceDate: any
  public invoiceScheduledOn: any
  public sendInvoice: any
  public invoiceLanguage: any
  public invoiceDeliveryDate: any
  public invoicePreviewData: any
  public invoiceEmailContent: any
  public invoiceEmailSubject: any
  public multiLangConfig: IMultiLanguageConfig


  constructor () {
    super()
    this.dateConfig = {
      wrap: false,
      altInput: false,
      dateFormat: 'd-m-Y'
    }
    this.multiLangConfig = new MultiLanguageConfig(true, false,
      'labels.invoiceEmailSubject', '', false,
      false, false, true, true, false)
    this.invoiceDate = null
    this.invoiceDeliveryDate = moment().format(DATE_FORMAT)
    this.invoiceScheduledOn = moment().format(DATE_FORMAT)
    this.singleSelectConfigInvoiceTemplate = new SearchableSelectConfig('name',
      'labels.chooseInvoiceTemplate', '', false,
      false, true, false, false, false, true)
    this.selectedInvoiceTemplate = null
    this.sendInvoice = true
    this.invoiceAdditionalDetails = ''
    this.invoiceLanguage = ''
    this.invoiceEmailSubject = []
    this.invoiceEmailContent = ''
    this.cartOrderCopy = new CartOrder()
    this.invoicePreviewData = {
      invoiceSendDate: moment().format(DATE_FORMAT)
    }
  }
  @Watch('cartOrder', {immediate: true, deep: true})
  public cartOrderUpdate (newVal:any) {
    if(!newVal) return false
    this.cartOrderCopy = newVal
  }
  public mounted () {
    this.invoiceDate = moment().format(DATE_FORMAT)
    this.invoiceLanguage = this.$store.state.currentLanguage
  }
  public changeInvoiceTemplate (template:any) {
    if(template && template.templateDataJson) {
      this.invoiceEmailContent = template.templateDataJson.invoiceEmailContent
    }
    this.selectedInvoiceTemplate = template
  }
  public removeInvoiceTemplate () {
    this.selectedInvoiceTemplate = null
    this.invoiceEmailContent = ''
  }
  public changeLangauge (event:any) {
    let lang = event.target.value;
    this.invoiceLanguage = lang;
  }
  public updateInvoiceEmailContent(content:any){
    this.invoiceEmailContent = content;
  }
  public validateStep(){
    return new Promise(resolve => {
      resolve({status: true, msg: ''})
    })
  }

  public addNewEmailSubject(langKey:any){
    if(!langKey) return
    const lang = {
      langKey: langKey,
      name: '',
      description: ''
    }
    let index = null
    if (this.invoiceEmailSubject && this.invoiceEmailSubject.length) {
      this.invoiceEmailSubject.forEach((language:any, i:any) => {
        if (language.langKey === lang.langKey) {
          index = i
        }
      })
      if (index !== null) {
        this.$set(this.invoiceEmailSubject, index, lang)
      } else {
        this.invoiceEmailSubject.push(lang)
      }
    } else {
      this.invoiceEmailSubject = [lang]
    }
  }
  public updateEmailSubject(lang:any){
    if(!lang) return
    let index = null
    if (this.invoiceEmailSubject && this.invoiceEmailSubject.length) {
      this.invoiceEmailSubject.forEach((language:any, i:any) => {
        if (language.langKey === lang.langKey) {
          index = i
        }
      })
      if (index !== null) {
        this.$set(this.invoiceEmailSubject, index, lang)
      } else {
        this.invoiceEmailSubject.push(lang)
      }
    } else {
      this.invoiceEmailSubject = [lang]
    }
  }
  public removeEmailSubject(lang:any){
    if(!lang) return
    let ind = this.invoiceEmailSubject.findIndex((e:any)=>{e.langKey === lang.langKey})
    if(ind > -1){
      this.invoiceEmailSubject.splice(ind, 1)
    }
  }
}
