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
import AccountComponent from '@/entities/account/accountAndSettings/account/account.vue'
import InvoicesComponent from '@/entities/account/accountAndSettings/invoices/invoices.vue'
import RolesComponent from '@/entities/account/accountAndSettings/roles/roles.vue'
import UsersComponent from '@/entities/account/accountAndSettings/users/users.vue'
import IntegrationsComponent from '@/entities/account/accountAndSettings/integrations/integrations.vue'

@Component({
  components: {
    AccountComponent,
    InvoicesComponent,
    RolesComponent,
    UsersComponent
  },
  beforeRouteEnter (to, from, next) {
    next((vm: any) => {
      if (to.query.tab) {
        vm.switchTab(to.query.tab)
      }
    })
  }
})
export default class AccountAndSettingsComponent extends Vue {
  public currentTab: string

  constructor () {
    super()
    this.currentTab = 'account'
  }

  public switchTab (tab: string) {
    this.currentTab = tab
  }
}
