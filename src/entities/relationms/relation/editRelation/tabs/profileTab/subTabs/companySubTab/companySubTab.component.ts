import {mixins} from 'vue-class-component'
import CommonHelpers from '@/shared/commonHelpers'
import {Component, Vue, Watch} from 'vue-property-decorator'
import {Company, ICompany} from '@/shared/models/company.model'
import {IRelationEntity, RelationEntity} from '@/shared/models/relationModel'
import {ISearchableSelectConfig, SearchableSelectConfig} from '@/shared/models/SearchableSelectConfig'
import SearchableSelectComponent from '@/components/searchableSelect/searchableSelect.vue'
import validateVat, {CountryCodes, ViesValidationResponse} from 'validate-vat-ts';
import {CompanyPhone, ICompanyPhone, PhoneType} from "@/shared/models/company-phone.model";
import {CompanyAddress, ICompanyAddress} from "@/shared/models/company-address.model";
import {Country, ICountry} from "@/shared/models/country.model";
import CompanyService from "@/shared/services/companyService";
import {AxiosResponse} from "axios";
import RelationService from "@/shared/services/relationService";

@Component({
  components: {
    SearchableSelectComponent
  },
  props: {
    rel: Object,
    active: Boolean
  }
})
export default class CompanySubTabComponent extends mixins(Vue, CommonHelpers) {
  public currentTab: string
  public editMode: boolean
  public phoneTypes: any
  public addNewCompany: boolean
  public companyService: any
  public relationService: any
  public administrationBusiness: any
  public searchableConfigCountry: ISearchableSelectConfig
  public searchableConfigCompany: ISearchableSelectConfig
  public companies: ICompany[]
  public vatError: any
  public relationCopy: IRelationEntity
  public phone: ICompanyPhone
  public address: ICompanyAddress
  public companyToEdit: ICompany
  public selectedCountry: ICountry|null
  constructor () {
    super()
    this.relationCopy = new RelationEntity()
    this.companyService = CompanyService.getInstance()
    this.relationService = RelationService.getInstance()
    this.currentTab = 'profile'
    this.companies = []
    this.administrationBusiness = null
    this.companyToEdit = new Company()
    this.phoneTypes = {
      home: PhoneType.HOME,
      work: PhoneType.WORK,
      mobile: PhoneType.MOBILE,
    }
    this.editMode = false
    this.selectedCountry = new Country()
    this.address = new CompanyAddress()
    this.phone = {
      phoneType: PhoneType.HOME,
      number: ''
    }
    this.vatError = ''
    this.addNewCompany = false
    this.searchableConfigCompany = new SearchableSelectConfig('name',
      'labels.company', 'buttons.addNewCompany', false,
      true, true, false, false)
    this.searchableConfigCountry = new SearchableSelectConfig('enName',
      'labels.country', '', false,
      false, false, false, false)
  }
  public mounted(){

  }
  @Watch('rel', { immediate: true, deep: true })
  public updateCompanies (rel: IRelationEntity) {
    if(rel){
      this.relationCopy = rel
    }
    if (rel.companies && rel.companies.length) {
      this.companies = rel.companies
    }
  }

  public editCompany (company: ICompany, index: number) {
    this.companyToEdit = JSON.parse(JSON.stringify(company))
    this.editMode = true
    this.addNewCompany = false
  }

  public deleteCompany (company: ICompany) {}

  public companyChanged (company: ICompany) {
    this.companyToEdit = company
  }

  public companyRemoved (company: ICompany) {
    this.companyToEdit = new Company()
  }

  public getCompanyAddress (company: ICompany) {
    let result: any = ''
    if (company && company.companyAddresses && company.companyAddresses.length) {
      result = this.extractAddress(company.companyAddresses)
    }
    return result
  }

  public getCompanyPhone (company: ICompany) {
    let result: any = ''
    if (company && company.companyPhones && company.companyPhones.length) {
      result = company.companyPhones[0].number
    }
    return result
  }

  public onAddCompany () {
    this.companyToEdit = new Company()
    this.editMode = true
    this.addNewCompany = true
  }

  public createNewCompany () {
    this.companyToEdit = new Company()
    this.phone = new CompanyPhone(undefined, undefined, undefined, undefined, PhoneType.HOME)
    this.address = new CompanyAddress()
    this.editMode = false
    this.addNewCompany = true
    this.selectedCountry = this.preselectCountry()
    this.address.countryId = this.selectedCountry.id
  }

  public async validateVat () {
    try {
      if (this.companyToEdit.vatNumber != null) {
        //@ts-ignore
        let country:CountryCodes = this.selectedCountry.enName ? CountryCodes[this.selectedCountry.enName] : CountryCodes.Netherlands
        const validationInfo: ViesValidationResponse = await validateVat(country, this.companyToEdit.vatNumber);
        if(validationInfo.valid){
          this.vatError = ''
        } else {
          this.vatError = this.$t('labels.vatNumberNotValid')
        }
      }
    } catch (e) {
      this.vatError = e
    }
  }

  public urlValidate () {
    if(this.companyToEdit.website && !this.$validator.errors.has('company-website')){
      this.companyToEdit.website = this.checkForUrlHttps(this.companyToEdit.website)
    }
  }
  public saveCompany () {
    this.$validator.validateAll().then((resp:boolean)=>{
      if(resp && (this.vatError === '' || this.companyToEdit.vatNumber === '')) {
        this.vatError = ''
        this.companyToEdit.companyPhones = [this.phone]
        this.companyToEdit.companyAddresses = [this.address]
        this.companyToEdit.business = {
          id: this.$store.state.lookups.administrationBusiness[0].id,
          version: this.$store.state.lookups.administrationBusiness[0].version
        }
        this.companyToEdit.alias = this.companyToEdit.name
        this.companyService.post(this.companyToEdit).then((resp:AxiosResponse)=>{
          if(resp) {
            this.saveRelationCompany(resp.data)
          } else {
            this.setAlert('companyCreateError', 'error')
          }
        })
      } else {
        this.setAlert('fillRequiredFields', 'error')
      }
    })
  }
  public countryChanged (country:any) {
    if(country){
      this.selectedCountry = country
      this.address.countryId = country.id
    }
  }
  public countryRemoved (country:any) {
    this.selectedCountry = null
    this.address.countryId = undefined
  }
  public saveRelationCompany (company?:any) {
    if(this.relationCopy.companies && this.relationCopy.companies.length){
      this.relationCopy.companies.push(company)
    } else {
      this.relationCopy.companies = [company]
    }
    this.relationService.put(this.relationCopy).then((resp:AxiosResponse)=>{
      if(resp){
        this.setAlert('companyCreated', 'success')
        this.cancelNewComp()
        this.$emit('updateRel', resp.data)
      } else {
        this.setAlert('companyCreateError', 'error')
      }
    })
  }

  public cancelNewComp () {
    this.editMode = false;
    this.addNewCompany = false
    this.companyToEdit = new Company()
  }
}
