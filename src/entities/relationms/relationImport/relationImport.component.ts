import {Component, Vue} from 'vue-property-decorator'
import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
import {mixins} from 'vue-class-component'
import CommonHelpers from '@/shared/commonHelpers'
import gravatarImg from 'vue-gravatar'
import RelationService from '@/shared/services/relationService'
import {AxiosResponse} from 'axios'
import {RelationEntity} from '@/shared/models/relationModel'
import {RelationProfile} from '@/shared/models/relation-profile.model'
import {RelationAddress} from '@/shared/models/relation-address.model'
import {Company} from '@/shared/models/company.model'
import {PhoneType} from '@/shared/models/company-phone.model'
import Step1Component from "@/entities/relationms/relationImport/steps/step1/step1.vue";
import Step2Component from './steps/step2/step2.vue'
import Step3Component from "@/entities/relationms/relationImport/steps/step3/step3.vue";
import {CustomField} from "@/shared/models/custom-field.model";

@Component({
  components: {
    'v-gravatar': gravatarImg,
    vueDropzone: vue2Dropzone,
    step1: Step1Component,
    step2: Step2Component,
    step3: Step3Component,
  }
})
export default class RelationImportComponent extends mixins(CommonHelpers, Vue) {
  public step: number;
  public duplicateEmailsFound: number;
  public numberOfExisingEmails: number;
  public emailIndex: any;
  public relationService: any;
  public file: any;
  public existingEmailsList: any[];
  public uniqueRows: any[];
  public rows: any[];
  public exampleCards: any[];
  public mappings: any[];
  public importFields: any[];
  public existingRelations: any[]
  public invalidEmails: any[]
  public headerRow: any[];
  public selectedGroup: any;
  public duplicateEmailsList: any[];
  public isSaving: boolean;
  public hasEmailField: boolean | null;
  public hasHeader: boolean;
  public overwrite: boolean;
  public overwriteData: boolean;
  public isImporting: string|null;
  public delimiter: string;
  public escChar: string;
  public newGroup: string;


  constructor() {
    super()
    this.relationService = RelationService.getInstance()
    this.step = 0
    this.duplicateEmailsFound = 0
    this.numberOfExisingEmails = 0
    this.exampleCards = []
    this.duplicateEmailsList = []
    this.overwrite = false
    this.overwriteData = false
    this.emailIndex = null
    this.hasEmailField = null
    this.selectedGroup = null
    this.newGroup = ''
    this.file = null
    this.isSaving = false
    this.hasHeader = true
    this.delimiter = ''
    this.newGroup = ''
    this.escChar = ''
    this.existingRelations = []
    this.existingEmailsList = []
    this.invalidEmails = []
    this.uniqueRows = []
    this.rows = []
    this.mappings = []
    this.importFields = []
    this.headerRow = []
    this.isImporting = localStorage.getItem('isImporting')
  }

  public mounted() {
    this.importFields = this.relationFields()
  }

  /*Call when user is populating the fields*/
  public updateMappings(mappings: any) {
    this.mappings = mappings
  }

  /*Call when overwrite toggle button is changed*/
  public changeOverwrite(overwrite:any) {
    this.overwrite = overwrite
  }
  /*Call when overwrite Data toggle button is changed*/
  public changeInsertEmptyValues(overwrite:any) {
    this.overwriteData = overwrite
  }

