import { Component, Vue } from 'vue-property-decorator'
import SimpleSearchComponent from '@/components/simpleSearch/simpleSearch.vue'
import PaginationTableComponent from '@/components/paginationTable/paginationTable.vue'
import HelpMaterialService from '@/shared/services/helpMaterialService'
import {AxiosResponse} from "axios";
@Component({
  components: {
    'simple-search': SimpleSearchComponent,
    PaginationTableComponent
  }
})
export default class HelpMaterialComponent extends Vue {
  $refs!:{
    paginationTable: PaginationTableComponent
  }
  public helpMaterialService: any
  constructor () {
    super()
    this.helpMaterialService = HelpMaterialService.getInstance()
  }

  public editHelp (help: any) {
    this.$router.push({name: 'EditHelpMaterial', params: {id: help.id}})
  }
  public copyHelp (help:any) {
    let self = this;
    help.id = undefined
    help.helpContentLanguages.forEach((lang:any, ind:number)=>{
      help.helpContentLanguages[ind].id = undefined
      help.helpContentLanguages[ind].version = undefined
      help.helpContentLanguages[ind].name += ` ${self.$t('labels.copy')}`
      help.helpContentLanguages[ind].intro += ` ${self.$t('labels.copy')}`
    })
    this.helpMaterialService.post(help).then((resp:AxiosResponse)=>{
      if (resp) {
        // @ts-ignore
        this.$refs.paginationTable.retrieveData()
        // @ts-ignore
        this.$vueOnToast.pop('success', this.$t('toastMessages.helpMaterialCreated'))
      } else {
        // @ts-ignore
        this.$vueOnToast.pop('error', this.$t('toastMessages.helpMaterialError'))
      }
    })
  }
  public deleteHelp (help:any) {
    this.helpMaterialService.delete(help.id).then((resp:AxiosResponse)=>{
      if (resp) {
        // @ts-ignore
        this.$refs.paginationTable.retrieveData()
        // @ts-ignore
        this.$vueOnToast.pop('success', this.$t('toastMessages.helpMaterialRemoved'))
      } else {
        // @ts-ignore
        this.$vueOnToast.pop('error', this.$t('toastMessages.helpMaterialError'))
      }
    })
  }
}
