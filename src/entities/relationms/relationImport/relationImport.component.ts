import { Component, Vue } from 'vue-property-decorator'
import XLSX from 'xlsx'
import Papa from 'papaparse'
import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
import { mixins } from 'vue-class-component'
import CommonHelpers from '@/shared/commonHelpers'
import gravatarImg from 'vue-gravatar'
import RelationService from '@/shared/services/relationService'
import { AxiosResponse } from 'axios'
import { RelationEntity } from '@/shared/models/relationModel'
import { RelationProfile } from '@/shared/models/relation-profile.model'
@Component({
  components: {
    'v-gravatar': gravatarImg,
    vueDropzone: vue2Dropzone
  }
})
export default class RelationImportComponent extends mixins(CommonHelpers, Vue) {
  public step: number;
  public relationsToImport: number;
  public numRowsInFile: number;
  public existingGroup: number;
  public relationService: any;
  public duplicateEmailsFound: number;
  public delimiterFields: boolean;
  public insertEmptyValues: boolean;
  public hasHeaderField: boolean;
  public csvDelimiter: string;
  public newGroup: string;
  public fileContents: string;
  public emailFieldIndex: any;
  public csvEscChar: string;
  public delimiter: string;
  public hasHeader: boolean;
  public btnNextDisabled: boolean;
  public overwrite: boolean;
  public dropzoneOptions: any;
  public file: any;
  public vcfFile: any;
  public fileType: any;
  public excelFile: any;
  public rows: any[];
  public allFreeFileds: any[];
  public mappings: any[];
  public dbfields: any[];
  public datafordb: any[];
  public exampleCards: any[];
  public groups: any[];
  public freeFields: any[];
  public duplicateEmailsList: any[];
  public existingEmailsList: any[];

  constructor () {
    super()
    this.relationService = RelationService.getInstance()
    this.step = 1
    this.file = Object
    this.fileType = ''
    this.mappings = []
    this.rows = []
    this.allFreeFileds = []
    this.existingGroup = 0
    this.newGroup = ''
    this.delimiter = ''
    this.overwrite = false
    this.insertEmptyValues = false
    this.fileContents = ''
    this.delimiterFields = false
    this.hasHeaderField = false
    this.csvDelimiter = ','
    this.csvEscChar = '"'
    this.hasHeader = true
    this.excelFile = {}
    this.vcfFile = false
    this.dbfields = this.relationFields()
    this.freeFields = this.$store.state.lookups.freeFields
    this.groups = this.$store.state.lookups.groups
    this.btnNextDisabled = true
    this.datafordb = []
    this.emailFieldIndex = ''
    this.duplicateEmailsFound = 0
    this.duplicateEmailsList = []
    this.existingEmailsList = []
    this.relationsToImport = 0
    this.exampleCards = []
    this.numRowsInFile = 0
    this.dropzoneOptions = {
      url: 'https://autorespond.nl',
      thumbnailWidth: 150,
      maxFilesize: 200,
      uploadMultiple: false,
      acceptedFiles: ['.csv', '.xls', '.xlsx', '.xlsb', '.xlsm', '.vcf'].join(','),
      addRemoveLinks: true,
      headers: { 'My-Awesome-Header': 'header value' }
    }
  }

  public mounted () {
    this.dbfields = this.relationFields()
    this.groups = this.$store.state.lookups.groups
    let freeFields:any = []
    this.$store.state.lookups.freeFields.forEach((freeField:any)=>{
      freeFields.push({
        label: this.getMultiLangName(freeField.customFieldLanguages).name,
        value: freeField
      })
    })
    this.allFreeFileds = freeFields
  }

