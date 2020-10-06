import { Component, Vue } from 'vue-property-decorator'
import SimpleSearchComponent from '@/components/simpleSearch/simpleSearch.vue'
import PaginationTableComponent from '@/components/paginationTable/paginationTable.vue'
import HelpMaterialService from '@/shared/services/helpMaterialService'
import { AxiosResponse } from 'axios'
import { mixins } from 'vue-class-component'
import CommonHelpers from '@/shared/commonHelpers'
@Component({
  components: {
    'simple-search': SimpleSearchComponent,
    PaginationTableComponent
  }
})
export default class HelpMaterialComponent extends mixins(Vue, CommonHelpers) {
  $refs!: {
    paginationTable: PaginationTableComponent;
  }
  public active:boolean
  public helpMaterialService: any
  constructor () {
    super()
    this.active = false
    this.helpMaterialService = HelpMaterialService.getInstance()
  }
  public mounted(){
    this.active = true
  }
  public editHelp (help: any) {
    this.$router.push({ name: 'EditHelpMaterial', params: { id: help.id } })
  }

  public copyHelp (help: any) {
    const self = this
    help.id = undefined
    help.helpContentLanguages.forEach((lang: any, ind: number) => {
      help.helpContentLanguages[ind].id = undefined
      help.helpContentLanguages[ind].version = undefined
      help.helpContentLanguages[ind].name += ` ${self.$t('labels.copy')}`
      help.helpContentLanguages[ind].intro += ` ${self.$t('labels.copy')}`
    })
    this.helpMaterialService.post(help).then((resp: AxiosResponse) => {
      if (resp) {
        this.setAlert('helpMaterialCreated', 'success')
      } else {
        this.setAlert('helpMaterialError', 'error')
      }
    })
  }

  public deleteHelp (help: any) {
    this.helpMaterialService.delete(help.id).then((resp: AxiosResponse) => {
      if (resp) {
        this.setAlert('helpMaterialRemoved', 'success')
      } else {
        this.setAlert('helpMaterialError', 'error')
      }
    })
  }
}
