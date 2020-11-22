import { Component, Vue } from 'vue-property-decorator'
import AdministrationService from '@/shared/services/administrationService'
import SimpleSearchComponent from '@/components/simpleSearch/simpleSearch.vue'
import PaginationTableComponent from '@/components/paginationTable/paginationTable.vue'
import { AxiosResponse } from 'axios'
import { mixins } from 'vue-class-component'
import CommonHelpers from '@/shared/commonHelpers'
@Component({
  components: {
    'simple-search': SimpleSearchComponent,
    PaginationTableComponent
  }
})
export default class AdministrationsComponent extends mixins(Vue, CommonHelpers) {
  $refs!: {
    paginationTable: PaginationTableComponent;
  }

  public administrationService: any
  public active: boolean
  constructor () {
    super()
    this.active = false
    this.administrationService = AdministrationService.getInstance()
  }
  public mounted(){
    this.active = true
  }
  public searchAdministration (query: any) {
    let fields: any[] = []
    if(parseInt(query) >= 0){
     fields = [{
        mainOperator: 'or',
        children: [{
          key: 'id',
          value: query,
          inBetweenOperator: '==',
          afterOperator: 'or',
          exactSearch: true
        }]
      }]
    } else {
      fields = [{
        mainOperator: 'or',
        children: [{
          key: 'accessCode',
          value: query,
          inBetweenOperator: '==',
          afterOperator: '',
          exactSearch: false
        }]
      },{
        mainOperator: 'or',
        children: [{
          key: 'name',
          value: query,
          inBetweenOperator: '==',
          afterOperator: '',
          exactSearch: false
        }]
      }]
    }
    const q: string = this.queryBuilder(fields)
    // @ts-ignore
    this.$refs.paginationTable.retrieveData('api/administrationms/api/administrations', undefined, q)
  }
  public editAdministration (tax: any) {
    this.$router.push({ name: 'EditAdministration', params: { id: tax.id } })
  }

  public removeAdministration (administration: any) {
    this.administrationService.delete(administration.id).then((resp: AxiosResponse) => {
      if (resp) {
        this.setAlert('administrationRemoved', 'success')
      } else {
        this.setAlert('administrationError', 'error')
      }
    })
  }
}
