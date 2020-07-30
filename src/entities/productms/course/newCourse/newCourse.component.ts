import {Component, Vue, Watch} from 'vue-property-decorator'
import {mixins} from 'vue-class-component'
import CommonHelpers from '@/shared/commonHelpers'
import coursesService from "@/shared/services/coursesService";
import {Course, ICourse} from "@/shared/models/CourseModel";
import {IMultiLanguageConfig, MultiLanguageConfig} from "@/shared/models/MultiLanguageConfig";
import Trumbowyg from 'vue-trumbowyg'
import 'trumbowyg/dist/ui/trumbowyg.css'
import 'trumbowyg/dist/plugins/colors/trumbowyg.colors'
import flatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'
import 'trumbowyg/dist/plugins/colors/ui/trumbowyg.colors.css'
import {Event, IEvent} from "@/shared/models/event.model";
import MultiLanguageComponent from "@/components/multiLanguage/MultiLanguage.vue";
import moment from "moment";
import {Money} from 'v-money'
import ToggleSwitch from "@/components/toggleSwitch/toggleSwitch.vue";
import {IMoneyConfig, MoneyConfig} from "@/shared/models/moneyConfig";
import Store from "@/store";
import {AxiosResponse} from "axios";
import eventsService from "@/shared/services/eventsService";
import {ISearchableSelectConfig, SearchableSelectConfig} from "@/shared/models/SearchableSelectConfig";
import SearchableSelectComponent from "@/components/searchableSelect/searchableSelect.vue";
import RelationService from "@/shared/services/relationService";
import {EventReservation, ReservationStatus} from "@/shared/models/eventReservation.model";
import eventReservationService from "@/shared/services/eventReservation";

@Component({
  props: {
    courseId: {
      type: Number,
      required: false
    }
  },
  components: {
    Trumbowyg,
    MultiLanguageComponent,
    flatPickr,
    Money,
    ToggleSwitch,
    SearchableSelectComponent
  },
  beforeRouteEnter(to, from, next) {
    next((vm: any) => {
      if (to.query.backToProducts && to.query.backToProducts == "true") {
        vm.backToProducts = true
      }
      if (to.params.id) {
        vm.populateCourse(to.params.id)
      }
    })
  }
})
export default class NewCourseComponent extends mixins(CommonHelpers, Vue) {
  public relationService: any
  public courseService: any
  public editorConfig: any
  public totalReservedSeats: number
  public selectedRowIndex: number | null
  public showHtmlEditor: boolean
  public isSaving: boolean
  public editReservations: boolean
  public unlimitedSeats: boolean
  public backToProducts: boolean
  public editEvent: boolean
  public editWaitingList: boolean
  public eventStart: any
  public eventReservationService: any
  public multiSelectConfig: ISearchableSelectConfig
  public moneyConfig: IMoneyConfig
  public eventEnd: any
  public eventsService: any
  public dateConfigEnd: any
  public allRelations: any[]
  public selectedWaitingList: any[]
  public selectedRelations: any[]
  public dateConfigStart: any
  public timer: any
  public course: ICourse
  public selectedEvent: IEvent
  public multiLangConfigCourse: IMultiLanguageConfig
  public multiLangConfig: IMultiLanguageConfig

