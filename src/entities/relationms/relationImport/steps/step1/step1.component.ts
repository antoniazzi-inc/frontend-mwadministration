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
import XLSX from 'xlsx'
import Papa from 'papaparse'
import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
import {mixins} from 'vue-class-component'
import CommonHelpers from '@/shared/commonHelpers'
import gravatarImg from 'vue-gravatar'
import ToggleSwitch from "@/components/toggleSwitch/toggleSwitch.vue";
import {AxiosResponse} from "axios";

@Component({
  components: {
    'v-gravatar': gravatarImg,
    vueDropzone: vue2Dropzone,
    'toggle-switch': ToggleSwitch
  }
})
export default class Step1Component extends mixins(CommonHelpers, Vue) {
  public dropzoneOptions: any
  public rows: any[]
  public rawRows: any[]
  public isUploading: boolean
  public hasHeader: boolean
  public hasDelimiterFields: boolean
  public hasHeaderField: boolean
  public limitError: boolean
  public csvDelimiter: string
  public fileType: string
  public csvEscChar: string
  public file: any

  constructor() {
    super()
    this.file = Object
    this.isUploading = false
    this.hasDelimiterFields = false
    this.hasHeaderField = false
    this.limitError = false
    this.hasHeader = true
    this.rows = []
    this.rawRows = []
    this.fileType = ''
    this.csvDelimiter = ','
    this.csvEscChar = '""'
    this.dropzoneOptions = {
      url: '#',
      autoProcessQueue: false,
      thumbnailWidth: 150,
      maxFilesize: 200,
      uploadMultiple: false,
      acceptedFiles: ['.csv', '.xls', '.xlsx', '.xlsb', '.xlsm', '.vcf'].join(','),
      addRemoveLinks: true,
      headers: {'My-Awesome-Header': 'header value'}
    }
  }
  @Watch('csvDelimiter', {immediate: true, deep: true})
  public updateCsvDelimiter(newVal:any){
    this.$emit('updateConfig', {
      csvDelimiter: newVal,
      hasHeader: this.hasHeader,
      csvEscChar: this.csvEscChar,
    })
  }
  @Watch('hasHeader', {immediate: true, deep: true})
  public updateHasHeader(newVal:any){
    this.$emit('updateConfig', {
      csvDelimiter: this.csvDelimiter,
      hasHeader: newVal,
      csvEscChar: this.csvEscChar,
    })
  }
  @Watch('csvEscChar', {immediate: true, deep: true})
  public updateCsvEscChar(newVal:any){
    this.$emit('updateConfig', {
      csvDelimiter: this.csvDelimiter,
      hasHeader: this.hasHeader,
      csvEscChar: newVal,
    })
  }

