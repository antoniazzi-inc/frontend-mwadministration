/*
 *
 *  * Copyright 2018-2021 Antoniazzi Holding BV
 *  *
 *  * This program is free software: you can redistribute it and/or modify it
 *  * under the terms of the GNU General Public License as published by
 *  * the Free Software Foundation, either version 3 of the License,
 *  * or (at your option) any later version.
 *  *
 *  * This program is distributed in the hope that it will be useful,
 *  * but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 *  * GNU General Public License for more details.
 *  *
 *  * You should have received a copy of the GNU General Public License
 *  * along with this program. If not, see <https://www.gnu.org/licenses/>.
 *
 */

import { Component, Vue } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import commonHelpers from '@/shared/commonHelpers'
import gravatarImg from 'vue-gravatar'
import AuthService from '@/shared/services/authService'
import { RelationEntity } from '@/shared/models/relationms/relationModel'
import flatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'
import moment from 'moment'
import { RelationProfile } from '@/shared/models/relationms/relation-profile.model'
import RelationService from '@/shared/services/relationService'
import { AxiosResponse } from 'axios'
import { MenuDefinitions } from '@/shared/menuDefinitions'
import { ISearchableSelectConfig, SearchableSelectConfig } from '@/shared/models/SearchableSelectConfig'
import SearchableSelectComponent from '@/components/searchableSelect/searchableSelect.vue'
import {DATE_FORMAT} from "@/shared/filters";

@Component({
  components: {
    'v-gravatar': gravatarImg,
    flatPickr,
    SearchableSelectComponent
  }
})

export default class MainNavBar extends mixins(commonHelpers, Vue) {
  public relationService = RelationService.getInstance()
  $refs!: {
    userProfileModal: HTMLElement;
  }

  public dateConfig: any;
  public user: any;
  public selectedTimeZone: any;
  public timeZones: any[];
  public changePassword: any;
  public birthDate: any;
  public searchableConfig: ISearchableSelectConfig;
  public showSearch: boolean;
  public searchString: string;
  public changePasswordChecked: boolean;
  public authService = AuthService.getInstance();
  constructor () {
    super()
    this.searchableConfig = new SearchableSelectConfig('code',
      'labels.timezone', '', false,
      false, false, false, false, false, true)
    this.searchString = ''
    this.changePasswordChecked = false
    this.showSearch = false
    this.selectedTimeZone = null
    this.birthDate = null
    this.relationService = RelationService.getInstance()
    this.user = new RelationEntity()

    this.timeZones = []
    this.changePassword = {
      password: '',
      newPassword: '',
      repeatPassword: ''
    }
    this.dateConfig = {
      wrap: false,
      altInput: false,
      dateFormat: 'd-m-Y',
      maxDate: moment().subtract(18, 'year').format(DATE_FORMAT)
    }
  }

  public mounted () {
    this.user = this.$store.state.userIdentity
    if (this.user && !this.user.relationProfile) {
      this.user.relationProfile = new RelationProfile()
    }
    this.timeZones = this.$store.state.lookups.timeZones
    // init this.recentItems from this.$store.state. ???
  }

  public mainMenu: object[] = MenuDefinitions

  public changeLanguage (item: string, ind: string) {
    this.$store.commit('currentLanguage', ind)
    this.$set(this.$i18n, 'locale', ind)
    // TODO send request to server to change language if needed
  }

  public recentItemPath(item: any) {
    // problem that some items (e.g. a group) do not have a dedicated url...
    switch (item.type) {
      case 'group':
        return '/relations-groups'
        break;
      case 'relation':
        return '/relations/edit/' + item.id
        break;
      case 'product':
        return '/products/edit/' + item.id
        break;
      case 'promotion':
        return '/promotions/edit/' + item.id
        break;
      case 'customfield':
        return '/relations-free-fields/new/' + item.id
        break;
      case 'tag':
        return '/home/settings'
        break;
      case 'category':
        return '/home/settings'
        break;
      case 'order':
        return '/orders'
        break;
    }
    return '/'
  }

  public loadUser () {
    const self = this
    this.relationService.get(this.user.id).then((resp: AxiosResponse) => {
      this.user = resp.data
      let zone: any = null
      if (resp.data.relationProfile.timeZoneId) {
        this.timeZones.forEach(timeZone => {
          if (timeZone.id === resp.data.relationProfile.timeZoneId) {
            zone = timeZone
          }
        })
        Vue.nextTick(function () {
          self.selectedTimeZone = zone
        })
      }
      this.$forceUpdate()
      Vue.nextTick(function () {
        resp.data.relationProfile && resp.data.relationProfile.birthDate
          ? self.birthDate = moment(resp.data.relationProfile.birthDate).format(DATE_FORMAT) : self.birthDate = null
      })
    })
  }

  public getUserName () {
    return this.getRelationFullName(this.$store.state.userIdentity)
  }

  public getUserRole () {
    const roles = this.$store.state.userIdentity?.roles ? this.$store.state.userIdentity.roles : []
    const roleNames: any = []
    roles.forEach((role: any) => {
      roleNames.push(role.name)
    })
    return roleNames.join(', ')
  }

  public logout () {
    this.authService.logout().then(resp => {
      this.$store.commit('logout')
      this.$router.push('/login')
    })
  }

  public doSearch () {
    alert(this.searchString)
  }

  public onChangePassword () {

  }

  public changeTimeZone (e: any) {
    if (!e) return
    this.selectedTimeZone = e
    this.user.relationProfile.timeZoneId = e.id
  }

  public changeTitle (e: any) {
    this.user.relationProfile.title = e.currentTarget.value
  }

  public removeTimeZone () {
    this.selectedTimeZone = null
  }

  public saveUserProfile () {
    this.user.relationProfile.birthDate = moment(this.birthDate, DATE_FORMAT).add(1, 'days').format('YYYY-MM-DD')
    if( this.user.relationProfile &&  this.user.relationProfile.birthDate === 'Invalid date'){
      this.user.relationProfile.birthDate = undefined
    }
    this.user.relationAddresses = undefined
    this.user.relationPhones = undefined
    this.user.contactHistories = undefined
    this.user.relationCustomFields = undefined
    this.relationService.put(this.user).then((resp: AxiosResponse) => {
      if (resp) {
        this.setAlert('userUpdated', 'success')
      } else {
        this.setAlert('userUpdateError', 'error')
      }
    })
  }
}
