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
import {Course} from "@/shared/models/CourseModel";
import {Language} from "@/shared/models/language.model";
import {Event} from "@/shared/models/event.model";

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
    this.eventStart =null
    this.eventEnd = null
    this.dateConfigStart = {
      wrap: true,
      altInput: false,
      dateFormat: 'm-d-Y H:i',
      timeFormat: 'H:i',
      enableTime: true,
      time_24hr: true,
      minDate: null
    }
    this.dateConfigEnd = {
      wrap: true,
      altInput: false,
      dateFormat: 'm-d-Y H:i',
      timeFormat: 'H:i',
      enableTime: true,
      time_24hr: true
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
    if(this.eventStart !== null){
      queryArray.push({
        mainOperator: 'and',
        children: [{
          key: 'events.eventStart',
          value: moment(this.eventStart).format('YYYY-MM-DDTHH:mm:ss') + 'Z',
          inBetweenOperator: '>=',
          afterOperator: '',
          exactSearch: true
        }]
      })
    }
    if(this.eventEnd !== null){
      queryArray.push({
        mainOperator: 'and',
        children: [{
          key: 'events.eventEnd',
          value: moment(this.eventEnd).format('YYYY-MM-DDTHH:mm:ss') + 'Z',
          inBetweenOperator: '<=',
          afterOperator: '',
          exactSearch: true
        }]
      })
    }
    let finalQ = this.queryBuilder(queryArray)
    // @ts-ignore
    this.$refs.paginationTable.retrieveData('api/productms/api/courses', undefined, finalQ)
  }

  public clear () {
    this.eventStart = null
    this.eventEnd = null
    this.nameSearch = ''
    // @ts-ignore
    this.$refs.paginationTable.retrieveData('api/productms/api/courses', undefined, undefined)
  }

  public editCourse (prod: any) {
    this.$router.push({ name: 'EditCourse', params: { id: prod.id } })
  }
  public copyCourse (course: any) {
    const courseLangs = course.courseLanguages.map((lang:any)=>{
      const name = `${this.$t('labels.copy')} ${lang.name}`
      return new Language(undefined, undefined, lang.langKey, undefined, name, lang.description,
        undefined, undefined, undefined, undefined, undefined)
    })
    const courseEvents = course.events.map((item:any)=>{
      let langs = item.eventLanguages.map((lang:any) => {
        return new Language(undefined, undefined, lang.langKey, undefined, lang.name, lang.description,
          undefined, undefined, undefined, undefined, undefined)
      })
      return new Event(undefined, undefined, item.latitude, item.longitude, item.seats,
        item.eventStart, item.eventEnd, item.price, undefined, undefined, undefined, langs,
        undefined, [])
    })
    let dto = new Course(undefined, undefined, undefined, undefined, undefined,
      course.pageContentJson, courseLangs, courseEvents)
    this.courseService.post(dto).then((resp:AxiosResponse)=>{
      if(resp && resp.data) {
        this.setAlert('courseCopied', 'success')
        this.clear()
      } else {
        this.setAlert('courseCopyError', 'error')
      }
    })
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
