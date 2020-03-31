import { mixins } from 'vue-class-component'
import CommonHelpers from '@/shared/commonHelpers'
import {Component, Vue, Watch} from 'vue-property-decorator'
import RelationService from '@/shared/services/relationService'
import { IRelationProfile, RelationProfile } from '@/shared/models/relation-profile.model'
import { IRelationEntity, RelationEntity } from '@/shared/models/relationModel'
import { ICategoryEntity } from '@/shared/models/categoryModel'
import { ISearchableSelectConfig, SearchableSelectConfig } from '@/shared/models/SearchableSelectConfig'
import SearchableSelectComponent from '@/components/searchableSelect/searchableSelect.vue'
import moment from 'moment'
import flatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'
import ToggleSwitch from '@/components/toggleSwitch/toggleSwitch.vue'
import {AxiosResponse} from "axios";
@Component({
  components: {
    SearchableSelectComponent,
    flatPickr,
    ToggleSwitch
  },
  props: {
    rel: Object
  }
})
export default class GeneralSubTabComponent extends mixins(Vue, CommonHelpers) {
  public currentTab: string
  public relationService: any
  public dateConfig: any
  public allLanguages: any[]
  public relationProfile: IRelationProfile
  public relation: IRelationEntity
  public relationCategory: ICategoryEntity|null
  public searchableConfigCat: ISearchableSelectConfig
  constructor () {
    super()
    this.currentTab = 'profile'
    this.relationProfile = new RelationProfile()
    this.relation = new RelationEntity()
    this.relationCategory = null
    this.allLanguages = []
    this.searchableConfigCat = new SearchableSelectConfig('code',
      'labels.category', '', false,
      false, true, false, false)
    this.relationService = RelationService.getInstance()
    this.dateConfig = {
      wrap: true,
      altInput: false,
      dateFormat: 'd-m-Y',
      minDate: moment(new Date()).subtract(18, 'year')
    }
  }

  public mounted () {
    for (const key in this.$store.state.languages) {
      if (this.$store.state.languages.hasOwnProperty(key)) {
        this.allLanguages.push({
          label: this.$store.state.languages[key].name,
          value: key
        })
      }
    }
  }
  @Watch('rel',  {immediate: true, deep: true} )
  public updateRelation (newVal:any) {
    if(!newVal || !newVal.relationProfile) return
    this.relation = JSON.parse(JSON.stringify(newVal))
    this.relationProfile = JSON.parse(JSON.stringify(newVal.relationProfile))
   if(this.relationProfile.categoryId) this.getSelectedCategory()
  }

  public getSelectedCategory () {
    let result = null
    this.$store.state.lookups.categories.forEach((cat:any)=>{
      if(cat.id === this.relationProfile.categoryId){
        result = cat
      }
    })
    if(result !== null){
      this.relationCategory = result
    }
  }
  public categoryRemoved (cat: any) {
    this.relationCategory = null
  }

  public categoryUpdated (cat: any) {
    this.relationCategory = cat
  }

  public resetRel () {
    this.relationProfile = this.$props.rel.relationProfile
    this.relation = this.$props.rel
  }

  public goBack () {
    this.$router.push({name: 'Relations'})
  }

  public saveRelation () {
    this.$validator.validateAll().then(result=>{
      if(result){
        let dto = new RelationEntity()
        dto = this.relation;
        dto.relationProfile = this.relationProfile
        if(this.relationProfile.birthDate) dto.relationProfile.birthDate = moment(this.relationProfile.birthDate)
        if(this.relationCategory && this.relationCategory.id){
          dto.relationProfile.categoryId = this.relationCategory.id
        }
        this.relationService.put(dto).then((resp:AxiosResponse)=>{
          if (resp) {
            this.setAlert('relationUpdated', 'success')
          } else {
            this.setAlert('relationUpdateError', 'error')
          }
        })
      }
    })
  }
  public validateUrl(){
    if(this.relationProfile.website && !this.$validator.errors.has('website'))
      this.relationProfile.website = this.checkForUrlHttps(this.relationProfile.website)
  }
}
