import { Component, Vue } from 'vue-property-decorator'
import SimpleSearchComponent from '@/components/simpleSearch/simpleSearch.vue'
import PaginationTableComponent from '@/components/paginationTable/paginationTable.vue'
import { AxiosResponse } from 'axios'
import HelpCategoryService from '@/shared/services/helpCategoryService'
@Component({
  components: {
    'simple-search': SimpleSearchComponent,
    PaginationTableComponent
  }
})
export default class HelpCategoryComponent extends Vue {
  $refs!: {
    paginationTable: PaginationTableComponent;
  }

  public helpCategoryService = HelpCategoryService.getInstance()
  constructor () {
    super()
  }

  public mounted () {
    this.retrieveData()
  }

  public retrieveData () {

  }

  public resetHelpCategory () {}
  public searchHelpCategory (query: string) {}
  public editHelpCategory (cat: any) {
    this.$router.push({ name: 'EditHelpCategory', params: { id: cat.id } })
  }

  /* public copyHelpCategory(cat:any){
    cat.id = undefined
    cat.version = undefined
    cat.createdOn = undefined
    cat.updatedOn = undefined
    cat.helpCategoryLanguages.forEach((lang:any, ind:number)=>{
      cat.helpCategoryLanguages[ind].id = undefined
      cat.helpCategoryLanguages[ind].version = undefined
      cat.helpCategoryLanguages[ind].createdOn = undefined
      cat.helpCategoryLanguages[ind].updatedOn = undefined
    })
    let parent = {
      id: cat.parent ? cat.parent.id : undefined,
      version: cat.parent ? cat.parent.version : undefined
    }
    cat.parent = parent
    let childrens:any = []
    cat.children.forEach((child:any, ind:any)=>{
      childrens.push({
        id: child.id,
        version: child.version
      })
    })
    cat.children = childrens
    this.helpCategoryService.post(cat).then((resp:AxiosResponse) => {
      if(resp){
        // @ts-ignore
        this.$vueOnToast.pop('success', this.$t('toastMessages.helpCategoryCreated'))
        // @ts-ignore
        this.$refs.paginationTable.retrieveData()
      } else {
        // @ts-ignore
        this.$vueOnToast.pop('error', this.$t('toastMessages.helpCategoryError'))
      }
    })
  } */
  public deleteHelpCategory (cat: any) {
    this.helpCategoryService.delete(cat.id).then((resp: AxiosResponse) => {
      if (resp) {
        // @ts-ignore
        this.$vueOnToast.pop('success', this.$t('toastMessages.helpCategoryRemoved'))
        // @ts-ignore
        this.$refs.paginationTable.retrieveData()
      } else {
        // @ts-ignore
        this.$vueOnToast.pop('error', this.$t('toastMessages.helpCategoryRemoved'))
      }
    })
  }
}