  constructor() {
    super()
    this.courseService = coursesService.getInstance()
    this.eventsService = eventsService.getInstance()
    this.relationService = RelationService.getInstance()
    this.allRelations = []
    this.selectedWaitingList = []
    this.selectedRelations = []
    this.editorConfig = {
      btnsAdd: ['foreColor', 'backColor'],
      btns: [
        ['viewHTML'],
        ['undo', 'redo'],
        ['formatting'],
        ['strong', 'em', 'del'],
        ['superscript', 'subscript'],
        ['link'],
        ['insertImage'],
        ['justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull'],
        ['unorderedList', 'orderedList'],
        ['horizontalRule'],
        ['removeformat'],
        ['foreColor'], ['backColor'],
        ['fullscreen']
      ]
    }
    this.eventStart = moment().format('MM-DD-YYYY HH:mm')
    this.eventEnd = moment().format('MM-DD-YYYY HH:mm')

    this.multiSelectConfig = new SearchableSelectConfig('email',
      'labels.selectRelations', 'labels.createNewField', true,
      false, true, true, false);
    this.dateConfigStart = {
      wrap: true,
      altInput: false,
      dateFormat: 'm-d-Y H:i',
      timeFormat: 'H:i',
      enableTime: true,
      time_24hr: true,
      minDate: moment().format('MM-DD-YYYY HH:mm')
    }
    this.dateConfigEnd = {
      wrap: true,
      altInput: false,
      dateFormat: 'm-d-Y H:i',
      timeFormat: 'H:i',
      enableTime: true,
      time_24hr: true
    }
    this.course = new Course(undefined, undefined, undefined, undefined, undefined,
      undefined, [])
    this.selectedEvent = new Event()
    this.totalReservedSeats = 0
    this.timer = null
    this.selectedRowIndex = null
    this.moneyConfig = new MoneyConfig(',', '.', '', Store.state.currency, 2, false)
    this.showHtmlEditor = false
    this.isSaving = false
    this.unlimitedSeats = false
    this.backToProducts = false
    this.editWaitingList = false
    this.eventReservationService = eventReservationService.getInstance()
    this.editEvent = false
    this.editReservations = false
    this.multiLangConfigCourse = new MultiLanguageConfig(true, true,
      'labels.courseName', 'labels.courseDescription', false,
      false, false, true, true, false)
    this.multiLangConfig = new MultiLanguageConfig(true, true,
      'labels.eventName', 'labels.eventDescription', false,
      false, false, true, true, false)
  }
  public mounted(){
    this.selectedEvent.eventLanguages = []
  }
  @Watch('courseId', {immediate: true, deep: true})
  public initCourse(newVal: any) {
    if (newVal) {
      this.populateCourse(newVal)
    }
  }

  @Watch('eventStart', {immediate: true, deep: true})
  public updateEventStart(newVal: any) {
    this.$set(this.dateConfigEnd, 'minDate', newVal)
    this.eventEnd = newVal
  }

  public populateCourse(id: any) {
    this.isSaving = true
    this.populateRelations()
    this.courseService.get(id).then((resp: AxiosResponse) => {
      if (resp && resp.data) {
        this.course = resp.data
      } else {
        this.setAlert('somethingWentWrnog', 'error')
      }
    })
  }
  public populateRelations(query?: any) {
    const pagination = {
      page: 0,
      size: 100000,
      sort: 'id,asc'
    }
    this.relationService.getAll(pagination, query).then((resp: AxiosResponse) => {
      if (resp && resp.data) {
        this.allRelations = resp.data.content
      }
    })
  }

  public save() {
    this.course.pageContentJson = ''
    this.course.createdOn = moment(this.course.createdOn, 'YYYY-MM-DDTHH:mm')
    this.course.updatedOn = moment(this.course.updatedOn, 'YYYY-MM-DDTHH:mm')
    this.course.pageContentJson = JSON.stringify(
      {
        htmlContent: this.course.pageContentJson
      });
    if (this.course.id) {
      this.courseService.put(this.course).then((resp: AxiosResponse) => {
        if (resp && resp.data) {
          this.isSaving = false
          this.setAlert('courseEdited', 'success')
          this.$router.push('/courses')
        } else {
          this.setAlert('courseEditError', 'error')
        }
      });
    } else {
      this.courseService.post(this.course).then((resp: AxiosResponse) => {
        if (resp && resp.data) {
          this.isSaving = false
          this.setAlert('courseCreated', 'success')
          if (this.backToProducts) {
            this.$router.push('/products/new?local=true')
          } else {
            this.$router.push('/courses')
          }
        } else {
          this.setAlert('courseCreateError', 'error')
        }
      });
    }
  }

