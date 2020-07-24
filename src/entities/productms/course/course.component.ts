import { Component, Vue } from 'vue-property-decorator'
import PaginationTableComponent from '@/components/paginationTable/paginationTable.vue'
import { AxiosResponse } from 'axios'
import { mixins } from 'vue-class-component'
import CommonHelpers from '@/shared/commonHelpers'
import SimpleSearchComponent from '@/components/simpleSearch/simpleSearch.vue'
import { ISearchableSelectConfig, SearchableSelectConfig } from '@/shared/models/SearchableSelectConfig'
import SearchableSelectComponent from '@/components/searchableSelect/searchableSelect.vue'
import coursesService from "@/shared/services/coursesService";

@Component({
  components: {
    PaginationTableComponent,
    'simple-search': SimpleSearchComponent,
    SearchableSelectComponent
  }
})
export default class CourseComponent extends mixins(CommonHelpers, Vue) {
  public courseService: any
  public active: boolean
  constructor () {
    super()
    this.active = true
    this.courseService = coursesService.getInstance()
  }

  public mounted () {
  }

  public simpleSearch () {
  }

  public clear () {

  }

  public editCourse (prod: any) {
    this.$router.push({ name: 'EditCourse', params: { id: prod.id } })
  }

  public deleteCourse (prod: any) {
    this.active = false
    if (prod.id) {
      this.courseService.delete(prod.id).then((resp: AxiosResponse) => {
        this.active = true
        if (resp) {
          this.setAlert('courseRemoved', 'success')
        } else {
          this.setAlert('courseRemoveError', 'error')
        }
      })
    }
  }
}
