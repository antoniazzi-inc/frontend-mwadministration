import { Component, Vue } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import commonHelpers from '@/shared/commonHelpers'
import gravatarImg from 'vue-gravatar'
import AuthService from '@/shared/services/authService'
import { RelationEntity } from '@/shared/models/relationModel'
import flatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'
import moment from 'moment'
import { RelationProfile } from '@/shared/models/relation-profile.model'
import RelationService from '@/shared/services/relationService'
import { AxiosResponse } from 'axios'
import { MenuDefinitions } from '@/shared/menuDefinitions'
@Component({
  components: {
    'v-gravatar': gravatarImg,
    flatPickr
  }
})
export default class MainNavBar extends mixins(commonHelpers, Vue) {
  public relationService = RelationService.getInstance()
  $refs!: {
    userProfileModal: HTMLElement;
  }

  public dateConfig: any;
  public user: any;
  public timeZones: any[];
  public changePassword: any;
  public searchString: string;
  public changePasswordChecked: boolean;
  public authService = AuthService.getInstance();
  constructor () {
    super()
    this.searchString = ''
    this.changePasswordChecked = false
    this.user = new RelationEntity()

    this.timeZones = []
    this.changePassword = {
      password: '',
      newPassword: '',
      repeatPassword: ''
    }
    this.dateConfig = {
      wrap: true,
      altInput: false,
      dateFormat: 'd-m-Y',
      minDate: moment(new Date()).subtract(18, 'year').format('YYYY-MM-DD')
    }
  }

  public mounted () {
    this.user = this.$store.state.userIdentity
    this.user.relationProfile.birthDate = this.user.relationProfile.birthDate ?
      moment(this.user.relationProfile.birthDate).format('YYYY-MM-DD') : null
    if (this.user && !this.user.relationProfile) {
      this.user.relationProfile = new RelationProfile()
    }
    this.timeZones = this.$store.state.lookups.timeZones
  }

  public mainMenu: object[] = MenuDefinitions

  public changeLanguage (item: string, ind: string) {
    this.$store.commit('currentLanguage', ind)
    this.$set(this.$i18n, 'locale', ind)
    // TODO send request to server to change language if needed
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
    this.user.relationProfile.timeZoneId = e.currentTarget.value
  }

  public changeTitle (e: any) {
    this.user.relationProfile.title = e.currentTarget.value
  }

  public getTitles () {
    return ['Mr.', 'Ms.', 'Mrs.']
  }

  public saveUserProfile () {
    this.user.relationProfile.birthDate = moment(this.user.relationProfile.birthDate)
    this.relationService.put(this.user).then((resp: AxiosResponse) => {
      if (resp) {
        this.setAlert('userUpdated', 'success')
      } else {
        this.setAlert('userUpdateError', 'error')
      }
    })
  }
}