  public addNewLangCourse(lang: any) {
    const newLang: any = {
      name: '',
      description: '',
      langKey: lang
    }
    if (this.course && this.course.courseLanguages) {
      this.course.courseLanguages.push(newLang)
    } else {
      this.course.courseLanguages = [newLang]
    }
  }

  public updateLangCourse(lang: any) {
    let index = null
    if (this.course.courseLanguages && this.course.courseLanguages.length) {
      $.each(this.course.courseLanguages, function (k, v) {
        if (v.langKey === lang.langKey) {
          index = k
        }
      })
      if (index !== null) {
        this.course.courseLanguages[index] = lang
      } else {
        this.course.courseLanguages.push(lang)
      }
    }
  }

  public removeCourseLanguage(lang: any) {
    let index = null
    if (this.course.courseLanguages) {
      this.course.courseLanguages.forEach((language: any, ind: number) => {
        if (language.langKey === lang.langKey) {
          index = ind
        }
      })
    }
    if (index !== null && this.course.courseLanguages) {
      this.course.courseLanguages.splice(index, 1)
    }
  }

  public addNewEventLang(lang: any) {
    const newLang: any = {
      name: '',
      description: '',
      langKey: lang
    }
    if (this.selectedEvent && this.selectedEvent.eventLanguages) {
      this.selectedEvent.eventLanguages.push(newLang)
    } else {
      this.selectedEvent.eventLanguages = [newLang]
    }
  }

  public updateEventLang(lang: any) {
    let index = null
    if (this.selectedEvent.eventLanguages && this.selectedEvent.eventLanguages.length) {
      $.each(this.selectedEvent.eventLanguages, function (k, v) {
        if (v.langKey === lang.langKey) {
          index = k
        }
      })
      if (index !== null) {
        this.selectedEvent.eventLanguages[index] = lang
      } else {
        this.selectedEvent.eventLanguages.push(lang)
      }
    }
  }

  public removeEventLang(lang: any) {
    let index = null
    if (this.selectedEvent.eventLanguages) {
      this.selectedEvent.eventLanguages.forEach((language: any, ind: number) => {
        if (language.langKey === lang.langKey) {
          index = ind
        }
      })
    }
    if (index !== null && this.selectedEvent.eventLanguages) {
      this.selectedEvent.eventLanguages.splice(index, 1)
    }
  }

  public getLocation(item: any) {
    return 'Amsterdam, Netherlands';
  }

  public editCurrentEvent(item: any, index: any) {
    this.selectedEvent = item
    this.totalReservedSeats = item.seats
    this.editEvent = true
  }

  public removeCurrentEvent(item: any, index: any) {
    this.selectedEvent = new Event()
    this.selectedEvent.eventLanguages = []
    if (this.course && this.course.events) {
      let event: IEvent = this.course.events[index]
      if (event.id) {
        this.eventsService.delete(event.id).than((resp: AxiosResponse) => {
          if (resp) {
            this.setAlert('eventRemoved', 'success')
            if (this.course && this.course.events) this.course.events.splice(index, 1)
          } else {
            this.setAlert('eventRemoveError', 'error')
          }
        })
      } else {
        this.course.events.splice(index, 1)
        this.setAlert('eventRemoved', 'success')
      }
    }
  }

  public addNewEvent(item: any) {
    this.selectedEvent = new Event();
    this.selectedEvent.eventLanguages = []
    this.totalReservedSeats = item.seats ? item.seats : 0
    this.editEvent = true;
  }

  public cancelNewEvent(item: any) {
    this.editEvent = false;
    this.selectedEvent = new Event();
    this.selectedEvent.eventLanguages = []
  }

  public saveNewEvent() {
    this.editEvent = false;
    this.selectedEvent.eventStart = moment(this.eventStart);
    this.selectedEvent.eventEnd = moment(this.eventEnd);
    if (this.course && this.course.events && this.course.events.length) {
      this.course.events.push(this.selectedEvent);
    } else {
      this.course.events = [this.selectedEvent];
    }
  }