  /*Call when import is ready*/
  public onComplete() {
    let self = this
    this.isSaving = true
    let temp: any = []
    for (let i = 0; i < this.uniqueRows.length; i++) {
      let relationProfile: any = new RelationProfile()
      let relationPhones: any = []
      let relationAddresses: any = new RelationAddress()
      let relationCompany: any = new Company()
      let relationCustomField: any = new CustomField()
      let relation: any = new RelationEntity(undefined, undefined, undefined, undefined, undefined,
        undefined, 'default_' + Math.random(), Math.random().toString(), undefined, true, this.$store.state.currentLanguage,
        false, undefined, undefined, undefined, undefined, undefined, undefined, undefined,
        undefined, undefined, undefined, undefined, undefined, undefined,
        undefined, undefined, undefined, undefined)
      let hasPhone = false, hasAddress = false
      let row = self.uniqueRows[i]
      if (self.validateEmail(row[self.emailIndex])) {
        for (let j = 0; j < this.mappings.length; j++) {
          const fieldName = this.mappings[j].fieldName
          const rowIndex = this.mappings[j].rowIndex
          const model = this.mappings[j].model
          const value = this.mappings[j].value
          switch (model) {
            case 'relation':
              if (row[rowIndex])
                relation[fieldName] = row[rowIndex]
              break;
            case 'relationProfile':
              if (row[rowIndex]) {
                if (fieldName === 'categoryId') {
                  let cat: any = null
                  this.$store.state.lookups.categories.forEach((cate: any) => {
                    if (cate.id === row(rowIndex)) {
                      cat = cate
                    }
                  })
                  if (cat) relationProfile.categoryId = cat.value
                } else {
                  if(row[rowIndex] === 'Saskia'){
                    debugger
                  }
                  relationProfile[fieldName] = row[rowIndex]
                }
              }
              break;
            case 'addresses':
              hasAddress = true
              if (row[rowIndex]) {
                if (fieldName === 'countryId') {
                  let val = this.getCountryByName(row[rowIndex])
                  if (!val) val = this.getCountryByIso(row[rowIndex])
                  relationAddresses.countryId = val
                } else {
                  relationAddresses[fieldName] = row[rowIndex]
                }
              }
              break;
            case 'phones':
              hasPhone = true
              if (row[rowIndex]) {
                if (fieldName === 'phoneHome') {
                  relationPhones.push({
                    number: row[rowIndex],
                    type: PhoneType.HOME
                  })
                } else if (fieldName === 'phoneWork') {
                  relationPhones.push({
                    number: row[rowIndex],
                    type: PhoneType.WORK
                  })
                } else if (fieldName === 'mobile') {
                  relationPhones.push({
                    number: row[rowIndex],
                    type: PhoneType.MOBILE
                  })
                }
              }
              break;
            case 'company':
              if (row[rowIndex]) {
                relationCompany.business = {id: 1, version: 0}
                relationCompany.name = row[rowIndex]
                relationCompany.alias = row[rowIndex]
              }
              break;
            case 'customFields':
              if (row[rowIndex]) {
                relationCustomField = {
                  customField: {
                    id: value.id,
                    version: value.version
                  },
                  value: row[rowIndex]
                }
              }
              break;
            default:
              break;
          }
        }
        relation.relationProfile = relationProfile
        relation.roles = [{ id: 3, version: 0 }]
        if (hasPhone) {
          relation.relationPhones = relationPhones
        }
        if (hasAddress) {
          relation.relationAddresses = [relationAddresses]
        }
        if (relationCompany && relationCompany.name) {
          relation.relationCompanies = [relationCompany]
        }
        if(this.selectedGroup){
          relation.relationGroups = [{
            id: this.selectedGroup.id,
            version: this.selectedGroup.version
          }]
        }
        const existingIndex = this.existingEmailsList.findIndex(x => x.email === relation.email);
        if(existingIndex > -1 && self.overwrite) {
          const sysRel = this.existingEmailsList[existingIndex]
          relation.id = sysRel.id
          relation.username = sysRel.username
          relation.password = sysRel.password
          if(this.overwriteData) {
            temp.push(relation)
          } else {
            let keepEmpty = this.keepRelData(relation, sysRel)
            temp.push(keepEmpty)
          }
        } else {
          if(!self.overwrite) temp.push(relation)
        }
      } else {
        this.invalidEmails.push(row[self.emailIndex])
      }
    }
    if(this.newGroup) {
      //TODO handle adding new group
    }
    this.relationService.import(temp).then((resp: AxiosResponse) => {
      if (resp) {
        localStorage.setItem('isImporting', 'true')
        this.setAlert('relationStartedImporting', 'success')
        this.goBack()
      } else {
        this.setAlert('relationsImportError', 'error')
        this.step = 3
      }
    })
  }

