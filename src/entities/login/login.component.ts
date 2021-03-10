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