  public previousState() {
    this.$router.go(-1);
  }

  public fillSeats() {
    let allReservations:any = []
    this.selectedRelations.forEach(e=>{
      allReservations.push(new EventReservation(undefined, undefined, undefined,undefined,
        undefined,true, e.id, ReservationStatus.OCCUPIED,{id: this.selectedEvent.id, version:
      this.selectedEvent.version}))
    })
    if(this.selectedEvent.eventReservations) {this.selectedEvent.eventReservations.push(allReservations)}else{
      this.selectedEvent.eventReservations = allReservations
    }
    this.eventReservationService.createMultiple(allReservations).then((resp:AxiosResponse) => {
      if(resp && resp === "success"){
        this.setAlert('reservationsAdded', 'success')
        this.populateCourse(this.course.id)
      } else {
        this.setAlert('reservationsAddError', 'error')
      }
    })
  }

  public sendMail() {
  }

  public deleteFromWaitingList() {
  }

  public assignSeats() {
  }

  public toggleWaitingList(item: any) {
    if (this.editWaitingList) {
      this.editWaitingList = false
      this.selectedEvent = new Event()
      this.selectedEvent.eventLanguages = []
    } else {
      this.selectedEvent = item
      this.editWaitingList = true
    }
  }

  public toggleReservations(item: any) {
    if (this.editReservations) {
      this.editReservations = false
      this.selectedEvent = new Event()
      this.selectedEvent.eventLanguages = []
    } else {
      this.selectedEvent = item
      this.editReservations = true
    }
  }

  public selectRow(item: any, index: number) {
    this.selectedEvent = item
    this.selectedRowIndex = index
  }

  public getEventDate(item: any) {
    let result = ''
    if (item.eventStart) {
      result = moment(item.eventStart).format('MM/DD/YYYY HH:mm')
    }
    if (item.eventEnd) {
      result += ` - ${moment(item.eventEnd).format('HH:mm')}`
    }
    return result
  }

  public getSeatsProgress() {
    let total = 0;
    if (this.selectedEvent && this.selectedEvent) {
      const seats = this.selectedEvent.seats ? this.selectedEvent.seats : 0
      total = (this.totalReservedSeats / seats) * 100;
      if (total > 100) {
        total = 100;
      }
    }
    return total + '%';
  }

  public relationsChanged(rel: any) {
    this.selectedRelations = rel
  }

  public removeRelation(rel: any) {
    let index = this.selectedRelations.indexOf((r: any) => {
      r.id === rel.id
    })
    if (index > -1) {
      this.selectedRelations.splice(index, 1)
    }
  }

  public doSearch(rel: any) {
    if(!rel){
      return
    }
    const queryArray: any = []
    queryArray.push({
        mainOperator: 'or',
        children: [{
          key: 'email',
          value: rel,
          inBetweenOperator: '==',
          afterOperator: 'or',
          exactSearch: false
        }]
      },
      {
        mainOperator: 'or',
        children: [{
          key: 'relationProfile.firstName',
          value: rel,
          inBetweenOperator: '==',
          afterOperator: 'or',
          exactSearch: false
        }]
      })
    let finalQ = this.queryBuilder(queryArray)
    this.populateRelations(finalQ)
  }

  public searchRelation(rel: any) {
    const self = this
    if (this.timer) clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      self.doSearch(rel)
    }, 500);
  }
  public getRelationEmail(item: any) {
    const index = this.allRelations.indexOf((e:any)=>{
      item.relationId === e.id
    })
    if(index > -1){
      return this.allRelations[index].email
    } else {
      let result = 'asd'
      this.relationService.get(item.relationId).then((resp:AxiosResponse)=>{
        if(resp && resp.data){
          result = resp.data.email
        }
      })
      return result
    }
  }
}
