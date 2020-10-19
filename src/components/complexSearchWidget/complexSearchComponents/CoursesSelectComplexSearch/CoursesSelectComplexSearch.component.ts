import {mixins} from "vue-class-component";
import CommonHelpers from "@/shared/commonHelpers";
import {Component, Vue, Watch} from "vue-property-decorator";
import {ISearchableSelectConfig, SearchableSelectConfig} from "@/shared/models/SearchableSelectConfig";
import SearchableSelectComponent from "@/components/searchableSelect/searchableSelect.vue";
import moment from 'moment'
import flatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'
import {courseOperators} from "@/shared/complexSearchOperators";
import coursesService from "@/shared/services/coursesService";
import {DATE_FORMAT, INSTANT_FORMAT} from "@/shared/filters";
@Component({
  components:{
    SearchableSelectComponent,
    flatPickr
  },
  props:{
    query: [Object,Array,String]
  }
})
export default class CoursesSelectComplexSearchComponent extends mixins(CommonHelpers, Vue) {
  public courseSingleSelectConfig: ISearchableSelectConfig
  public eventSingleSelectConfig: ISearchableSelectConfig
  public operatorsSingleSelectConfig: ISearchableSelectConfig
  public allEvents: any[]
  public allOperators: any[]
  public selectedCourse: any
  public selectedEvent: any
  public selectedOperator: any
  public courseService: any
  public dateConfig: any
  public dateValue: any
  public searchQuery: any
  public msName: any
  constructor() {
    super();
    this.courseSingleSelectConfig = new SearchableSelectConfig('label',
      'labels.selectCourse', '', false,
      false, false, false, false, false, true)
    this.eventSingleSelectConfig = new SearchableSelectConfig('label',
      'labels.selectEvent', '', false,
      false, false, false, false, false, true)
    this.operatorsSingleSelectConfig = new SearchableSelectConfig('label',
      'labels.selectOperator', '', false,
      false, false, false, false, false, true)
    this.courseService = coursesService.getInstance()
    this.allEvents = []
    this.selectedCourse = null
    this.selectedEvent = null
    this.selectedOperator = null
    this.allOperators = courseOperators
    this.dateConfig = {
      wrap: true,
      altInput: false,
      dateFormat: 'd-m-Y'
    }
    this.dateValue = null
    this.searchQuery = 'TODO'
    this.msName = 'PRODUCTMS'
  }
  @Watch('dateValue', {immediate: true, deep: true})
  public updateSearchValue(newVal:any){
    this.updateQuery()
  }
  public addCourse(e:any){
    if(!e) return
    this.selectedCourse = e
    const ind = this.$store.state.lookups.courses.findIndex((prod:any) => prod.value.id === e.value.id)
    if(ind > -1 && this.$store.state.lookups.courses[ind].value.events && this.$store.state.lookups.courses[ind].value.events.length) {
      let allEvents:any = []
      this.$store.state.lookups.courses[ind].value.events.forEach((event:any) => {
        allEvents.push({
          label: `${this.getMultiLangName(this.$store.state.lookups.courses[ind].value.courseLanguages).name}  [${this.getMultiLangName(event.eventLanguages).name}]`,
          value: event
        })
      })
      this.$set(this, 'allEvents', allEvents)
    } else {
      this.$set(this, 'allEvents', [])
    }
    this.updateQuery()
  }
  public removeCourse(e:any){
    if(!e) return
    this.selectedCourse = null
    this.selectedEvent = null
    this.allEvents = []
    this.updateQuery()
  }

  public addCourseStep(e:any){
    if(!e) return
    this.selectedEvent = e
    this.updateQuery()
  }
  public removeCourseStep(e:any){
    if(!e) return
    this.selectedEvent = null
    this.updateQuery()
  }
  public addOperator(e:any){
    if(!e) return
    this.selectedOperator = e
    this.updateQuery()
  }
  public removeOperator(e:any){
    if(!e) return
    this.selectedOperator = null
    this.updateQuery()

  }


  public updateQuery(){
    let operator = this.selectedOperator ? this.selectedOperator.id : null
    let value = this.dateValue
    let inOperator = true
      if(this.selectedOperator.labelValue === 'appliedfor') {
        if(this.selectedEvent && this.selectedEvent.value && this.selectedEvent.value.id)
        this.searchQuery = `event.id==${this.selectedEvent.value.id}`
      } else if(this.selectedOperator.labelValue === 'not_appliedfor') {
        inOperator = false
        if(this.selectedEvent && this.selectedEvent.value && this.selectedEvent.value.id)
        this.searchQuery = `event.id==${this.selectedEvent.value.id}`
      }
      else if(this.selectedOperator.labelValue === 'started_after' || this.selectedOperator.labelValue === 'started_before') {
        value = moment(this.dateValue, DATE_FORMAT).format(INSTANT_FORMAT)
        if(this.selectedEvent && this.selectedEvent.value && this.selectedEvent.value.id)
        this.searchQuery = `event.id==${this.selectedEvent.value.id} and event.eventStart${operator.replace('{k}', value)}`
      }
    this.$emit('input', {attribute: this.selectedCourse, subAttribute: this.selectedEvent, operator: this.selectedOperator, value: this.dateValue, msName: this.msName, searchQuery: this.searchQuery, inOperator: inOperator})
  }
}
