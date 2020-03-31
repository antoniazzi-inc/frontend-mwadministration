import { mixins } from 'vue-class-component'
import CommonHelpers from '@/shared/commonHelpers'
import {Component, Vue, Watch} from 'vue-property-decorator'
import {Company, ICompany} from "@/shared/models/company.model";
import {IRelationEntity} from "@/shared/models/relationModel";
import {ISearchableSelectConfig, SearchableSelectConfig} from "@/shared/models/SearchableSelectConfig";
import SearchableSelectComponent from "@/components/searchableSelect/searchableSelect.vue";

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
  public addNewCompany: boolean
  public searchableConfigCompany: ISearchableSelectConfig
  public companies:ICompany[]
  public companyToEdit: ICompany|null
  constructor () {
    super()
    this.currentTab = 'profile'
    this.companies = []
    this.companyToEdit = new Company()
    this.editMode = false
    this.addNewCompany = false
    this.searchableConfigCompany = new SearchableSelectConfig('name',
      'labels.company', 'buttons.addNewCompany', false,
      true, true, false, false)
  }

  @Watch('rel', {immediate:true, deep: true})
  public updateCompanies(rel:IRelationEntity){
    if(rel.companies && rel.companies.length) this.companies = rel.companies
  }

  public editCompany(company:ICompany, index: number){
    this.companyToEdit = JSON.parse(JSON.stringify(company))
    this.editMode = true
    this.addNewCompany = false
  }

  public deleteCompany(company:ICompany){}

  public companyChanged(company:ICompany){
    this.companyToEdit = company
  }

  public companyRemoved(company:ICompany){
    this.companyToEdit = null
  }

  public getCompanyAddress(company:ICompany){
    let result:any = ''
    if(company && company.companyAddresses && company.companyAddresses.length) {
      result = this.extractAddress(company.companyAddresses)
    }
    return result
  }

  public getCompanyPhone(company:ICompany){
    let result:any = ''
    if(company && company.companyPhones && company.companyPhones.length) {
      result = company.companyPhones[0].number
    }
    return result
  }

  public onAddCompany (){
    this.companyToEdit = new Company()
    this.editMode = true
    this.addNewCompany = true
  }

  public createNewCompany (){
    this.companyToEdit = new Company()
    this.editMode = false
    this.addNewCompany = true
  }

  public saveCompany (){}
}
