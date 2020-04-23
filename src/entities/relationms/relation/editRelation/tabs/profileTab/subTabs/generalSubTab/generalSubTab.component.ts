import { mixins } from 'vue-class-component'
import CommonHelpers from '@/shared/commonHelpers'
import { Component, Vue, Watch } from 'vue-property-decorator'
import RelationService from '@/shared/services/relationService'
import { IRelationProfile, RelationProfile } from '@/shared/models/relation-profile.model'
import { IRelationEntity, RelationEntity} from '@/shared/models/relationModel'
import { ICategoryEntity } from '@/shared/models/categoryModel'
import { ISearchableSelectConfig, SearchableSelectConfig } from '@/shared/models/SearchableSelectConfig'
import SearchableSelectComponent from '@/components/searchableSelect/searchableSelect.vue'
import moment from 'moment'
import flatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'
import ToggleSwitch from '@/components/toggleSwitch/toggleSwitch.vue'
import { AxiosResponse } from 'axios'
@Component({
  components: {
    SearchableSelectComponent,
    flatPickr,
    ToggleSwitch
  },
  props: {
    rel: Object,
    active: Boolean
  }
})
export default class GeneralSubTabComponent extends mixins(Vue, CommonHelpers) {
  public currentTab: string
  public relationService: any
  public dateConfig: any
  public birthDate:any
  public allLanguages: any[]
  public relationProfile: IRelationProfile
  public relation: IRelationEntity
  public relationCategory: ICategoryEntity|null
  public searchableConfigCat: ISearchableSelectConfig
  constructor () {
    super()
    this.birthDate = null
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
      wrap: false,
      altInput: false,
      dateFormat: 'd-m-Y',
      maxDate: moment().subtract(18, 'year').format('d-m-YYYY')
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

  @Watch('rel', { immediate: true, deep: true })
  public updateRelation (newVal: any) {
    this.relation = newVal
    this.relationProfile = newVal.relationProfile
    this.getSelectedCategory(newVal.relationProfile ? newVal.relationProfile.categoryId : null)
    if(newVal.relationProfile && newVal.relationProfile.birthDate) {
      let self = this;
      Vue.nextTick(function () {
        self.birthDate = moment(self.relationProfile.birthDate).format('DD-MM-YYYY')
      })
    }
  }

  public getSelectedCategory (categoryId:any) {
    if(!categoryId) return
    let result:any = null
    let self= this
    this.$store.state.lookups.categories.forEach((cat: any) => {
      if (cat.id === self.relationProfile.categoryId) {
        result = cat
      }
    })
    if (result !== null) {
      Vue.nextTick(function () {
        self.relationCategory = result
      })
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
    this.$router.push({ name: 'Relations' })
  }

  public saveRelation () {
    let self = this;
    this.$validator.validateAll().then(result => {
      if (result) {
        let dto = this.relation
        if (dto && dto.relationProfile && this.birthDate) {
          dto.relationProfile.birthDate = moment(this.birthDate)
        }
        console.log(dto.relationProfile?.birthDate)
        if (self.relationCategory && self.relationCategory.id) {
         if(dto && dto.relationProfile) dto.relationProfile.categoryId = self.relationCategory.id
        }
        this.relationService.put(dto).then((resp: AxiosResponse) => {
          if (resp) {
            this.$emit('updateRel', resp.data)
            this.setAlert('relationUpdated', 'success')
          } else {
            this.setAlert('relationUpdateError', 'error')
          }
        })
      }
    })
  }

  public validateUrl () {
    if (this.relationProfile.website && !this.$validator.errors.has('website')) { this.relationProfile.website = this.checkForUrlHttps(this.relationProfile.website) }
  }
}