  public onComplete () {
    const dto: any = []
    const self = this
    self.step = 4
    const payload: any = {}
    if (self.existingGroup !== 0) {
      payload.existingGroup = self.existingGroup
      payload.newGroup = ''
    } else if (self.newGroup !== '') {
      payload.existingGroup = 0
      payload.newGroup = self.newGroup
    }
    payload.overwriteData = self.overwrite
    payload.defaultCountryId = 150 // TODO now set to NLD, but get this from this admin country
    /* payload.defaultLocale = AdminApp.instance().store.session.user.locale;
    payload.defaultTimezone = Commons.timezoneByName(AdminApp.instance().store.session.user.timezone).id; */
    payload.overwriteExistingFieldsWithEmptyValues = self.insertEmptyValues

    // build list for server and add 'exists' flag to each record, so at serverside we know what to do
    payload.relations = []
    self.datafordb.forEach(function (rel) {
      const row: any = []
      const relProfile: any = new RelationProfile(undefined, undefined, '', '', '', '', '',
        '', '', 0, '', '', false, 0, 0, undefined, undefined, undefined, undefined)
      const newRel: any = new RelationEntity(undefined, undefined, undefined, undefined, undefined,
        undefined, 'default_' + Math.random(), Math.random().toString(), '', true, self.$store.state.currentLanguage,
        false, undefined, undefined, undefined, relProfile, undefined, undefined, undefined,
        undefined, undefined, undefined, undefined, undefined, undefined,
        undefined, [], [], undefined)
      rel.forEach(function (fld: any) {
        let fvalue = fld.value
        if (fld.fieldName === 'categoryId') {
          // try to convert the provided category name into an id
          let cat: any = null
          self.$store.state.lookups.categories.forEach((cate: any) => {
            if (cate.id === fvalue) {
              cat = cate
            }
          })

          if (cat) fvalue = cat.value
        } else if (fld.fieldName === 'country') {
          // try to convert the provided country name into an id
          fvalue = self.getCountryByName(fvalue)
        }
        row.push({ label: fld.fieldName, value: fvalue })
        if (fld.fieldName === 'email') {
          if (self.existingEmailsList.find(x => x === fld.value) === undefined) row.push({ label: 'exists', value: 'false' })
          else row.push({ label: 'exists', value: 'true' })
        }
      })
      payload.relations.push(row)

      row.forEach((item: any) => {
        if (newRel[item.label] !== undefined) {
          newRel[item.label] = item.value
        } else if (relProfile[item.label] !== undefined) {
          relProfile[item.label] = item.value
        }
        if (relProfile.categoryId === 0) {
          relProfile.categoryId = undefined
        }
        if (newRel.relationGroups?.length === 0) {
          newRel.relationGroups = undefined
        }
        newRel.roles = [
          {
            id: 3,
            version: 0
          }, {
            id: 4,
            version: 0
          }
        ]
      })
      newRel.authorities = [{ authority: 'ROLE_USER' }, { authority: 'ROLE_RELATION' }]
      dto.push(newRel)
    })
    this.relationService.createMultiple(dto).then((resp: AxiosResponse) => {
      if (resp) {
        this.setAlert('relationsCreated', 'success')
        this.goBack()
      } else {
        this.setAlert('relationsError', 'error')
      }
    })
    console.log('datafordb', JSON.stringify(payload))
  }

  public goBack () {
    this.$router.push('/relations')
  }

  public validateStep () {
    const self = this
    return new Promise(resolve => {
      if (self.step === 1 && self.file) {
        self.step2()
        resolve(true)
      } else if (self.step === 2) {
        self.step3()
        resolve(true)
      } else resolve(!!this.file)
    })
  }

