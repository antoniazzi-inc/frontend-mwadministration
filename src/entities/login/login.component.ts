import { Component, Vue } from 'vue-property-decorator'
import AuthService from '@/shared/services/authService'
import RelationService from '@/shared/services/relationService'
@Component
export default class LoginComponent extends Vue {
  public authService = AuthService.getInstance()
  public accountService = RelationService.getInstance()
  public accessCode: string;
  public username: string;
  public password: string;
  public resetEmail: string;
  public sockets: any;
  public tfaCode: string;
  public rememberMe: boolean;
  public showReset: boolean;

  constructor () {
    super()
    this.accessCode = ''
    this.username = ''
    this.password = ''
    this.resetEmail = ''
    this.tfaCode = ''
    this.rememberMe = true
    this.showReset = false
  }

  public created () {
    if (this.$store.state.authenticated) {
      this.$router.push('/')
    }
  }

  public changeLanguage (lang: string) {
    this.$set(this.$i18n, 'locale', lang)
  }

  public resetPassword () {
    const newReset = !this.showReset
    this.$set(this, 'showReset', newReset)
    this.resetEmail = ''
  }

  public doLogin () {
    const dto: any = {
      administrationKey: this.accessCode ? this.accessCode : undefined,
      username: this.username,
      password: this.password,
      rememberMe: this.rememberMe
    }
    this.authService.login(dto).then(login => {
      if (login) {
        this.$store.commit('authenticate', true)
        this.accountService.retrieveAccount().then(account => {
          if (account) {
            this.$store.commit('authenticated', account.data)
            this.$router.push('/')
          }
        })
      }
    })
  }
}
