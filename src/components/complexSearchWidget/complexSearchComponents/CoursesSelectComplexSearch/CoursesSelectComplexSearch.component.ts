import {mixins} from "vue-class-component";
import CommonHelpers from "@/shared/commonHelpers";
import {Component, Vue, Watch} from "vue-property-decorator";
import {ISearchableSelectConfig, SearchableSelectConfig} from "@/shared/models/SearchableSelectConfig";
import SearchableSelectComponent from "@/components/searchableSelect/searchableSelect.vue";

import flatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'
import {courseOperators} from "@/shared/complexSearchOperators";
import coursesService from "@/shared/services/coursesService";
@Component({
  components:{
    SearchableSelectComponent,
    flatPickr
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
  }
  @Watch('dateValue', {immediate: true, deep: true})
  public updateSearchValue(newVal:any){
    this.$emit('input', {attribute: this.selectedCourse, subAttribute: this.selectedEvent, operator: this.selectedOperator, value: newVal})
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
    debugger
    this.$emit('input', {attribute: this.selectedCourse, subAttribute: this.selectedEvent, operator: this.selectedOperator, value: this.dateValue})
  }
  public removeCourse(e:any){
    if(!e) return
    this.selectedCourse = null
    this.selectedEvent = null
    this.allEvents = []
    this.$emit('input', {attribute: this.selectedCourse, subAttribute: this.selectedEvent, operator: this.selectedOperator, value: this.dateValue})
  }

  public addCourseStep(e:any){
    if(!e) return
    this.selectedEvent = e
    this.$emit('input', {attribute: this.selectedCourse, subAttribute: this.selectedEvent, operator: this.selectedOperator, value: this.dateValue})
  }
  public removeCourseStep(e:any){
    if(!e) return
    this.selectedEvent = null
    this.$emit('input', {attribute: this.selectedCourse, subAttribute: this.selectedEvent, operator: this.selectedOperator, value: this.dateValue})
  }
  public addOperator(e:any){
    if(!e) return
    this.selectedOperator = e
    this.$emit('input', {attribute: this.selectedCourse, subAttribute: this.selectedEvent, operator: this.selectedOperator, value: this.dateValue})
  }
  public removeOperator(e:any){
    if(!e) return
    this.selectedOperator = null
    this.$emit('input', {attribute: this.selectedCourse, subAttribute: this.selectedEvent, operator: this.selectedOperator, value: this.dateValue})
  }
}