  public handleFile(file: any) {
    const self = this
    this.isUploading = true
    this.file = file;
    this.fileType = file.name.split('.').pop()
    this.csvDelimiter = ','
    this.csvEscChar = '""'
    const name = file.name
    if (this.fileType === 'vcf') {
      const reader = new FileReader()
      this.hasDelimiterFields = false
      this.hasHeaderField = false
      reader.onload = function (e: any) {
        self.isUploading = false
          let data = e.target.result
          data = data.split('END:VCARD')
          data.forEach(function (value: any, index: any) {
            const vcfArr = []
            value = value + 'END:VCARD'
            const parsedData:any = self.parseVcf(value)
            if (parsedData.fn !== undefined) {
              const myObj: any = {}
              const fullName = parsedData.fn.split(' ')
              let firstName = ''
              let lastName = ''
              lastName = fullName.pop()
              firstName = fullName[0]
              if (lastName === undefined) {
                lastName = ''
              }
              if (firstName === undefined) {
                firstName = ''
              }
              myObj.firstName = firstName
              const myObj1: any = {}
              myObj1.lastName = lastName
              vcfArr.push(myObj, myObj1)
            }
            if (parsedData.email !== undefined) {
              const myObj: any = {}
              myObj.email = parsedData.email[0].value[0]
              vcfArr.push(myObj)
            }
            if (parsedData.tel !== undefined) {
              const myObj: any = {}
              myObj.mobile = parsedData.tel[0].value[0]
              vcfArr.push(myObj)
            }
            if (parsedData.adr !== undefined) {
              const myObj: any = {}
              const adressVal = parsedData.adr[0]
              myObj.street = adressVal.value[0].concat(adressVal.value[1], adressVal.value[2])
              const myObj1: any = {}
              myObj1.city = adressVal.value[3]
              const myObj2: any = {}
              myObj2.province = adressVal.value[4]
              const myObj3: any = {}
              myObj3.postalCode = adressVal.value[5]
              const myObj4: any = {}
              myObj4.country = adressVal.value[6]
              vcfArr.push(myObj, myObj1, myObj2, myObj3, myObj4)
            }
            if (parsedData.title !== undefined) {
              const myObj: any = {}
              myObj.title = parsedData.title
              vcfArr.push(myObj)
            }
            if (vcfArr.length > 0) {
              self.rawRows.push(vcfArr)
            }
          })
        if(self.rawRows.length >= self.$store.state.maxRelUpload){
          self.limitError = true
          return
        }
        self.limitError = false
        self.$emit('onUpload', {rows: self.rawRows, file: self.file})
        }
        reader.readAsBinaryString(self.file)
    } else if(this.fileType === 'csv'){
      this.hasDelimiterFields = true
      this.hasHeaderField = true
    } else {
      this.hasDelimiterFields = false
      this.hasHeaderField = true
    }
    const reader = new FileReader()
    reader.onload = function (e: any) {
      self.isUploading = false
      const data = e.target.result
      let result
      let roa
      if (self.fileType === 'xlsx' || self.fileType === 'xlsm' || self.fileType === 'xlsb') {
        const workbook = XLSX.read(data, {
          type: 'binary'
        })
        const sheet_name_list = workbook.SheetNames
        roa = XLSX.utils.sheet_to_csv(workbook.Sheets[sheet_name_list[0]])
      } else if (self.fileType === 'xls') {
        // let workbook = XLS.read(data, { type: 'binary' });
        const cfb = XLSX.CFB.read(data, {
          type: 'binary'
        })
        const workbook = XLSX.parse_xlscfb(cfb)
        const sheet_name_list = workbook.SheetNames
        roa = XLSX.utils.make_csv(workbook.Sheets[sheet_name_list[0]])
      } else if(self.fileType === 'csv'){
        Papa.parse(data,
          {
            delimiter: self.csvDelimiter,
            encoding: 'UTF-8',
            skipEmptyLines: true,
            complete: function (results: any) {
              self.rawRows = results.data
              if(results.data.length >= self.$store.state.maxRelUpload){
                self.limitError = true
                return
              }
              self.limitError = false
              self.$emit('onUpload', {rows: self.rawRows, file: self.file})

            }
          })
      }
      if (roa && roa.length > 0) {
        result = roa
        Papa.parse(result,
          {
            delimiter: self.csvDelimiter,
            encoding: 'UTF-8',
            skipEmptyLines: true,
            complete: function (results: any) {
              self.rawRows = results.data
              if(results.data.length >= self.$store.state.maxRelUpload){
                self.limitError = true
                return
              }
              self.limitError = false
              self.$emit('onUpload', {rows: self.rawRows, file: self.file})
            }
          })
      }
    }
    reader.readAsBinaryString(this.file)
  }

  public parseVcf(input: any) {
    // Memotoo vcard.
    input = input.replace('item3.ADR:', 'ADR;type=HOME;:')
    input = input.replace('ADR:', 'ADR;type=HOME;:')
    const Re1 = /^(version|fn|title|org):(.+)$/i
    const Re2 = /^([^:;]+);([^:]+):(.+)$/
    const ReKey = /item\d{1,2}\./
    const fields: any = {}

    input.split(/\r\n|\r|\n/).forEach(function (line: any) {
      let results, key

      if (Re1.test(line)) {
        results = line.match(Re1)
        key = results[1].toLowerCase()
        fields[key] = results[2]
      } else if (Re2.test(line)) {
        results = line.match(Re2)
        key = results[1].replace(ReKey, '').toLowerCase()

        const meta: any = {}
        results[2].split(';')
          .map(function (p: any, i: any) {
            const match = p.match(/([a-z]+)=(.*)/i)
            if (match) {
              return [match[1], match[2]]
            } else {
              return ['TYPE' + (i === 0 ? '' : i), p]
            }
          })
          .forEach(function (p: any) {
            meta[p[0]] = p[1]
          })

        if (!fields[key]) fields[key] = []

        fields[key].push({
          meta: meta,
          value: results[3].split(';')
        })
      }
    })
    return fields
  }

  public handleRemove() {
    this.file = null
    this.fileType = ''
    this.hasDelimiterFields = false
    this.hasHeaderField = false
    this.rows = []
    this.rawRows = []
    this.limitError = false
    this.$emit('onRemove')
  }
}
