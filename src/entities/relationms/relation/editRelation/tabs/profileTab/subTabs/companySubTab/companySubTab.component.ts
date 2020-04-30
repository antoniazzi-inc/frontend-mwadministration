import { mixins } from 'vue-class-component'
import CommonHelpers from '@/shared/commonHelpers'
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Company, ICompany } from '@/shared/models/company.model'
import { IRelationEntity, RelationEntity } from '@/shared/models/relationModel'
import { ISearchableSelectConfig, SearchableSelectConfig } from '@/shared/models/SearchableSelectConfig'
import SearchableSelectComponent from '@/components/searchableSelect/searchableSelect.vue'
import validateVat, { CountryCodes, ViesValidationResponse } from 'validate-vat-ts'
import { PhoneType } from '@/shared/models/company-phone.model'
import { Country, ICountry } from '@/shared/models/country.model'
import CompanyService from '@/shared/services/companyService'
import { AxiosResponse } from 'axios'
import RelationService from '@/shared/services/relationService'

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
  $refs!: {
    deleteModalCompany: HTMLElement;
  }

  public currentTab: string
  public editMode: boolean
  public phoneTypes: any
  public addNewCompany: boolean
  public companyService: any
  public relationService: any
  public companyToDelete: any
  public administrationBusiness: any
  public searchableConfigCountry: ISearchableSelectConfig
  public searchableConfigCompany: ISearchableSelectConfig
  public companies: ICompany[]
  public vatError: any
  public relationCopy: IRelationEntity
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
    this.companyToDelete = null
    this.phoneTypes = {
      home: PhoneType.HOME,
      work: PhoneType.WORK,
      mobile: PhoneType.MOBILE
    }
    this.editMode = false
    this.selectedCountry = new Country()
    this.vatError = ''
    this.addNewCompany = false
    this.searchableConfigCompany = new SearchableSelectConfig('name',
      'labels.company', 'buttons.addNewCompany', false,
      true, true, false, false)
    this.searchableConfigCountry = new SearchableSelectConfig('enName',
      'labels.country', '', false,
      false, false, false, false)
  }

  public mounted () {

  }

  @Watch('rel', { immediate: true, deep: true })
  public updateCompanies (rel: IRelationEntity) {
    if (rel) {
      this.relationCopy = rel
    }
    if (rel.companies && rel.companies.length) {
      this.companies = rel.companies
    } else {
      this.companies = []
    }
  }

  public editCompany (company: ICompany, index: number) {
    this.companyToEdit = JSON.parse(JSON.stringify(company))
    this.editMode = true
    this.addNewCompany = true
  }

  public deleteCompany (company: ICompany) {
    this.companyToDelete = company
  }

  public companyChanged (company: ICompany) {
    this.companyToEdit = company
  }

  public async companyRemoveConfirmed () {
    const self = this
    if (this.companyToDelete.id && this.relationCopy.companies) {
      const companies = JSON.parse(JSON.stringify(this.relationCopy.companies))
      this.relationCopy.companies = undefined
      this.closeDeleteModal()
      const newComp = await companies.filter(function (value: any, index: any, arr: any) {
        return value.id !== self.companyToDelete.id
      })
      if (newComp) {
        this.relationCopy.companies = newComp
      } else {
        this.relationCopy.companies = undefined
      }
      this.relationService.put(this.relationCopy).then((resp: AxiosResponse) => {
        if (resp) {
          this.setAlert('companyRemoved', 'success')
          this.$emit('updateRel')
        } else {
          this.setAlert('companyRemoveError', 'error')
        }
      })
    }
  }

  public companyRemoved () {
    this.companyToEdit = new Company()
  }

  public closeDeleteModal () {
    // @ts-ignore
    $(this.$refs.deleteModalCompany).modal('hide')
  }

  public getCompanyAddress (company: ICompany) {
    let result: any = ''
    if (company) {
      const address = company.addressStreet ? company.addressStreet : ''
      const number = company.addressHouseNumber ? company.addressHouseNumber : ''
      const city = company.city ? company.city : ''
      const postal = company.postalCode ? company.postalCode : ''
      const country = company.countryId ? this.getCountryById(company.countryId) : ''
      result = `${address} ${number} ${city} ${postal} ${country} `
    }
    return result
  }

  public getCompanyPhone (company: ICompany) {
    let result: any = ''
    if (company && company.phoneNumber) {
      result = company.phoneNumber
    }
    return result
  }

  public onAddCompany () {
    this.companyToEdit = new Company()
    this.companyToEdit.phoneType = PhoneType.OTHER
    this.editMode = true
    this.addNewCompany = true
  }

  public createNewCompany () {
    this.companyToEdit = new Company()
    this.editMode = false
    this.addNewCompany = true
    this.selectedCountry = this.preselectCountry()
    this.companyToEdit.countryId = this.selectedCountry.id
  }

  public async validateVat () {
    try {
      if (this.companyToEdit.vatNumber != null) {
        // @ts-ignore
        const country: CountryCodes = this.selectedCountry.enName ? CountryCodes[this.selectedCountry.enName] : CountryCodes.Netherlands
        const validationInfo: ViesValidationResponse = await validateVat(country, this.companyToEdit.vatNumber)
        if (validationInfo.valid) {
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
    if (this.companyToEdit.website && !this.$validator.errors.has('company-website')) {
      this.companyToEdit.website = this.checkForUrlHttps(this.companyToEdit.website)
    }
  }

  public saveCompany () {
    this.$validator.validateAll().then((resp: boolean) => {
      if (resp && (this.vatError === '' || this.companyToEdit.vatNumber === '')) {
        this.vatError = ''
        this.companyToEdit.business = {
          id: this.$store.state.lookups.administrationBusiness[0].id,
          version: this.$store.state.lookups.administrationBusiness[0].version
        }
        this.companyToEdit.alias = this.companyToEdit.name
        if (this.companyToEdit.id) {
          this.companyService.put(this.companyToEdit).then((resp: AxiosResponse) => {
            if (resp) {
              this.setAlert('companyUpdated', 'success')
              this.$emit('updateRel', this.relationCopy)
              this.cancelNewComp()
            } else {
              this.setAlert('companyUpdateError', 'error')
            }
          })
        } else {
          this.companyService.post(this.companyToEdit).then((resp: AxiosResponse) => {
            if (resp) {
              this.saveRelationCompany(resp.data)
            } else {
              this.setAlert('companyCreateError', 'error')
            }
          })
        }
      } else {
        this.setAlert('fillRequiredFields', 'error')
      }
    })
  }

  public countryChanged (country: any) {
    if (country) {
      this.selectedCountry = country
      this.companyToEdit.countryId = country.id
    }
  }

  public countryRemoved (country: any) {
    this.selectedCountry = null
    this.companyToEdit.countryId = undefined
  }

  public saveRelationCompany (company?: any) {
    if (this.relationCopy.companies && this.relationCopy.companies.length) {
      this.relationCopy.companies.push({ id: company.id, version: company.version })
    } else {
      this.relationCopy.companies = [{ id: company.id, version: company.version }]
    }
    const dto = this.relationCopy
    this.relationService.put(dto).then((resp: AxiosResponse) => {
      if (resp) {
        this.setAlert('companyCreated', 'success')
        this.cancelNewComp()
        this.$emit('updateRel', resp.data)
      } else {
        this.setAlert('companyCreateError', 'error')
      }
    })
  }

  public cancelNewComp () {
    this.editMode = false
    this.addNewCompany = false
    this.companyToEdit = new Company()
  }
}
