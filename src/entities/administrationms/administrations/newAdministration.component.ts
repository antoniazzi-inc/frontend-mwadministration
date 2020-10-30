import { Component, Vue } from 'vue-property-decorator'
import SearchableSelectComponent from '@/components/searchableSelect/searchableSelect.vue'
import { mixins } from 'vue-class-component'
import CommonHelpers from '@/shared/commonHelpers'
import flatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'
import { AxiosResponse } from 'axios'
import { ICountry } from '@/shared/models/administrationms/country.model'
import ToggleSwitch from '@/components/toggleSwitch/toggleSwitch.vue'
import { SearchableSelectConfig } from '@/shared/models/SearchableSelectConfig'
import { AdministrationEntity, IAdministration } from '@/shared/models/administrationms/administrationModel'
import AdministrationService from '@/shared/services/administrationService'
import moment from 'moment'
import { tag } from '@/shared/tabelsDefinitions'
import { IRelationEntity, RelationEntity } from '@/shared/models/relationms/relationModel'
import { AdministrationBusiness } from '@/shared/models/administrationms/administration-business.model'

@Component({
  components: {
    SearchableSelectComponent,
    flatPickr,
    ToggleSwitch
  },
  beforeRouteEnter (to, from, next) {
    next((vm: any) => {
      if (to.params.id) {
        vm.retrieveItem(to.params.id)
      }
    })
  }
})
export default class NewAdministrationComponent extends mixins(CommonHelpers, Vue) {
  public administration: IAdministration;
  public administrationUser: IRelationEntity;
  public countries: ICountry[];
  public searchableConfig: any;
  public administrationService: any;
  public validFromConfig: any;
  public validToConfig: any;
  public validFrom: any;
  public validTo: any;
  public searchableConfigLang: any;
  public selectedLanguage: any;
  public allLanguages: any;

  constructor () {
    super()
    this.administration = new AdministrationEntity()
    this.selectedLanguage = {}
    this.administrationUser = new RelationEntity()
    this.administration.validFrom = moment()
    this.administrationService = AdministrationService.getInstance()
    this.countries = []
    this.allLanguages = []
    this.searchableConfigLang = new SearchableSelectConfig('label',
      'labels.language', '', true,
      false, true, false, false)
    this.searchableConfig = new SearchableSelectConfig('enName',
      'labels.country', '', true,
      false, true, false, false)
    this.validFromConfig = {
      wrap: true,
      altInput: false,
      dateFormat: 'd-m-Y'
    }
    this.validToConfig = {
      wrap: true,
      altInput: false,
      dateFormat: 'd-m-Y',
      minDate: ''
    }
    this.validFrom = new Date()
    this.validTo = null
  }

  public mounted () {
    this.administration.administrationBusiness = new AdministrationBusiness()
    for (const key in this.$store.state.languages) {
      if (this.$store.state.languages.hasOwnProperty(key)) {
        this.allLanguages.push({
          label: this.$store.state.languages[key].name,
          value: key
        })
      }
    }
  }

  public retrieveItem (id: number) {
    if(!id) return
    this.administrationService.get(id).then((resp: AxiosResponse) => {
      this.administration = resp.data
    })
  }

  public cancel () {
    this.$router.go(-1)
  }

  public async save () {
    this.$validator.validateAll().then(success => {
      if (success && this.selectedLanguage && this.selectedLanguage.value && this.administration.country && this.administration.country.id) {
        this.administration.langKey = this.selectedLanguage.value
        const dto = {
          administration: this.administration,
          relation: this.administrationUser
        }
        if (this.administration.id) {
          // todo handle proper edit
          /* this.administrationService.put(dto).then((resp: AxiosResponse) => {
            if (resp) {
              this.setAlert('administrationUpdated', 'success')
            } else {
              this.setAlert('administrationError', 'error')
            }
          }) */
        } else {
          this.administrationService.createAdministration(dto).then((resp: AxiosResponse) => {
            if (resp) {
              this.setAlert('administrationCreated', 'success')
            } else {
              this.setAlert('administrationError', 'error')
            }
          })
        }
      } else {
        this.setAlert('fillRequiredFields', 'error')
      }
    })
  }

  public async countryChanged (country: any) {
    this.administration.country = country
  }

  public async removeCountry (country: any) {
    this.administration.country = undefined
  }

  public async langChanged (lang: any) {
    this.selectedLanguage = lang
  }

  public async langRemoved (lang: any) {
    this.selectedLanguage = undefined
  }

  public validateUrl () {
    if (this.administration.administrationBusiness?.website && !this.$validator.errors.has('Company-Website')) {
      this.administration.administrationBusiness.website =
        this.checkForUrlHttps(this.administration.administrationBusiness.website)
    }
  }
}
