import { Component, Vue } from 'vue-property-decorator'
import SearchableSelectComponent from '@/components/searchableSelect/searchableSelect.vue'
import { mixins } from 'vue-class-component'
import CommonHelpers from '@/shared/commonHelpers'
import flatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'
import { AxiosResponse } from 'axios'
import { IRegion, Region } from '@/shared/models/region.model'
import { ICountry } from '@/shared/models/country.model'
import ToggleSwitch from '@/components/toggleSwitch/toggleSwitch.vue'
import { SearchableSelectConfig } from '@/shared/models/SearchableSelectConfig'
import RegionService from '@/shared/services/regionService'
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
export default class NewRegionComponent extends mixins(CommonHelpers, Vue) {
  public region: IRegion
  public countries: ICountry[]
  public searchableConfig: any
  public regionService: any
  constructor () {
    super()
    this.region = new Region()
    this.regionService = RegionService.getInstance()
    this.countries = []
    this.searchableConfig = new SearchableSelectConfig('enName',
      'labels.country', '', true,
      false, true, true, false)
  }

  public mounted () {
  }

  public retrieveItem (id: number) {
    this.regionService.get(id).then((resp: AxiosResponse) => {
      this.region = resp.data
      const countriesJSON = JSON.parse(resp.data.countriesJson)
      this.countries = countriesJSON.countries
    })
  }

  public cancel () {
    this.$router.go(-1)
  }

  public async save () {
    this.$validator.validateAll().then(success => {
      if (success && this.countries && this.countries.length > 0) {
        this.region.countriesJson = JSON.stringify({ countries: this.countries })
        if (this.region.id) {
          this.regionService.put(this.region).then((resp: AxiosResponse) => {
            if (resp) {
              this.setAlert('regionUpdated', 'success')
            } else {
              this.setAlert('regionError', 'error')
            }
          })
        } else {
          this.regionService.post(this.region).then((resp: AxiosResponse) => {
            if (resp) {
              this.setAlert('regionCreated', 'success')
            } else {
              this.setAlert('regionError', 'error')
            }
          })
        }
      } else {
        this.setAlert('fillRequiredFields', 'error')
      }
    })
  }

  public async countryChanged (country: any) {
    this.countries = country
  }

  public async removeCountry (country: any) {
    let index = null
    this.countries.forEach((selectedCountry, ind) => {
      if (selectedCountry.id === country.id) index = ind
    })
    if (index !== null) { this.countries.splice(index, 1) }
  }
}
