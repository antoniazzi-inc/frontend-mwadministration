import { Component, Vue } from 'vue-property-decorator'
import PaginationTableComponent from '@/components/paginationTable/paginationTable.vue'
import { AxiosResponse } from 'axios'
import { mixins } from 'vue-class-component'
import CommonHelpers from '@/shared/commonHelpers'
import SimpleSearchComponent from '@/components/simpleSearch/simpleSearch.vue'
import SearchableSelectComponent from '@/components/searchableSelect/searchableSelect.vue'
import coursesService from "@/shared/services/coursesService";
import moment from "moment";
import flatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'

@Component({
  components: {
    PaginationTableComponent,
    'simple-search': SimpleSearchComponent,
    SearchableSelectComponent,
    flatPickr
  }
})
export default class CourseComponent extends mixins(CommonHelpers, Vue) {
  $refs!:{
    paginationTable: PaginationTableComponent
  }
  public courseService: any
  public active: boolean
  public eventStart: any
  public eventEnd: any
  public nameSearch: any

  public dateConfigEnd: any
  public dateConfigStart: any
  constructor () {
    super()
    this.active = true
    this.nameSearch = ''
    this.courseService = coursesService.getInstance()
    this.eventStart = moment().format('MM-DD-YYYY HH-MM')
    this.eventEnd = null

    this.dateConfigStart = {
      wrap: true,
      altInput: false,
      dateFormat: 'm-d-Y',
      timeFormat: 'HH-MM',
      enableTime: true,
      minDate: moment().format('MM-DD-YYYY')
    }
    this.dateConfigEnd = {
      wrap: true,
      altInput: false,
      dateFormat: 'm-d-Y',
      timeFormat: 'HH-MM',
      enableTime: true
    }
  }

  public mounted () {
  }

  public search () {
    const queryArray: any = []
    if (this.nameSearch !== '') {
      queryArray.push({
        mainOperator: 'and',
        children: [{
          key: 'courseLanguages.name',
          value: this.nameSearch,
          inBetweenOperator: '==',
          afterOperator: '',
          exactSearch: false
        }]
      })
    }
    /*if(this.eventStart !== null){
      queryArray.push({
        mainOperator: 'and',
        children: [{
          key: 'events.eventStart',
          value: this.eventStart,
          inBetweenOperator: '==',
          afterOperator: '',
          exactSearch: false
        }]
      })
    }
    if(this.eventEnd !== null){
      queryArray.push({
        mainOperator: 'and',
        children: [{
          key: 'events.eventEnd',
          value: this.eventEnd,
          inBetweenOperator: '==',
          afterOperator: '',
          exactSearch: false
        }]
      })
    }*/
    let finalQ = this.queryBuilder(queryArray)
    // @ts-ignore
    this.$refs.paginationTable.retrieveData('api/productms/api/courses', undefined, finalQ)
  }

  public clear () {
    this.eventStart = moment().format('MM-DD-YYYY')
    this.eventEnd = null
    this.nameSearch = ''
    // @ts-ignore
    this.$refs.paginationTable.retrieveData('api/productms/api/courses', undefined, undefined)
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