  public handleFile (file: any) {
    const me = this
    me.file = file
    me.fileType = file.name.split('.').pop()
    if (me.fileType === 'csv') {
      me.delimiterFields = true
      me.hasHeaderField = true
      me.csvDelimiter = ','
      me.csvEscChar = '""'
    } else if (me.fileType === 'vcf') {
      me.vcfFile = true
      me.delimiterFields = false
      me.hasHeaderField = false
      me.csvDelimiter = ','
      me.csvEscChar = '""'
      const reader = new FileReader()
      const name = file.name
      reader.onload = function (e: any) {
        let data = e.target.result
        data = data.split('END:VCARD')
        data.forEach(function (value: any, index: any) {
          const vcfArr = []
          value = value + 'END:VCARD'
          const parsedData = me.parseVcf(value)
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
            const street = adressVal.value[0].concat(adressVal.value[1], adressVal.value[2])
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
            me.rows.push(vcfArr)
          }
        })
      }
      reader.readAsBinaryString(me.file)
    } else {
      me.delimiterFields = false
      me.hasHeaderField = true
      me.csvDelimiter = ','
      me.csvEscChar = '""'

      // let file = file;
      const reader = new FileReader()
      const name = me.file.name
      reader.onload = function (e: any) {
        const data = e.target.result
        let result
        let roa
        if (me.fileType === 'xlsx' || me.fileType === 'xlsm' || me.fileType === 'xlsb') {
          const workbook = XLSX.read(data, {
            type: 'binary'
          })
          const sheet_name_list = workbook.SheetNames
          roa = XLSX.utils.sheet_to_csv(workbook.Sheets[sheet_name_list[0]])
        } else if (me.fileType === 'xls') {
          // let workbook = XLS.read(data, { type: 'binary' });
          const cfb = XLSX.CFB.read(data, {
            type: 'binary'
          })
          const workbook = XLSX.parse_xlscfb(cfb)
          const sheet_name_list = workbook.SheetNames
          roa = XLSX.utils.make_csv(workbook.Sheets[sheet_name_list[0]])
        }
        if (roa.length > 0) {
          result = roa
        }
        me.excelFile = result
      }
      reader.readAsBinaryString(me.file)
      // reader.readAsArrayBuffer(file);
    }
  }

  public parseVcf (input: any) {
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

  public handleRemove () {
    const self = this
    self.delimiterFields = false
    self.hasHeaderField = false
    self.btnNextDisabled = true
    self.rows = []
    self.mappings = []
    self.datafordb = []
    self.emailFieldIndex = ''
    self.duplicateEmailsFound = 0
    self.duplicateEmailsList = []
    self.relationsToImport = 0
    self.vcfFile = false
    self.exampleCards = []
    self.existingEmailsList = []
    self.existingGroup = 0
    self.newGroup = ''
    self.file = null
  }

  public selectedGroup () {
    const self = this
    let groupLabel = ''
    if (self.existingGroup !== 0) {
      self.newGroup = ''
      self.$store.state.lookups.groups.filter(function (item: any) {
        if (item.value === self.existingGroup) {
          groupLabel = item.label
        }
      })
      return groupLabel
    } else if (self.newGroup !== '') {
      return self.newGroup
    }
  }

  foundRows () {
    let found = (this.rows) ? this.rows.length : 0
    if (found > 0 && this.hasHeaderField) found -= 1
    return found
  }

  filename () {
    if (this.file) {
      const fileSize = this.file.size / 1048576
      const size = this.file.size
      if (fileSize <= 2) {
        this.btnNextDisabled = false
        if (size < 1024) return this.file.name + ' (' + size + ' Bytes)'
        else if (size < 1048576) return this.file.name + ' (' + (size / 1024).toFixed(0) + ' KB)'
        else if (size < 1073741824) return this.file.name + ' (' + (size / 1048576).toFixed(1) + ' MB)'
        // return this.file.name + ' (' + Math.round(this.file.size / 1024) + ' kbyte)';
      } else {
        this.btnNextDisabled = true
        return this.file.name + ' (' + size + ' kbyte)'
      }
    } else {
      this.btnNextDisabled = true
      return ' '
    }
  }

  public step2 () {
    this.step = 2
    const self = this
    if (self.mappings.length < 1) {
      if (self.fileType === 'vcf') {
        self.vcfFile = true
      } else {
        self.vcfFile = false
        let file
        if (self.fileType !== 'csv') {
          file = self.excelFile
        } else {
          file = self.file
        }
        const results = Papa.parse(file,
          {
            delimiter: self.csvDelimiter,
            encoding: 'UTF-8',
            skipEmptyLines: true,
            complete: function (results: any) {
              self.rows = results.data
              for (let i = 0; i < self.rows[0].length; i++) {
                self.mappings.push({ index: i, dbfield: 'dnassign' })
              }
              const foundFields = self.rows[0].filter(function (obj: any, objindex: number) {
                return self.dbfields.some(function (obj2: any) {
                  if (obj === obj2.value) {
                    const foundMapping = self.mappings.find(x => x.index === objindex)
                    foundMapping.dbfield = obj2.value
                  }
                })
              })
            }
          }
        )
      }
    }
  }

  public step3 () {
    const emails: string[] = []
    const self = this
    self.step = 3
    self.numRowsInFile = self.rows.length - 1 // skip first mapping row
    if (self.datafordb.length < 1) {
      // Find the email field index
      const emailFieldIndex = self.mappings.findIndex(x => x.dbfield === 'email')
      if (emailFieldIndex > -1) {
        self.emailFieldIndex = emailFieldIndex
      }
      const rowsInsertedCounter = 0
      self.rows.forEach(function (rowValue, rowIndex) {
        if (!self.vcfFile) {
          if (self.hasHeader && rowIndex === 0) {
            return
          }
          let foundDuplicate
          // Check if there is a email column
          if (self.emailFieldIndex >= 0) {
            // Check if there is an empty email value
            if (rowValue[self.emailFieldIndex] !== undefined && rowValue[self.emailFieldIndex] !== '') {
              // Set the email values to lowercase
              rowValue[self.emailFieldIndex] = rowValue[self.emailFieldIndex].toLowerCase()
              emails.push(rowValue[self.emailFieldIndex])
              self.datafordb.filter(function (arr) {
                arr.filter(function (obj: any) {
                  if (obj.value === rowValue[self.emailFieldIndex]) {
                    foundDuplicate = obj.value
                  }
                })
              })
              if (foundDuplicate !== undefined) {
                self.duplicateEmailsFound += 1
                self.duplicateEmailsList.push(foundDuplicate)
              } else {
                const exampleCard: any = []
                const singleRow: any = []
                let counter = 0
                rowValue.forEach(function (cellValue: any, cellIndex: any) {
                  counter += 1
                  const columnName = self.mappings[cellIndex].dbfield
                  // if (columnName === 'dnassign') {
                  // 	return;
                  // }
                  const myObj: any = {}
                  myObj.fieldName = columnName
                  myObj.value = cellValue
                  // myObj[columnName] = cellValue;
                  // self.datafordb.push(myObj);
                  if (columnName !== 'dnassign') {
                    singleRow.push(myObj)
                    if (self.relationsToImport < 3) {
                      const foundDbField = self.dbfields.filter(x => x.value === columnName)
                      exampleCard.push({ label: foundDbField[0].label, value: myObj.value })
                    }
                  }
                  // inserted row counter
                  // if (cellIndex === (rowValue.length - 1)) {
                  if (counter === (rowValue.length)) {
                    if (self.relationsToImport < 3) {
                      self.exampleCards.push(exampleCard)
                    }
                    self.datafordb.push(singleRow)
                    self.relationsToImport += 1
                  }
                })
              }
            } else {
              self.duplicateEmailsFound += 1
            }
          }
        } else {
          // Check if there is an email key available
          const foundKey = rowValue.filter((e: any) => e.hasOwnProperty('email'))
          // Check for empty email value
          let foundDuplicate
          if (foundKey.length > 0 && foundKey[0].email !== '') {
            self.datafordb.filter(function (arr) {
              arr.filter(function (obj: any) {
                if (obj.value === foundKey[0].email) {
                  foundDuplicate = obj.value
                }
              })
            })
            console.log('foundDuplicate', foundDuplicate)
            if (foundDuplicate !== undefined) {
              self.duplicateEmailsFound += 1
              self.duplicateEmailsList.push(foundDuplicate)
            } else {
              const exampleCard: any = []
              const singleRow: any = []
              rowValue.forEach(function (cellValue: any, cellIndex: any) {
                // find duplicate email
                const key = Object.keys(cellValue)
                if (key[0] === 'email') {
                  // make email lowercase
                  cellValue.email = cellValue.email.toLowerCase()
                }
                // console.log('dup', foundDuplicate);
                const foundDbField = self.dbfields.filter(x => x.value === key[0])
                if (foundDbField.length > 0) {
                  const myObj: any = {}
                  myObj.fieldName = foundDbField[0].value
                  myObj.value = cellValue[myObj.fieldName]
                  // self.datafordb.push(myObj);
                  singleRow.push(myObj)
                  if (self.relationsToImport < 2) {
                    exampleCard.push({ label: foundDbField[0].label, value: cellValue[myObj.fieldName] })
                  }
                }
                // inserted row counter
                if (cellIndex === (rowValue.length - 1)) {
                  if (self.relationsToImport < 2) {
                    self.exampleCards.push(exampleCard)
                  }
                  self.datafordb.push(singleRow)
                  self.relationsToImport += 1
                }
              })
            }
          } else {
            self.duplicateEmailsFound += 1
          }
        }
      })
      self.existingEmailsList = []
      // check on server for existing emails
      const pagination = {
        page: 0,
        size: 100000,
        sort: ['id,asc']
      }
      let queryP = ''
      emails.forEach((email: any, ind: any) => {
        if (ind < emails.length - 1) {
          queryP += `${email},`
        } else {
          queryP += `${email}`
        }
      })
      const query = 'email=in=(' + queryP + ')'
      this.relationService.search(query).then((resp: AxiosResponse) => {
        if (resp) {
          if (resp.data.content.length > 0) {
            resp.data.content.forEach((rel: any) => {
              self.existingEmailsList.push(rel.email)
            })
          }
        }
      })
    }
  }

  public calculateImport () {
    if (this.overwrite) return this.numRowsInFile - this.duplicateEmailsFound
    else return this.numRowsInFile - this.duplicateEmailsFound - this.existingEmailsList.length
  }
}
