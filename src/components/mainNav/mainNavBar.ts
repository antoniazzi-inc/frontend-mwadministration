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
      minDate: moment(new Date()).subtract(18, 'year')
    }
  }

  public mounted () {
    this.user = this.$store.state.userIdentity
    if (this.user && !this.user.relationProfile) {
      this.user.relationProfile = new RelationProfile()
    }
    this.timeZones = this.$store.state.lookups.timeZones
  }

  public mainMenu: object[] = [
    {
      name: 'labels.relations',
      authorities: [],
      icon: 'main-menu-icon fas fa-user-tie',
      path: '/relations',
      children: [{
        name: 'labels.dashboard',
        icon: '',
        path: '/relations-dashboard'
      }, {
        name: 'labels.relations',
        icon: '',
        path: '/relations'
      }, {
        name: 'labels.groups',
        icon: '',
        path: '/relations-groups'
      }, {
        name: 'labels.import',
        icon: '',
        path: '/relations-import'
      }, {
        name: 'labels.freeFields',
        icon: '',
        path: '/relations-free-fields'
      }, {
        name: 'labels.reporting',
        icon: '',
        path: '/relations-reporting'
      }]
    }, {
      name: 'labels.actions',
      authorities: [],
      icon: 'main-menu-icon fas fa-comments',
      path: '/actions-dashboard',
      children: [{
        name: 'labels.dashboard',
        icon: '',
        path: '/actions-dashboard'
      },
      {
        name: 'labels.listManagers',
        icon: '',
        path: '/actions-list-managers'
      },
      {
        name: 'labels.mailings',
        icon: '',
        path: '/actions-mailings'
      },
      {
        name: 'labels.workflows',
        icon: '',
        path: '/actions-workflows'
      },
      {
        name: 'labels.courses',
        icon: '',
        path: '/actions-courses'
      },
      {
        name: 'labels.reporting',
        icon: '',
        path: '/actions-reporting'
      }]
    }, {
      name: 'labels.content',
      authorities: [],
      icon: 'main-menu-icon fa fa-envelope',
      path: '/content-email-texts',
      children: [{
        name: 'labels.emailTexts',
        icon: '',
        path: '/content-email-texts'
      },
      {
        name: 'labels.landingPages',
        icon: '',
        path: '/content-landing-pages'
      },
      {
        name: 'labels.contentItems',
        icon: '',
        path: '/content-content-items'
      },
      {
        name: 'labels.contentRules',
        icon: '',
        path: '/content-content-rules'
      },
      {
        name: 'labels.screenTexts',
        icon: '',
        path: '/content-screen-texts'
      }]
    }, {
      name: 'labels.products',
      authorities: [],
      icon: 'main-menu-icon os-icon os-icon-shopping-cart',
      path: '/products',
      children: [{
        name: 'labels.dashboard',
        icon: '',
        path: '/products-dashboard'
      },
      {
        name: 'labels.products',
        icon: '',
        path: '/products'
      },
      {
        name: 'labels.promotions',
        icon: '',
        path: '/products/promotions'
      },
      {
        name: 'labels.shoppingCartSettings',
        icon: '',
        path: '/products-shopping-cart-settings'
      },
      {
        name: 'labels.shoppingCartProducts',
        icon: '',
        path: '/products-shopping-cart-products'
      }]
    }, {
      name: 'labels.orders',
      authorities: [],
      icon: 'main-menu-icon picons-thin-icon-thin-0426_money_payment_dollars_coins_cash',
      path: '/orders',
      children: [{
        name: 'labels.dashboard',
        icon: '',
        path: '/orders-dashboard'
      },
      {
        name: 'labels.orders',
        icon: '',
        path: '/orders'
      },
      {
        name: 'labels.affiliates',
        icon: '',
        path: '/orders-affiliates'
      },
      {
        name: 'labels.reporting',
        icon: '',
        path: '/orders-reporting'
      }]
    }, {
      name: 'labels.maintenance',
      authorities: ['ROLE_SUPER_ADMIN'],
      icon: 'main-menu-icon os-icon os-icon-others-43',
      path: '/maintenance',
      children: [{
        name: 'labels.helpMaterial',
        icon: '',
        path: '/maintenance/help-material'
      }, {
        name: 'labels.helpCategory',
        icon: '',
        path: '/maintenance/help-category'
      }, {
        name: 'labels.helpTag',
        icon: '',
        path: '/maintenance/help-tag'
      }, {
        name: 'labels.taxRate',
        icon: '',
        path: '/maintenance/tax-rate'
      }, {
        name: 'labels.taxRule',
        icon: '',
        path: '/maintenance/tax-rule'
      }, {
        name: 'labels.taxRateLink',
        icon: '',
        path: '/maintenance/tax-rate-link'
      }, {
        name: 'labels.regions',
        icon: '',
        path: '/maintenance/regions'
      }, {
        name: 'labels.administrations',
        icon: '',
        path: '/maintenance/administrations'
      },{
        name: 'labels.externalSystems',
        icon: '',
        path: '/maintenance/external-systems'
      }, {
        name: 'labels.migrations',
        icon: '',
        path: '/maintenance/migrations'
      }]
    }
  ]

  public changeLanguage (item: string, ind: string) {
    this.$store.commit('currentLanguage', ind)
    this.$set(this.$i18n, 'locale', ind)
    // TODO send request to server to change language if needed
  }

  public getUserName () {
    return this.$store.state.userIdentity
      ? this.$store.state.userIdentity.firstName : 'Test'
  }

  public getUserRole () {
    return this.$store.state.userIdentity
      ? this.$store.state.userIdentity.firstName : 'Administrator'
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
        // @ts-ignore
        this.$vueOnToast.pop('success', this.$t('toastMessages.userUpdated'))
      } else {
        // @ts-ignore
        this.$vueOnToast.pop('error', this.$t('toastMessages.userUpdateError'))
      }
    })
  }
}