  public goBack () {
    this.$router.push('/relations')
  }
  public keepRelData (toImport:any, systemRel:any) {
    for (let j = 0; j < this.mappings.length; j++) {
      const fieldName = this.mappings[j].fieldName
      const model = this.mappings[j].model
      switch (model) {
        case 'relation':
          toImport.username = systemRel.username
          toImport.id = systemRel.id
          toImport.version = systemRel.version
          toImport.password = systemRel.password
          if (fieldName === 'categoryId') {
            let cat: any = null
            this.$store.state.lookups.categories.forEach((cate: any) => {
              if (cate.id === systemRel.categoryId) {
                cat = cate
              }
            })
            if (cat) toImport.relationProfile.categoryId = cat.value
          }
          if(systemRel[fieldName]){
            toImport[fieldName] = systemRel[fieldName]
          }
          break;
        case 'relationProfile':
          if(systemRel.relationProfile[fieldName]){
            toImport.relationProfile[fieldName] = systemRel.relationProfile[fieldName]
          }
          break;
        case 'addresses':
          const toKeep = systemRel.relationAddresses
          if(toKeep.length){
            toImport.relationAddresses.concat(toKeep)
          }
          break;
        case 'phones':
          const toKeepPhones = systemRel.relationPhones
          if(toKeepPhones.length){
            toImport.relationPhones.concat(toKeepPhones)
          }
          break;
        case 'company':
          const toKeepCompany = systemRel.companies
          if(toKeepCompany.length){
            toImport.companies.concat(toKeepCompany)
          }
          break;
        case 'customFields':
          const toKeepCustomFields = systemRel.relationCustomFields
          if(toKeepCustomFields.length){
            toImport.relationCustomFields.concat(toKeepCustomFields)
          }
          break;
        default:
          break;
      }
    }
    return toImport
  }

  /*When form Wizard Tab is changed*/
  public changeTab(e: any, a: any) {
    this.step = a
  }

  /*Navigate form-wizard back*/
  public stepBack() {
    if (this.step <= 0) {
      return
    } else {
      this.step -= 1;
      this.$validator.reset();
    }
    this.resetValues()
  }

  /*Navigate form-wizard forward*/
  public stepForward() {
    if (this.step >= 3) {
      return
    } else {
      this.step += 1;
    }
  }

  public resetValues() {
    this.existingEmailsList = []
    this.duplicateEmailsList = []
    this.uniqueRows = []
    this.invalidEmails = []
  }

  public prepareToSave() {
    this.isSaving = false
  }

  public checkForExistingRelations() {
    const self = this
    let emailIndex: any = this.mappings.findIndex(e => e.fieldName === 'email')
    this.emailIndex = self.mappings[emailIndex].rowIndex
    let queryP: any = ''
    return new Promise(resolve => {
      setTimeout(function () {
        let ind = 0
        self.uniqueRows.forEach((row, index) => {
          let email = row[self.mappings[emailIndex].rowIndex]
          if (ind < self.uniqueRows.length - 1) {
            if (email && self.validateEmail(email)) queryP += `"${email.trim()}",`
          } else {
            if (email && self.validateEmail(email)) queryP += `"${email.trim()}"`
          }
          ind++
        })
        const query = 'email=in=(' + queryP + ')'
        self.relationService.search(query).then((resp: AxiosResponse) => {
          if (resp) {
            resolve()
            if (resp.data.length > 0) {
              self.numberOfExisingEmails = resp.data.length
              resp.data.forEach((rel: any, ind: number) => {
                self.existingEmailsList[self.existingEmailsList.length] = rel
                if (ind <= resp.data.length - 1) {
                  self.prepareToSave()
                }
              })
            } else {
              self.numberOfExisingEmails = 0
              self.prepareToSave()
            }
          } else {
            self.isSaving = false
          }
        })
      }, 50)
    })
  }

