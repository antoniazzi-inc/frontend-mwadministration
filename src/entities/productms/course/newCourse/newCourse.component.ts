import {Component, Vue} from 'vue-property-decorator'
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

@Component({
  components: {
    Trumbowyg,
    MultiLanguageComponent,
    flatPickr,
    Money,
    ToggleSwitch
  },
  beforeRouteEnter (to, from, next) {
    next((vm: any) => {
      if (to.params.id) {
        vm.populateCourse(to.params.id)
      }
    })
  }
})
export default class NewCourseComponent extends mixins(CommonHelpers, Vue) {
  public courseService: any
  public editorConfig: any
  public totalReservedSeats: number
  public showHtmlEditor: boolean
  public isSaving: boolean
  public editReservations: boolean
  public unlimitedSeats: boolean
  public backToProducts: boolean
  public editEvent: boolean
  public eventStart: any
  public moneyConfig: IMoneyConfig
  public eventEnd: any
  public dateConfigEnd: any
  public dateConfigStart: any
  public course: ICourse
  public selectedEvent: IEvent
  public multiLangConfigCourse: IMultiLanguageConfig
  public multiLangConfig: IMultiLanguageConfig

  constructor() {
    super()
    this.courseService = coursesService.getInstance()
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
    this.eventStart = moment().format('MM-DD-YYYY')
    this.eventEnd = null
    this.dateConfigStart = {
      wrap: true,
      altInput: false,
      dateFormat: 'm-d-Y',
      minDate: moment().format('MM-DD-YYYY')
    }
    this.dateConfigEnd = {
      wrap: true,
      altInput: false,
      dateFormat: 'm-d-Y',
    }
    this.course = new Course()
    this.selectedEvent = new Event()
    this.totalReservedSeats = 0
    this.moneyConfig = new MoneyConfig(',', '.', '', Store.state.currency, 2, false)
    this.showHtmlEditor = false
    this.isSaving = false
    this.unlimitedSeats = false
    this.backToProducts = false
    this.editEvent = false
    this.editReservations = false
    this.multiLangConfigCourse = new MultiLanguageConfig(true, true,
      'labels.courseName', 'labels.courseDescription', false,
      false, false, true, true, false)
    this.multiLangConfig = new MultiLanguageConfig(true, true,
      'labels.eventName', 'labels.eventDescription', false,
      false, false, true, true, false)
  }

  public mounted() {
  }
  public populateCourse(id:any) {
    this.isSaving = true
    this.courseService.get(id).then((resp:AxiosResponse)=>{
      if(resp && resp.data) {
        this.course = resp.data
      } else {
        this.setAlert('somethingWentWrnog', 'error')
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

  public editCurrentEvent(item: any) {
  }

  public addNewEvent(item: any) {
    this.selectedEvent = new Event();
    this.editEvent = true;
  }

  public cancelNewEvent(item: any) {
    this.editEvent = false;
    this.selectedEvent = new Event();
  }

  public saveNewEvent() {
    this.editEvent = false;
    this.selectedEvent.eventStart = moment(this.eventStart);
    this.selectedEvent.eventEnd = moment(this.eventEnd);
    if (this.course && this.course.events && this.course.events.length > 0) {
      this.course.events.push(this.selectedEvent);
    } else {
      this.course.events = [this.selectedEvent];
    }
  }

  public previousState() {
    this.$router.push('/courses');
  }

  public fillSeats() {
  }

  public sendMail() {
  }

  public deleteFromWaitingList() {
  }

  public assignSeats() {
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
}
