import { Component, Vue } from 'vue-property-decorator'
import SimpleSearchComponent from '@/components/simpleSearch/simpleSearch.vue'
import PaginationTableComponent from '@/components/paginationTable/paginationTable.vue'
import { AxiosResponse } from 'axios'
import HelpTagService from '@/shared/services/helpTagService'
@Component({
  components: {
    'simple-search': SimpleSearchComponent,
    PaginationTableComponent
  }
})
export default class HelpTagComponent extends Vue {
  $refs!: {
    paginationTable: PaginationTableComponent;
  }

  public helpTagService: any
  constructor () {
    super()
    this.helpTagService = HelpTagService.getInstance()
  }

  public searchHelpTag (q: string) {

  }

  public editHelpTag (tag: any) {
    this.$router.push({ name: 'EditHelpTag', params: { id: tag.id } })
  }

  public copyHelpTag (tag: any) {
    tag.id = undefined
    tag.helpTagLanguages.forEach((lang: any, ind: number) => {
      tag.helpTagLanguages[ind].id = undefined
      tag.helpTagLanguages[ind].name = tag.helpTagLanguages[ind].name + ' ' + this.$t('labels.copy')
      tag.helpTagLanguages[ind].intro = tag.helpTagLanguages[ind].intro + ' ' + this.$t('labels.copy')
    })
    this.helpTagService.post(tag).then((resp: AxiosResponse) => {
      if (resp) {
        // @ts-ignore
        this.$vueOnToast.pop('success', this.$t('toastMessages.helpTagCreated'))
        // @ts-ignore
        this.$refs.paginationTable.retrieveData()
      } else {
        // @ts-ignore
        this.$vueOnToast.pop('error', this.$t('toastMessages.helpTagError'))
      }
    })
  }

  public deleteHelpTag (tag: any) {
    this.helpTagService.delete(tag.id).then((resp: AxiosResponse) => {
      if (resp) {
        // @ts-ignore
        this.$vueOnToast.pop('success', this.$t('toastMessages.helpTagRemoved'))
        // @ts-ignore
        this.$refs.paginationTable.retrieveData()
      } else {
        // @ts-ignore
        this.$vueOnToast.pop('error', this.$t('toastMessages.helpTagError'))
      }
    })
  }
}