  /*Handle Duplicate Emails in the file*/
  public removeDuplicates() {
    const self = this
    return new Promise(resolve => {
      let mapIndex: any = this.mappings.findIndex(e => e.fieldName === 'email')
      const eIndex = self.mappings[mapIndex].rowIndex
      const unique = self.rows.reduce((acc, current) => {
        const x = acc.find((item:any) => item && item[eIndex] && (item[eIndex] === current[eIndex] || item[eIndex] === ''));
        if (!x) {
          return acc.concat([current]);
        } else {
          return acc;
        }
      }, []);
      const duplicates = self.rows.filter(function(obj:any) { return unique.indexOf(obj) == -1; });
      this.duplicateEmailsList = duplicates
      this.duplicateEmailsFound = duplicates.length
      let finalUnique:any = []
      for(let i = 0; i < unique.length; i++){
        if(this.validateEmail(unique[i][eIndex])){
          if(unique[i][eIndex]) finalUnique.push(unique[i])
        } else {
          if(unique[i][eIndex]) this.invalidEmails.push(unique[i])
        }
      }
      this.uniqueRows=finalUnique
      resolve()
    })
  }

  /*Validate each step separately*/
  public validateStep() {
    this.isSaving = true
    let self = this
    return new Promise(resolve => {
      if (self.step === 0) {
        if (self.rows && self.rows.length > 0) {
          self.stepForward()
          self.isSaving = false
          resolve(true)
        } else {
          self.isSaving = false
          resolve(false)
        }
      } else if (self.step === 1) {
        self.hasEmailField = self.mappings.some(e => e.fieldName === 'email')
        if (self.mappings.length > 0 && self.hasEmailField) {
          self.isSaving = true
          setTimeout(function () {
            self.removeDuplicates().then(()=>{
              self.checkForExistingRelations().then(() => {
                resolve(true)
              })
            })
          },50)
        } else {
          resolve(false)
        }
      } else if (self.step === 2) {
        resolve(true)
      }
    })
  }

  /*When file is uploaded from step 1y*/
  public fileUploaded(obj: any) {
    this.headerRow = obj.rows[0]
    if (this.hasHeader) {
      obj.rows.shift()
    }
    this.rows = obj.rows
    this.file = obj.file
    this.duplicateEmailsFound = obj.duplicates
  }

  /*When file is removed from step 1y*/
  public fileRemoved(rows: any) {
    this.rows = []
    this.headerRow = []
  }

  /*Update the file configuration (hasHeader, delimiter, escChar)*/
  public updateStep1Config(config: any) {
    this.delimiter = config.csvDelimiter
    this.hasHeader = config.hasHeader
    this.escChar = config.csvEscChar
    if (config.hasHeader) {
      typeof this.rows[0] === 'string' ? this.headerRow = this.rows[0].split(',') : this.headerRow = this.rows[0]
      this.rows.shift()
    }
  }

  public filename() {
    if (this.file) {
      const fileSize = this.file.size / 1048576
      const size = this.file.size
      if (fileSize <= 2) {
        if (size < 1024) return this.file.name + ' (' + size + ' Bytes)'
        else if (size < 1048576) return this.file.name + ' (' + (size / 1024).toFixed(0) + ' KB)'
        else if (size < 1073741824) return this.file.name + ' (' + (size / 1048576).toFixed(1) + ' MB)'
        // return this.file.name + ' (' + Math.round(this.file.size / 1024) + ' kbyte)';
      } else {
        return this.file.name + ' (' + size + ' kbyte)'
      }
    } else {
      return ' '
    }
  }

  public groupChanged(group:any) {
    this.selectedGroup = group
  }

  public changeNewGroup(group:any) {
    this.newGroup = group
  }

  foundRows() {
    return (this.rows) ? this.rows.length : 0
  }
}
